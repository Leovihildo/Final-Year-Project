// Script File for Sats-UI

//*****  LOGIN PAGE  ******
// On the Login page, after the admin/lecturer has correctly entered the login details and presses the Login button
// The level page should be loaded on the screen 
var loginform = document.getElementById('login-form');

// check if we are on the login page
if (document.querySelector(".login-container")){
  loginform.addEventListener('submit', function(event){
    event.preventDefault();

    location.href = 'http://127.0.0.1:5500/level.html';
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
    });
  });

  // Initialize course dropdown with placeholder
  updateCourseDropdown([]);

  // Go to Home page after clicking continue
  var levelForm = document.getElementById("level-form");

  levelForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    // console.log(document.querySelector(".course-select").value);
    if ((document.querySelector(".course-select").value === "") || (document.querySelector(".level-select").value === "")){
      alert("Please fill in all required fields!");
    }
    else{
      location.href = 'http://127.0.0.1:5500/main.html';
    }
  })
}
