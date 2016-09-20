// Send javascript event with updated state
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  var e = new CustomEvent('update-state', {detail: {state: request.state}});
  dispatchEvent(e)
});