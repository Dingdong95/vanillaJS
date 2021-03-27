const weather = document.querySelector(".js-weather")

const API_KEY="8069bd694edfeda442437e2115781522";
const COORDS = 'coords';

function getWeather(lat,lng){
    fetch(`api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_kEY}&units=metrics`)
    .then(function(response) {
    return response.json()    
    })
    .then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`
    })
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude: latitude,
        longitude: longitude
        //혹은 이렇게 작성가능 in case key랑 value랑 같으면 (위처럼)
        //latitude,
        //longitude 
    };
    saveCoords();
    getWeather(latitude,longitutde);
}

function handleGeoError(){
    console.log('cant access geo location')
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}


function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }else{
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitutde);
    }
}


function init(){
    loadCoords();
}

init();