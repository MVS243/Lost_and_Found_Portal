//home page
//text-slideshow
const texts = [
    "Have you lost an item?",
    "Have you found an item?"
  ];
  let textIndex = 0;
  const rotatingText = document.getElementById("rotating-text");

  setInterval(() => {
    textIndex = (textIndex + 1) % texts.length;
    rotatingText.textContent = texts[textIndex];
  }, 4000); // every 4 seconds

  //image-slideshow
const images = ["images/home_image1.jpg",
  "images/home_image2.jpg",
  "images/home_image3.jpg"]; //image paths
    let index = 0;
    const imgElement = document.getElementById("slideshow-image");

    setInterval(() => {
      index = (index + 1) % images.length;
      imgElement.style.opacity = 0;
      setTimeout(() => {
        imgElement.src = images[index];
        imgElement.style.opacity = 1;
      }, 500);
    }, 4000); // every 4 seconds

//dashboard
function reportLost() {
    alert("Redirecting to Report Lost Item form...");
    window.location.href = "lost.html";
}

function viewLost() {
    alert("Redirecting to View Lost Items...");
    //window.location.href = "view-lost.html";
}

function reportFound() {
    alert("Redirecting to Report Found Item form...");
    window.location.href = "found.html";
}

function viewFound() {
    alert("Redirecting to View Lost Items...");
}

