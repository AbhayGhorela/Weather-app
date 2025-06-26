const apiKey = '7a7334538be24b1506c3acc12d3abef5';
const container = document.querySelector(".container")
const search = document.querySelector(".search-box button")
const enter = document.querySelector('.search-box input')
const weatherBox = document.querySelector(".weather-box")
const weatherDetails = document.querySelector(".weather-details")
const error404 = document.querySelector('.not-found')


enter.addEventListener('keydown',(e)=>{
    if(e.key == "Enter"){
        search.click()
        return;
    }
})


search.addEventListener('click',()=>{
    
    const city = document.querySelector('.search-box input').value

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`).then(res => res.json()).then((data)=>{
        console.log(data)

        if(data.cod == '404'){
            container.style.height = '25rem'
            weatherBox.classList.remove('active')
            weatherDetails.classList.remove('active')
            error404.classList.add('active')
            return;
        }

        container.style.height = '34.688rem'
        weatherBox.classList.add('active')
        weatherDetails.classList.add('active')
        error404.classList.remove('active')

        const image = document.querySelector('.weather-box img')
        const bg = document.querySelector('.back-video source')
        const video = document.querySelector('.back-video')
        const temp = document.querySelector('.weather-box .temperature')
        const desc = document.querySelector('.weather-box .description')

        switch(data.weather[0].icon){
            case '01d':
                image.src ='./assets/clear.png'
                bg.src = "./assets/clear.mp4"
                break;
            
            case '50d':
            case '50n':
                image.src ='./assets/mist.png'
                bg.src = "./assets/mist.mp4"
                break;
            
            case '04d':
            case'09d':
            case'10d':
            case'11d':
            case'04n':
            case'09n':
            case'10n':
            case'11n':
                image.src ='./assets/rain.png'
                bg.src = "./assets/rain.mp4"
                break;
            
            case '13d':
            case'13n':
                image.src ='./assets/snow.png'
                bg.src = "./assets/snow.mp4"
                break;

            case '02n':
            case '03n':
            case '01n':
                image.src ='./assets/night.png'
                bg.src = "./assets/night.mp4"
                break;

            case '02d':
            case '03d':
                image.src ='./assets/cloud.png'
                bg.src = "./assets/cloud.mp4"
                break;

            default:
                image.src ='./assets/cloud.png'
                bg.src = "./assets/cloud.mp4"
                break;
        }


        const humidity = document.querySelector('.humidity-info span')
        const wind = document.querySelector('.wind span')
        humidity.textContent = `${parseFloat(data.main.humidity
)}`
        wind.textContent = `${parseInt(data.wind.speed)}Km/h`
        temp.innerHTML = `${parseInt(data.main.temp)}<span>°C</span>`
        desc.textContent = `${data.weather[0].description}`
        video.load()

        
    }).catch((error)=>{
        console.log("Error Fetching Weather Data ",error)
    })
})