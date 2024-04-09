// Script File for Sats-UI

//*****  LOGIN PAGE  ******
// On the Login page, after the admin/lecturer has correctly entered the login details and presses the Login button
// The level page should be loaded on the screen 
var loginform = document.getElementById('login-form');


// check if we are on the login page
if (document.querySelector(".login-container")){
  // Function to show the preloader
function showPreloader() {
  document.getElementById('preloader').style.display = 'block';
}

// Function to hide the preloader
function hidePreloader() {
  document.getElementById('preloader').style.display = 'none';
}

// Show preloader initially
showPreloader();

// Hide preloader when the page has fully loaded
window.addEventListener('load', function() {
  hidePreloader();
});

// Disable the submit button from redirecting
  loginform.addEventListener('submit', function(event){
    event.preventDefault();

    location.href = 'https://leovihildo.github.io/Final-Year-Project/level.html';
   // location.href = 'http://127.0.0.1:5500/level.html';
})
};


//*****  LEVEL PAGE  *****

// Function to fetch the JSON data
async function fetchCourses() {
  try {
    const response = await fetch('js/courses.json');
    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    return null;
  }
}

// Function to update course dropdown based on selected level
function updateCourseDropdown(selectedLevel) {
  var courseDropdown = document.querySelector(".course-select");
  
  // Clear existing options
  courseDropdown.innerHTML = '';
  
  // Append placeholder option
  var placeholderOption = new Option("Choose Course", "");
  courseDropdown.appendChild(placeholderOption);

  // Add options corresponding to the selected level
  selectedLevel.forEach(function (course) {
    let option = new Option(course, course);
    courseDropdown.appendChild(option);
  });
}
// Check if we are on the page where this functionality is required
if (document.querySelector(".level-select")) {
  // Attach event listener to the level dropdown
  var levelDropdown = document.querySelector(".level-select");
  levelDropdown.addEventListener('change', () => {
    fetchCourses().then(courses => {
      var selectedLevel = courses[levelDropdown.value];
      updateCourseDropdown(selectedLevel);
      
      // Store the selected level in local storage
      localStorage.setItem('selectedLevel', levelDropdown.value);
    });
  });

  // Initialize course dropdown with placeholder
  updateCourseDropdown([]);

  // Go to Home page after clicking continue
  var levelForm = document.getElementById("level-form");

  levelForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    // Retrieve the selected level from local storage
    var selectedLevel = localStorage.getItem('selectedLevel');
    
    if ((document.querySelector(".course-select").value === "") || (document.querySelector(".level-select").value === "")){
      alert("Please fill in all required fields!");
    }
    else{
      // Store the selected course in local storage for use on the next page
      localStorage.setItem('selectedCourse', document.querySelector(".course-select").value);
      
      //location.href = 'http://127.0.0.1:5500/main.html';
      location.href = 'https://leovihildo.github.io/Final-Year-Project/main.html';
    }
  })
}





// ---- HOME PAGE ----
// Check if we are on the home page where this functionality is required
if (document.querySelector(".home-message")) {
  // Retrieve the stored values from local storage
  var selectedLevel = localStorage.getItem('selectedLevel');
  var selectedCourse = localStorage.getItem('selectedCourse');

  // Update the content of the home message based on the stored values
  if (selectedLevel && selectedCourse) {
    document.querySelector(".home-message").innerHTML = `<h1>Welcome to SATS-UI</h1><p>Selected Level: ${selectedLevel}</p><p>Selected Course: ${selectedCourse}</p>`;
  } else {
    document.querySelector(".home-message").innerHTML = `<h1>Welcome to SATS-UI</h1><p>No selection made.</p>`;
  }
}


