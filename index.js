const express = require('express')
const cheerio = require('cheerio')
const axios = require('axios')
const PATH = 8080;


const app = express();
app.listen(PATH, () =>
    console.log('listening on port 8080')
)

const results = [];
console.log(results)

const urlSource = [
    {
        name: "La Presse",
        link: "https://www.lapresse.ca/affaires/"
    },
    {
        name: "Canadian Investor",
        link: "https://canadianvestor.com/?cat=6"
    },
    {
        name: "Wall Street Journal",
        link: "https://www.wsj.com/news/business?mod=nav_top_section"
    },
    {
        name: "Yahoo Finance",
        link: "https://finance.yahoo.com/news/"
    },
    {
        name: "Market Watch",
        link: "https://www.marketwatch.com/"
    }

]

urlSource.forEach(source =>{
    axios.get(source.link).then(res => {
        const html = res.data
        const $ = cheerio.load(html)
        $('a:contains("the")', html).each(function (){
            const headline = $(this).text()
            const url = $(this).attr("href")
            results.push({
                headline,
                url
            })
        })
    }).catch(err => console.log(err))
})



app.get('/', (req, res) => {

})

app.get('/finance', (req, res) => {
    res.json(results)
})



