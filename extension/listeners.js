// Setup listeners
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // Send javascript event with updated state
  if (request.type == "update-status") {
    var e = new CustomEvent('update-status', {detail: {idle_status: request.idle_status}});
    console.log(request.idle_status);
  }
  
  // Send javascript event with call answer  
  if (request.type == "received-answer") {
    var e = new CustomEvent('received-answer', {detail: {answer: request.answer}});
  }
  
  dispatchEvent(e);
});