
const PORT = 8000
const express  = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const app = express()
const challenges = []

app.get('/', async (req, res) =>{
    res.json({message : 'Hello GHW! Welcome to our stream'})
})

/* we are typing to take an api service
in which if someone hits your api service they 
get the list of all ghw challenges that are running */
app.get('/challenges', async(req, res) => {
    
    axios.get('https://ghw.mlh.io/challenges')
    .then(response => {
        const html = response.data
        //cheerio will help us reference all the html tags
        //it'll take all the html data
        const $ = cheerio.load(html)

       $('a:contains("")',html).each(function(){
        const title = $(this).text()
        const url = $(this).attr('href')

        challenges.push({
            title,
            url
        })
       })
        res.json(challenges)
    }).catch(err=> console.log(err))
})

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))