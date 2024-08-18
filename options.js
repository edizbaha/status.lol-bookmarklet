document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get(['address', 'emoji'], (data) => {
    const addressInput = document.getElementById('address');
    const emojiInput = document.getElementById('emoji');
    const savedAddress = data.address || '';
    const savedEmoji = data.emoji || '';
    addressInput.value = savedAddress;
    emojiInput.value = savedEmoji;
  });

  const saveButton = document.getElementById('saveButton');
  saveButton.addEventListener('click', () => {
    const addressInput = document.getElementById('address');
    const emojiInput = document.getElementById('emoji');
    const newAddress = addressInput.value.trim();
    const newEmoji = emojiInput.value.trim();
    if (newAddress === '') {
      alert('Please enter a valid address');
      return;
    }
    chrome.storage.sync.set({ 'address': newAddress, 'emoji': newEmoji }, () => {
      console.log(`Address saved: ${newAddress}`);
      console.log(`Emoji saved: ${newEmoji}`);
      alert(`Address and emoji saved: ${newAddress} - ${newEmoji}`);
    });
  });
});