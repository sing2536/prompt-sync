chrome.runtime.onMessage.addListener((msg) => {
    switch (msg?.action) {
        case 'query':
            query(msg.data)
            break;

        case 'reset':
            reset()
    
    }
});

function query(data) {
    const chatGPT = document.querySelector('[id="prompt-textarea"]')
    const bard = document.querySelector('[aria-label="Input for prompt text"]')

    if (chatGPT) {
        setReactValue(chatGPT, data)
        document.querySelector('[id="prompt-textarea"]').nextElementSibling.click()
    }
    if (bard) {
        bard.value = data
        bard.dispatchEvent(new Event('input'))
        document.querySelector('[mattooltip="Submit"]').click()
    }
}

function reset() {

}

function setReactValue(element, value) {
    let lastValue = element.value;
    element.value = value;
    let event = new Event("input", { target: element, bubbles: true });
    // React 15
    event.simulated = true;
    // React 16
    let tracker = element._valueTracker;
    if (tracker) {
        tracker.setValue(lastValue);
    }
    element.dispatchEvent(event);
}