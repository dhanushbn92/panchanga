// ============================================
// Main Application Logic
// Vedic Panchanga Application
// ============================================

// Embedded data to avoid CORS issues
const EMBEDDED_CITIES_DATA = [
  { name: 'Madurai', state: 'Tamil Nadu', latitude: 9.9252, longitude: 78.1198, timezone: 'Asia/Kolkata', utcOffset: '+05:30' },
  { name: 'Chennai', state: 'Tamil Nadu', latitude: 13.0827, longitude: 80.2707, timezone: 'Asia/Kolkata', utcOffset: '+05:30' },
  { name: 'Bangalore', state: 'Karnataka', latitude: 12.9716, longitude: 77.5946, timezone: 'Asia/Kolkata', utcOffset: '+05:30' },
  { name: 'Mumbai', state: 'Maharashtra', latitude: 19.0760, longitude: 72.8777, timezone: 'Asia/Kolkata', utcOffset: '+05:30' },
  { name: 'Delhi', state: 'Delhi', latitude: 28.7041, longitude: 77.1025, timezone: 'Asia/Kolkata', utcOffset: '+05:30' },
  { name: 'Varanasi', state: 'Uttar Pradesh', latitude: 25.3176, longitude: 82.9739, timezone: 'Asia/Kolkata', utcOffset: '+05:30' },
  { name: 'Haridwar', state: 'Uttarakhand', latitude: 29.9457, longitude: 78.1642, timezone: 'Asia/Kolkata', utcOffset: '+05:30' },
  { name: 'Kanyakumari', state: 'Tamil Nadu', latitude: 8.0883, longitude: 77.5385, timezone: 'Asia/Kolkata', utcOffset: '+05:30' }
];

const EMBEDDED_NAKSHATRA_DATA = [
  { id: 1, name: 'अश्विनी', transliteration: 'Ashwini', deity: 'Ashwini Kumaras', symbol: 'Horse\'s Head', auspicious: true },
  { id: 2, name: 'भरणी', transliteration: 'Bharani', deity: 'Yama', symbol: 'Yoni', auspicious: false },
  { id: 3, name: 'कृत्तिका', transliteration: 'Krittika', deity: 'Agni', symbol: 'Razor', auspicious: true },
  { id: 4, name: 'रोहिणी', transliteration: 'Rohini', deity: 'Brahma', symbol: 'Chariot', auspicious: true },
  { id: 5, name: 'मृगशीर्ष', transliteration: 'Mrigashira', deity: 'Soma', symbol: 'Deer\'s Head', auspicious: true },
  { id: 6, name: 'आर्द्रा', transliteration: 'Ardra', deity: 'Rudra', symbol: 'Teardrop', auspicious: false },
  { id: 7, name: 'पुनर्वसु', transliteration: 'Punarvasu', deity: 'Aditi', symbol: 'Quiver of Arrows', auspicious: true },
  { id: 8, name: 'पुष्य', transliteration: 'Pushya', deity: 'Brihaspati', symbol: 'Cow\'s Udder', auspicious: true },
  { id: 9, name: 'आश्लेषा', transliteration: 'Ashlesha', deity: 'Nagas', symbol: 'Serpent', auspicious: false },
  { id: 10, name: 'मघा', transliteration: 'Magha', deity: 'Pitris', symbol: 'Throne', auspicious: true },
  { id: 11, name: 'पूर्व फाल्गुनी', transliteration: 'Purva Phalguni', deity: 'Bhaga', symbol: 'Front Legs of Bed', auspicious: true },
  { id: 12, name: 'उत्तर फाल्गुनी', transliteration: 'Uttara Phalguni', deity: 'Aryaman', symbol: 'Back Legs of Bed', auspicious: true },
  { id: 13, name: 'हस्त', transliteration: 'Hasta', deity: 'Savitar', symbol: 'Hand', auspicious: true },
  { id: 14, name: 'चित्रा', transliteration: 'Chitra', deity: 'Tvashtar', symbol: 'Pearl', auspicious: true },
  { id: 15, name: 'स्वाति', transliteration: 'Swati', deity: 'Vayu', symbol: 'Coral', auspicious: true },
  { id: 16, name: 'विशाखा', transliteration: 'Vishakha', deity: 'Indra-Agni', symbol: 'Triumphal Gateway', auspicious: true },
  { id: 17, name: 'अनुराधा', transliteration: 'Anuradha', deity: 'Mitra', symbol: 'Lotus', auspicious: true },
  { id: 18, name: 'ज्येष्ठा', transliteration: 'Jyeshtha', deity: 'Indra', symbol: 'Earring', auspicious: false },
  { id: 19, name: 'मूल', transliteration: 'Mula', deity: 'Nirriti', symbol: 'Roots', auspicious: false },
  { id: 20, name: 'पूर्वाषाढ़ा', transliteration: 'Purva Ashadha', deity: 'Apas', symbol: 'Elephant Tusk', auspicious: true },
  { id: 21, name: 'उत्तराषाढ़ा', transliteration: 'Uttara Ashadha', deity: 'Vishvedevas', symbol: 'Elephant Tusk', auspicious: true },
  { id: 22, name: 'श्रवण', transliteration: 'Shravana', deity: 'Vishnu', symbol: 'Three Footprints', auspicious: true },
  { id: 23, name: 'धनिष्ठा', transliteration: 'Dhanishtha', deity: 'Vasus', symbol: 'Drum', auspicious: true },
  { id: 24, name: 'शतभिषा', transliteration: 'Shatabhisha', deity: 'Varuna', symbol: 'Empty Circle', auspicious: false },
  { id: 25, name: 'पूर्व भाद्रपद', transliteration: 'Purva Bhadrapada', deity: 'Aja Ekapada', symbol: 'Sword', auspicious: false },
  { id: 26, name: 'उत्तर भाद्रपद', transliteration: 'Uttara Bhadrapada', deity: 'Ahir Budhnya', symbol: 'Twin', auspicious: true },
  { id: 27, name: 'रेवती', transliteration: 'Revati', deity: 'Pushan', symbol: 'Fish', auspicious: true }
];

