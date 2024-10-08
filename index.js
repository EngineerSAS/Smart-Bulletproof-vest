// Initializing
let map;
let marker;
let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let buttonmenu = document.getElementsByClassName('buttonmenu')[0];
let leftcontainer = document.getElementsByClassName('left-container')[0];
let menutab = document.getElementsByClassName('menutab')[0];
let leftdown = document.getElementsByClassName('leftdown')[0];
let rightright = document.getElementsByClassName('rightright')[0];
let homehome = document.getElementsByClassName('homehome')[0];
let dashboard = document.getElementById('dashboard');
let home = document.getElementById('home');
const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStop');
const resetBtn = document.getElementById('reset');
let stopwatch = document.getElementsByClassName('stopwatch')[0];



function initMap() {
    const initialPosition = { lat: 10.608372507941848, lng: 7.439084209017522 }; // Example of cordinate of AFIT coordinates 10.608372507941848, 7.439084209017522 

    // Creating the map and centering it on the initial position
    map = new google.maps.Map(document.getElementById('map'), {
        center: initialPosition,
        zoom: 10
    });

    // Creating a marker for the initial position
    marker = new google.maps.Marker({
        position: initialPosition,
        map: map,
        icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
    });
   
}


// Function to simulate receiving real-time data updates
function fetchRealTimeData() {
    // Simulated new data (replacing with actual data retrieval logic)
    const newLat = 10.608372507941848 + Math.random() * 0.01; // Randomized latitude for simulation
    const newLng = 7.439084209017522 + Math.random() * 0.01; // Randomized longitude for simulation

    // Updating marker position
    const newPosition = new google.maps.LatLng(newLat, newLng);
    marker.setPosition(newPosition);

    // Adding an alert if the position changes significantly (simulated impact)
    const impactDetected = Math.random() > 0.8; // Simulated condition
    if (impactDetected) {
        addAlert(`Impact detected at (${newLat.toFixed(4)}, ${newLng.toFixed(4)})`);
        marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png'); // Changing marker color on impact
        
    }
}

// Function to add an alert to the alert list
function addAlert(message) {
    const alertList = document.getElementById('alert-list');
    const alertItem = document.createElement('li');
    alertItem.className = 'alert-item';
    alertItem.textContent = message;
    alertList.appendChild(alertItem);
    alertList.className= 'alertList';
}
// Get the canvas and context
const canvas = document.getElementById('waveform');
const ctx = canvas.getContext('2d');

// Variables for the wave signal
let waveX = 0;
let waveY = canvas.height / 2;
let waveSpeed = 2; // Speed of the waveform
let amplitude = 20; // Amplitude of the wave
let frequency = 0.05; // Frequency of the wave

// Function to simulate heart rate data
function fetchHeartRateData() {
    // Simulating a heart rate reading (between 60 and 100 bpm)
    const heartRate = Math.floor(Math.random() * (100 - 60 + 1)) + 60;

    // Updating the heart rate on the page
    document.getElementById('heart-rate').textContent = heartRate + ' bpm';

    // Updating the heart rate status based on the reading
    if (heartRate < 60 || heartRate > 100) {
        document.getElementById('heart-status').textContent = 'Abnormal heart rate detected';
        document.getElementById('heart-status').style.color = '#f44336'; // Red for abnormal
    } else {
        document.getElementById('heart-status').textContent = 'Heart rate normal';
        document.getElementById('heart-status').style.color = '#4caf50'; // Green for normal
    }

    // Adjusting wave frequency based on heart rate
    frequency = heartRate / 1000; // Adjust frequency with heart rate
}

// Function to draw the heart rate waveform
function drawWave() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.moveTo(0, waveY);

    // Drawing the waveform with a professional look
    for (let x = 0; x < canvas.width; x++) {
        const y = waveY + amplitude * Math.sin(frequency * (x + waveX));
        ctx.lineTo(x, y);
    }

    ctx.strokeStyle = '#00ff00'; // Neon green for the wave
    ctx.lineWidth = 3; // Thicker line for a professional look
    ctx.stroke();

    // Moving the wave
    waveX += waveSpeed;
    if (waveX > canvas.width) {
        waveX = 0;
    }
}

// Simulating receiving heart rate data every 5 seconds
setInterval(fetchHeartRateData, 5000);

// Animating the waveform continuously
function animateWave() {
    drawWave();
    requestAnimationFrame(animateWave);
}
animateWave();

// Loading initial data
fetchHeartRateData();

// Simulating real-time data updates every 5 seconds
setInterval(fetchRealTimeData, 5000);

// Loading the map when the window loads
window.onload = initMap;

buttonmenu.addEventListener("click", () => {
    if (leftcontainer.style.display === "none") {
        leftcontainer.style.display = "block";
        menutab.style.display = "none";
    } else {
        leftcontainer.style.display = "none";
        menutab.style.display = "block";
    } 
});
dashboard.addEventListener("click", () =>{
    rightright.style.display = "block";
    homehome.style.display = "none";
    // leftdown.style.display = "block";
    // leftdown.style.flexDirection = "row";
    menutab.style.display = "none";
    leftcontainer.style.display = "block";
    leftdown.style.display = "flex";
    leftdown.style.flexDirection = "row";  
    leftdown.style.justifyContent = "space-around";  
    leftdown.style.alignItems = "center"; 
    stopwatch.style.display = "block";


});
home.addEventListener("click", () => {
    rightright.style.display = "none";
    homehome.style.display = "block";
    stopwatch.style.display = "block";
    menutab.style.display = "block";
    leftcontainer.style.display = "none";
    leftdown.style.display = "none"
})
function startStopwatch() {
    if (!running) {
        running = true;
        startTime = new Date().getTime();
        tInterval = setInterval(updateTime, 1);
        startStopBtn.textContent = 'Stop';
    } else {
        running = false;
        clearInterval(tInterval);
        startStopBtn.textContent = 'Start';
    }
}

function resetStopwatch() {
    running = false;
    clearInterval(tInterval);
    display.textContent = '00:00:00';
    startStopBtn.textContent = 'Start';
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    display.textContent = 
        (hours < 10 ? '0' : '') + hours + ':' + 
        (minutes < 10 ? '0' : '') + minutes + ':' + 
        (seconds < 10 ? '0' : '') + seconds;
}

startStopBtn.addEventListener('click', startStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
