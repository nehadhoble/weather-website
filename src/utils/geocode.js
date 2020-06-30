const request=require('request')
 //Geocoding service use to take object like Nagpur and convert into longituse and altitude properties
const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address)+ '.json?access_token=pk.eyJ1IjoibmVoYWRob2JsZSIsImEiOiJja2JxNXU2dTgweGY1MnhwbnZsZ3c4NG0yIn0.ipdeURCzGXrYk9HriVeTqQ&limit=1'
    request({url,json:true},(error,{ body })=>{
        if(error){
            callback('Unable to connect to laocation services',undefined)
        }else if(body.features.length===0){
            callback('Unable to find location try another saerch!!',undefined)
        }else{
            callback(undefined,{
                latitude :body.features[0].center[1],
                longitude : body.features[0].center[0],
                location: body.features[0].place_name
            })
        }

    })
}

module.exports=geocode

//second way for above function
// //Geocoding service use to take object like Nagpur and convert into longituse and altitude properties
// const url2='https://api.mapbox.com/geocoding/v5/mapbox.places/nagpur.json?access_token=pk.eyJ1IjoibmVoYWRob2JsZSIsImEiOiJja2JxNXU2dTgweGY1MnhwbnZsZ3c4NG0yIn0.ipdeURCzGXrYk9HriVeTqQ&limit=1'

// request({url:url2,json:true},(error,response)=>{
//    //printing Longitude and latutude of place-'Nagpur'
// if(error){
//     console.log("Unable to conect to Server")
// }else if(response.body.features.length===0){
//     console.log("Unable to find location");
// }else{
//     console.log(response.body.features[0].center[1]+" , "+response.body.features[0].center[0])
// }
// })