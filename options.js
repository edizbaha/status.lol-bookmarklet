document.addEventListener("DOMContentLoaded", () => {
  // Get the saved username from storage
  chrome.storage.sync.get('username', (data) => {
    const usernameInput = document.getElementById('username');
    const savedUsername = data.username || 'foobar';
    usernameInput.value = savedUsername;
  });

  // Save the username to storage when the Save button is clicked
  const saveButton = document.getElementById('saveButton');
  saveButton.addEventListener('click', () => {
    const usernameInput = document.getElementById('username');
    const newUsername = usernameInput.value.trim();
    if (newUsername !== '') {
      chrome.storage.sync.set({ 'username': newUsername }, () => {
        console.log(`Address saved: ${newUsername}`);
        alert(`Address saved: ${newUsername}`);
      });
    }
  });
});
