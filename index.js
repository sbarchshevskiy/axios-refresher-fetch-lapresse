const express = require('express')
const cheerio = require('cheerio')
const axios = require('axios')
const PATH = 8080;

const results = [];

const app = express();
app.listen(PATH, () =>
    console.log('listening on port 8080')
)

const url = 'https://canadianvestor.com/?cat=8'

app.get('/', (req, res) => {

})

app.get('/finance', (req, res) => {
    axios(url).then(res => {
        const html = res.data;
        const $ = cheerio.load(html);
        //may use a:contains("keyword")
        $('.category_detail', html).each(function (){
            const headline = $(this).text();
            // const url;
            results.push({
                headline,
                // url
            })
        })
        console.log('results', results);
    }).catch(err => console.log(err));
    res.json('results')
})





