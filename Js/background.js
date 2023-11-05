class Background {
    constructor() {
        console.log(" background.js loaded")
        this.events()
    }

    events() {
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message.reloadPage) {
              this.reloadPage();
            }
            if (message.htmlContent) {
              console.log("Received HTML content:", message.htmlContent);
              // You can now process the HTML content here
            }
          });
      }

    reloadPage() {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.reload(tabs[0].id);
            this.parseAndLogHTML()
        });
    }

    parseAndLogHTML() {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
              target: { tabId: tabs[0].id },
              function: () => {
                const pageHTML = document.documentElement.outerHTML;
                chrome.runtime.sendMessage({ htmlContent: pageHTML });
              },
            });
        });
    }

    // setPopUpPage() {
    //     if(this.getLocalStorage('is_auth') === 'true') {
    //         chrome.browserAction.setPopup({popup: 'userPage.html'})
    //     } else {
    //         chrome.browserAction.setPopup({popup: 'auth.html'})
    //     }
    // }

    // getLocalStorage(key) {
    //     return chrome.storage.local.get(key, function(result) {
    //         return result
    //     })
    // }
}

new Background()



// "browser_action": {
//     "default_popup": "Template/auth.html",
//     "default_title": "In6id",
//     "setPopup": {
//         "popup": "Template/auth.html"
//     }
// }

