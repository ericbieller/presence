// Set interval detection (minimum 15)
chrome.idle.setDetectionInterval(15);

// Send message when idle state changes
chrome.idle.onStateChanged.addListener(function(newState) {
  chrome.tabs.query({url: "*://localhost/*"}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      type: "update-status",
      idle_status: newState
    });
  });
});


chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
    console.log(request);
    // Incomin call notification
    if (request.type == "incoming-call") {
      var opt = {
        type: "basic",
        title: "Call from " + request.call_info.caller.name,
        message: "Press CMD+A to answer or CMD+X to ignore",
        iconUrl: "http://localhost:7777/default-avatar.png",
        requireInteraction: true,
        buttons: [
          {title: "Accept"},
          {title: "Ignore"}
        ]
      }
      
      // Create and show notification
      chrome.notifications.create("incoming-call", opt);
      
      // Set timeout to clear notification after no answer
      setRingTimeout();
    }
  }
);

// Clear timeout on close
chrome.notifications.onClosed.addListener(function() {
  clearTimeout(ringTimer);
});

// Catch answer button clicks
chrome.notifications.onButtonClicked.addListener(function(notificationId, buttonIndex) {
  var answer = false;
  if (buttonIndex == 0) {
    answer = true;
  }
  answerCall(answer);
});

function answerCall(answer) {
  // Clear the call notification
  chrome.notifications.clear("incoming-call");

  // Send answer
  chrome.tabs.query({url: "*://localhost/*"}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      type: "received-answer",
      answer: answer
    });
  });
}

function replyBtnClick() {
  clearNotifications("incoming-call");
}

function setRingTimeout(ringTimeout) {
  ringTimer = setTimeout(function() {
    answerCall(false);
  }, 10000);
}