//This was the original code the next line of code seems to work and out put with no errors.
// d3.json("/api/race_stats", function(race_stats) { 
//     console.log(race_stats);
// });


d3.json("/api/race_stats").then((race_stats) => {      
    console.log(race_stats);

}) ;   

// Setting the intial INT run the drop down function.  

function init(){
    d3.json("/api/race_stats").then((race_stats) => {      
    // divisionArray = race_stats.Division;
    var ddlItems = document.getElementById("selDataset")
    // create empty array for each unique division
    var uniqueDivisionArray=[];

    for (var i = 0; i < race_stats.length; i++) {
        // create opt variable to loop through each division
        var opt = race_stats[i].Division;
        // find each unique division and push it to our uniqueDivisionArray
        if(!uniqueDivisionArray.includes(opt)){
            console.log("Unique division name found: " + opt);
            uniqueDivisionArray.push(opt);
            // for each unique division, create an element in the dropdown
            var element = document.createElement("option");
            element.textContent = opt;
            element.value = opt;
            ddlItems.appendChild(element);
        }        
    }
    })    

    // Create initial bar graph
    d3.json("/api/bar_chart").then((bar_data) => {

        var swim = []
        bar_data.forEach(function(data) {
            swim.push(data.Swim / 3600)
        })

        var bike = []
        bar_data.forEach(function(data) {
            bike.push(data.Bike / 3600)
        })
    
        var run = []
        bar_data.forEach(function(data) {
            run.push(data.Run / 3600)
        })

        // var bike = []
        // bar_data.forEach(function(data) {
        //     bike.push(data.Bike)
        // })
    
        // var run = []
        // bar_data.forEach(function(data) {
        //     run.push(data.Run)
        // })

        var trace1 = {
            x: ['F18-24','F25-29','F30-34','F35-39','F40-44','F45-49','F50-54','F55-59','F60-64','F65-69','F70-74','FPRO','M18-24','M25-29','M30-34','M35-39','M40-44','M45-49','M50-54','M55-59','M60-64','M65-69','M70-74','M75-79','M80-84','MPRO'],
            y: swim,
            name: 'Swim',
            type: 'bar'
        }
        var trace2 = {
            x: ['F18-24','F25-29','F30-34','F35-39','F40-44','F45-49','F50-54','F55-59','F60-64','F65-69','F70-74','FPRO','M18-24','M25-29','M30-34','M35-39','M40-44','M45-49','M50-54','M55-59','M60-64','M65-69','M70-74','M75-79','M80-84','MPRO'],
            y: bike,
            name: 'Bike',
            type: 'bar',
            // marker: {
            //     opacity: 
            // }
        }
        var trace3 = {
            x: ['F18-24','F25-29','F30-34','F35-39','F40-44','F45-49','F50-54','F55-59','F60-64','F65-69','F70-74','FPRO','M18-24','M25-29','M30-34','M35-39','M40-44','M45-49','M50-54','M55-59','M60-64','M65-69','M70-74','M75-79','M80-84','MPRO'],
            y: run,
            name: 'Run',
            type: 'bar'
        }

        var traceData = [trace1, trace2, trace3]

        var layout = {barmode: 'stack'};
    
        Plotly.newPlot('bar', traceData, layout)
    });
}  

init();



// // Drop Down Menu Event Handler
d3.selectAll("#selDataset").on("change", updatePage);

function updatePage() {
  // Use D3 to select the dropdown menu
  var dropdownMenu = d3.selectAll("#selDataset");

  // Assign the dropdown menu option to a variable
  var selectedOption = dropdownMenu.property("value");
  console.log("option selected: " + selectedOption);

  //TODO - call functions with selected data
  //updateGraph(selectedOption);    

  // loop through each division and map the swim, bike and run times into an array for each trace
  d3.json("/api/bar_chart").then((bar_data) => {


    // possibly add if statement so if they select female category we only show all of the women divisions
    // I need 3 traces one for swim, bike and run
    // y will be all of the race leg times for all divisions 
    var swim = []
    bar_data.forEach(function(data) {
        swim.push(data.Swim)
    })

    var bike = []
    bar_data.forEach(function(data) {
        bike.push(data.Bike)
    })

    var run = []
    bar_data.forEach(function(data) {
        run.push(data.Run)
    })

    console.log(swim)

    // create swim bars
    var trace_swim = {
        x: ['F18-24','F25-29','F30-34','F35-39','F40-44','F45-49','F50-54','F55-59','F60-64','F65-69','F70-74','FPRO','M18-24','M25-29','M30-34','M35-39','M40-44','M45-49','M50-54','M55-59','M60-64','M65-69','M70-74','M75-79','M80-84','MPRO'],
        y: swim,
        name: 'Swim',
        type: 'bar'
    }

    var trace_bike = {
        x: ['F18-24','F25-29','F30-34','F35-39','F40-44','F45-49','F50-54','F55-59','F60-64','F65-69','F70-74','FPRO','M18-24','M25-29','M30-34','M35-39','M40-44','M45-49','M50-54','M55-59','M60-64','M65-69','M70-74','M75-79','M80-84','MPRO'],
        y: bike,
        name: 'Bike',
        type: 'bar'
    }

    var trace_run = {
        x: ['F18-24','F25-29','F30-34','F35-39','F40-44','F45-49','F50-54','F55-59','F60-64','F65-69','F70-74','FPRO','M18-24','M25-29','M30-34','M35-39','M40-44','M45-49','M50-54','M55-59','M60-64','M65-69','M70-74','M75-79','M80-84','MPRO'],
        y: run,
        name: 'Run',
        type: 'bar'
    }

    var traceData = [trace_swim, trace_bike, trace_run]

    var layout = {barmode: 'stack'};

    Plotly.newPlot('bar', traceData, layout)
  });
}

