// ============================================
// Festivals Module
// Indian Festivals and Utsavas
// ============================================

// Embedded festivals data with multilingual names
let festivalsData = [
    {
        "id": 1,
        "name": "Pongal",
        "names": {
            "sanskrit": "मकर संक्रान्तिः",
            "tamil": "பொங்கல்",
            "kannada": "ಪೊಂಗಲ್",
            "telugu": "పొంగల్",
            "malayalam": "പൊങ്കൽ",
            "english": "Pongal"
        },
        "date": "2026-01-15",
        "type": "harvest",
        "regions": ["Tamil Nadu", "Karnataka"],
        "description": "Tamil harvest festival celebrating the Sun God"
    },
    {
        "id": 2,
        "name": "Makar Sankranti",
        "names": {
            "sanskrit": "मकर संक्रान्तिः",
            "tamil": "தை பொங்கல்",
            "kannada": "ಮಕರ ಸಂಕ್ರಾಂತಿ",
            "telugu": "మకర సంక్రాంతి",
            "malayalam": "മകര സംക്രാന്തി",
            "english": "Makar Sankranti"
        },
        "date": "2026-01-15",
        "type": "astronomical",
        "regions": ["Maharashtra", "Karnataka", "Uttar Pradesh", "Delhi"],
        "description": "Festival marking the sun's transit into Capricorn"
    },
    {
        "id": 3,
        "name": "Thaipusam",
        "names": {
            "sanskrit": "थाईपुसम्",
            "tamil": "தைப்பூசம்",
            "kannada": "ತೈಪೂಸಂ",
            "telugu": "తైపూసం",
            "malayalam": "തൈപ്പൂസം",
            "english": "Thaipusam"
        },
        "date": "2026-02-01",
        "type": "religious",
        "regions": ["Tamil Nadu"],
        "description": "Festival dedicated to Lord Murugan"
    },
    {
        "id": 4,
        "name": "Maha Shivaratri",
        "names": {
            "sanskrit": "महाशिवरात्रिः",
            "tamil": "மகா சிவராத்திரி",
            "kannada": "ಮಹಾ ಶಿವರಾತ್ರಿ",
            "telugu": "మహా శివరాత్రి",
            "malayalam": "മഹാ ശിവരാത്രി",
            "english": "Maha Shivaratri"
        },
        "date": "2026-02-17",
        "type": "religious",
        "regions": ["all"],
        "description": "Great night of Lord Shiva"
    },
    {
        "id": 5,
        "name": "Holi",
        "names": {
            "sanskrit": "होली",
            "tamil": "ஹோலி",
            "kannada": "ಹೋಳಿ",
            "telugu": "హోలీ",
            "malayalam": "ഹോളി",
            "english": "Holi"
        },
        "date": "2026-03-06",
        "type": "religious",
        "regions": ["all"],
        "description": "Festival of colors"
    },
    {
        "id": 6,
        "name": "Ugadi",
        "names": {
            "sanskrit": "युगादिः",
            "tamil": "யுகாதி",
            "kannada": "ಯುಗಾದಿ",
            "telugu": "ఉగాది",
            "malayalam": "യുഗാദി",
            "english": "Ugadi"
        },
        "date": "2026-03-22",
        "type": "new_year",
        "regions": ["Karnataka"],
        "description": "Kannada and Telugu New Year"
    },
    {
        "id": 7,
        "name": "Tamil New Year",
        "names": {
            "sanskrit": "तमिळनववर्षः",
            "tamil": "தமிழ் புத்தாண்டு",
            "kannada": "ತಮಿಳು ಹೊಸ ವರ್ಷ",
            "telugu": "తమిళ నూతన సంవత్సరం",
            "malayalam": "തമിഴ് പുതുവത്സരം",
            "english": "Tamil New Year"
        },
        "date": "2026-04-14",
        "type": "new_year",
        "regions": ["Tamil Nadu"],
        "description": "Tamil New Year - Puthandu"
    },
    {
        "id": 8,
        "name": "Ram Navami",
        "names": {
            "sanskrit": "रामनवमी",
            "tamil": "ராம நவமி",
            "kannada": "ರಾಮ ನವಮಿ",
            "telugu": "రామ నవమి",
            "malayalam": "രാമ നവമി",
            "english": "Ram Navami"
        },
        "date": "2026-04-18",
        "type": "religious",
        "regions": ["all"],
        "description": "Birthday of Lord Rama"
    },
    {
        "id": 9,
        "name": "Akshaya Tritiya",
        "names": {
            "sanskrit": "अक्षयतृतीया",
            "tamil": "அட்சய திருதியை",
            "kannada": "ಅಕ್ಷಯ ತೃತೀಯ",
            "telugu": "అక్షయ తృతీయ",
            "malayalam": "അക്ഷയ തൃതീയ",
            "english": "Akshaya Tritiya"
        },
        "date": "2026-04-30",
        "type": "auspicious",
        "regions": ["all"],
        "description": "One of the most auspicious days in Hindu calendar"
    },
    {
        "id": 10,
        "name": "Buddha Purnima",
        "names": {
            "sanskrit": "बुद्धपूर्णिमा",
            "tamil": "புத்த பௌர்ணமி",
            "kannada": "ಬುದ್ಧ ಪೂರ್ಣಿಮೆ",
            "telugu": "బుద్ధ పౌర్ణమి",
            "malayalam": "ബുദ്ധ പൗർണമി",
            "english": "Buddha Purnima"
        },
        "date": "2026-05-16",
        "type": "religious",
        "regions": ["all"],
        "description": "Birthday of Gautama Buddha"
    },
    {
        "id": 11,
        "name": "Jagannath Rath Yatra",
        "names": {
            "sanskrit": "जगन्नाथरथयात्रा",
            "tamil": "ஜகந்நாத ரதயாத்திரை",
            "kannada": "ಜಗನ್ನಾಥ ರಥ ಯಾತ್ರೆ",
            "telugu": "జగన్నాథ రథయాత్ర",
            "malayalam": "ജഗന്നാഥ രഥയാത്ര",
            "english": "Jagannath Rath Yatra"
        },
        "date": "2026-06-20",
        "type": "religious",
        "regions": ["all"],
        "description": "Chariot festival of Lord Jagannath"
    },
    {
        "id": 12,
        "name": "Guru Purnima",
        "names": {
            "sanskrit": "गुरुपूर्णिमा",
            "tamil": "குரு பௌர்ணமி",
            "kannada": "ಗುರು ಪೂರ್ಣಿಮೆ",
            "telugu": "గురు పౌర్ణమి",
            "malayalam": "ഗുരു പൗർണമി",
            "english": "Guru Purnima"
        },
        "date": "2026-07-15",
        "type": "religious",
        "regions": ["all"],
        "description": "Day to honor spiritual and academic teachers"
    },
    {
        "id": 13,
        "name": "Nag Panchami",
        "names": {
            "sanskrit": "नागपञ्चमी",
            "tamil": "நாக பஞ்சமி",
            "kannada": "ನಾಗ ಪಂಚಮಿ",
            "telugu": "నాగ పంచమి",
            "malayalam": "നാഗ പഞ്ചമി",
            "english": "Nag Panchami"
        },
        "date": "2026-07-21",
        "type": "religious",
        "regions": ["all"],
        "description": "Festival dedicated to serpent deities"
    },
    {
        "id": 14,
        "name": "Raksha Bandhan",
        "names": {
            "sanskrit": "रक्षाबन्धनम्",
            "tamil": "ரட்ச பந்தன்",
            "kannada": "ರಕ್ಷಾ ಬಂಧನ",
            "telugu": "రక్షా బంధన్",
            "malayalam": "രക്ഷാ ബന്ധൻ",
            "english": "Raksha Bandhan"
        },
        "date": "2026-08-09",
        "type": "social",
        "regions": ["all"],
        "description": "Festival celebrating brother-sister bond"
    },
    {
        "id": 15,
        "name": "Krishna Janmashtami",
        "names": {
            "sanskrit": "कृष्णजन्माष्टमी",
            "tamil": "கிருஷ்ண ஜெயந்தி",
            "kannada": "ಕೃಷ್ಣ ಜನ್ಮಾಷ್ಟಮಿ",
            "telugu": "కృష్ణ జన్మాష్టమి",
            "malayalam": "കൃഷ്ണ ജന്മാഷ്ടമി",
            "english": "Krishna Janmashtami"
        },
        "date": "2026-08-15",
        "type": "religious",
        "regions": ["all"],
        "description": "Birthday of Lord Krishna"
    },
    {
        "id": 16,
        "name": "Ganesh Chaturthi",
        "names": {
            "sanskrit": "गणेशचतुर्थी",
            "tamil": "விநாயக சதுர்த்தி",
            "kannada": "ಗಣೇಶ ಚತುರ್ಥಿ",
            "telugu": "వినాయక చవితి",
            "malayalam": "വിനായക ചതുർത്ഥി",
            "english": "Ganesh Chaturthi"
        },
        "date": "2026-08-25",
        "type": "religious",
        "regions": ["Maharashtra", "Karnataka", "all"],
        "description": "Birthday of Lord Ganesha"
    },
    {
        "id": 17,
        "name": "Onam",
        "names": {
            "sanskrit": "ओणम्",
            "tamil": "ஓணம்",
            "kannada": "ಓಣಂ",
            "telugu": "ఓణం",
            "malayalam": "ഓണം",
            "english": "Onam"
        },
        "date": "2026-09-05",
        "type": "harvest",
        "regions": ["Karnataka"],
        "description": "Harvest festival of Kerala"
    },
    {
        "id": 18,
        "name": "Navratri",
        "names": {
            "sanskrit": "नवरात्रिः",
            "tamil": "நவராத்திரி",
            "kannada": "ನವರಾತ್ರಿ",
            "telugu": "నవరాత్రి",
            "malayalam": "നവരാത്രി",
            "english": "Navratri (Sharad)"
        },
        "date": "2026-10-13",
        "type": "religious",
        "regions": ["all"],
        "description": "Nine nights of Goddess Durga worship"
    },
    {
        "id": 19,
        "name": "Dussehra",
        "names": {
            "sanskrit": "विजयदशमी",
            "tamil": "விஜயதசமி",
            "kannada": "ದಸರಾ",
            "telugu": "విజయదశమి",
            "malayalam": "വിജയദശമി",
            "english": "Dussehra"
        },
        "date": "2026-10-22",
        "type": "religious",
        "regions": ["all"],
        "description": "Victory of good over evil"
    },
    {
        "id": 20,
        "name": "Diwali",
        "names": {
            "sanskrit": "दीपावली",
            "tamil": "தீபாவளி",
            "kannada": "ದೀಪಾವಳಿ",
            "telugu": "దీపావళి",
            "malayalam": "ദീപാവലി",
            "english": "Diwali"
        },
        "date": "2026-11-11",
        "type": "religious",
        "regions": ["all"],
        "description": "Festival of lights"
    },
    {
        "id": 21,
        "name": "Karthigai Deepam",
        "names": {
            "sanskrit": "कार्तिकदीपम्",
            "tamil": "கார்த்திகை தீபம்",
            "kannada": "ಕಾರ್ತಿಕ ದೀಪ",
            "telugu": "కార్తీక దీపం",
            "malayalam": "കാർത്തിക ദീപം",
            "english": "Karthigai Deepam"
        },
        "date": "2026-11-28",
        "type": "religious",
        "regions": ["Tamil Nadu"],
        "description": "Festival of lamps in Tamil Nadu"
    },
    {
        "id": 22,
        "name": "Thiruvadirai",
        "names": {
            "sanskrit": "आर्द्रादर्शनम्",
            "tamil": "திருவாதிரை",
            "kannada": "ತಿರುವಾದಿರೈ",
            "telugu": "తిరువాదిరై",
            "malayalam": "തിരുവാതിര",
            "english": "Thiruvadirai"
        },
        "date": "2026-12-29",
        "type": "religious",
        "regions": ["Tamil Nadu"],
        "description": "Festival dedicated to Lord Shiva"
    }
];

