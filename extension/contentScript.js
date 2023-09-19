const isBard = (() => location.host == "bard.google.com")()
const isChatGPT = (() => location.host == "chat.openai.com")()

function query(data) {
    if (isChatGPT) {
        setReactValue(document.querySelector('[id="prompt-textarea"]'), data)
        document
            .querySelector('[id="prompt-textarea"]')
            .nextElementSibling.click()
    }

    if (isBard) {
        const bard = document.querySelector(
            '[aria-label="Input for prompt text"] p'
        )
        bard.innerText = data
        setTimeout(
            () => document.querySelector('[mattooltip="Submit"]').click(),
            500
        )
    }
}

window.addEventListener(
    "load",
    async () => {
        if (isBard) {
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
