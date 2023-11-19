class Background {

  constructor() {
      
      this.events()
      this.init()

  }

  init() {

      console.log("background.js loaded")

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
            } 

            if(message.logout) {
              message.logout = false;
              console.log('logout')
              this.logout()
            }

            if(message.checkAuth) {
              message.checkAuth = false;
              this.setPopUpPage()
            }

            if(message.logoutFromCopart) {
              message.logoutFromCopart = false;
              console.log('logout from copart')
              this.logoutFromCopart()
            }

            if(message.token) {
              chrome.storage.local.set({token: message.token})
            }

            if(message.credentials) {
              // chrome.storage.local.set({credentials: message.credentials})
              console.log(message.credentials);
            }

            if(message.newRoute){
              this.listenNewRoute(message.newRoute)
            }

      });

  }

  authorization() {

      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.storage.local.set({is_auth: 'true'}, () => {

              chrome.tabs.reload(tabs[0]?.id);
              this.parseAndLogHTML()
              this.setPopUpPage()

          });
      });

  }

  logout() {

      chrome.storage.local.set({is_auth: 'false'}, () => {

          this.setPopUpPage()

          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            this.logoutFromCopart()
          });
        
      });

  }

  logoutFromCopart() {

      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {

        chrome.scripting.executeScript({
            target: { tabId: tabs[0]?.id },
            function: () => {

              let logout = document.getElementById('headerloggedInUserDropdown')
              let logoutButton = logout.querySelector('.d-f-c')
              let logoutButtonChildren = logoutButton.children

              logoutButtonChildren[0].click()
              
            },

        });

      });

  }

  setPopUpPage() {

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


      });

  }

  // getLocalStorage(key) {

  //     return chrome.storage.local.get(key, function(result) {
  //         return result
  //     })

  // }
  

  listenNewRoute(route){
		if (route.includes('/myBids/') || route.includes('/lotsLost/') || route.includes('/lotsWon/')) {
      chrome.storage.local.get('vehicles', (result) => {
        if(!result.vehicles){
          this.getVehicles()
        }
      })
		}

  }

  

  getVehicles() {
			const apiUrl = 'https://api.amexlinee.com/api/v1/dealers/copart-vehicles';

			chrome.storage.local.get('token', (result) => {
        
        fetch(apiUrl, {
					method: 'GET',
					headers: {
							'Authorization': result.token,
							'Content-Type': 'application/json'
					},
			})
			.then(response => response.json())
			.then(data => {
          chrome.storage.local.set({ vehicles: data })
			})
			.catch(error => {
					console.error('Error fetching data from the API:', error);
			});

			})
  }

}

new Background()
