let mCurrentIndex = 0; // Tracks the current image index
let mImages = []; // Array to hold GalleryImage objects
const mUrl = "images.json"; // Replace with actual JSON URL
const mWaitTime = 8000; // Timer interval in milliseconds

$(document).ready(() => {
  $(".details").hide(); // Hide details initially
  $(".details").slideToggle();

  // Call a function here to start the timer for the slideshow
  startTimer();
  // Select the moreIndicator button and add a click event to:
  $(".moreIndicator").on("click", function () {
    // - toggle the rotation classes (rot90 and rot270)
    $("moreIndicator").toggleClass("rot90 rot270");
    // - slideToggle the visibility of the .details section
    $(".details").slideToggle();
  });

  // Select the "Next Photo" button and add a click event to call showNextPhoto
  $("#nextPhoto").on("click", function () {
    showNextPhoto();
  });
  // Select the "Previous Photo" button and add a click event to call showPrevPhoto
  $("#prevPhoto").on("click", function () {
    showPrevPhoto();
  });
  // Call fetchJSON() to load the initial set of images
  fetchJSON();
});

// Function to fetch JSON data and store it in mImages
function fetchJSON() {
  // Use $.ajax here to request the JSON data from mUrl
  // After JSON is loaded, call swapPhoto() to display the first image
  $.ajax({
    type: "GET",
    url: mUrl,
    dataType: "json",
    // On success, parse the JSON and push each image object into mImages array
    success: function (data) {
      mImages = data.images;
      // After JSON is loaded, call swapPhoto() to display the first image
      swapPhoto();
    },
  });
}

// Function to swap and display the next photo in the slideshow
function swapPhoto() {
  let currentImg = mImages[mCurrentIndex];
  $("#photo").attr("src", currentImg.imgPath);
  // Update the .location, .description, and .date elements with the current image's details
  $(".name").text(`${currentImg.imgLocation}`);
  $(".description").text(`${currentImg.description}`);
}

// Advances to the next photo, loops to the first photo if the end of array is reached
function showNextPhoto() {
  // Increment mCurrentIndex and call swapPhoto()
  // Ensure it loops back to the beginning if mCurrentIndex exceeds array length
  mCurrentIndex++;
  if (mCurrentIndex == 10) mCurrentIndex = 0;
  swapPhoto();
}

// Goes to the previous photo, loops to the last photo if mCurrentIndex goes negative
function showPrevPhoto() {
  // Decrement mCurrentIndex and call swapPhoto()
  // Ensure it loops to the end if mCurrentIndex is less than 0
  mCurrentIndex--;
  if (mCurrentIndex == -1) mCurrentIndex = 9;
  swapPhoto();
}

// Starter code for the timer function
function startTimer() {
  // Create a timer to automatically call `showNextPhoto()` every mWaitTime milliseconds
  // Consider using setInterval to achieve this functionality
  // Hint: Make sure only one timer runs at a time
  setInterval(() => showNextPhoto(), mWaitTime);
}