// 'M18-24','M25-29','M30-34','M35-39','M40-44','M45-49','M50-54','M55-59','M60-64','M65-69','M70-74','M75-79','M80-84','MPRO'


// // Define SVG area dimensions
// var svgWidth = 960;
// var svgHeight = 660;

// // Define the chart's margins as an object
// var chartMargin = {
//   top: 30,
//   right: 30,
//   bottom: 30,
//   left: 30
// };

// // Define dimensions of the chart area
// var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
// var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// // append the svg object to the body of the page
// var svg = d3.select("#bar")
//   .append("svg")
//     .attr("width", svgWidth)
//     .attr("height", svgHeight)


// var chartGroup = svg.append("g")
//     .attr("transform",
//           `translate(${chartMargin.left}, ${chartMargin.top})`);

// d3.json("/api/bar_chart").then((bar_data) => {  
    
//     // cast the total seconds for each leg to a number
//     bar_data.forEach(function(data) {
//         data.Swim = +data.Swim;
//         data.Bike = +data.Bike;
//         data.Run = +data.Run;
//     });

//     // create array for our keys
//     var keys = [];
//     for (key in bar_data[0]){
//         if (key != 'Division')
//             keys.push(key);
//     }
//     console.log(keys)
//     console.log(bar_data)

//     var subgroups = bar_data.columns.slice(1)
    
//     // Configure a band scale for the x axis
//     var xScale = d3.scaleBand()
//         .domain(keys)
//         .range([0, width])

//     svg.append('g')
//         .attr("transform", `translate(0, ${chartHeight})`)
//         .call(d3.axisbottom(xScale).tickSizeOuter(0));

//     // need to figure out how to make y scale work with event handler to find max 
//     var yScale = d3.scaleLinear()
//         .domain([0, d3.max(bar_data, d => (d.Swim + d.Bike + d.Run))])
//         .range([chartHeight, 0])

//     svg.append('g')
//         .call(d3.axisleft(yScale))
    
//     // make each subgroup have its own color
//     colors = d3.scaleOrdinal()
//         .domain(keys)
//         .range(['#377eb8','#e41a1c','#4daf4a'])

//     // stack the data
//     var stackedData = d3.stack()
//         .keys(subgroups)
//         (bar_data)

//     // show the bars

// });



//get it as seconds then map over data and convert seconds into format we WebAuthentication .scalelinear






//   d3.json("../../data/ironman.sqlite").then((data) => {      
//     metaArray = data.metadata; 
//     var id = "ID: ";
//     //division  is the ID in the index
//     var demotable = d3.select("#division");
//     demotable.html("");
//     for (var i = 0; i < metaArray.length; i++) {
//         if (metaArray[i].id == selectedOption){
//             demotable.append("h5"). text(id + selectedOption);
//             var ethnicity = "ETHNICITY: " + metaArray[i].ethnicity;
//             demotable.append("h5"). text(ethnicity);
//             var gender = "GENDER: " + metaArray[i].gender;
//             demotable.append("h5"). text(gender);
//             var age = "AGE: " + metaArray[i].age;
//             demotable.append("h5"). text(age);
//             var location = "LOCATION: " + metaArray[i].location
//             demotable.append("h5"). text(location);
//             var bbtype = "BBTYPE: " + metaArray[i].bbtype
//             demotable.append("h5"). text(bbtype);
//             var wfreq = "WFREQ: " + metaArray[i].wfreq
//             demotable.append("h5"). text(wfreq);

//         }
//     }
//     updateCharts(selectedOption);
// })    


//Bar Chart Code
// function updateCharts(id) {
//     console.log("update Charts called for id: " + id)
//     // Use D3 to select the dropdown menu
      
//     d3.json("/api/race_stats".then((race_stats) => { 
//         raceArray = race_stats.Gender; 
                            
//                 var trace1 ={
//                     x: Gender,
//                     y: Division,
//                     type: "bar",
                    
//                 };

//                 var plotdata = [trace1];
//                 var layout = {
//                     title: "Hi"
//                 };
                        
//                 Plotly.newPlot("bar", plotdata, layout);

                // var desired_maximum_marker_size = 40;

                // var trace2 = {
                //     x: otuId,
                //     y: samplesData,
                //     mode: 'markers',
                //     marker: {
                //          size: samplesData,
                //          color: otuId,
                //          colorscale: "Viridis",
                //          sizeref: 2.0 * Math.max(samplesData) / (desired_maximum_marker_size**2)
                //      }
                // };
                
//                 var bubbledata = [trace2];
                
//                 var layout2 = {
//                     title: 'Bacteria Cultures Per Sample',
//                     xaxis: {
//                         title: {
//                           text: 'OTU ID'
//                         }
//                     },
//                     showlegend: false
                   
//                 };
                
//                 Plotly.newPlot('bubble', bubbledata, layout2);


//             }


//             }
        
//     })
// }
   
