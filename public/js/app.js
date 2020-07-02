console.log("CLIENT SIDE JAVASCRIPT FILE IS LOADED")

const weatherform=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')

//messageOne.textContent='From Java Scriop'

weatherform.addEventListener('submit',(e)=>{

    e.preventDefault()

    const location=search.value

    messageOne.textContent='Loading .....'
    messageTwo.textContent=" "
    
    //http://localhost:3000/weather?address=
    fetch('/weather?address='+ location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            //console.log(data.error)
            messageOne.textContent=data.error

        }else{
            //console.log(data.location)
            messageOne.textContent=data.location
            console.log(data.forcast)
            messageTwo.textContent=data.forcast
        }

    })

  })
})