// Global state
let currentLocation = {
  name: 'Madurai',
  latitude: 9.9252,
  longitude: 78.1198,
  timezone: 'Asia/Kolkata'
};

let citiesData = [];
let nakshatraData = [];
let currentTimeInterval = null;

// ========== Initialization ==========

/**
 * Initialize the application on page load
 */
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Load data files
    await loadDataFiles();

    // Initialize theme
    initializeTheme();

    // Set up event listeners
    setupEventListeners();

    // Set default date to today
    const dateInput = document.getElementById('date-input');
    const today = new Date();
    dateInput.value = today.toISOString().split('T')[0];
    dateInput.max = new Date(today.getFullYear() + 10, 11, 31).toISOString().split('T')[0];
    dateInput.min = new Date(today.getFullYear() - 100, 0, 1).toISOString().split('T')[0];

    // Populate city dropdown
    populateCityDropdown();

    // Calculate and display Panchanga for today
    await calculateAndDisplayPanchanga();

    // Start current time updater
    startCurrentTimeUpdater();

  } catch (error) {
    console.error('Initialization error:', error);
    showError('Failed to initialize application. Please refresh the page.');
  }
});

/**
 * Load JSON data files (using embedded data to avoid CORS)
 */
async function loadDataFiles() {
  try {
    // Use embedded data to avoid CORS issues
    citiesData = EMBEDDED_CITIES_DATA;
    nakshatraData = EMBEDDED_NAKSHATRA_DATA;
    console.log('Data loaded successfully:', citiesData.length, 'cities,', nakshatraData.length, 'nakshatras');
  } catch (error) {
    console.error('Error loading data:', error);
    // Use fallback data
    citiesData = [{ name: 'Madurai', latitude: 9.9252, longitude: 78.1198, timezone: 'Asia/Kolkata' }];
    nakshatraData = [];
  }
}

// ========== Event Listeners ==========

/**
 * Set up all event listeners
 */
