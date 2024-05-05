chrome.action.onClicked.addListener(() =>
    chrome.tabs.create({ url: "app/index.html" })
)

chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [1, 2, 3, 4, 5],
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
                urlFilter: "gemini.google.com",
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
                    {
                        header: "Access-Control-Allow-Origin",
                        operation: "set",
                        value: "*",
                    },
                ],
            },
            condition: {
                urlFilter: "chatgpt.com",
                resourceTypes: ["sub_frame"],
                initiatorDomains: [chrome.runtime.id],
            },
        },
        {
            id: 3,
            priority: 1,
            action: {
                type: "modifyHeaders",
                responseHeaders: [
                    { header: "Content-Security-Policy", operation: "remove" },
                    { header: "X-Frame-Options", operation: "remove" },
                ],
            },
            condition: {
                urlFilter: "claude.ai",
                resourceTypes: ["sub_frame"],
                initiatorDomains: [chrome.runtime.id],
            },
        },
        {
            id: 4,
            priority: 1,
            action: {
                type: "modifyHeaders",
                responseHeaders: [
                    {
                        header: "Content-Security-Policy",
                        operation: "remove",
                    },
                ],
            },
            condition: {
                urlFilter: "www.bing.com",
                resourceTypes: ["sub_frame"],
                initiatorDomains: [chrome.runtime.id],
            },
        },
        {
            id: 5,
            priority: 1,
            action: {
                type: "modifyHeaders",
                responseHeaders: [
                    {
                        header: "Content-Security-Policy",
                        operation: "remove",
                    },
                    { header: "X-Frame-Options", operation: "remove" },
                ],
            },
            condition: {
                urlFilter: "www.perplexity.ai",
                resourceTypes: ["sub_frame"],
                initiatorDomains: [chrome.runtime.id],
            },
        },
    ],
})
