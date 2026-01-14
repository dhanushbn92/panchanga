// ============================================
// Panchanga Calculations Module
// Tithi, Vara, Nakshatra, Yoga, Karana
// ============================================

/**
 * Calculate Tithi (Lunar day)
 * Based on Moon-Sun longitude difference
 * Each Tithi = 12° difference
 * 30 Tithis in a lunar month
 */
function calculateTithi(date) {
    const sunLon = getSiderealLongitude(getSunLongitude(date), date);
    const moonLon = getSiderealLongitude(getMoonLongitude(date), date);

    // Calculate difference between Moon and Sun (elongation)
    let diff = moonLon - sunLon;
    if (diff < 0) diff += 360;

    // Normalize to 0-360 range
    diff = diff % 360;

    // Each Tithi is 12 degrees (30 tithis in 360 degrees)
    // Tithi 1 starts at 0°, Tithi 2 at 12°, etc.
    // Use floor to get the tithi index (0-29), then add 1 to get tithi number (1-30)
    let tithiIndex = Math.floor(diff / 12);

    // Ensure valid range 0-29, then convert to 1-30
    tithiIndex = tithiIndex % 30;
    const tithiNumber = tithiIndex + 1;

    // Calculate progress within current tithi (0-100%)
    const tithiProgress = (diff % 12) / 12 * 100;

    const tithiData = getTithiData(tithiNumber);

    return {
        number: tithiNumber,
        name: tithiData.name,
        transliteration: tithiData.transliteration,
        paksha: tithiData.paksha,
        progress: tithiProgress,
        nextTithi: getTithiData(tithiNumber === 30 ? 1 : tithiNumber + 1),
        auspicious: tithiData.auspicious
    };
}

/**
 * Get Tithi data by number (1-30)
 */
function getTithiData(number) {
    const tithis = [
        // Shukla Paksha (Waxing, 1-15)
        { num: 1, name: 'प्रतिपदा', transliteration: 'Pratipada', paksha: 'Shukla', auspicious: true },
        { num: 2, name: 'द्वितीया', transliteration: 'Dwitiya', paksha: 'Shukla', auspicious: true },
        { num: 3, name: 'तृतीया', transliteration: 'Tritiya', paksha: 'Shukla', auspicious: true },
        { num: 4, name: 'चतुर्थी', transliteration: 'Chaturthi', paksha: 'Shukla', auspicious: true },
        { num: 5, name: 'पंचमी', transliteration: 'Panchami', paksha: 'Shukla', auspicious: true },
        { num: 6, name: 'षष्ठी', transliteration: 'Shashthi', paksha: 'Shukla', auspicious: true },
        { num: 7, name: 'सप्तमी', transliteration: 'Saptami', paksha: 'Shukla', auspicious: true },
        { num: 8, name: 'अष्टमी', transliteration: 'Ashtami', paksha: 'Shukla', auspicious: true },
        { num: 9, name: 'नवमी', transliteration: 'Navami', paksha: 'Shukla', auspicious: true },
        { num: 10, name: 'दशमी', transliteration: 'Dashami', paksha: 'Shukla', auspicious: true },
        { num: 11, name: 'एकादशी', transliteration: 'Ekadashi', paksha: 'Shukla', auspicious: true },
        { num: 12, name: 'द्वादशी', transliteration: 'Dwadashi', paksha: 'Shukla', auspicious: true },
        { num: 13, name: 'त्रयोदशी', transliteration: 'Trayodashi', paksha: 'Shukla', auspicious: true },
        { num: 14, name: 'चतुर्दशी', transliteration: 'Chaturdashi', paksha: 'Shukla', auspicious: true },
        { num: 15, name: 'पूर्णिमा', transliteration: 'Purnima', paksha: 'Shukla', auspicious: true },

        // Krishna Paksha (Waning, 16-30)
        { num: 16, name: 'प्रतिपदा', transliteration: 'Pratipada', paksha: 'Krishna', auspicious: false },
        { num: 17, name: 'द्वितीया', transliteration: 'Dwitiya', paksha: 'Krishna', auspicious: false },
        { num: 18, name: 'तृतीया', transliteration: 'Tritiya', paksha: 'Krishna', auspicious: false },
        { num: 19, name: 'चतुर्थी', transliteration: 'Chaturthi', paksha: 'Krishna', auspicious: false },
        { num: 20, name: 'पंचमी', transliteration: 'Panchami', paksha: 'Krishna', auspicious: false },
        { num: 21, name: 'षष्ठी', transliteration: 'Shashthi', paksha: 'Krishna', auspicious: false },
        { num: 22, name: 'सप्तमी', transliteration: 'Saptami', paksha: 'Krishna', auspicious: false },
        { num: 23, name: 'अष्टमी', transliteration: 'Ashtami', paksha: 'Krishna', auspicious: false },
        { num: 24, name: 'नवमी', transliteration: 'Navami', paksha: 'Krishna', auspicious: false },
        { num: 25, name: 'दशमी', transliteration: 'Dashami', paksha: 'Krishna', auspicious: false },
        { num: 26, name: 'एकादशी', transliteration: 'Ekadashi', paksha: 'Krishna', auspicious: false },
        { num: 27, name: 'द्वादशी', transliteration: 'Dwadashi', paksha: 'Krishna', auspicious: false },
        { num: 28, name: 'त्रयोदशी', transliteration: 'Trayodashi', paksha: 'Krishna', auspicious: false },
        { num: 29, name: 'चतुर्दशी', transliteration: 'Chaturdashi', paksha: 'Krishna', auspicious: false },
        { num: 30, name: 'अमावस्या', transliteration: 'Amavasya', paksha: 'Krishna', auspicious: false }
    ];

    return tithis[number - 1] || tithis[0];
}

