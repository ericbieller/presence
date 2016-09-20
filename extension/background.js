// Set interval detection (minimum 15)
chrome.idle.setDetectionInterval(15);

// Send message when idle state changes
chrome.idle.onStateChanged.addListener(function(newState) {
  chrome.tabs.query({url: "*://localhost/*"}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {state: newState}, function(response) {
      console.log(response);
    });
  });
});