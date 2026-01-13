// ============================================
// Muhurta Calculations Module
// Rahu Kaalam, Yama Gandam, Gulikai
// ============================================

/**
 * Calculate all Muhurta timings for a given date and location
 */
async function calculateMuhurtaTimings(latitude, longitude, date) {
    const sunrise = await getSunrise(latitude, longitude, date);
    const sunset = await getSunset(latitude, longitude, date);

    if (!sunrise || !sunset) {
        return null;
    }

    const dayDuration = (sunset - sunrise) / (1000 * 60); // Duration in minutes
    const slotDuration = dayDuration / 8; // Each slot is 1/8th of the day

    const dayOfWeek = date.getDay();

    return {
        rahuKaalam: calculateRahuKaalam(sunrise, slotDuration, dayOfWeek),
        yamaGandam: calculateYamaGandam(sunrise, slotDuration, dayOfWeek),
        gulikai: calculateGulikai(sunrise, slotDuration, dayOfWeek),
        dayDuration: {
            hours: Math.floor(dayDuration / 60),
            minutes: Math.floor(dayDuration % 60)
        }
    };
}

/**
 * Calculate Rahu Kaalam timing
 * Rahu Kaalam is 1/8th of the day, varies by weekday
 */
function calculateRahuKaalam(sunrise, slotDuration, dayOfWeek) {
    // Rahu Kaalam slot number for each day (0-indexed)
    // Sunday=0, Monday=1, ..., Saturday=6
    const rahuSlots = [7, 1, 6, 4, 5, 3, 2]; // Slot numbers (1-8) - 1 for 0-indexed

    const slotNumber = rahuSlots[dayOfWeek];
    const startTime = new Date(sunrise.getTime() + (slotNumber * slotDuration * 60 * 1000));
    const endTime = new Date(startTime.getTime() + (slotDuration * 60 * 1000));

    return {
        start: startTime,
        end: endTime,
        startFormatted: formatTime(startTime),
        endFormatted: formatTime(endTime)
    };
}

/**
 * Calculate Yama Gandam timing
 * Yama Gandam is 1/8th of the day, varies by weekday
 */
function calculateYamaGandam(sunrise, slotDuration, dayOfWeek) {
    // Yama Gandam slot number for each day
    const yamaSlots = [4, 3, 2, 1, 0, 6, 5]; // Slot numbers for Sun-Sat

    const slotNumber = yamaSlots[dayOfWeek];
    const startTime = new Date(sunrise.getTime() + (slotNumber * slotDuration * 60 * 1000));
    const endTime = new Date(startTime.getTime() + (slotDuration * 60 * 1000));

    return {
        start: startTime,
        end: endTime,
        startFormatted: formatTime(startTime),
        endFormatted: formatTime(endTime)
    };
}

/**
 * Calculate Gulikai timing
 * Gulikai (also known as Mandi) is 1/8th of the day, varies by weekday
 */
function calculateGulikai(sunrise, slotDuration, dayOfWeek) {
    // Gulikai slot number for each day
    const gulikaiSlots = [6, 5, 4, 3, 2, 1, 0]; // Slot numbers for Sun-Sat

    const slotNumber = gulikaiSlots[dayOfWeek];
    const startTime = new Date(sunrise.getTime() + (slotNumber * slotDuration * 60 * 1000));
    const endTime = new Date(startTime.getTime() + (slotDuration * 60 * 1000));

    return {
        start: startTime,
        end: endTime,
        startFormatted: formatTime(startTime),
        endFormatted: formatTime(endTime)
    };
}

/**
 * Check if current time falls within Rahu Kaalam
 */
function isInRahuKaalam(currentTime, rahuKaalam) {
    if (!rahuKaalam) return false;
    return currentTime >= rahuKaalam.start && currentTime <= rahuKaalam.end;
}

/**
 * Check if current time falls within Yama Gandam
 */
function isInYamaGandam(currentTime, yamaGandam) {
    if (!yamaGandam) return false;
    return currentTime >= yamaGandam.start && currentTime <= yamaGandam.end;
}

/**
 * Check if current time falls within Gulikai
 */
function isInGulikai(currentTime, gulikai) {
    if (!gulikai) return false;
    return currentTime >= gulikai.start && currentTime <= gulikai.end;
}

/**
 * Get all inauspicious periods for the day
 */
function getInauspiciousPeriods(muhurtaTimings) {
    if (!muhurtaTimings) return [];

    return [
        {
            name: 'Rahu Kaalam',
            ...muhurtaTimings.rahuKaalam,
            description: 'Inauspicious for starting new ventures'
        },
        {
            name: 'Yama Gandam',
            ...muhurtaTimings.yamaGandam,
            description: 'Inauspicious for important activities'
        },
        {
            name: 'Gulikai',
            ...muhurtaTimings.gulikai,
            description: 'Inauspicious, associated with Saturn'
        }
    ];
}
