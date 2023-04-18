const express = require('express'); 
const router = express.Router();
//use axios library to mine the api
const axios = require('axios');
const cheerio = require('cheerio');
const htmlparser2 = require('htmlparser2');
/**
 * 
 * @param {string} DOI 
 * @returns {object}
 */

async function scrapeAssociation(DOI)
{
    var scraped = {}; 
    var res = await axios.get(DOI);
    var assoc_url = res.request._redirectable._currentUrl; 
    //c heck if acm or ieee or springer is in the url
    if(assoc_url.includes("acm"))
    {
        scraped.Association = "ACM";
    }
    else if(assoc_url.includes("ieee"))
    {
        scraped.Association = "IEEE";
    }
    else if(assoc_url.includes("springer"))
    {
        scraped.Association = "Springer";
    }
    else if(assoc_url.includes("mr.crossref"))
    {
        scraped.Association = "IET";
    }
    else if(assoc_url.includes("wiley"))
    {
        scraped.Association = "Wiley";
    }
    else{
        scraped.Association = "Unknown";
    }
    return scraped;
}
//use scopus api or construct the link to the journal.conf again
async function scrapeJournal()
{

}


async function scrapeConference()
{

}



router.get('/', async (req, res) =>  {
    //acm doi example = https://doi.org/10.1145/1741906.1742236
    //ieee doi example = https://doi.org/10.1109/ICSE.2019.00037
    //springer doi example = https://doi.org/10.1007/978-3-030-32245-8_1
    //iet doi example = https://doi.org/10.1049/cp.2019.0005
    //wiley doi example = https://doi.org/10.1002/asi.23983
    //TODO: doesn't work for wiley yet 

    var x = await scrapeAssociation("https://doi.org/10.1007/978-3-030-32245-8_1");
    console.log(x.Association);
    }
); 

module.exports = router;