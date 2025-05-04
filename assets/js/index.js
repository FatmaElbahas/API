// document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("#newContainer");
    const searchInput = document.querySelector("#cityInput");
    const searchBtn = document.querySelector("#searchBtn");
    
    async function getWeather(city) {
        try {
            const response = await fetch(
                `https://api.weatherapi.com/v1/forecast.json?key=d39e3d64686e4aaebf3144423250305&q=${city}&days=3`
            );
            const data = await response.json();
            console.log(data);

            newContainer.innerHTML = "";
            displayTodayForcast(data);
            displayTomorrowForcast(data);
            displayTheThirdDay(data);
        } catch (error) {
            console.error("Error fetching weather:", error);
        }
    }

    searchBtn.addEventListener("click", function (e) {
        e.preventDefault(); // مهم علشان ميعملش reload للصفحة
        search();
    });

    searchInput.addEventListener("keyup", function (e) {
        if (e.key === "Enter") {
            e.preventDefault(); // كمان هنا
            search();
        }
    });

    function search() {
        const city = searchInput.value.trim();
        if (city) {
            getWeather(city);
        } else {
            alert("من فضلك ادخل اسم المدينة");
        }
    }

    getWeather("Tanta");

    // دوال العرض
   
    function displayTodayForcast(arr) {
        // استخدام for عادية لتكرار عبر الأيام في forecast
        // for (let i = 0; i < arr.forecast.forecastday.length; i++) {
            const forecast = arr.forecast.forecastday[0];
            const direction = arr.forecast.forecastday[0].day.maxwind_dir;
            var date=new Date(forecast.date);
            let formattedDate = date.toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short'
               });
            var dayName=date.toLocaleDateString('en-US',{weekday:'long'});
            
            newContainer.innerHTML += `
                <div class=" col-lg-4 col-md-12 col-sm-12">
                    <div class="inner shadow">
                        <div class="today-forcast bg-terriary text-white ">
                            <div class="forcast-header d-flex justify-content-between align-items-center bg-fourthy py-2 w-100 p-2">
                                <div class="day">${dayName}</div>
                                <div class="date">${formattedDate}</div>
                            </div>
                            <div class="forcast-content p-3 d-flex flex-column gap-4">
                                <div class="location mt-0 pt-0">${arr.location.name}, ${arr.location.country}</div>
                                <div class="degree display-1 fw-bold d-flex gap-5 align-items-center">
                                    <div class="num">${forecast.day.avgtemp_c}<sup>o</sup>C</div>
                                    <div class="forcast-icon">
                                        <img src="https:${forecast.day.condition.icon}" alt="" class="w-100 img-fluid">
                                    </div>
                                </div>
                                <div class="custom text-primary">${forecast.day.condition.text}</div>
                                <div class="forcast-footer d-flex align-items-center gap-5 mb-3">
                                    <span><img src="./assets/images/icon-umberella.png" alt=""> ${forecast.day.daily_chance_of_rain}%</span>
                                    <span><img src="./assets/images/icon-wind.png" alt=""> ${forecast.day.maxwind_kph} Km/h</span>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
        }
        function displayTomorrowForcast(arr){
            const forecast = arr.forecast.forecastday[1];
            var date=new Date(forecast.date);
            var dayName=date.toLocaleDateString('en-US',{weekday:'long'});
            newContainer.innerHTML +=` <div class="col-lg-4 col-md-12 col-sm-12 ">
                    <div class="inner shadow">
                      <div class="today-forcast bg-fifthy text-white ">
                        <div class="forcast-header text-center bg-sixthy">
                            <div class="day">${dayName}</div>
                        </div>
                        <div class="forcast-content p-3 d-flex flex-column gap-4 align-items-center justify-content-between text-center">
                            <div class="forcast-icon mx-auto">
                                <img src="https:${forecast.day.condition.icon}" alt="" class="d-block mx-auto">
                            </div>
                            <div class="degree fw-bold">
                                <div class="num h2">${forecast.day.avgtemp_c}<sup>o</sup>C</div>
                                <div class="percentage">${forecast.day.avgtemp_f}<sup>o</sup></div>
                            </div>
                            <div class="custom mb-5 text-primary">${forecast.day.condition.text}</div>
                        </div>
                    </div>
                    </div>
                </div>`
        }
        function displayTheThirdDay(arr){
            const forecast = arr.forecast.forecastday[2];
            var date=new Date(forecast.date);
            var dayName=date.toLocaleDateString('en-US',{weekday:'long'});
            newContainer.innerHTML +=` <div class="col-lg-4 col-md-12 col-sm-12 ">
                    <div class="inner shadow">
                      <div class="today-forcast bg-terriary text-white ">
                        <div class="forcast-header text-center bg-fourthy py-2 w-100 ">
                            <div class="day">${dayName}</div>
                        </div>
                        <div class="forcast-content p-3 d-flex flex-column gap-4 align-items-center justify-content-between text-center">
                            <div class="forcast-icon mx-auto">
                                <img src="https:${forecast.day.condition.icon}" alt="" class="d-block mx-auto">
                            </div>
                            <div class="degree fw-bold">
                                <div class="num h2">${forecast.day.avgtemp_c}<sup>o</sup>C</div>
                                <div class="percentage">${forecast.day.avgtemp_f}<sup>o</sup></div>
                            </div>
                            <div class="custom mb-5 text-primary">${forecast.day.condition.text}</div>
                        </div>
                    </div>
                    </div>
                </div>`
        }
    
    // });
