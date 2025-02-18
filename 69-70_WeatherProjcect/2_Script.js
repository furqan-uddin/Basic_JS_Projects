document.addEventListener("DOMContentLoaded",function(){
    const cityInput = document.getElementById("city-input");  
    const getWeatherBtn = document.getElementById("get-weather-btn");

    const weatherInfo = document.getElementById("weather-info");  
    const cityNameDisplay = document.getElementById("city-name");  
    const tempDisplay = document.getElementById("temperature");  
    const descriptionDisplay = document.getElementById("description");  
    
    const error = document.getElementById("error-message");  

    const API_KEY ="7c95ade599f65f4eeaffd30cd70a9bb6";
    
    getWeatherBtn.addEventListener("click",async function(){
        const cityName = cityInput.value.trim();
        cityInput.value = "";

        if(!cityName)   return;//since empty string is considered as false or 0

        //when you call another server or database remember 2 things
        //1 - it may throw error , 2 - server is in another region so it may take time
        try{
            const data =await fetchWeatherData(cityName);
            displayWeatherData(data);
        }catch(error){
            showError();
        }
    });
    async function fetchWeatherData(cityName){

        const url =`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`;

        const response = await fetch(url)
        console.log("response",response)
        console.log(typeof response);

        if(!response.ok){
            showError();
        }
        const fetchedData = response.json();
        return fetchedData;
    }

    function displayWeatherData(data){
        console.log("in",data);
        console.log(typeof data);

        const { name, main, weather} = data;
        cityNameDisplay.textContent = name;
        tempDisplay.textContent = `Temperature : ${main.temp}`;
        descriptionDisplay.textContent = `Description : ${weather[0].description}`;

        weatherInfo.classList.remove("hidden");
        error.classList.add("hidden");
    }

    function showError(){
        error.classList.remove("hidden");
        weatherInfo.classList.add("hidden");
    }

})