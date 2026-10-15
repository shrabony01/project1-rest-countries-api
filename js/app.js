let allCountries = [];

//DOM Elements
const countriesGrid = document.getElementById("countries-grid");
const searchInput = document.getElementById("search-input");
const regionFilter = document .getElementById ("region-filter");
const themeToggleBtn = document.getElementById("theme-toggle");
const homeView = document.getElementById("home-view");
const countryDetailView =document.getElementById("country-detail-view");
const detailContent = document.getElementById("detail-content");
const backButton = document.getElementById("back-button");

//bringing API url from config.js

const API_URL = (typeof CONFIG !== "undefined" && CONFIG.API_BASE_URL)
    ? `${CONFIG.API_BASE_URL}/all`
    : "https://restcountries.com/v3.1/all";