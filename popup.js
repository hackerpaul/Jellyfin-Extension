document.getElementById("launch-jellyfin").addEventListener("click", function() {
    chrome.tabs.create({url: "http://windows11.bee-catfish.ts.net:8096"});
    window.close();
  });
  