/**
 * Load festivals data (legacy function - data is now embedded)
 */
async function loadFestivalsData() {
    // Data is already embedded above, so just log
    console.log('Festivals data loaded:', festivalsData.length, 'festivals');
    return Promise.resolve();
}

/**
 * Get upcoming festivals for a specific region
 * @param {String} state - State name (e.g., "Tamil Nadu", "Karnataka")
 * @param {Date} fromDate - Start date
 * @param {Number} daysLimit - Number of days to look ahead (default 7)
 */
function getUpcomingFestivals(state, fromDate, daysLimit = 7) {
    const currentDate = new Date(fromDate);
    currentDate.setHours(0, 0, 0, 0);

    // Calculate end date (108 days from current date)
    const endDate = new Date(currentDate);
    endDate.setDate(endDate.getDate() + daysLimit);

    // Filter festivals for the region and date range
    const filtered = festivalsData.filter(festival => {
        const festivalDate = new Date(festival.date);
        festivalDate.setHours(0, 0, 0, 0);

        // Check if festival is within the date range
        if (festivalDate < currentDate || festivalDate > endDate) {
            return false;
        }

        // Check if festival is for this region or all regions
        if (festival.regions.includes('all') || festival.regions.includes(state)) {
            return true;
        }

        return false;
    });

    // Sort by date
    filtered.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Return all festivals within the date range
    return filtered;
}

/**
 * Calculate days until festival
 */
function getDaysUntil(festivalDate, currentDate) {
    const fDate = new Date(festivalDate);
    const cDate = new Date(currentDate);
    fDate.setHours(0, 0, 0, 0);
    cDate.setHours(0, 0, 0, 0);

    const diffTime = fDate - cDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
}

/**
 * Format festival date for display
 */
function formatFestivalDate(dateString) {
    const date = new Date(dateString);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-IN', options);
}

/**
 * Get festival type icon
 */
function getFestivalIcon(type) {
    const icons = {
        'harvest': '🌾',
        'astronomical': '☀️',
        'religious': '🕉️',
        'new_year': '🎊',
        'auspicious': '✨',
        'social': '🎉'
    };
    return icons[type] || '🎈';
}

/**
 * Get festival type label
 */
function getFestivalTypeLabel(type) {
    const labels = {
        'harvest': 'Harvest',
        'astronomical': 'Astronomical',
        'religious': 'Religious',
        'new_year': 'New Year',
        'auspicious': 'Auspicious',
        'social': 'Social'
    };
    return labels[type] || 'Festival';
}
