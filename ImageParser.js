const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');

// Step 1: Read the contents of the file
const allContents = fs.readFileSync('text.txt', 'utf-8');

// Step 2: Get all the links from the file
const links = allContents.match(/https?:\/\/[^\s]+/g);
fs.writeFileSync("links.txt", "") // Clear the file

// Step 3: Process each link sequentially
links.forEach((link, index) => {
  axios.get(link)
    .then(response => {
        // Find id="img"
        const $ = cheerio.load(response.data);
        const img = $('#img').attr('src');
        // Make new file with all links
        fs.appendFileSync('links.txt', `\"${img}\"\n`);
    })
    .catch(error => {
      console.log(`Error fetching link ${index + 1}: ${link}`, error);
    });
});