/**
 * Calculate Vara (Weekday)
 * Simple day of week calculation
 */
function calculateVara(date) {
    const dayOfWeek = date.getDay();
    const varas = [
        { name: 'रविवार', transliteration: 'Ravivara', deity: 'Surya (Sun)', planet: 'Sun', auspicious: true },
        { name: 'सोमवार', transliteration: 'Somavara', deity: 'Chandra (Moon)', planet: 'Moon', auspicious: true },
        { name: 'मंगलवार', transliteration: 'Mangalavara', deity: 'Mangala (Mars)', planet: 'Mars', auspicious: false },
        { name: 'बुधवार', transliteration: 'Budhavara', deity: 'Budha (Mercury)', planet: 'Mercury', auspicious: true },
        { name: 'गुरुवार', transliteration: 'Guruvara', deity: 'Brihaspati (Jupiter)', planet: 'Jupiter', auspicious: true },
        { name: 'शुक्रवार', transliteration: 'Shukravara', deity: 'Shukra (Venus)', planet: 'Venus', auspicious: true },
        { name: 'शनिवार', transliteration: 'Shanivara', deity: 'Shani (Saturn)', planet: 'Saturn', auspicious: false }
    ];

    return varas[dayOfWeek];
}

/**
 * Calculate Nakshatra (Lunar mansion)
 * Based on Moon's sidereal longitude
 * Each Nakshatra = 13°20' = 13.333°
 * 27 Nakshatras
 */
function calculateNakshatra(date, nakshatraData) {
    const moonLon = getSiderealLongitude(getMoonLongitude(date), date);

    // Each Nakshatra is 13.333 degrees (13°20')
    const nakshatraNumber = Math.floor(moonLon / 13.333333) + 1;
    const nakshatraProgress = (moonLon % 13.333333) / 13.333333 * 100;

    const currentNakshatra = nakshatraData[nakshatraNumber - 1];
    const nextNakshatra = nakshatraData[nakshatraNumber % 27];

    return {
        number: nakshatraNumber,
        current: currentNakshatra,
        next: nextNakshatra,
        progress: nakshatraProgress
    };
}

/**
 * Calculate Yoga
 * Based on sum of Sun and Moon sidereal longitudes
 * Each Yoga = 13°20' = 13.333°
 * 27 Yogas
 */
function calculateYoga(date) {
    const sunLon = getSiderealLongitude(getSunLongitude(date), date);
    const moonLon = getSiderealLongitude(getMoonLongitude(date), date);

    // Sum of Sun and Moon longitudes
    let sum = sunLon + moonLon;
    if (sum >= 360) sum -= 360;

    // Each Yoga is 13.333 degrees
    const yogaNumber = Math.floor(sum / 13.333333) + 1;
    const yogaProgress = (sum % 13.333333) / 13.333333 * 100;

    const yogaData = getYogaData(yogaNumber);
    const nextYogaData = getYogaData(yogaNumber === 27 ? 1 : yogaNumber + 1);

    return {
        number: yogaNumber,
        name: yogaData.name,
        transliteration: yogaData.transliteration,
        progress: yogaProgress,
        nextYoga: nextYogaData,
        auspicious: yogaData.auspicious
    };
}

/**
 * Get Yoga data by number (1-27)
 */
