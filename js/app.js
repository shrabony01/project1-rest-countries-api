let allCountries = [];

//DOM Elements
const countriesGrid = document.getElementById("countries-grid");
const searchInput = document.getElementById("search-input");
const regionFilter = document.getElementById("region-filter");
const themeToggleBtn = document.getElementById("theme-toggle");
const homeView = document.getElementById("home-view");
const countryDetailView = document.getElementById("country-detail-view");
const detailContent = document.getElementById("detail-content");
const backButton = document.getElementById("back-button");

//bringing API url from config.js

const API_URL = (typeof CONFIG !== "undefined" && CONFIG.API_BASE_URL)
    ? `${CONFIG.API_BASE_URL}/all`
    : "https://restcountries.com/v3.1/all";

const FALLBACK_URL = (typeof CONFIG !== "undefined" && CONFIG.LOCAL_DATA_FALLBACK)
    ? CONFIG.LOCAL_DATA_FALLBACK
    : "./data.json";

//retriving data
async function fetchCountries() {
    countriesGrid.innerHTML = '<p class="status-message">Loading countries...</p>';

    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const data = await response.json();
        allCountries = data;
        renderCountries(allCountries);

    } catch (error) {
        console.warn("Live API failed,using fallback:", error.message);

        try {
            const fallbackResponse = await fetch(FALLBACK_URL);
            if (!fallbackResponse.ok) throw new Error("Fallback failed");
            const FallbackData = await fallbackResponse.json();
            allCountries = FallbackData;
            renderCountries(allCountries);

        } catch (fallbackError) {
            countriesGrid.innerHTML = '<p class="error-message">Unable to load country data. Please check your connection.</p>';
            console.error(fallbackError);
        }


    }
}

//turning raw data  into cards
function renderCountries(countries) {
    if (!countries || countries.length === 0) {
        countriesGrid.innerHTML = '<p class="status-message">No countries found.</p>';
        return;
    }
    countriesGrid.innerHTML = countries.map(country => {
        const name = country.name.common || country.name;
        const flag = country.flags ? (country.flags.svg || country.flags.png) : country.flag;
        const population = (country.population || 0).toLocaleString();
        const region = country.region || "N/A";
        const capital = country.capital ? (Array.isArray(country.capital) ? country.capital[0]:country.capital) : "N/A";
        const code = country.cca3 || country.alpha3Code || name;

        return `
            <article class="country-card" data-code="${code}" tabindex="0" role="button" aria-label="View details for ${name}">
            <img src="${flag}" alt="Flag of ${name}" loading="lazy" />
            <div class="card-info">
                <h2 class="card-title">${name}</h2>
                <p><strong>Population:</strong> ${population}</p>
                <p><strong>Region:</strong> ${region}</p>
                <p><strong>Capital:</strong> ${capital}</p>
                </div>
            </article>
        `;
    }).join ("");

    document.querySelectorAll(".country-card").forEach((card)=> {
        const code = card.getAttribute("data-code");
        card.addEventListener("click", () => openDetailView(code));
        card.addEventListener("keydown",(e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                if (typeof openDetailView === "function") openDetailView(code);
            }
        });

    });
}
fetchCountries();
// Search and Region Filtering Logic
function filterCountries() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  const selectedRegion = regionFilter.value;

  const filtered = allCountries.filter(country => {
    const commonName = (country.name.common || country.name || "").toLowerCase();
    const matchesSearch = commonName.includes(searchTerm);
    const matchesRegion = selectedRegion === "" || country.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  renderCountries(filtered);
}

// Event listeners for search & filter inputs
searchInput.addEventListener("input", filterCountries);
regionFilter.addEventListener("change", filterCountries);

//Detail Veiw Navigation
function openDetailView(code){
    const country = allCountries.find ( c =>
        c.cca3 === code ||
        c.alpha3Code === code ||
        (c.name.common || c.name) === code
    );
    if(!country) return;

    const name= country.name.common || country.name;
    const flag = country.flags ? (country.flags.svg || country.flags.png):country.flag;
    const nativeName = country.name? .nativeName
        ?Object .values(country.name.nativeName)[0]?.common ||name
        :country.nativeName||name;
    const population=(country.population||0).toLocaleString();
    const region = country.region|| "N/A";
    const subregion = country.subregion || "N/A";
    const capital = country.capital ? (Array.isArray(country.capital) ? country.capital[0]:country.capital): "N/A";
    const tld = country.tld ? country.tld.join(", "): (country.topLevelDomain ? country.topLevelDomain.join(", "):"N/A");

    let currencies = "N/A";
    if(country.currencies){
        currencies = Array.isArray(country.currencies)
        ?country.currencies.map(c =>c.name).join(", ")
        :Object.values(country.currencies).map(c => c.name).join(", ");

    }
     let languages = "N/A";
     if(country.languages){
        languages = Array.isArray(country.languages)
        ?country.languages.map(l => l.name).join(", ")
        :Object.values(country.languages).join(", ");
     }
     const borders = country.borders || [];
     let borderHTML = "<span>None</span>";

     if(borderHTML.length>0){
        borderHTML=borders.map(borderCode =>{
            const borderCountry = allCountries.find(c => c.cca3 === borderCode|| c.alpha3Code=== borderCode);
            const displayName= borderCountry ? (borderCountry.name.common || borderCountry.name):borderCode;
            return `<button class="border-tag" type="button" data-code="${borderCode}"> ${displayName}</button>`;
        }).join("");
     }
     
}