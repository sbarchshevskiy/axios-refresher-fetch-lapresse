const express = require('express')
const cheerio = require('cheerio')
const axios = require('axios')
const PATH = 8080;

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


const useUrlSource = function(sources){
    return sources.map(source => source.link)
}

// console.log(useUrlSource(urlSource))



const app = express();
app.listen(PATH, () =>
    console.log('listening on port 8080')
)
//renamed to main instead of url
const main = 'https://canadianvestor.com/?cat=8'
app.get('/', (req, res) => {

})

app.get('/finance', (req, res) => {
    axios(main).then(resAxios => {
        const html = resAxios.data;
        const $ = cheerio.load(html);
        //may use a:contains("keyword")
        $('a:contains("the")', html).each(function (){
            const headline = $(this).text()
            const url = $(this).attr("href")
            results.push({
                headline,
                url
            })
            console.log(url)
            console.log(headline)
        })
        res.json(results)
    }).catch(err => console.log(err));
})

