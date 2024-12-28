const body = document.body;
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
const err = document.querySelector(".error");
const loader = document.querySelector(".fetch");
const close = document.querySelector(".close i");
const dt = document.querySelector("span.dt");
const time = document.querySelector(".time");



window.addEventListener("load", () => {
    let d = new Date();
    dt.textContent = d.toDateString();
    time.textContent = d.toLocaleTimeString();
    setInterval(() => {
        time.textContent = new Date().toLocaleTimeString();
    }, 1000);
});

async function getWeather(keyword){
    if(document.querySelectorAll(".error.active").length !== 0){
        err.classList.remove("active");
    }

    loader.classList.add("active");
    try{
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${keyword}/today?unitGroup=metric&key=4YAG9WWBRSJKSX9AABJ9CE4MH&contentType=json`);
        if(response.ok){
            const data = await response.json();
            updateInfo(data);
            loader.classList.remove("active");
            console.log(data);
            console.log(data.days[0].temp);
            console.log(data.days[0].conditions);
            console.log(data.days[0].feelslike);
            console.log(data.days[0].description);
            console.log(data.days[0].humidity);
            console.log(data.days[0].windgust);
            console.log(data.days[0].windspeed);
        }else{
            throw new Error("error");
        }
    }catch(error){
        if (document.querySelectorAll(".fetch.active").length !== 0) {
          loader.classList.remove("active");
        }
        err.classList.add("active");
    }
}

function updateInfo(data){
    cityName.textContent = data.address;
    temp.textContent = data.days[0].temp;
    feel.textContent = data.days[0].feelslike;
    condition.classList.add("active");
    condition.textContent = data.days[0].conditions;
    desc.textContent = data.days[0].description;
    pressure.textContent = data.days[0].pressure;
    humidity.textContent = data.days[0].humidity;
    gust.textContent = data.days[0].windgust;
    wspeed.textContent = data.days[0].windspeed;
}

function updateUI(text){
    let index = Math.floor(Math.random() * 4);
    let imgArr = ["./Img/car-mountain.jpg", "./Img/mountain-two.jpg", "./Img/snowy-tree.jpg"];
    if(text.toLowerCase().includes('cloud')){
        body.style.backgroundImage = "url('./Img/cloud-mountain.jpg')";
    }else if(text.toLowerCase().includes('fog')){
        body.style.backgroundImage = "url('./Img/foggy-road.jpg')";
    }else if(text.toLowerCase().includes('sun')){
        body.style.backgroundImage = "url('./Img/sunny-barn.jpg')";
    }else if(text.toLowerCase().includes('wind')){
        body.style.backgroundImage = "url('./Img/wind-turbine.jpg')";
    }else if(text.toLowerCase().includes('smoke')){
        body.style.backgroundImage = "url('./Img/smoky-mountain.jpg')";
    }else if(text.toLowerCase().includes('clear')){
        body.style.backgroundImage = "url('./Img/hikers.jpg')";
    }else if(text.toLowerCase().includes('rain')){
        body.style.backgroundImage = "url('./Img/dark-road.jpg')";
    }else{
        body.style.backgroundImage = `url(${imgArr[index]})`;
    }
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
});

close.addEventListener("click", () => {
    err.classList.remove("active");
});