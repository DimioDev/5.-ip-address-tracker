document.getElementById('btn').addEventListener('click', fetchInfo);

var mymap = L.map('mapid').setView([51.505, -0.09], 13);;

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    
}).addTo(mymap);

function fetchInfo() {
  const userInput = document.getElementById('input').value;

  queryToggle = 'ipAddress'
  if(checkInput(userInput)== 1){
    queryToggle = 'domain'
  }
  const apiUrl = 'https://geo.ipify.org/api/v1';
  const apiKey = 'at_46IxOEOjlpwPHzvXcR18GzdKQZDAR';

  const xhr = new XMLHttpRequest();

  xhr.open('GET', `${apiUrl}?apiKey=${apiKey}&${queryToggle}=${userInput}`, true);

  xhr.onload = function(){
    if(this.status === 200) {
      
      const locationData = parseResponse(this.responseText);
      resolveData(locationData);
    }
  }

 xhr.send();
}

function checkInput(userInput){
  const regexIP = '^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$';
  if(userInput.match(regexIP) != null) {
    return 0; // if IP address
  } 
  return 1; // if domain input, or email
}

function parseResponse(responseText){
  return JSON.parse(responseText);  
}


function resolveData(locationData){
  document.getElementById('resolve-ip').innerHTML=locationData.ip;
  const locationOutput = `${locationData.location.city}, ${locationData.location.region}<br>${locationData.location.postalCode}`; 
  document.getElementById('resolve-location').innerHTML=locationOutput;
  document.getElementById('resolve-timezone').innerHTML=locationData.location.timezone;
  document.getElementById('resolve-isp').innerHTML=locationData.isp;
  L.marker([locationData.location.lat,locationData.location.lng]).addTo(mymap);
  mymap.setView([locationData.location.lat,locationData.location.lng], 13);
}