function setupEventListeners() {
  // Date input change
  document.getElementById('date-input').addEventListener('change', calculateAndDisplayPanchanga);

  // City dropdown change
  document.getElementById('city-select').addEventListener('change', onCityChange);

  // Manual coordinates input
  document.getElementById('latitude-input').addEventListener('change', onManualCoordinatesChange);
  document.getElementById('longitude-input').addEventListener('change', onManualCoordinatesChange);

  // Geolocation button
  document.getElementById('geolocation-btn').addEventListener('click', getCurrentLocation);

  // Theme toggle
  document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

  // Export buttons
  document.getElementById('pdf-export-btn').addEventListener('click', exportAsPDF);
  document.getElementById('image-export-btn').addEventListener('click', exportAsImage);
}

/**
 * City dropdown change handler
 */
function onCityChange(event) {
  const cityName = event.target.value;

  if (cityName === 'custom') {
    // Enable manual input
    document.getElementById('latitude-input').disabled = false;
    document.getElementById('longitude-input').disabled = false;
    return;
  }

  const city = citiesData.find(c => c.name === cityName);
  if (city) {
    currentLocation = {
      name: city.name,
      latitude: city.latitude,
      longitude: city.longitude,
      timezone: city.timezone
    };

    // Update coordinate inputs
    document.getElementById('latitude-input').value = city.latitude.toFixed(4);
    document.getElementById('longitude-input').value = city.longitude.toFixed(4);
    document.getElementById('latitude-input').disabled = true;
    document.getElementById('longitude-input').disabled = true;

    // Update location info
    updateLocationInfo();

    // Recalculate Panchanga
    calculateAndDisplayPanchanga();
  }
}

/**
 * Manual coordinates change handler
 */
function onManualCoordinatesChange() {
  const latitude = parseFloat(document.getElementById('latitude-input').value);
  const longitude = parseFloat(document.getElementById('longitude-input').value);

  if (!isNaN(latitude) && !isNaN(longitude)) {
    currentLocation = {
      name: 'Custom Location',
      latitude: latitude,
      longitude: longitude,
      timezone: 'Asia/Kolkata' // Default to IST
    };

    updateLocationInfo();
    calculateAndDisplayPanchanga();
  }
}

/**
 * Get current location using Geolocation API
 */
function getCurrentLocation() {
  if (!navigator.geolocation) {
    alert('Geolocation is not supported by your browser');
    return;
  }

  const button = document.getElementById('geolocation-btn');
  button.textContent = 'Getting Location...';
  button.disabled = true;

  navigator.geolocation.getCurrentPosition(
    (position) => {
      currentLocation = {
        name: 'Current Location',
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        timezone: 'Asia/Kolkata' // Default to IST
      };

      // Update inputs
      document.getElementById('city-select').value = 'custom';
      document.getElementById('latitude-input').value = position.coords.latitude.toFixed(4);
      document.getElementById('longitude-input').value = position.coords.longitude.toFixed(4);
      document.getElementById('latitude-input').disabled = false;
      document.getElementById('longitude-input').disabled = false;

      updateLocationInfo();
      calculateAndDisplayPanchanga();

      button.textContent = '📍 Use Current Location';
      button.disabled = false;
    },
    (error) => {
      console.error('Geolocation error:', error);
      alert('Unable to get your location. Please enter coordinates manually.');
      button.textContent = '📍 Use Current Location';
      button.disabled = false;
    }
  );
}

// ========== UI Updates ==========

/**
 * Populate city dropdown with preset cities
 */
function populateCityDropdown() {
  const select = document.getElementById('city-select');
  select.innerHTML = '';

  citiesData.forEach(city => {
    const option = document.createElement('option');
    option.value = city.name;
    option.textContent = `${city.name}, ${city.state}`;
    if (city.name === 'Madurai') {
      option.selected = true;
    }
    select.appendChild(option);
  });

  // Add custom option
  const customOption = document.createElement('option');
  customOption.value = 'custom';
  customOption.textContent = 'Custom Location';
  select.appendChild(customOption);

  // Set initial coordinates
  document.getElementById('latitude-input').value = currentLocation.latitude.toFixed(4);
  document.getElementById('longitude-input').value = currentLocation.longitude.toFixed(4);

  updateLocationInfo();
}

/**
 * Update location information display
 */
