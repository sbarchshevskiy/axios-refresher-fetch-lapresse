const express = require('express')
const cheerio = require('cheerio')
const axios = require('axios')
const PATH = 8080;


const url = 'https://www.lapresse.ca/actualites/'

axios(url).then(res => {
   const html = res.data;
   const $ = cheerio.load(html);
   const results = [];
   $('.articleDetail__lead mostRecentCard__lead ', html).each(() =>{
       const title = $(this).text();
       const url = $(this).find('a').attr('href');
       results.push({
           title,
           url
       })
   })
    console.log('results', results);
}).catch(err => console.log(err));


const app = express();
app.listen(PATH, () =>
  console.log('listening on port 8080')
)

