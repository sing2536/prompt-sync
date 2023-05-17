function ask(e) {
    const ele = document.querySelector('#query')

    if(e.key === 'Enter') {
        chrome.tabs.getCurrent((tab) => {
            chrome.tabs.sendMessage(tab.id, {action: 'query', data: ele.value})
            ele.value = '' 
        })
    }
}

function reset() {
    chrome.tabs.getCurrent((tab) => {
        chrome.tabs.sendMessage(tab.id, {action: 'reset'})
    })
}

document.querySelector('#query').addEventListener('keyup', ask)
document.querySelector('#reset').addEventListener('click', reset)