//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
//https://api.openweathermap.org/data/2.5/onecall?lat=48.8534&lon=2.3488&exclude=current,minutely,hourly,alerts&appid=1fa9ff4126d95b8db54f3897a208e91c&units=metric
const weatherapi = {
	key:"835282ba86a36f7e194cf25a643b8a9c",
	baseurl: "https://api.openweathermap.org/data/2.5/"
}
const searchBox = document.getElementById('input-box');

//Event listerener 
searchBox.addEventListener('keypress',(e)=>{
	if(e.keyCode == 13){
      console.log(searchBox.value);
	  getWeatherReport(searchBox.value);
	 document.querySelector('.weather-body').style.display = "block";
	}
});

//By Defalut page 
getWeatherReport('Meerut');
forecast('Meerut');


//Get the weather details

function getWeatherReport(city) {
    fetch(`${weatherapi.baseurl}weather?q=${city}&appid=${weatherapi.key}&units=metric`)
    .then(weather => {
        return weather.json();
    }).then(showWeatherReport);
	forecast(searchBox.value);
}

// Show Weather Report
function showWeatherReport(weather){
    console.log(weather);

	let city =document.getElementById('city')
	city.innerText =`${weather.name},${weather.sys.country}`;

	let temp = document.getElementById('temp')
	temp.innerHTML =`${Math.round(weather.main.temp)}&deg;C`;

	let minMaxTemp = document.getElementById('min-max');
    minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min) / ${Math.ceil(weather.main.temp_max)}&deg;C (max)`;
  
	let weatherType = document.getElementById('weather');
    weatherType.innerText = `${weather.weather[0].description}`;
 
	let img = document.getElementById('img');
	img.src="https://openweathermap.org/img/wn/" + `${weather.weather[0].icon}` + "@2x.png"

    let feel =document.getElementById('feels');
    feel.innerHTML = `${Math.round(weather.main.feels_like)}&deg;C`;

    let humidity =document.getElementById('humid');
    humidity.innerHTML = `${weather.main.humidity}%`;

    let speed =document.getElementById('speed');
    speed.innerHTML = `${weather.wind.speed} m/s`;
	
	let vis = document.getElementById('visibil');
	vis.innerHTML = `${(weather.visibility)/1000} km`;

    let pre = document.getElementById('pressure');
	pre.innerHTML = `${weather.main.pressure} hPa`;

    let wg = document.getElementById('wg');
	wg.innerHTML = `${weather.wind.gust} m/s`;


	let date = document.getElementById('date');
	let todayDate = new Date();
	date.innerText = datemanage(todayDate);
       let weathertype = `${weather.weather[0].main}`;
	if(weathertype == 'Clear') {
        document.body.style.backgroundImage = "url('images/weather/clear.jpg')";
        
    } else if(weathertype == 'Clouds') {

        document.body.style.backgroundImage = "url('images/weather/cloud.jpg')";
        
    } else if(weathertype == 'Haze') {

        document.body.style.backgroundImage = "url('images/weather/cloud.jpg')";
        
    }     else if(weathertype == 'Rain') {
        
        document.body.style.backgroundImage = "url('images/weather/rain.jpg')";
        
    } else if(weathertype == 'Snow') {
        
        document.body.style.backgroundImage = "url('images/weather/snow.jpg')";
    
    } else if(weathertype == 'Thunderstorm') {
    
        document.body.style.backgroundImage = "url('images/weather/thunderstorm.jpg')";
        
    } 

}

//finding the uv index 
// function uvrays(lat,logg){
//      fetch(`https://api.openweathermap.org/data/2.5/uvi?appid=ada1f715672a438e9b9acaa7ea0e930b&lat=${lat}&lon=${logg}`)
//      .then(response => { 
//         return response.json()})
//      .then(data => {
//       let sr=getElementById('sr').innerHTML= `${data.lat}`;
//      })
// }
// Current date 

function datemanage(Arg){
	let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
     let year = Arg.getFullYear();
	 let month = months[Arg.getMonth()];
	 let day = days[Arg.getDay()];
	 let date = Arg.getDate();

	 return `${month} ${date}, ${day}`;
}

// 5 day forecast 
function forecast(city) {
    fetch(`${weatherapi.baseurl}forecast?q=${city}&appid=${weatherapi.key}&units=imperial`)   // if units is matric than temp is in celsius
    .then(response => response.json())
    .then(data => {
    
        //Getting the min and max values for each day
        for(i = 0; i<5; i++){
            document.getElementById("day" + (i+1) + "Min").innerHTML = "Min: " + Math.floor(((data.list[i].main.temp_min)-32)*(5/9)) + `&deg;C`;
            //Number(1.3450001).toFixed(2); // 1.35
        }
    
        for(i = 0; i<5; i++){
            document.getElementById("day" + (i+1) + "Max").innerHTML = "Max: " + Math.floor(((data.list[i].main.temp_max)-32)*(5/9)) + `&deg;C`;
        }
        //------------------------------------------------------------
    
        //Getting Weather Icons
         for(i = 0; i<5; i++){
            document.getElementById("img" + (i+1)).src = "http://openweathermap.org/img/wn/"+
            data.list[i].weather[0].icon
            +".png";
        }   //
        //------------------------------------------------------------
        console.log(data)
    //Math.floor(((response.list[i].main.temp)-32)*(5/9))
    
    })

}
var d = new Date();
var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];

//Function to get the correct integer for the index of the days array
function CheckDay(day){
    if(day + d.getDay() > 6){
        return day + d.getDay() - 7;
    }
    else{
        return day + d.getDay();
    }
}

    for(i = 0; i<5; i++){
        document.getElementById("day" + (i+1)).innerHTML = weekday[CheckDay(i)];
    }