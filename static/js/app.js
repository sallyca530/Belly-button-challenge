// get url data
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'


// confirm retrieval of data
const dataPromise = d3.json(url);
    console.log("Data Promise: ", dataPromise);
