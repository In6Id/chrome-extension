class Background {
  constructor() {
      console.log(" background.js loaded")
      
      this.events()
      this.init()
  }

  init() {
    // check if user is logged in and set popup page. on default it is auth.html and after login it is userPage.html

    this.setPopUpPage()
  }

  events() {
      chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
          if (message.isAuth) {
            console.log('logged in')
            this.authorization();
          }
          if (message.htmlContent) {
            message.htmlContent = false;
            console.log("Received HTML content:", message.htmlContent);
            // You can now process the HTML content here
          } 

          if(message.logout) {
            message.logout = false;
            console.log('logout')
            this.logout()
          }
        });
  }

  authorization() {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.storage.local.set({is_auth: 'true'}, function() {
              console.log('Value is set to ' + 'true');
          });
          chrome.tabs.reload(tabs[0]?.id);
          this.parseAndLogHTML()

      });
  }

  logout() {
    chrome.storage.local.set({is_auth: 'false'}, function() {
      console.log('Value is set to ' + 'false');
      
  });
  }

  setPopUpPage() {

    console.log(chrome.storage.local.get('is_auth', function(result) {console.log(result);}))

      chrome.storage.local.get('is_auth', (result) => {
          if(result.is_auth == 'true') {
              chrome?.action?.setPopup({popup: 'Template/userPage.html'})
          } else {
              chrome?.action?.setPopup({popup: 'Template/auth.html'})
          }
      })
  }

  parseAndLogHTML() {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.scripting?.executeScript({
            target: { tabId: tabs[0].id },
            function: () => {
              const pageHTML = document.documentElement.outerHTML;
              chrome.runtime.sendMessage({ htmlContent: pageHTML });
            },
          });
      });
  }

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

