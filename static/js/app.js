// get url data
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'

// //////////////////////////////////////////////////////////////////
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

// //////////////////////////////////////////////////////////////////
// Create plots
function plotCreation(id) {
 d3.json(url).then(function (data) {
    // define variables
    let sampleData = data;
    // get samples data
    let samples = sampleData.samples;
    // filter each sample
    let ID = samples.filter(sample => sample.id === id);
    let filteredSample = ID[0];
    // call OTU ids/values
    let OTUvalues = filteredSample.sample_values.slice(0, 10).reverse();
    let OTUids = filteredSample.otu_ids.slice(0, 10).reverse();
    // add OTU labels 
    let labels = filteredSample.otu_labels.slice(0, 10).reverse();
    ////////////////////////////////////////////////////////////
    // Bar Chart Info
    // trace info - for selected id (test subject)
    let barTrace = {
        x: OTUvalues,
        y: OTUids.map(object => 'OTU ' + object),
        name: labels,
        type: 'bar',
        orientation: 'h'
    };
    // bar chart layout
    let barLayout = {
        title: `Test Subject No. ${id}`,
    };
    // bar chart plotting
    let barData = [barTrace];
     Plotly.newPlot('bar', barData, barLayout);
    ////////////////////////////////////////////////////////////
    // Bubble Chart info
    // trace info - for selected id (test subject)
    let bubbleTrace = {
        x: filteredSample.otu_ids,
        y: filteredSample.sample_values,
        mode: 'markers',
        marker: {
            size: filteredSample.sample_values,
            color: filteredSample.otu_ids,
            colorscale: 'Earth'
            },
        text: filteredSample.otu_labels,
    };
    // Bubble chart layout
    let bubbleLayout = {
        title: `Test Subject No. ${id}`,
        xaxis: { title: 'OTU ID' },
    };
    // Bubble chart plotting
    let bubbleData = [bubbleTrace];
    Plotly.newPlot('bubble', bubbleData, bubbleLayout);
 })
};

// //////////////////////////////////////////////////////////////////
// Initialize dropdown menu function
function init() {
    let dropDown = d3.select('#selDataset');
    let id = dropDown.property('value');
    d3.json(url).then(function(data) {
        // define variables
        let sampleData = data;
        // get names data
        let names = sampleData.names;
        // get samples data
        let samples = sampleData.samples;
        Object.values(names).forEach(value => {
            dropDown.append('option').text(value);
        })
        // reflect on demographic info and plots
        demoInfo(names[0]);
        plotCreation(names[0])
    })
};

// ///////////////////////////////////////////////////////////////////
// Changed sample
function optionChanged(id) {
    plotCreation(id);
    demoInfo(id);
};

// //////////////////////////////////////////////////////////////////
// Initialize page
init();