const express = require('express');
const router = express.Router();
//use axios library to mine the api
const axios = require('axios');
const cheerio = require('cheerio');
const htmlparser2 = require('htmlparser2');
const csv = require('csv-parser');
const fs = require('fs');
/**
 * 
 * @param {string} DOI 
 * @returns {object}
 */

async function scrapeAssociation(DOI) {
    var scraped = {};
    var res = await axios.get(DOI);
    var assoc_url = res.request._redirectable._currentUrl;
    //check if acm or ieee or springer is in the url
    if (assoc_url.includes("acm")) {
        scraped.Association = "ACM";
    }
    else if (assoc_url.includes("ieee")) {
        scraped.Association = "IEEE";
    }
    else if (assoc_url.includes("springer")) {
        scraped.Association = "Springer";
    }
    else if (assoc_url.includes("mr.crossref")) {
        scraped.Association = "IET";
    }
    else if (assoc_url.includes("wiley")) {
        scraped.Association = "Wiley";
    }
    else {
        scraped.Association = "Unknown";
    }
    return scraped;
}
//use scopus api or construct the link to the journal.conf again

async function scrapeInfo(author_name, title) {


    var author_name_search_list = `https://scholar.google.com/citations?view_op=search_authors&mauthors=${author_name}`
    var res = await axios.get(author_name_search_list);
    var $ = cheerio.load(res.data);
    var author_profile_link =  $('.gs_ai_name a').attr('href');
    console.log(author_profile_link);
    var author_profile = `https://scholar.google.com${author_profile_link}`;
    var res_second = await axios.get(author_profile);
    var $ = cheerio.load(res_second.data);
    var h_index = $('.gsc_rsb_std').eq(2).text().trim();
    console.log(h_index);
    const matchingRows = [];

    // Read the CSV file and pipe the data to the csv-parser module
    fs.createReadStream('data\\scimago_data_2021.csv')
        .pipe(csv({ separator: ';' }))
        .on('data', (row) => {
            // Check if the title matches the searchTitle
            //add search by issn later
           
            if (row['Title'] === title) {
                
                // If the title matches, push the row to the matchingRows array
                matchingRows.push(row);
            }
        })
        .on('end', () => {
            // Once the parsing is complete, log the matching rows
            console.log('Matching rows:', matchingRows); //extract snip and sjr and maybe h index from here
        });
    //https://api.elsevier.com/content/serial/title?issn=0309-0566&field=SJR,SNIP&view=STANDARD&apikey=4cc20e5ed48e63f2061a88a4154566bf
}



//scopus api key = 


router.get('/', async (req, res) => {
    //acm doi example = https://doi.org/10.1145/1741906.1742236
    //ieee doi example = https://doi.org/10.1109/ICSE.2019.00037
    //springer doi example = https://doi.org/10.1007/978-3-030-32245-8_1
    //iet doi example = https://doi.org/10.1049/cp.2019.0005
    //wiley doi example = https://doi.org/10.1002/asi.23983
    //TODO: doesn't work for wiley yet 

    var x = await scrapeAssociation("https://doi.org/10.1007/978-3-030-32245-8_1");
    console.log(x.Association);
    var y = await scrapeInfo("Vijayendra Gaikwad", "Econometrica");

});

module.exports = router;