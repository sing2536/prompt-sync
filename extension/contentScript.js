const isGemini = (() => location.host == "gemini.google.com")()
const isChatGPT = (() => location.host == "chat.openai.com")()
const isBing = (() => location.host == "www.bing.com")()
const isClaude = (() => location.host == "claude.ai")()

function query(data) {
    if (isChatGPT) {
        setReactValue(document.querySelector('[id="prompt-textarea"]'), data)
        document
            .querySelector('[id="prompt-textarea"]')
            .nextElementSibling.click()
    }

    if (isGemini) {
        const bard = document.querySelector(
            '[aria-label="Input for prompt text"]'
        )
        bard.innerHTML = formatGeminiInput(data)
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

function formatGeminiInput(input) {
    const lines = input.split("\n")
    return lines
        .map((line) => {
            return "<p>" + line + "</p>"
        })
        .join("")
}

window.addEventListener(
    "load",
    async () => {
        if (isGemini) {
            while (
                document.querySelector(
                    '[aria-label="Input for prompt text"]'
                ) === null
            ) {
                await new Promise((resolve) => requestAnimationFrame(resolve))
            }
            focusPrompt()
        }
    },
    false
)

document.addEventListener("keydown", (event) => {
    if (event.key === "/") focusPrompt()
})

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
    const menuObserverHandler = () => {
        const chatButton = (() => {
            for (let i of document.querySelectorAll(
                'nav[aria-label="Search Filter"] a'
            )) {
                if (i.innerText == "COPILOT") {
                    return i
                }
            }

            return null
        })()

        if (chatButton) {
            if (chatButton.ariaCurrent == "false") {
                chatButton.click()
            }
        }
    }

    const menuObserver = new MutationObserver(menuObserverHandler)

    menuObserver.observe(
        document.querySelector('nav[aria-label="Search Filter"]'),
        {
            attributes: true,
            subtree: true,
        }
    )
}
