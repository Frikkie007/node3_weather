const weatherform =document.querySelector('form')
const search =document.querySelector('input')
const paragraph1 =document.querySelector('#p1')
const paragraph2 =document.querySelector('#p2')


weatherform.addEventListener('submit' , (e)=>
{
    e.preventDefault();
    const location = search.value

    paragraph1.textContent = "loading..."
    paragraph2.textContent = ""

    fetch(`/weather?address=${location}`).then((response)=>
    {
        response.json().then((data)=> 
        { 
            if(data.error)
            {
                return paragraph1.textContent = data.error
            }
            paragraph1.textContent = data.location  
            paragraph2.textContent = data.forecast

        })
    })
})