function updateLocationInfo() {
  const infoDiv = document.getElementById('location-info');
  if (!infoDiv) return;

  infoDiv.innerHTML = `
    <div><strong>Location:</strong> ${currentLocation.name}</div>
    <div><strong>Coordinates:</strong> ${currentLocation.latitude.toFixed(4)}°N, ${currentLocation.longitude.toFixed(4)}°E</div>
    <div><strong>Timezone:</strong> ${currentLocation.timezone} (IST UTC+5:30)</div>
  `;
}

/**
 * Show loading state
 */
function showLoading() {
  const display = document.getElementById('panchanga-display-section');
  if (display) {
    display.innerHTML = '<div class="loading">⏳ Calculating Panchanga...</div>';
    display.classList.remove('hidden');
  }
}

/**
 * Show error message
 */
function showError(message) {
  const display = document.getElementById('panchanga-display-section');
  if (display) {
    display.innerHTML = `<div class="error">❌ ${message}</div>`;
    display.classList.remove('hidden');
  }
}

// ========== Panchanga Calculation and Display ==========

/**
 * Main function to calculate and display all Panchanga elements
 */
async function calculateAndDisplayPanchanga() {
  try {
    showLoading();

    const dateInput = document.getElementById('date-input').value;
    const selectedDate = new Date(dateInput + 'T12:00:00'); // Noon on selected date

    // Calculate all Panchanga elements
    const tithi = calculateTithi(selectedDate);
    const vara = calculateVara(selectedDate);
    const nakshatra = calculateNakshatra(selectedDate, nakshatraData);
    const yoga = calculateYoga(selectedDate);
    const karana = calculateKarana(selectedDate);

    // Calculate times
    const sunrise = await getSunrise(currentLocation.latitude, currentLocation.longitude, selectedDate);
    const sunset = await getSunset(currentLocation.latitude, currentLocation.longitude, selectedDate);
    const moonrise = await getMoonrise(currentLocation.latitude, currentLocation.longitude, selectedDate);
    const moonset = await getMoonset(currentLocation.latitude, currentLocation.longitude, selectedDate);
    const moonPhase = getMoonPhase(selectedDate);

    // Calculate Muhurta timings
    const muhurtaTimings = await calculateMuhurtaTimings(currentLocation.latitude, currentLocation.longitude, selectedDate);

    // Display all data
    displayPanchangaData({
      tithi,
      vara,
      nakshatra,
      yoga,
      karana,
      sunrise,
      sunset,
      moonrise,
      moonset,
      moonPhase,
      muhurtaTimings
    });

  } catch (error) {
    console.error('Panchanga calculation error:', error);
    showError('Error calculating Panchanga. Please try again.');
  }
}

/**
 * Display Panchanga data in the UI
 */
