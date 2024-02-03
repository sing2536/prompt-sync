chrome.action.onClicked.addListener(() =>
    chrome.tabs.create({ url: "app/index.html" })
)

chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [1, 2],
    addRules: [
        {
            id: 1,
            priority: 1,
            action: {
                type: "modifyHeaders",
                requestHeaders: [
                    {
                        header: "sec-fetch-dest",
                        operation: "set",
                        value: "document",
                    },
                ],
                responseHeaders: [
                    { header: "X-Frame-Options", operation: "remove" },
                ],
            },
            condition: {
                urlFilter: "bard.google.com",
                resourceTypes: ["sub_frame"],
                initiatorDomains: [chrome.runtime.id],
            },
        },
        {
            id: 2,
            priority: 1,
            action: {
                type: "modifyHeaders",
                requestHeaders: [
                    {
                        header: "sec-fetch-dest",
                        operation: "set",
                        value: "document",
                    },
                ],
                responseHeaders: [
                    { header: "Content-Security-Policy", operation: "remove" },
                ],
            },
            condition: {
                urlFilter: "chat.openai.com",
                resourceTypes: ["sub_frame"],
                initiatorDomains: [chrome.runtime.id],
            },
        },
    ],
})
