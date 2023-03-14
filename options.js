document.addEventListener("DOMContentLoaded", () => {
  // Get the saved address from storage
  chrome.storage.sync.get('address', (data) => {
    // Get the input element for the address
    const addressInput = document.getElementById('address');
    // Get the saved address from storage, or set it to an empty string if it doesn't exist
    const savedaddress = data.address || '';
    // Set the value of the address input element to the saved address
    addressInput.value = savedaddress;
  });

  // Save the address to storage when the Save button is clicked
  const saveButton = document.getElementById('saveButton');
  saveButton.addEventListener('click', () => {
    // Get the input element for the address
    const addressInput = document.getElementById('address');
    // Get the new address entered by the user, and remove any leading/trailing white space
    const newaddress = addressInput.value.trim();
    // Check if the new address is empty
    if (newaddress === '') {
      // If it is, display an alert message and exit the function
      alert('Please enter a valid address');
      return;
    }
    // Save the new address to storage
    chrome.storage.sync.set({ 'address': newaddress }, () => {
      // Log a message to the console indicating that the address has been saved
      console.log(`Address saved: ${newaddress}`);
      // Display an alert message to the user indicating that the address has been saved
      alert(`Address saved: ${newaddress}`);
    });
  });
});
