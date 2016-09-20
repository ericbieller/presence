// Send javascript event with updated state
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  var e = new CustomEvent('update-state', {detail: {idle_status: request.idle_status}});
  console.log(request.idle_status);
  dispatchEvent(e)
});