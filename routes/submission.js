const express = require('express');
const router = express.Router();
//use axios library to mine the api
const axios = require('axios');
const cheerio = require('cheerio');
const csv = require('csv-parser');
const fs = require('fs');
const {auth} = require('../middleware/auth');
const Paper = require('../models/paperModel');
const User = require('../models/userModel');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: require('find-config')('secret.env') })



/**
 * 
 * @param {string} DOI 
 * @returns {object}
 */

async function scrapeAssociation(DOI) {
    
    
    console.log("scraping association")
    console.log(DOI)
    if(DOI == undefined || DOI == null || DOI == ""){
        return "Unknown";
    }
    var scraped = {};
    try{
        var res = await axios.get(DOI);
        var assoc_url = res.request._redirectable._currentUrl;
    }catch(error){
        return "Unknown";

    }
   
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

    //acm doi example = https://doi.org/10.1145/1741906.1742236
    //ieee doi example = https://doi.org/10.1109/ICSE.2019.00037
    //springer doi example = https://doi.org/10.1007/978-3-030-32245-8_1
    //iet doi example = https://doi.org/10.1049/cp.2019.0005
    //wiley doi example = https://doi.org/10.1002/asi.23983
    //TODO: doesn't work for wiley yet 
    try{
    var scraped_info = {};
    var author_name_search_list = `https://scholar.google.com/citations?view_op=search_authors&mauthors=${author_name}`
    var res = await axios.get(author_name_search_list);
    var $ = cheerio.load(res.data);
    var author_profile_link = $('.gs_ai_name a').attr('href');
    //console.log(author_profile_link);
    var author_profile = `https://scholar.google.com${author_profile_link}`;
    var res_second = await axios.get(author_profile);
    var $ = cheerio.load(res_second.data);
    var h_index = $('.gsc_rsb_std').eq(2).text().trim();
    if (h_index != "" && h_index != null && h_index != undefined) {
        scraped_info.auth_h_index = parseInt(h_index);
    }
    else {
        scraped_info.auth_h_index = -1;
    }
    }catch(err){
        //user does not have google scholar profile
        scraped_info.auth_h_index = -1;
    }
    
    //console.log(h_index);
    const matchingRows = [];

    const stream = fs.createReadStream('data\\scimago_data_2021.csv')
        .pipe(csv({ separator: ';' }));

    for await (const row of stream) {
        if (row['Title'] === title) {
            matchingRows.push(row);
        }
    }
    if (matchingRows.length > 0) {
        var scrapedRow = matchingRows[0];
        scraped_info.isIndexed = true;
        scraped_info.SJR_INDEX = parseInt(scrapedRow['SJR']);
        scraped_info.H_INDEX = parseInt(scrapedRow['H index']);
    }
    else {
        scraped_info.isIndexed = false;
        scraped_info.SJR_INDEX = -1;
        scraped_info.H_INDEX = -1;
    }
    return scraped_info;
    //https://api.elsevier.com/content/serial/title?issn=0309-0566&field=SJR,SNIP&view=STANDARD&apikey=4cc20e5ed48e63f2061a88a4154566bf
}


async function generateMarks(paper) {
    var paperScore = 0;
    if (paper.type === "Journal") {
        paperScore += 5;
    }
    else if (paper.type === "Conference") {
        paperScore += 3;
    }
    if (paper.association === "IEEE") {
        paperScore += 10;

    }
    else if (paper.association === "ACM") {
        paperScore += 8;
    }
    else if (paper.association === "Springer") {
        paperScore += 6;
    }
    else {
        paperScore += 4;
    }
    if (paper.isIndexed) {

        if (paper.SJR_INDEX > 30) {
            paperScore += 70;
        }
        else if (paper.SJR_INDEX > 10) {
            paperScore += 40;
        }
        else if (paper.SJR_INDEX > 5) {
            paperScore += 30;
        }
        else {
            paperScore += 20;
        }
        paperScore += paper.H_INDEX / 100; //TODO: review later
    }
    else {
        paperScore += 10;
    }

    if (paper.auth_h_index != -1) {
        paperScore += paper.auth_h_index / 10; //TODO: review later
    }
    return paperScore;
}
router.get('/association', auth, async (req, res) => {
    const assoc = await scrapeAssociation(req.query.doi);
    res.status(200).json(assoc);
});

router.post('/submit', auth, async (req, res) => {
    // manual test set up 
    // req.body = {
    //     "association": "ACM",
    //     "title": "Something ABC",
    //     "journal_conf_name": "Econometrica",
    //     "type": "Journal",
    //     "DOI": "https://doi.org/10.1145/1741906.1742236"
    // }
    try {
        var paper = {};

        var paper_info = req.body;
        console.log(paper_info);
        var authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user_id = decoded._id;
        //fetch user using user_id
        const user = await User.findById(user_id);
        paper.association = paper_info.association;
        paper.title = paper_info.title;
        paper.journal_conf_name = paper_info.journal_conf_name;
        console.log(paper.journal_conf_name); 
        if(paper.journal_conf_name === undefined || paper.journal_conf_name === null || paper.journal_conf_name === ""){
            return res.status(400).json({ "message": "Journal/Conference name is required" });
        }
        paper.type = paper_info.type;
        paper.DOI = paper_info.DOI;


        paper.author_name = user.username;
        paper.author_user_id = user_id;




        //paper.isInternationalConf = paper_info.isInternationalConf;
        //var x = await scrapeAssociation("https://doi.org/10.1007/978-3-030-32245-8_1");



        var scrape = await scrapeInfo(paper.author_name, paper.journal_conf_name);
        paper.isIndexed = scrape.isIndexed;
        if (paper.isIndexed) {
            paper.SJR_INDEX = scrape.SJR_INDEX;
            paper.H_INDEX = scrape.H_INDEX;
        }
        paper.auth_h_index = scrape.auth_h_index;
        var paperScore = await generateMarks(paper);
        paper.Paper_Score = paperScore;
        
        //save the paper to the database
        var newPaper = new Paper(paper);
       var success = await newPaper.save();
        
       if (success) {
            //update user with user_id 
            user.author_h_index = scrape.auth_h_index;
            user.total_submissions += 1;
            await user.save(); 
            res.status(200).json({message: "Paper submitted successfully", paperScore: paperScore});
        }
        else{
            res.status(401).json({message: "Paper submission failed please try again later"})
        }
        //res.send();   

    } catch (e) {
        console.log(e);
        res.status(500).send("Internal Server Error");
    }



});






module.exports = router;