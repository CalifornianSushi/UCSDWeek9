const button = document.getElementById("myButton");
button.addEventListener("click", function() {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();
    alert("Current Date and Time: " + formattedDate);
});

document.addEventListener("DOMContentLoaded", () => {
    const weatherButton = document.getElementById("weatherButton");

    weatherButton.addEventListener("click", () => {
        const cityInput = document.getElementById("cityInput");
        const city = cityInput.value.trim();

        if (city) {
            fetchWeather(city);
        } else {
            alert("Please enter a city name.");
        }
    });
});

function fetchWeather(city) {
    const apiKey = "9e6940c22658f3d95527617f75f5cfb6";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            const temperature = data.main.temp;
            const description = data.weather[0].description;

            const weatherInfo = document.getElementById("weatherInfo");
            weatherInfo.textContent = `Weather in ${city}: ${temperature}°C, ${description}`;
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            const weatherInfo = document.getElementById("weatherInfo");
            weatherInfo.textContent = "Couldn't fetch weather data.";
        });
}
