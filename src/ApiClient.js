import axios from "axios";

export class ApiClient {
    responseStatusCheck(responseObject) {
        if(responseObject.status >= 200 && responseObject.status < 300){
          return Promise.resolve(responseObject);
    
        }else{
          return Promise.reject(new Error(responseObject.statusText));
        }
   
   
     }

     getItems(url){
        return axios
        .get(url)
        .then(this.responseStatusCheck)
        .catch((error) => {
            console.log(error);

        })
     }

    getWeather(lat, lon){
      console.log(lat, lon)
        // return this.getItems(`https://api.openweathermap.org/data/2.5/onecall?lat=${53.382969}{&lon=${lon}&units=metric&exclude=hourly,minutely&appid=817b9588cde4ff15fdc254ea056b9c73`);
        return this.getItems(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=hourly,minutely&appid=817b9588cde4ff15fdc254ea056b9c73`);
    }

// api.openweathermap.org/data/2.5/forecast?q={city name},gb&units=metric&appid=817b9588cde4ff15fdc254ea056b9c73
// https://api.openweathermap.org/data/2.5/onecall?lat=53.416672&lon=-1.5&exclude=hourly,minutely&appid=817b9588cde4ff15fdc254ea056b9c73

}