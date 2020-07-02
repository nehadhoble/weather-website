const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forcast=require('./utils/forcast')

const app=express() //app is the feture of 'Express' of 'Application' 
const port=process.env.PORT || 3000

//Define path for express config
const publicDirectoryPath=path.join(__dirname, '../public')
const viewpath=path.join(__dirname,'../templates/views') //we customize the views directory name to template
const partialsPath=path.join(__dirname,'../templates/partials')

//express is basically a function and we call to create an express application
//app.com
//app.com/help
//app.cm/about  

//setup satatic directory to serve                                                   
app.use(express.static(publicDirectoryPath))                
//app.use(express.static(path.join(__dirname,'../public/help.html')))
//app.use(express.static(path.join(__filename,'../public/about.html')))

//using hbs module
//Setup handlebars engine and views location
app.set('view engine','hbs')  //handle bar setup
app.set('views',viewpath) //to use hbs the directory nmae should be 'views'
hbs.registerPartials(partialsPath)


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Neha Dhoble'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
      return res.send({
            error:'Address required!!'
        })
    }else{
        console.log(req.query.address)
        req.query.address
        geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
            if(error){
                return res.send({
                    error:'Valid Address required!!'
                })
            }
           forcast(latitude,longitude,(error,forcastData)=>{
               if(error){
                return res.send({
                    error:'Valid Address required!!'
                })
               
               }
               res.send({
                   location,
                   forcast:forcastData,
                   address:req.query.address
               })
            })
        })
    
    }
})



app.get('/about',(req,res)=>{
    res.render('about',{
        title:'ABOUT',
        name:'Neha Dhoble'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Page',
        number:'8524569510',
        name:'Neha Dhoble'
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Neha Dhoble',
        errorMessage:'Help Article not found'
    })
})

app.get('*',(req,res)=>{
    //handling the wrong url
    res.render('404',{
        title:'404',
        name:'Neha Dhoble',
        errorMessage:'404 Page Not Found'
    })
})

app.listen(port,()=>{
    console.log('server is up on port ' + port)
})


