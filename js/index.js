
var alertt = document.getElementById('alertt');
var search = document.querySelector('#search');
var threeItem = document.querySelector('.threeItem')
document.getElementById("search").addEventListener("keyup", function (allCity) {
    searchCity(allCity.target.value)
}
);
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];






var allCity = [];

async function searchCity(a) {
    var url = await fetch(`    https://api.weatherapi.com/v1/forecast.json?key=810c4382a0ef41b4988123514243003&q=${a}&days=3`);
    allCity = await url.json();
    displayCurrent(allCity.location, allCity.current);
    display(allCity.forecast.forecastday);
    displaythree(allCity.forecast.forecastday)

}



function displayCurrent(location, current) {
    if (current != null) {
        var e = new Date(current.last_updated.replace(" ", "T"));
        var n = `
        <div
            class="fir-item  leadd fir-top d-flex align-items-center justify-content-between py-1 ">
             <p class="m-md-3 ">${days[e.getDay()]}</p>
             <p class="m-md-3 ">${e.getDate() + monthNames[e.getMonth()]}</p>
        </div>
        <p class="fs-5 leadd ms-3 my-md-3">${location.name}</p>
        <div class="d-flex align-items-center  ">
            <h2 class="h1 text-white font fw-bolder  ms-3 my-md-1">${current.temp_c}</h2>
         
            <img class="w-25 mx-2" src="https:${current.condition.icon}" alt="" >
        </div>
        <p class="text-info mt-5 ms-3">${current.condition.text}</p>
        <div class="d-flex align-items-center  ms-3">
            <div class="d-flex align-items-center ">
                <i class="fa-solid leadd fa-umbrella me-2"></i>
                <p class="mt-md-3 leadd">20%</p>
            </div>
            <div class="d-flex align-items-center">
                <i class="fa-solid leadd fa-wind mx-2"></i>
                <p class="mt-md-3 leadd">18km/h</p>
            </div>
            <div class="d-flex align-items-center justify-content-center">
                <i class="fa-regular leadd fa-compass mx-2 lead"></i>
                <p class="mt-md-3 leadd">East</p>
            </div>
        </div>
    `
        document.getElementById("forecast").innerHTML = n
        alertt.classList.replace("d-flex", "d-none")
        threeItem.classList.replace("d-none", "d-flex");
    }
    else {
        if (search.value == "") {
            searchCity(cityName)
        }
        else {
            alertt.classList.replace("d-none", "d-flex")
            threeItem.classList.replace("d-flex", "d-none");
        }

    }
}


function display(weather) {
    var cartona = ``;

    var z = weather;
    cartona += `
        <div class="sec-nav py-1 leadd">
            <p class="m-md-3">${days[new Date(z[1].date.replace(" ", "T")).getDay()]}</p>
        </div>
        <div class="my-md-5">
        <img class="w-25 mx-2" src="https:${z[1].day.condition.icon}" alt="" >
            <h3 class="text-white my-3">${z[1].day.maxtemp_c}</h3>
            <p class="leadd">${z[1].day.mintemp_c}</p>
            <p class="text-info my-2 ">${z[1].day.condition.text}</p>
        </div>
    </div>
    
    `;

    document.getElementById("forecastTwo").innerHTML = cartona;



}

function displaythree(weather) {
    var cartona = ``;
    var z = weather;
    cartona += `
    <div class=" fir-top py-md-1 leadd">
    <p class="m-3">${days[new Date(z[2].date.replace(" ", "T")).getDay()]}</p>
    </div>
    <div class="my-md-5">
    <img class="w-25 mx-2" src="https:${z[2].day.condition.icon}" alt="" >
    <h3 class="text-white my-3">${z[2].day.maxtemp_c}</h3>
    <p class="leadd">${z[2].day.mintemp_c}</p>
    <p class="text-info my-2">${z[2].day.condition.text}</p>
    </div>
    </div>
    
    `;

    document.getElementById("forecastThree").innerHTML = cartona;



}






let cityName;
async function getlocation(lat, lon) {
    let response = await fetch(
        ` https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
    );
    let finaldata = await response.json();
    cityName = finaldata.address.country;
    searchCity(cityName)
}
navigator.geolocation.getCurrentPosition(function (p) {
    let lat = p.coords.latitude;
    let lon = p.coords.longitude;
    getlocation(lat, lon);
    
});