function displayPanchangaData(data) {
  const display = document.getElementById('panchanga-display-section');

  const dayDuration = calculateDuration(data.sunrise, data.sunset);

  display.innerHTML = `
    <!-- Current Time Display -->
    <div class="current-time-display">
      <div class="current-time-label">Current Time (IST)</div>
      <div class="current-time-value" id="current-time-value">--:--:--</div>
    </div>
    
    <!-- Panchanga Cards Grid -->
    <div class="panchanga-display" id="panchanga-cards">
      <!-- Vara & Tithi Card (Grouped) -->
      <div class="panchanga-card ${data.vara.auspicious && data.tithi.auspicious ? 'auspicious' : !data.vara.auspicious || !data.tithi.auspicious ? 'inauspicious' : ''}">
        <div class="card-title">
          📅 Vara & Tithi
          <span class="card-icon">🌙</span>
        </div>
        <div class="card-content">
          <div class="sanskrit-text">${data.vara.name}</div>
          <div class="transliteration">${data.vara.transliteration} (${data.vara.planet})</div>
          <div class="detail-row">
            <span class="detail-label">Deity:</span>
            <span class="detail-value">${data.vara.deity}</span>
          </div>
          <hr style="margin: 1rem 0; border: none; border-top: 2px solid var(--beige);">
          <div class="sanskrit-text">${data.tithi.name}</div>
          <div class="transliteration">${data.tithi.transliteration}</div>
          <div class="detail-row">
            <span class="detail-label">Paksha:</span>
            <span class="detail-value">${data.tithi.paksha}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Tithi Number:</span>
            <span class="detail-value">${data.tithi.number}/30</span>
          </div>
          <div class="progress-container">
            <div class="progress-label">
              <span>Progress</span>
              <span>${data.tithi.progress.toFixed(1)}%</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${data.tithi.progress}%"></div>
            </div>
            <div style="font-size: 0.75rem; color: var(--brown); margin-top: 0.5rem;">
              Next: ${data.tithi.nextTithi.transliteration}
            </div>
          </div>
        </div>
      </div>
      
      <!-- Nakshatra Card -->
      <div class="panchanga-card ${data.nakshatra.current && data.nakshatra.current.auspicious ? 'auspicious' : 'inauspicious'}">
        <div class="card-title">
          ✨ Nakshatra
          <span class="card-icon">⭐</span>
        </div>
        <div class="card-content">
          <div class="sanskrit-text">${data.nakshatra.current ? data.nakshatra.current.name : 'N/A'}</div>
          <div class="transliteration">${data.nakshatra.current ? data.nakshatra.current.transliteration : 'N/A'}</div>
          <div class="detail-row">
            <span class="detail-label">Deity:</span>
            <span class="detail-value">${data.nakshatra.current ? data.nakshatra.current.deity : 'N/A'}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Symbol:</span>
            <span class="detail-value">${data.nakshatra.current ? data.nakshatra.current.symbol : 'N/A'}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Position:</span>
            <span class="detail-value">${data.nakshatra.number}/27</span>
          </div>
          <div class="progress-container">
            <div class="progress-label">
              <span>Progress</span>
              <span>${data.nakshatra.progress.toFixed(1)}%</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${data.nakshatra.progress}%"></div>
            </div>
            <div style="font-size: 0.75rem; color: var(--brown); margin-top: 0.5rem;">
              Next: ${data.nakshatra.next ? data.nakshatra.next.transliteration : 'N/A'}
            </div>
          </div>
        </div>
      </div>
      
      <!-- Yoga Card -->
      <div class="panchanga-card ${data.yoga.auspicious ? 'auspicious' : 'inauspicious'}">
        <div class="card-title">
          🔗 Yoga
          <span class="card-icon">☯️</span>
        </div>
        <div class="card-content">
          <div class="sanskrit-text">${data.yoga.name}</div>
          <div class="transliteration">${data.yoga.transliteration}</div>
          <div class="detail-row">
            <span class="detail-label">Yoga Number:</span>
            <span class="detail-value">${data.yoga.number}/27</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Type:</span>
            <span class="detail-value">${data.yoga.auspicious ? 'Auspicious ✓' : 'Inauspicious ✗'}</span>
          </div>
          <div class="progress-container">
            <div class="progress-label">
              <span>Progress</span>
              <span>${data.yoga.progress.toFixed(1)}%</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${data.yoga.progress}%"></div>
            </div>
            <div style="font-size: 0.75rem; color: var(--brown); margin-top: 0.5rem;">
              Next: ${data.yoga.nextYoga.transliteration}
            </div>
          </div>
        </div>
      </div>
      
      <!-- Karana Card -->
      <div class="panchanga-card ${data.karana.current.auspicious ? 'auspicious' : 'inauspicious'}">
        <div class="card-title">
          ⚡ Karana
          <span class="card-icon">🔱</span>
        </div>
        <div class="card-content">
          <div class="sanskrit-text">${data.karana.current.name}</div>
          <div class="transliteration">${data.karana.current.transliteration}</div>
          <div class="detail-row">
            <span class="detail-label">Type:</span>
            <span class="detail-value">${data.karana.current.type}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Nature:</span>
            <span class="detail-value">${data.karana.current.auspicious ? 'Auspicious ✓' : 'Inauspicious ✗'}</span>
          </div>
          <div style="font-size: 0.875rem; color: var(--brown); margin-top: 1rem;">
            <strong>Next Karana:</strong> ${data.karana.next.transliteration}
          </div>
        </div>
      </div>
    </div>
    
    <!-- Sunrise/Sunset Section -->
    <div class="time-section">
      <div class="time-section-title">🌅 Sun & Moon Timings</div>
      <div class="time-grid">
        <div class="time-item">
          <div class="time-item-label">🌄 Sunrise</div>
          <div class="time-item-value">${formatTime(data.sunrise)}</div>
        </div>
        <div class="time-item">
          <div class="time-item-label">🌆 Sunset</div>
          <div class="time-item-value">${formatTime(data.sunset)}</div>
        </div>
        <div class="time-item">
          <div class="time-item-label">⏱️ Day Duration</div>
          <div class="time-item-value">${dayDuration ? `${dayDuration.hours}h ${dayDuration.minutes}m` : 'N/A'}</div>
        </div>
        <div class="time-item">
          <div class="time-item-label">🌙 Moonrise</div>
          <div class="time-item-value">${formatTime(data.moonrise)}</div>
        </div>
        <div class="time-item">
          <div class="time-item-label">🌑 Moonset</div>
          <div class="time-item-value">${formatTime(data.moonset)}</div>
        </div>
        <div class="time-item">
          <div class="time-item-label">🌕 Moon Phase</div>
          <div class="time-item-value">${data.moonPhase.toFixed(1)}%</div>
        </div>
      </div>
    </div>
    
    <!-- Muhurta Timings (Inauspicious Times) -->
    <div class="muhurta-section">
      <div class="muhurta-title">⚠️ Inauspicious Timings (To Be Avoided)</div>
      <div class="muhurta-grid">
        <div class="muhurta-item">
          <div style="font-weight: 700; color: var(--inauspicious); margin-bottom: 0.5rem;">Rahu Kaalam</div>
          <div style="font-size: 1.125rem; font-weight: 600;">${data.muhurtaTimings ? data.muhurtaTimings.rahuKaalam.startFormatted : 'N/A'} - ${data.muhurtaTimings ? data.muhurtaTimings.rahuKaalam.endFormatted : 'N/A'}</div>
        </div>
        <div class="muhurta-item">
          <div style="font-weight: 700; color: var(--inauspicious); margin-bottom: 0.5rem;">Yama Gandam</div>
          <div style="font-size: 1.125rem; font-weight: 600;">${data.muhurtaTimings ? data.muhurtaTimings.yamaGandam.startFormatted : 'N/A'} - ${data.muhurtaTimings ? data.muhurtaTimings.yamaGandam.endFormatted : 'N/A'}</div>
        </div>
        <div class="muhurta-item">
          <div style="font-weight: 700; color: var(--inauspicious); margin-bottom: 0.5rem;">Gulikai</div>
          <div style="font-size: 1.125rem; font-weight: 600;">${data.muhurtaTimings ? data.muhurtaTimings.gulikai.startFormatted : 'N/A'} - ${data.muhurtaTimings ? data.muhurtaTimings.gulikai.endFormatted : 'N/A'}</div>
        </div>
      </div>
    </div>
  `;

  display.classList.remove('hidden');
}