//LOST AND FOUND PAGE
const stationsByLine = {
  blue:[
    "Dwarka Sector 21",
    "Dwarka Sector 8",
    "Dwarka Sector 9",
    "Dwarka Sector 10",
    "Dwarka Sector 11",
    "Dwarka Sector 12",
    "Dwarka Sector 13",
    "Dwarka Sector 14",
    "Dwarka",
    "Dwarka Mor",
    "Nawada",
    "Uttam Nagar West",
    "Uttam Nagar East",
    "Janak Puri West",
    "Janak Puri East",
    "Tilak Nagar",
    "Subhash Nagar",
    "Tagore Garden",
    "Rajouri Garden",
    "Ramesh Nagar",
    "Moti Nagar",
    "Kirti Nagar",
    "Shadipur",
    "Patel Nagar",
    "Rajendra Place",
    "Karol Bagh",
    "Jhandewalan",
    "Ramakrishna Ashram Marg",
    "Rajiv Chowk",
    "Barakhamba Road",
    "Mandi House",
    "Supreme Court",
    "Indraprastha",
    "Yamuna Bank",
    "Akshardham",
    "Mayur Vihar-I",
    "Mayur Vihar Extension",
    "New Ashok Nagar",
    "Noida Sector 15",
    "Noida Sector 16",
    "Noida Sector 18",
    "Botanical Garden",
    "Golf Course",
    "Noida City Centre",
    "Noida Sector 34",
    "Noida Sector 52",
    "Noida Sector 61",
    "Noida Electronic City",
    "Laxmi Nagar",
    "Nirman Vihar",
    "Preet Vihar",
    "Karkarduma",
    "Anand Vihar ISBT",
    "Kaushambi",
    "Vaishali"
  ],
  red: [
    "Shaheed Sthal (New Bus Adda)",
    "Hindon River",
    "Arthala",
    "Mohan Nagar",
    "Shahdara",
    "Welcome",
    "East Azad Nagar",
    "Jhilmil",
    "Mansarovar Park",
    "Shastri Park",
    "Kashmere Gate",
    "Tis Hazari",
    "Pul Bangash",
    "Pratap Nagar",
    "Shastri Nagar",
    "Inderlok",
    "Kanhaiya Nagar",
    "Keshav Puram",
    "Netaji Subhash Place",
    "Kohat Enclave",
    "Pitam Pura",
    "Rohini East",
    "Rohini West",
    "Rithala"
  ],
  yellow: [
    "Samaypur Badli",
    "Rohini Sector 18, 19",
    "Haiderpur Badli Mor",
    "Jahangirpuri",
    "Adarsh Nagar",
    "Azadpur",
    "Model Town",
    "GTB Nagar",
    "Vishwavidyalaya (North Campus)",
    "Vidhan Sabha",
    "Civil Lines",
    "Kashmere Gate",
    "Chandni Chowk",
    "Chawri Bazar",
    "New Delhi",
    "Rajiv Chowk",
    "Patel Chowk",
    "Central Secretariat",
    "Udyog Bhawan",
    "Lok Kalyan Marg",
    "Jor Bagh",
    "INA",
    "AIIMS",
    "Green Park",
    "Hauz Khas",
    "Malviya Nagar",
    "Saket",
    "Qutab Minar",
    "Chhatarpur",
    "Sultanpur",
    "Ghitorni",
    "Arjan Garh",
    "Guru Dronacharya",
    "Sikandarpur",
    "MG Road",
    "IFFCO Chowk",
    "HUDA City Centre"
  ],
  pink: [
    "Majlis Park",
    "Azadpur",
    "Shalimar Bagh",
    "Netaji Subhash Place",
    "Shakurpur",
    "Punjabi Bagh West",
    "ESI-Basaidarapur",
    "Rajouri Garden",
    "Mayapuri",
    "Naraina Vihar",
    "Delhi Cantt",
    "Durgabai Deshmukh South Campus",
    "Sir M. Vishweshwaraiah Moti Bagh",
    "Bhikaji Cama Place",
    "Sarojini Nagar",
    "Dilli Haat - INA",
    "South Extension",
    "Lajpat Nagar",
    "Vinobapuri",
    "Ashram",
    "Sarai Kale Khan - Nizamuddin",
    "Mayur Vihar Phase-I",
    "Mayur Vihar PKT-1",
    "Trilokpuri-Sanjay Lake",
    "East Vinod Nagar-Mayur Vihar -II",
    "Mandawali - West Vinod Nagar",
    "I.P. Extension",
    "Anand Vihar I.S.B.T.",
    "Karkarduma Court",
    "Krishna Nagar",
    "East Azad Nagar Welcome",
    "Jafrabad",
    "Maujpur-Babarpur",
    "Gokulpuri",
    "Johri Enclave",
    "Shiv Vihar"
  ],
  violet: ["Kashmere Gate",
  "Lal Quila",
  "Jama Masjid",
  "Delhi Gate",
  "Ito",
  "Mandi House",
  "Janpath",
  "Central Secretariat",
  "Khan Market",
  "JLN Stadium",
  "Jangpura",
  "Lajpat Nagar",
  "Moolchand",
  "Kailash Colony",
  "Nehru Place",
  "Kalkaji Mandir",
  "Govindpuri",
  "Harkesh Nagar Okhla",
  "Jasola-Apollo",
  "Sarita Vihar",
  "Mohan Estate",
  "Tughlaqabad",
  "Badarpur Border",
  "Sarai",
  "NHPC Chowk",
  "Mewala Maharajpur",
  "Sector-28",
  "Badkal Mor",
  "Old Faridabad",
  "Neelam Chowk Ajronda",
  "Bata Chowk",
  "Escorts Mujesar",
  "Sant Surdas (Sihi)",
  "Raja Nahar Singh (Ballabgarh)"
],
  magenta: [
    "Janak Puri West",
    "Dabri Mor - Janak Puri South",
    "Dashrathpuri",
    "Palam",
    "Sadar Bazar Cantonment",
    "Terminal - 1 IGI Airport",
    "Shankar Vihar",
    "Vasant Vihar",
    "Munirka",
    "R.K.Puram",
    "I.I.T",
    "Hauz Khas",
    "Panchsheel Park",
    "Chirag Delhi",
    "Greater Kailash",
    "Nehru Enclave",
    "Kalkaji Mandir",
    "Okhla N.S.I.C",
    "Sukhdev Vihar",
    "Jamia Milia Islamia",
    "Okhla Vihar",
    "Jasola Vihar Shaheen Bagh",
    "Kalindi Kunj",
    "Okhla Bird Sanctuary",
    "Botanical Garden"
  ],
  green: [
    "Kirti Nagar",
    "Satguru Ram Singh Marg",
    "Inder Lok",
    "Ashok Park Main",
    "Punjabi Bagh",
    "Punjabi Bagh West",
    "Shivaji Park",
    "Madipur",
    "Paschim Vihar (East)",
    "Paschim Vihar (West)",
    "Peeragarhi Udyog Nagar",
    "Maharaja Surajmal Stadium",
    "Nangloi",
    "Nangloi Railway Station",
    "Rajdhani Park",
    "Mundka",
    "Mundka Industrial Area",
    "Ghevra",
    "Tikri Kalan",
    "Tikri Border",
    "Pandit Shree Ram Sharma",
    "Bahadurgarh City",
    "Brigadier Hoshiyar Singh"
  ],
  grey: [ "Dwarka",
    "Nangli",
    "Najafgarh",
    "Dhansa Bus Stand"
  ],
  airport: [
    "New Delhi",
    "Shivaji Stadium",
    "Dhaula Kuan",
    "Delhi Aerocity",
    "IGI Airport",
    "Dwarka Sector 21"
  ],
  rapid: ["Sector 55-56",
    "Sector 54 Chowk",
    "Sector 53-54",
    "Sector 42-43",
    "Phase 1",
    "Sikanderpur",
    "Phase 2",
    "Belvedere Towers",
    "Cyber City",
    "Moulsari Avenue",
    "Phase 3"
  ]
};
const lineSelect = document.getElementById('line');
  const stationSelect = document.getElementById('station');
  const form = document.getElementById('foundForm');
  const itemName = document.getElementById("itemName");
  const lineError = document.getElementById("lineError");
  const stationError = document.getElementById("stationError");
  lineSelect.addEventListener('change', () => {
    const selectedLine = lineSelect.value;
    const stations = stationsByLine[selectedLine] || []           
    stationSelect.innerHTML = '<option value="" disabled selected>Select a Station</option>'; // Clear old stations and add new stations
    stations.forEach(station => {
      const option = document.createElement('option');
      option.value = station;
      option.textContent = station;
      stationSelect.appendChild(option);
    });
  });

