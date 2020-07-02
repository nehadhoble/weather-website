const request=require('request')


const forcast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=90ff85d874a3670f741b22e9f63a59fb&query= '+latitude+','+longitude+''
    request({url,json:true},(error,{ body })=>{
        if(error){
            callback('Network Error !! Unable to connect to weather server',undefined)
        }else if(body.error){
            callback('Unable to find location',undefined)
        }else{
            callback(undefined,
             body.current.weather_descriptions[0] +' , It is Currently '+ body.current.temperature +' degree Temperature and '+ body.current.precip +' percent of rain, Observation time is '+body.current.observation_time
        )
        }
    })
   }

   module.exports=forcast


   //second way of above function
   // //using weather stack api to get the weather forcat
// const url='http://api.weatherstack.com/current?access_key=90ff85d874a3670f741b22e9f63a59fb&query=21.146633,79.088860&units=f'

//  request({url:url,json:true},(error,response)=>{
//      if(error){
//          console.log("Unable to conect to weather server")
//      }else if(response.body.error){
//          console.log("Unable to find location");
//      }else{
//         const curr=response.body.current;
//         const weath_descr=response.body.current.weather_descriptions[0];
//         console.log(weath_descr+" . It is currently "+curr.temperature+" degrees out, There is "+curr.precip+" percent of rain")
//      }
     
//     })

   