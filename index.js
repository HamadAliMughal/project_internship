const api = {
  key: "2fa73590fd8b5a4c6e68098ad5625395",
  base: "https://api.openweathermap.org/data/2.5/"
};

const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
  console.log(weather);
  let city = document.querySelector(".location .city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

  let weather_el = document.querySelector(".current .weather");
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector(".hi-low");
  hilow.innerText = `${weather.main.temp_min}°C / ${weather.main.temp_max}°C`;
}

function dateBuilder(d) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}


// Function to handle the contact form submission
function handleContactForm(event) {
  event.preventDefault(); // Prevent form submission

  // Retrieve form inputs
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  // Retrieve form values
  const name = nameInput.value;
  const email = emailInput.value;
  const message = messageInput.value;

  // Perform any additional actions with the form data (e.g., sending a message)

  // Clear form inputs after submission
  nameInput.value = "";
  emailInput.value = "";
  messageInput.value = "";
}

// Event listener for the contact form submission
const contactForm = document.getElementById("contact-form");
contactForm.addEventListener("submit", handleContactForm);


// Function to handle the signup form submission
function handleSignupForm(event) {
  event.preventDefault(); // Prevent form submission

  // Retrieve form inputs
  const nameInput = document.getElementById("name");
  const cityInput = document.getElementById("city");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  // Retrieve form values
  const name = nameInput.value;
  const city = cityInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;

  // Store the form data in local storage or perform any other necessary actions
  const userData = {
    name,
    city,
    email,
    password
  };

  localStorage.setItem("userData", JSON.stringify(userData));

  // Clear form inputs after submission
  nameInput.value = "";
  cityInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
}

// Event listener for the signup form submission
const signupForm = document.getElementById("signup-form");
signupForm.addEventListener("submit", handleSignupForm);


// Function to handle the login form submission
function handleLoginForm(event) {
  event.preventDefault(); // Prevent form submission

  // Retrieve form inputs
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  // Retrieve form values
  const email = emailInput.value;
  const password = passwordInput.value;

  // Retrieve stored user data from local storage
  const storedData = localStorage.getItem("userData");
  if (storedData) {
    const userData = JSON.parse(storedData);

    // Check if the entered email and password match the stored data
    if (email === userData.email && password === userData.password) {
      // Successful login, redirect to home page or perform necessary actions
      window.location.href = "index.html";
    } else {
      // Invalid login credentials, display an error message or perform necessary actions
      console.log("Invalid login credentials");
    }
  } else {
    // User data not found, display an error message or perform necessary actions
    console.log("User data not found");
  }

  // Clear form inputs after submission
  emailInput.value = "";
  passwordInput.value = "";
}

// Event listener for the login form submission
const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", handleLoginForm);

