const cityName = document.getElementById("name");
const temp = document.querySelector("#temp");
const feel = document.querySelector("#feel");
const condition = document.querySelector(".weather");
const desc = document.getElementById("desc");
const pressure = document.getElementById("pressure");
const humidity = document.getElementById("humid");
const gust = document.getElementById("gust");
const wspeed = document.getElementById("wspeed");
const search = document.querySelector("input[type='search']");
const settings = document.querySelector(".settings i");
const box = document.querySelector(".box");
const boxItems = document.querySelectorAll(".box > div");

async function getWeather(keyword){
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${keyword}/today?unitGroup=metric&key=4YAG9WWBRSJKSX9AABJ9CE4MH&contentType=json`);
    if(response.ok){
        const data = await response.json();
        updateInfo(data);
        console.log(data);
        console.log(data.days[0].temp);
        console.log(data.days[0].conditions);
        console.log(data.days[0].feelslike);
        console.log(data.days[0].description);
        console.log(data.days[0].humidity);
        console.log(data.days[0].windgust);
        console.log(data.days[0].windspeed);
    }
}

function updateInfo(data){
    cityName.textContent = data.address;
    temp.textContent = data.days[0].temp;
    feel.textContent = data.days[0].feelslike;
    condition.textContent = data.days[0].conditions;
    desc.textContent = data.days[0].description;
    pressure.textContent = data.days[0].pressure;
    humidity.textContent = data.days[0].humidity;
    gust.textContent = data.days[0].windgust;
    wspeed.textContent = data.days[0].windspeed;
}

search.addEventListener("search", () => {
    getWeather(search.value);
});


settings.addEventListener("click", () => {
    if(box.classList.contains("active")){
        box.classList.remove("active");
        boxItems.forEach(box => {
            box.classList.remove("active");
        })
    }else{
        box.classList.add("active");
        boxItems.forEach(boxI => {
            boxI.classList.add("active");
        });
    }
})