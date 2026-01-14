// ============================================
// Astronomical Calculations Module
// Using astronomy-engine library
// ============================================

/**
 * Calculate Julian Day Number from Gregorian date
 */
function getJulianDay(date) {
    const time = date.getTime();
    const julian = (time / 86400000) + 2440587.5;
    return julian;
}

/**
 * Calculate Lahiri Ayanamsa for given date
 * Lahiri ayanamsa is used in Vedic astrology
 */
function getLahiriAyanamsa(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    // Calculate days from epoch (1900-01-01)
    const t = (year - 1900) + (month - 1) / 12 + day / 365.25;

    // Lahiri ayanamsa formula (approximation)
    // At 2000 CE, ayanamsa ≈ 23.85°
    const ayanamsa = 22.460 + (t * 0.0134);

    return ayanamsa;
}

/**
 * Calculate sunrise time for given location and date
 */
async function getSunrise(latitude, longitude, date) {
    try {
        // Check if Astronomy library is available
        if (typeof Astronomy === 'undefined') {
            console.warn('Astronomy library not loaded, using fallback');
            return approximateSunrise(latitude, longitude, date);
        }

        const observer = new Astronomy.Observer(latitude, longitude, 0);
        const dateObj = new Date(date);
        const sunrise = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, Astronomy.Direction.Rise, dateObj, 1);

        if (sunrise) {
            return sunrise.date;
        }
    } catch (error) {
        console.error('Sunrise calculation error:', error);
    }

    // Fallback: approximate sunrise
    return approximateSunrise(latitude, longitude, date);
}

/**
 * Calculate sunset time for given location and date
 */
async function getSunset(latitude, longitude, date) {
    try {
        // Check if Astronomy library is available
        if (typeof Astronomy === 'undefined') {
            console.warn('Astronomy library not loaded, using fallback');
            return approximateSunset(latitude, longitude, date);
        }

        const observer = new Astronomy.Observer(latitude, longitude, 0);
        const dateObj = new Date(date);
        const sunset = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, Astronomy.Direction.Set, dateObj, 1);

        if (sunset) {
            return sunset.date;
        }
    } catch (error) {
        console.error('Sunset calculation error:', error);
    }

    // Fallback: approximate sunset
    return approximateSunset(latitude, longitude, date);
}

/**
 * Calculate moonrise time for given location and date
 */
async function getMoonrise(latitude, longitude, date) {
    try {
        if (typeof Astronomy === 'undefined') {
            return null; // No fallback for moonrise
        }

        const observer = new Astronomy.Observer(latitude, longitude, 0);
        const dateObj = new Date(date);
        const moonrise = Astronomy.SearchRiseSet(Astronomy.Body.Moon, observer, Astronomy.Direction.Rise, dateObj, 1);

        if (moonrise) {
            return moonrise.date;
        }
    } catch (error) {
        console.error('Moonrise calculation error:', error);
    }

    return null;
}

/**
 * Calculate moonset time for given location and date
 */
async function getMoonset(latitude, longitude, date) {
    try {
        if (typeof Astronomy === 'undefined') {
            return null; // No fallback for moonset
        }

        const observer = new Astronomy.Observer(latitude, longitude, 0);
        const dateObj = new Date(date);
        const moonset = Astronomy.SearchRiseSet(Astronomy.Body.Moon, observer, Astronomy.Direction.Set, dateObj, 1);

        if (moonset) {
            return moonset.date;
        }
    } catch (error) {
        console.error('Moonset calculation error:', error);
    }

    return null;
}

/**
 * Calculate Moon phase percentage (0-100)
 */
function getMoonPhase(date) {
    try {
        if (typeof Astronomy === 'undefined') {
            // Fallback: approximate moon phase based on date
            return approximateMoonPhase(date);
        }

        const illumination = Astronomy.Illumination(Astronomy.Body.Moon, date);
        return illumination.phase_fraction * 100;
    } catch (error) {
        console.error('Moon phase calculation error:', error);
        return approximateMoonPhase(date);
    }
}

/**
 * Get Sun's ecliptic longitude
 */
function getSunLongitude(date) {
    try {
        if (typeof Astronomy === 'undefined') {
            return approximateSunLongitude(date);
        }

        const ecliptic = Astronomy.Ecliptic(Astronomy.Body.Sun, date);
        return ecliptic.elon; // Ecliptic longitude in degrees
    } catch (error) {
        console.error('Sun longitude error:', error);
        // Fallback approximation
        return approximateSunLongitude(date);
    }
}

/**
 * Get Moon's ecliptic longitude
 */
