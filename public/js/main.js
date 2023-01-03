const submitButton = document.getElementById("submitButton");
const cityName = document.getElementById("cityName");
const city_name = document.getElementById("city_name");
const temp = document.getElementById("temp");
const days = document.getElementById("day");
const today_date = document.getElementById("today_date");

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["JAN", "FAB", "MAR", "APRIL", "MAY", "JUNE", "JULY", "AUG", "SEPT", "OCT", "NOV", "DEC"];
const temp_status = document.getElementById("temp_status");


GetDate = () => {

    let now = new Date();
    
    let day = weekday[now.getDay()];
    let month = months[now.getMonth()];
    let date = now.getDate();

    if (date < 10) { date = '0' + date; }

    days.innerText = day;
    today_date.innerText = date + " " + month;
}

GetDate();

const getInfo = async (event) => {
    event.preventDefault();
    let cityVal = cityName.value;

    if (cityVal === "") {
        city_name.innerText = "Plz Write The Name Before Search"
        temp.parentElement.classList.add("data_hide");
    
    } else {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=2fc26423c52c79c7ac9524d540b2a84a`;
            const response = await fetch(url);
            const data = await response.json();
            const arrayData = [data];
            const tempMod = arrayData[0].weather[0].main;
            if(tempMod == "Clear"){
                temp_status.innerHTML = `<i class="fas fa-sun icons" aria-hidden="true" style="color:#ceff00";></i>`;
            }  else if  (tempMod == "Clouds"){
                temp_status.innerHTML = `<i class="fas fa-cloud icons" aria-hidden="true"></i>`;
            }  else if  (tempMod == "Rain"){
                temp_status.innerHTML = `<i class="fas fa-cloud-rain icons" aria-hidden="true"></i>`;
            } else  {
                temp_status.innerHTML = `<i class="fas fa-cloud icons" aria-hidden="true"></i>`;
            }

            temp.parentElement.classList.remove("data_hide");
            city_name.innerText = `${arrayData[0].name} , ${arrayData[0].sys.country} `;
            temp.innerHTML = `<span>${arrayData[0].main.temp}</span><sup>o</sup>C`;
            
        } catch (error) {
            console.log(error);
            temp.parentElement.classList.add("data_hide");
            city_name.innerText = `Enter The City Name Properly`;
        }
    }

}

submitButton.addEventListener("click", getInfo);