console.log(" background.js loaded")

chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        if (message.reloadPage) {
            console.log('mevidaaa');
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.reload(tabs[0].id)
            })
        }
    }
);