function getYogaData(number) {
    const yogas = [
        { num: 1, name: 'विष्कुम्भ', transliteration: 'Vishkumbha', auspicious: false },
        { num: 2, name: 'प्रीति', transliteration: 'Preeti', auspicious: true },
        { num: 3, name: 'आयुष्मान', transliteration: 'Ayushman', auspicious: true },
        { num: 4, name: 'सौभाग्य', transliteration: 'Saubhagya', auspicious: true },
        { num: 5, name: 'शोभन', transliteration: 'Shobhana', auspicious: true },
        { num: 6, name: 'अतिगण्ड', transliteration: 'Atiganda', auspicious: false },
        { num: 7, name: 'सुकर्मा', transliteration: 'Sukarma', auspicious: true },
        { num: 8, name: 'धृति', transliteration: 'Dhriti', auspicious: true },
        { num: 9, name: 'शूल', transliteration: 'Shula', auspicious: false },
        { num: 10, name: 'गण्ड', transliteration: 'Ganda', auspicious: false },
        { num: 11, name: 'वृद्धि', transliteration: 'Vriddhi', auspicious: true },
        { num: 12, name: 'ध्रुव', transliteration: 'Dhruva', auspicious: true },
        { num: 13, name: 'व्याघात', transliteration: 'Vyaghata', auspicious: false },
        { num: 14, name: 'हर्षण', transliteration: 'Harshana', auspicious: true },
        { num: 15, name: 'वज्र', transliteration: 'Vajra', auspicious: false },
        { num: 16, name: 'सिद्धि', transliteration: 'Siddhi', auspicious: true },
        { num: 17, name: 'व्यतीपात', transliteration: 'Vyatipata', auspicious: false },
        { num: 18, name: 'वरीयान', transliteration: 'Variyan', auspicious: true },
        { num: 19, name: 'परिघ', transliteration: 'Parigha', auspicious: false },
        { num: 20, name: 'शिव', transliteration: 'Shiva', auspicious: true },
        { num: 21, name: 'सिद्ध', transliteration: 'Siddha', auspicious: true },
        { num: 22, name: 'साध्य', transliteration: 'Sadhya', auspicious: true },
        { num: 23, name: 'शुभ', transliteration: 'Shubha', auspicious: true },
        { num: 24, name: 'शुक्ल', transliteration: 'Shukla', auspicious: true },
        { num: 25, name: 'ब्रह्म', transliteration: 'Brahma', auspicious: true },
        { num: 26, name: 'इन्द्र', transliteration: 'Indra', auspicious: true },
        { num: 27, name: 'वैधृति', transliteration: 'Vaidhriti', auspicious: false }
    ];

    return yogas[number - 1] || yogas[0];
}

/**
 * Calculate Karana
 * Half of a Tithi
 * 11 Karanas in repeating pattern
 */
function calculateKarana(date) {
    const tithi = calculateTithi(date);

    // Each Tithi has 2 Karanas
    const karanaIndex = ((tithi.number - 1) * 2 + (tithi.progress > 50 ? 1 : 0)) % 60;

    const karanaData = getKaranaData(karanaIndex);
    const nextKaranaIndex = (karanaIndex + 1) % 60;
    const nextKaranaData = getKaranaData(nextKaranaIndex);

    return {
        current: karanaData,
        next: nextKaranaData,
        progress: (tithi.progress % 50) * 2 // Convert tithi progress to karana progress
    };
}

/**
 * Get Karana data by index
 */
function getKaranaData(index) {
    // 4 fixed Karanas
    const fixedKaranas = [
        { name: 'किंस्तुघ्न', transliteration: 'Kimstughna', type: 'Fixed', auspicious: false },  // Index 0
        { name: 'शकुनि', transliteration: 'Shakuni', type: 'Fixed', auspicious: false },           // Index 57
        { name: 'चतुष्पाद', transliteration: 'Chatushpada', type: 'Fixed', auspicious: false },    // Index 58
        { name: 'नाग', transliteration: 'Naga', type: 'Fixed', auspicious: false }                // Index 59
    ];

    // 7 repeating Karanas (for indices 1-56)
    const repeatingKaranas = [
        { name: 'बव', transliteration: 'Bava', type: 'Movable', auspicious: true },
        { name: 'बालव', transliteration: 'Balava', type: 'Movable', auspicious: true },
        { name: 'कौलव', transliteration: 'Kaulava', type: 'Movable', auspicious: true },
        { name: 'तैतिल', transliteration: 'Taitila', type: 'Movable', auspicious: true },
        { name: 'गर', transliteration: 'Gara', type: 'Movable', auspicious: false },
        { name: 'वणिज', transliteration: 'Vanija', type: 'Movable', auspicious: true },
        { name: 'विष्टि', transliteration: 'Vishti', type: 'Movable', auspicious: false }
    ];

    // Index 0: First Kimstughna (2nd half of Amavasya)
    if (index === 0) {
        return fixedKaranas[0];
    }

    // Indices 1-56: Repeating pattern of 7 Karanas (8 complete cycles)
    if (index >= 1 && index <= 56) {
        return repeatingKaranas[(index - 1) % 7];
    }

    // Indices 57-59: Last 3 fixed Karanas (end of month)
    if (index >= 57 && index <= 59) {
        return fixedKaranas[index - 56];
    }

    // Fallback (should not reach here if index is in 0-59 range)
    return fixedKaranas[0];
}
