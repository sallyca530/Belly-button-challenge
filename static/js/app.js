// get url data
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'


// confirm retrieval of data
const dataPromise = d3.json(url);
    console.log("Data Promise: ", dataPromise);


// //////////////////////////////////////////////////////////////////
// Pull the Json data 
// Sample data function for the "demographics info"
function demoInfo(id) {
    d3.json(url).then(function (data) {
        // define variables 
        let sampleData = data;
        // get metadata
        let metadata = sampleData.metadata;
        // filter sample IDs
        let ID = metadata.filter(sample =>
            sample.id.toString() === id)[0];
        // display/panel info
        let demoPanel = d3.select('#sample-metadata');
        demoPanel.html('');
        // returns the each test subjects ID demographic info
        Object.entries(ID).forEach(([key, value]) => {
            demoPanel.append('h6').text(`${key}: ${value}`);
        })
    })
};
