const apiKey = "389d02a0107cfd72aac99fdb4573095e";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");
const reloadBtn = document.querySelector("#reload");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const umidityElement = document.querySelector("#umidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");

const errorMessageContainer = document.querySelector("#error-message");
const loader = document.querySelector("#loader");
const footer = document.querySelector("footer")

const reloaderContainer = document.querySelector("#reloader");

const toggleLoader = () => {
  loader.classList.toggle("hide");
};

const getWeatherData = async (city) => {
  toggleLoader();

  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

  const res = await fetch(apiWeatherURL);
  const data = await res.json();

  toggleLoader();

  return data;
};

const showErrorMessage = () => {
  errorMessageContainer.classList.remove("hide");
};

const hideInformation = () => {
  errorMessageContainer.classList.add("hide");
  weatherContainer.classList.add("hide");
};

const showWeatherData = async (city) => {
  hideInformation();
  const data = await getWeatherData(city);
  if (data.cod === "404") {
    showErrorMessage();
    return;
  }
  cityElement.innerText = data.name;
  tempElement.innerText = parseInt(data.main.temp);
  descElement.innerText = data.weather[0].description;
  weatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
  );
  umidityElement.innerText = `${data.main.humidity}%`;
  windElement.innerText = `${data.wind.speed}km/h`;

  weatherContainer.classList.remove("hide");
  reloaderContainer.classList.remove("hide");
};

searchBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const city = cityInput.value;
  showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    const city = e.target.value;
    showWeatherData(city);
  }
});

reloadBtn.addEventListener("click", (e) => {
  e.preventDefault();

  errorMessageContainer.classList.add("hide");
  weatherContainer.classList.add("hide");
  reloaderContainer.classList.add("hide");
});


document.querySelector('.about-us-btns').addEventListener("click", ()=> {
  toogleFooterOnOff()
});

function toogleFooterOnOff(){

  if (document.querySelector("footer").offsetHeight === 50){
    footer.style.height = "490px";
    document.querySelector(".down-content").style.display = "flex";
    document.querySelector(".up-content").style.display = "none"
    document.querySelector(".up-content").style.opacity = "0"


    document.querySelector(".about-us-text").style.opacity = "1";
    document.querySelector(".about-us-text").style.display = "flex";
  } else {
    footer.style.height = "50px";
    document.querySelector(".down-content").style.display = "none";
    document.querySelector(".up-content").style.display = "flex"
    document.querySelector(".up-content").style.opacity = "1"

    document.querySelector(".about-us-text").style.opacity = "0";
    document.querySelector(".about-us-text").style.display = "none";

  }
}