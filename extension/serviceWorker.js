chrome.action.onClicked.addListener(()=> chrome.tabs.create({url: "app/index.html"}))

chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [1],
    addRules: [
        {
            "id": 1,
            "priority": 1,
            "action": {
                "type": "modifyHeaders",
                "requestHeaders": [
                    { "header": "sec-fetch-dest", "operation": "set", "value": "document" }
                ],
                "responseHeaders": [
                    { "header": "X-Frame-Options", "operation": "remove" }
                ]
            },
            "condition": {"urlFilter": "bard.google.com", "resourceTypes": ["sub_frame"], "initiatorDomains": [chrome.runtime.id]}
        }
    ],
})
