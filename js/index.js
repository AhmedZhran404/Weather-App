// ! ---------- global variable ------------------

const findLocation = document.getElementById("findLocation");
const btnSearch = document.getElementById("btnSearch");
let collectionAnchor = document.querySelectorAll('.navbar .navbar-nav li .nav-link');
let data;
let weekData;
let dayNameCurrent;
let secondDayName;
let ThirdDayName;

// ! ---------------- Display Data When open site ---------

getNameOfLocation();

// * ---------- events variable ------------------

findLocation.addEventListener( 'input'    ,  function(){
    getNameOfLocation(findLocation.value);
});

let current = 0;
for(let i = 1; i<collectionAnchor.length; i++) {
    collectionAnchor[i].addEventListener( 'click' , function(){
        collectionAnchor[i].classList.add('active');
        collectionAnchor[current].classList.remove('active');
        current++;
    } )
}

// & ---------- functions  ------------------

function getDayName(dateString) {

    const date = new Date(dateString);

    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

    return dayName; 
}

async function getNameOfLocation(valueInput = "tanta"){

 
        let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=3b9bd5efecd8424b823142235241012&q=${valueInput}&days=7`);
        if(response.ok){
           data = await response.json();
            weekData = data.forecast.forecastday;
             dayNameCurrent = getDayName(weekData[0].date);
             secondDayName = getDayName(weekData[1].date);
             ThirdDayName = getDayName(weekData[2].date);
           displayDataOfCurrentDay(data);
           displayOthreDays(data);
        }

}

function displayDataOfCurrentDay(data){

let cartona = `

 <div class="today rounded">       
                <div class="days d-flex align-items-center justify-content-between pb-3 pt-2">
                    <span>${dayNameCurrent}</span>
                    <span>${weekData[0].date}</span>
                </div>
                <div class="body-card">
                    <div class="cauntry pb-3 ">
                        <span>${data.location.name}</span>
                    </div>
                    <div class="icons-degree">
                        <div class="degree">
                            <span>${data.current.temp_c}<sup>o</sup>C</span>
                        </div>

                        <div class="image-description">
                            <img src="https:${data.current.condition.icon}" alt="">
                        </div>
                    </div>
                    <div class="description-air my-4 text-color">
                        ${data.current.condition.text}
                    </div>

                    <div class="more-details d-flex align-items-center justify-content-start column-gap-3">
                        <div class="one">
                            <img src="images/116.png" alt="">
                            <span>20%</span>
                        </div>
                        <div class="two">
                            <img src="images/icon-wind@2x.png" alt="">
                            <span>${data.current.wind_kph}km/h</span>
                        </div>
                        <div class="three">
                            <img src="images/icon-compass@2x.png" alt="">
                            <span>${data.current.wind_dir}</span>
                        </div>
                    </div>
                </div>
            </div>
`
document.getElementById("cardContent").innerHTML = cartona;
}

function displayOthreDays(data){
    let cartona = `
    <div class="other-day rounded">      

                   <div class="days day-2 text-center pb-3 pt-2 ">
                       <span>${secondDayName}</span>
                   </div>
                   <div class="body-card text-center">
                       <div class="icon">
                           <img src="https:${data.forecast.forecastday[1].day.condition.icon}" alt="">
                       </div>
                       <div class="degree-2">
                           ${data.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C
                       </div>
                       <small>${data.forecast.forecastday[1].day. mintemp_c}<sup>o</sup></small>
                       <div class="custom my-5 text-color">${data.forecast.forecastday[1].day.condition.text}</div>                
                   </div>
    </div> 


    <div class="other-day spicial-bg rounded">       
    
                   <div class="days text-center pb-3 pt-2 ">
                       <span>${ThirdDayName}</span>
                   </div>
                   <div class="body-card text-center">
                       <div class="icon">
                           <img src="https:${data.forecast.forecastday[2].day.condition.icon}" alt="">
                       </div>
                       <div class="degree-2">
                           ${data.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C
                       </div>
                       <small>${data.forecast.forecastday[2].day.mintemp_c}<sup>o</sup></small>
                       <div class="custom my-5 text-color">${data.forecast.forecastday[2].day.condition.text}</div>                
                   </div>
    </div> 
    `

    document.getElementById("cardContent").innerHTML += cartona;
}



 





