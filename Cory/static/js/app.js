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
}  

init();



// // Drop Down Menu Event Handler
d3.selectAll("#selDataset").on("change", updatePage);

function updatePage() {
  // Use D3 to select the dropdown menu
  var dropdownMenu = d3.selectAll("#selDataset").node();

  // Assign the dropdown menu option to a variable
  var selectedOption = dropdownMenu.value;
  console.log("option selected: " + selectedOption);

  //TODO - call functions with selected data
  //updateGraph(selectedOption);    


}

// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 20, left: 50},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#bar")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

d3.json("/api/bar_chart").then((data) => {  
    var keys = [];
    for (key in data[0]){
        if (key != 'division')
            keys.push(key);
    }
    console.log(keys)
    console.log(data)
    
    // make each subgroup have its own color
    colors = d3.scaleOrdinal()
        .domain(keys)
        .range(['#377eb8','#e41a1c','#4daf4a'])
});








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
   
