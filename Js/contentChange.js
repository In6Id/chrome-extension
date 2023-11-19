// Function to be executed when the route changes
function onRouteChange() {
	// Notify the background script that the route has changed
	chrome.runtime.sendMessage({ routeChanged: true, newRoute: window && window.location.href });

	if(window.location.href.includes('/myBids/') || window.location.href.includes('/lotsLost/') || window.location.href.includes('/lotsWon/')){

		

	}
}

// Create a MutationObserver to watch for changes in the location.href
const observer = new MutationObserver(onRouteChange);

// Define the configuration of the MutationObserver
const config = { childList: true, subtree: true };

// Start observing the target node for configured mutations
observer.observe(document.body, config);