//para llamar a la api
const API_KEY = '7cb1fbfd517ed021579869c29358f505';

//resive la data 
const fetchData = (position) => {
    const {latitude, longitude} = position.coords;
   
    //para hcer el llamdo a la api
    fetch( `http://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
        .then(response => response.json())
        //para obtener la data
        .then(data => setWeatherData(data))
}

const setWeatherData = data => {
    console.log(data);
    const weatherData = {
        location: data.name,
        description: data.weather[0].main,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        temperature: data.main.temp,
        date: getDate(),
    }

    //para setear la info en el html
    Object.keys(weatherData).forEach(key => {
        document.getElementById(key).textContent = weatherData[key];
    })

    cleanerUp();
}

//para hacer el reload 
const cleanerUp = () =>{
    let container = document.getElementById('container');
    let loader = document.getElementById('loader');

    loader.style.display = 'none'
    container.style.display = 'flex'
}

const getDate = () => {
    let date = new Date();
    return `${date.getDate()}-${('0' + (date.getMonth() +1)).slice(-2)}-${date.getFullYear()}`;
}

const onload = () => {
    //es para saber la ubicacion del usuario
    navigator.geolocation.getCurrentPosition(fetchData);
}