function getMoonLongitude(date) {
    try {
        if (typeof Astronomy === 'undefined') {
            return approximateMoonLongitude(date);
        }

        const ecliptic = Astronomy.Ecliptic(Astronomy.Body.Moon, date);
        return ecliptic.elon; // Ecliptic longitude in degrees
    } catch (error) {
        console.error('Moon longitude error:', error);
        // Fallback approximation
        return approximateMoonLongitude(date);
    }
}

/**
 * Convert degrees to normalized 0-360 range
 */
function normalizeDegrees(degrees) {
    let normalized = degrees % 360;
    if (normalized < 0) normalized += 360;
    return normalized;
}

/**
 * Get sidereal longitude (tropical - ayanamsa)
 */
function getSiderealLongitude(tropicalLongitude, date) {
    const ayanamsa = getLahiriAyanamsa(date);
    return normalizeDegrees(tropicalLongitude - ayanamsa);
}

// ========== Fallback Approximations ==========

/**
 * Approximate sunrise time (fallback)
 */
function approximateSunrise(latitude, longitude, date) {
    const localDate = new Date(date);
    localDate.setHours(6, 0, 0, 0); // Default 6 AM

    // Adjust for latitude (very rough approximation)
    const latitudeOffset = (latitude - 0) * 2; // Minutes adjustment
    localDate.setMinutes(localDate.getMinutes() - latitudeOffset);

    return localDate;
}

/**
 * Approximate sunset time (fallback)
 */
function approximateSunset(latitude, longitude, date) {
    const localDate = new Date(date);
    localDate.setHours(18, 0, 0, 0); // Default 6 PM

    // Adjust for latitude
    const latitudeOffset = (latitude - 0) * 2;
    localDate.setMinutes(localDate.getMinutes() + latitudeOffset);

    return localDate;
}

/**
 * Approximate Sun's longitude (fallback)
 * Based on date in year
 */
function approximateSunLongitude(date) {
    const dayOfYear = getDayOfYear(date);
    // Sun moves approximately 1 degree per day
    // At vernal equinox (March 21, day ~80), Sun is at 0° tropical
    const longitude = (dayOfYear - 80) * 360 / 365.25;
    return normalizeDegrees(longitude);
}

/**
 * Approximate Moon's longitude (fallback)
 * Moon completes orbit in ~27.3 days (sidereal month)
 * Using improved formula with better epoch
 */
function approximateMoonLongitude(date) {
    // Reference: January 1, 2000, 12:00 UTC - Moon was approximately at 218° tropical
    const epoch = new Date('2000-01-01T12:00:00Z');
    const daysSinceEpoch = (date - epoch) / (1000 * 60 * 60 * 24);

    // Mean lunar motion: 360° / 27.321661 days (sidereal month)
    const meanMotion = 13.17639648; // degrees per day

    // Calculate mean longitude (tropical)
    // Starting position at epoch + accumulated movement
    const meanLongitude = 218.0 + (daysSinceEpoch * meanMotion);

    return normalizeDegrees(meanLongitude);
}

/**
 * Approximate Moon phase (fallback)
 * Based on lunar cycle (synodic month)
 */
function approximateMoonPhase(date) {
    const referenceDate = new Date('2000-01-06'); // New moon reference
    const daysSinceReference = (date - referenceDate) / (1000 * 60 * 60 * 24);
    const lunarMonth = 29.53059; // Synodic month (new moon to new moon)
    const phaseFraction = ((daysSinceReference % lunarMonth) + lunarMonth) % lunarMonth / lunarMonth;

    // Convert to illumination percentage
    // 0 = new moon, 0.5 = full moon, 1.0 = new moon again
    let illumination;
    if (phaseFraction < 0.5) {
        // Waxing phase
        illumination = phaseFraction * 2;
    } else {
        // Waning phase
        illumination = (1 - phaseFraction) * 2;
    }

    return illumination * 100;
}

/**
 * Get day of year (1-365/366)
 */
function getDayOfYear(date) {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}

/**
 * Format time to HH:MM AM/PM
 */
function formatTime(date) {
    if (!date) return 'N/A';

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be 12

    const minutesStr = minutes < 10 ? '0' + minutes : minutes;

    return `${hours}:${minutesStr} ${ampm}`;
}

/**
 * Format time to 24-hour format HH:MM
 */
function formatTime24(date) {
    if (!date) return 'N/A';

    const hours = date.getHours();
    const minutes = date.getMinutes();

    const hoursStr = hours < 10 ? '0' + hours : hours;
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;

    return `${hoursStr}:${minutesStr}`;
}

/**
 * Calculate duration between two times in hours and minutes
 */
function calculateDuration(startTime, endTime) {
    if (!startTime || !endTime) return null;

    const diff = endTime - startTime;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return { hours, minutes };
}
