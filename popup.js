// Select elements
const urlInput = document.getElementById('urlInput');
const savedUrlDisplay = document.getElementById('savedUrl');
const saveButton = document.getElementById('saveButton');
const launchButton = document.getElementById('launchButton');


// Retrieve saved URL from storage
chrome.storage.sync.get('jellyfinUrl', function(data) {
  if (data.jellyfinUrl) {
    savedUrlDisplay.innerText = `Saved URL: ${data.jellyfinUrl}`;
    launchButton.style.display = 'inline-block';
  }
});

// Save URL to storage and update display
function saveUrl() {
  const url = urlInput.value.trim();
  if (url) {
    chrome.storage.sync.set({jellyfinUrl: url}, function() {
      savedUrlDisplay.innerText = `Saved URL: ${url}`;
      urlInput.style.display = 'none';
      saveButton.style.display = 'none';
      launchButton.style.display = 'inline-block';
    });
  }
}

// Launch Jellyfin in new tab
function launchJellyfin() {
  chrome.tabs.create({ url: `http://${savedUrlDisplay.innerText.replace('Saved URL: ', '')}` });
}

// Change saved URL
function changeUrl() {
  urlInput.style.display = 'inline-block';
  saveButton.style.display = 'inline-block';
  launchButton.style.display = 'none';
  savedUrlDisplay.innerText = '';
  chrome.storage.sync.remove('jellyfinUrl');
}

// Add event listeners
saveButton.addEventListener('click', saveUrl);
launchButton.addEventListener('click', launchJellyfin);


// Check if Enter key is pressed and save URL
urlInput.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    saveUrl();
  }
});