//tip using nodemon takes the changes as soon as soon as you save no need for restart
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const viewsPath = path.join(__dirname, '../src/templates/views')
const partialsPath = path.join(__dirname, '../src/templates/partials')

const app = express() 
const publicdir = path.join(__dirname, '../public')

//setting for express
app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.set('x-powered-by', false)
hbs.registerPartials(partialsPath)

//its a way to customize the server 
app.use(express.static(publicdir)) 

app.get('', (req, res)=>
{
    res.render('index', 
    {
        title: 'Weather App',
        name: 'Armand'
    })
})

app.get('/about', (req, res)=>
{
    res.render('about',{title: 'About', name: 'Armand'})
})

app.get('/help', (req, res)=>
{
    res.render('help',{title: 'Help', name: 'Armand', message:'Wait what the fuck.... Help???'})
})

app.get('/help/*', (req,res)=>
{
    res.render('404', 
    {
        errormessage:'Help article not found',
        title: 'Weather App',
        name: 'Armand'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req,res)=>
{
    if(!req.query.search)
    {
        return res.send({error:"You must provide a search"})
    }
    
    res.send({products:[]})
})

//* match anything that hsnt been handled -- 404
app.get('*', (req,res)=>
{
    res.render('404', 
    {
        errormessage:'404 - not found',
        title: 'Weather App',
        name: 'Armand'
    })
})


app.listen(3000, ()=>
{
    console.log('running')
}) // starts up express web service on port 3000 and an optional function when server is up, keeps running untill ctrl + c







// app.com
// app.com/help
// app.com/about
