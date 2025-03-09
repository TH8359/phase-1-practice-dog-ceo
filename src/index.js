console.log('%c HI', 'color: firebrick')

// Define the URLs for fetching dog breeds and images
const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";

// Wait for the DOM content to load
document.addEventListener("DOMContentLoaded", () => {
  // Fetch and display random dog images
  fetch(imgUrl)
    .then((response) => response.json()) // Parse the response as JSON
    .then((data) => {
      const dogImages = data.message;
      const dogImageContainer = document.getElementById("dog-image-container");
      dogImages.forEach((imageUrl) => {
        const imgElement = document.createElement("img");
        imgElement.src = imageUrl;
        imgElement.alt = "A Random Dog";
        dogImageContainer.appendChild(imgElement);
      });
    })
    .catch((error) => {
      console.error("Error fetching dog images:", error);
    });

  // Fetch and display dog breeds
  fetch(breedUrl)
    .then((response) => response.json()) // Parse the response as JSON
    .then((data) => {
      const breeds = data.message; // This will contain the breed list
      const breedList = document.getElementById("dog-breeds");

      // Create an array to hold all breed <li> elements
      const breedItems = [];

      // Loop through each breed and create a list item for it
      for (const breed in breeds) {
        const breedItem = document.createElement("li");
        breedItem.textContent = breed; // Set the breed name as the text content
        breedList.appendChild(breedItem); // Append the list item to the unordered list

        // Add click event listener to each breed <li>
        breedItem.addEventListener("click", () => {
          breedItem.style.color = "red"; // Change font color to red when clicked
        });

        breedItems.push(breedItem); // Add the breedItem to the array
      }

      // Handle the breed filtering based on the selected letter
      const breedDropdown = document.getElementById("breed-dropdown");
      breedDropdown.addEventListener("change", () => {
        const selectedLetter = breedDropdown.value.toLowerCase(); // Get the selected letter
        filterBreeds(breeds, breedItems, selectedLetter);
      });

      // Initial filter (when the page loads) to show all breeds
      filterBreeds(breeds, breedItems, breedDropdown.value.toLowerCase());
    })
    .catch((error) => {
      console.error("Error fetching dog breeds:", error);
    });
});

// Function to filter breeds based on the selected letter
function filterBreeds(breeds, breedItems, selectedLetter) {
  breedItems.forEach((breedItem, index) => {
    const breedName = breedItem.textContent.toLowerCase();
    // Show the breed if it starts with the selected letter, otherwise hide it
    if (breedName.startsWith(selectedLetter)) {
      breedItem.style.display = "list-item"; // Show the breed
    } else {
      breedItem.style.display = "none"; // Hide the breed
    }
  });
}


//Sources: https://chatgpt.com