// ========== Theme Toggle ==========

/**
 * Initialize theme from localStorage
 */
function initializeTheme() {
  const savedTheme = localStorage.getItem('panchanga-theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeButton(savedTheme);
}

/**
 * Toggle between light and dark theme
 */
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';

  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('panchanga-theme', newTheme);
  updateThemeButton(newTheme);
}

/**
 * Update theme toggle button text
 */
function updateThemeButton(theme) {
  const button = document.getElementById('theme-toggle');
  button.textContent = theme === 'light' ? '🌙 Dark' : '☀️ Light';
}

// ========== Current Time Updater ==========

/**
 * Start continuous current time updates
 */
function startCurrentTimeUpdater() {
  updateCurrentTime(); // Initial update

  currentTimeInterval = setInterval(updateCurrentTime, 1000);
}

/**
 * Update current time display
 */
function updateCurrentTime() {
  const timeElement = document.getElementById('current-time-value');
  if (!timeElement) return;

  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const hoursStr = hours < 10 ? '0' + hours : hours;
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;
  const secondsStr = seconds < 10 ? '0' + seconds : seconds;

  timeElement.textContent = `${hoursStr}:${minutesStr}:${secondsStr}`;
}

// Clean up interval on page unload
window.addEventListener('beforeunload', () => {
  if (currentTimeInterval) {
    clearInterval(currentTimeInterval);
  }
});