document.addEventListener('DOMContentLoaded', function() {
  const btn = document.getElementById('actionsDropdownBtn');
  const menu = document.getElementById('actionsDropdownMenu');
  if (btn && menu) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const isOpen = menu.style.display === 'block';
      menu.style.display = isOpen ? 'none' : 'block';
      btn.classList.toggle('open', !isOpen);
    });
    document.addEventListener('click', function(e) {
      if (menu.style.display === 'block') {
        menu.style.display = 'none';
        btn.classList.remove('open');
      }
    });
    menu.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  }
});
function toggleOptions() {
  const panel = document.getElementById("lostfound-optionsPanel");
  panel.style.display = panel.style.display === "block" ? "none" : "block";
}
form.addEventListener("submit", function (e) {
  let isValid = true;

  // Check item name
  const itemNameInput = form.querySelector("input[name='itemName']");
  const itemNameError = document.getElementById("itemNameError");
  if (!itemNameInput.value.trim()) {
    itemNameInput.classList.add("invalid");
    itemNameError.textContent = "Item name is required.";
    itemNameError.style.display = "block";
    isValid = false;
  } else {
    itemNameInput.classList.remove("invalid");
    itemNameError.textContent = "";
    itemNameError.style.display = "none";
  }

  // Check line
  const lineSelect = document.getElementById("line");
  const lineError = document.getElementById("lineError");
  if (!lineSelect.value) {
    lineSelect.classList.add("invalid");
    lineError.textContent = "Please select a line.";
    lineError.style.display = "block";
    isValid = false;
  } else {
    lineSelect.classList.remove("invalid");
    lineError.textContent = "";
    lineError.style.display = "none";
  }

  // Check station
  if (!stationSelect.value) {
    stationSelect.classList.add("invalid");
    stationError.textContent = "Please select a station.";
    stationError.style.display = "block";
    isValid = false;
  } else {
    stationSelect.classList.remove("invalid");
    stationError.textContent = "";
    stationError.style.display = "none";
  }

  // Prevent submission if not valid
  if (!isValid) {
    e.preventDefault();
    const firstInvalid = form.querySelector(".invalid");
    if (firstInvalid) {
      firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }
});

function reportLost() {
  window.location.href = "lost.html";
}

function reportFound() {
  window.location.href = "found.html";
}


function viewLost() {
  window.location.href = "view.html?type=lost";
}

function viewFound() {
  window.location.href = "view.html?type=found";
}
