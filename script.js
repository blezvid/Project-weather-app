document.addEventListener("DOMContentLoaded", () => {
    let date = document.getElementById("date");
    let currentDate = new Date();
    date.textContent = currentDate.toDateString();
});

let searchCity = document.querySelector(".searchBox input")
let searchBtn = document.querySelector(".searchBox button");

async function checkWeather(city) {
    let api = "https://api.openweathermap.org/data/2.5/weather?&appid=b0b162cfa0dd0587c083e24ffee29fb4&units=metric&q=";

    //! TODO: display error msg
    let response = await fetch(api + city);

    if (response.status == 404) {
        document.getElementById("error").style.display = "block";

        console.log(`Status response: ${response.status}, ${response.status.message}`);

    } else {
        document.getElementById("error").style.display = "none";
        document.querySelector(".mainPageImg").style.display = "none";
        document.querySelector(".worldTemp").style.display = "none";

        document.getElementById("weatherInfo").style.display = "block";

        let apiData = await response.json();
        console.log(apiData);
        let displayedCity = document.querySelector(".displayedCity");
        let displayedTemp = document.querySelector(".displayedTemp");

        let weatherIcon = document.querySelector(".weather-icon");

        displayedCity.innerHTML = apiData.name;
        displayedTemp.innerHTML = Math.round(apiData.main.temp) + "°C";

        let cityWeather = apiData.weather[0].description;


        switch (cityWeather) {
            case "clear sky":
                weatherIcon.src = "animation-ready/clear-day.svg";
                break;
            case "few clouds":
                weatherIcon.src = "animation-ready/partly-cloudy-day.svg";
                break;
            case "scattered clouds":
                weatherIcon.src = "animation-ready/cloudy.svg";
                break;
            case "broken clouds":
                weatherIcon.src = "animation-ready/cloudy.svg";
                break;
            case "overcast clouds":
                weatherIcon.src = "animation-ready/overcast.svg";
                break;
            case "rain":
                weatherIcon.src = "animation-ready/partly-cloudy-day-rain.svg";
                break;
            case "shower rain":
                weatherIcon.src = "animation-ready/rain.svg";
                break;
            case "thunderstorm":
                weatherIcon.src = "animation-ready/thunderstorms-day-rain.svg";
                break;
            case "snow":
                weatherIcon.src = "animation-ready/snow.svg";
                break;
            case "mist":
                weatherIcon.src = "animation-ready/mist.svg";
                break;
            default:
                weatherIcon.src = "animation-ready/cloudy.svg";
                break;
        };

    }
};


searchBtn.addEventListener("click", () => {
    checkWeather(searchCity.value);
});

searchCity.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchCity.value);
    };
});