const isGemini = location.host == "gemini.google.com"
const isChatGPT = location.host == "chatgpt.com"
const isBing = location.host == "www.bing.com"
const isClaude = location.host == "claude.ai"
const isPerplexity = location.host == "www.perplexity.ai"

const generalScript = document.createElement("script")
generalScript.src = chrome.runtime.getURL("/is/general.js")
document.head.appendChild(generalScript)

function query(data) {
    if (isPerplexity) {
        setReactValue(document.querySelector("textarea"), data)
        setTimeout(() => {
            document.querySelector('button[aria-label="Submit"]').click()
        }, 300)
        setTimeout(() => {
            document.querySelector('button[data-testid="close-modal"]').click()
        }, 6000)
    }

    if (isChatGPT) {
        const input = document.querySelector('[id="prompt-textarea"]')

        input.innerHTML = formatInputWithParagraphTags(data)
        setTimeout(() => {
            document.querySelector('[data-testid="send-button"]')?.click()
        }, 500)
    }

    if (isGemini) {
        const bard = document.querySelector(
            '[aria-label="Enter a prompt here"]'
        )

        bard.innerHTML = formatInputWithParagraphTags(data)
        setTimeout(
            () => document.querySelector('[aria-label="Send message"]').click(),
            500
        )
    }

    if (isBing) {
        const input = querySelectorShadowDom.querySelectorDeep("#searchbox")
        const send = querySelectorShadowDom.querySelectorDeep(
            'button[description="Submit"]'
        )

        input.value = data
        input.dispatchEvent(new Event("change"))
        setTimeout(() => {
            send.click()
        }, 500)
    }

    if (isClaude) {
        const input = document.querySelector('[class*="ProseMirror"] p')
        const newChat = document.querySelector('[data-value="new chat"]')
        const send = document.querySelector('button[aria-label="Send Message"]')

        input.innerText = data
        setTimeout(() => {
            if (newChat) {
                newChat.click()
            } else {
                send.click()
            }
        }, 500)
    }
}

function formatInputWithParagraphTags(input) {
    const lines = input.split("\n")

    return lines
        .map((line) => {
            return "<p>" + line + "</p>"
        })
        .join("")
}

chrome.runtime.onMessage.addListener((msg) => {
    switch (msg?.action) {
        case "query":
            query(msg.data)
            break
    }
})

function setReactValue(element, value) {
    let lastValue = element.value
    element.value = value
    let event = new Event("input", { target: element, bubbles: true })
    // React 15
    event.simulated = true
    // React 16
    let tracker = element._valueTracker
    if (tracker) {
        tracker.setValue(lastValue)
    }
    element.dispatchEvent(event)
}

function focusPrompt() {
    chrome.runtime.sendMessage("", { action: "focusPrompt" })
}

if (isBing) {
    //bing randomly navigates away from chat to search sometimes, this helps go back to chat
    setTimeout(() => {
        document.querySelector('[id="b-scopeListItem-conv"] a')?.click()
    }, 10000)
}
