const express = require('express')
const cheerio = require('cheerio')
const axios = require('axios')
const PATH = 8080;


const url = 'https://www.lapresse.ca/actualites/'

axios(url).then(res => {
   const html = res.data;
   const $ = cheerio.load(html);
   const results = [];
   $('.articleDetail__lead', html).each(function (){
       const story = $(this).text();
       const url = $(this).find('a').attr('href');
       results.push({
           story,
           url
       })
   })
    console.log('results', results);
}).catch(err => console.log(err));


const app = express();
app.listen(PATH, () =>
  console.log('listening on port 8080')
)

