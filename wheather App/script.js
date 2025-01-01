var wheatherInfo={};

window.addEventListener('load',()=>{


   var apikey = '9hJKtKrp291UyFsN7uoatowRzfqteSS3'
   var lat,long;

   navigator.geolocation.getCurrentPosition((position)=>{
      
     lat=position['coords']['latitude'];
     long=position['coords']['longitude'];
     
     console.log(lat+","+long);
     

     var geolocationurl =`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apikey}&q=${lat},${long}`
     axios.get(geolocationurl)
     .then((reponse)=>{

          wheatherInfo['country']= reponse.data.Country.EnglishName;
          wheatherInfo['locationkey']=reponse.data.Key;
          wheatherInfo['timezone']=reponse.data.TimeZone;
          wheatherInfo['locationname']=reponse.data.LocalizedName;
        
        getweatherdata(wheatherInfo.locationkey,apikey);

     })
     

   })
})


        function getweatherdata(locationkey,apikey){

        var weatherurl=`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationkey}?apikey=${apikey}`;

            axios.get(weatherurl).then((response)=>{
                // console.log(response);

                wheatherInfo['today'] = response.data.DailyForecasts[0].Date;
                wheatherInfo['day'] = response.data.DailyForecasts[0].Day;
                wheatherInfo['night'] = response.data.DailyForecasts[0].Night;
                wheatherInfo['temperature'] = response.data.DailyForecasts[0].Temperature;

                console.log(wheatherInfo);
                
                var today = new Date(wheatherInfo['today']);

                returnId('country').textContent = wheatherInfo['country'];
                returnId('currentLocation').textContent = wheatherInfo['locationname'];
                returnId('date').textContent = today.getDate()+ '-' + (today.getMonth() + 1) + '-' + today.getFullYear()+'-'+ wheatherInfo.timezone.Code;

          if(wheatherInfo.day.Icon < 10) {
           returnId('morning').setAttribute('src',`https://developer.accuweather.com/sites/default/files/0${wheatherInfo.day.Icon}-s.png`);
          } else {
           returnId('morning').setAttribute('src',`https://developer.accuweather.com/sites/default/files/${wheatherInfo.day.Icon}-s.png`);
            }

if(wheatherInfo.night.Icon < 10) {
returnId('night').setAttribute('src',`https://developer.accuweather.com/sites/default/files/0${wheatherInfo.night.Icon}-s.png`);
} else {
returnId('night').setAttribute('src',`https://developer.accuweather.com/sites/default/files/${wheatherInfo.night.Icon}-s.png`);
}
returnId('morning-desc').textContent= wheatherInfo.day.IconPhrase;
returnId('night-desc').textContent = wheatherInfo.night.IconPhrase;
    })
 
}


function returnId(id){
   return document.getElementById(id);
}