

// Setting the intial INT run the drop down function.  

// function init(){
//     d3.json("./data/ironman.sqlite").then((data) => {      
//     nameArray = data.names;
//     var ddlItems = document.getElementById("selDataset")

//         for (var i = 0; i < nameArray.length; i++) {
//             var opt = nameArray[i];
//             var element = document.createElement("option");
//             element.textContent = opt;
//             element.value = opt;
//             ddlItems.appendChild(element);
//           }
//     })    
// }  

// init();

d3.json("/api/race_stats", function(race_stats) { 
    console.log(race_stats);

// Drop Down Menu Event Handler
d3.selectAll("#selDataset").on("change", updatePage);

function updatePage() {
  // Use D3 to select the dropdown menu
  var dropdownMenu = d3.selectAll("#selDataset").node();
  // Assign the dropdown menu item ID to a variable
  var dropdownMenuID = dropdownMenu.id;
 
  // Assign the dropdown menu option to a variable
  var selectedOption = dropdownMenu.value;


  d3.json("./data/ironman.sqlite").then((data) => {      
    metaArray = data.metadata; 
    var id = "ID: ";
    //division  is the ID in the index
    var demotable = d3.select("#division");
    demotable.html("");
    for (var i = 0; i < metaArray.length; i++) {
        if (metaArray[i].id == selectedOption){
            demotable.append("h5"). text(id + selectedOption);
            var ethnicity = "ETHNICITY: " + metaArray[i].ethnicity;
            demotable.append("h5"). text(ethnicity);
            var gender = "GENDER: " + metaArray[i].gender;
            demotable.append("h5"). text(gender);
            var age = "AGE: " + metaArray[i].age;
            demotable.append("h5"). text(age);
            var location = "LOCATION: " + metaArray[i].location
            demotable.append("h5"). text(location);
            var bbtype = "BBTYPE: " + metaArray[i].bbtype
            demotable.append("h5"). text(bbtype);
            var wfreq = "WFREQ: " + metaArray[i].wfreq
            demotable.append("h5"). text(wfreq);

        }
    }
    updateCharts(selectedOption);
})    
}

//Bar Chart Code
function updateCharts(id) {
    console.log("update Charts called for id: " + id)
    // Use D3 to select the dropdown menu
      
    d3.json("./samples.json").then((data) => { 
        bacteriaArray = data.samples; 
        for (var i = 0; i < bacteriaArray.length; i++) {
            if (bacteriaArray[i].id == id){

                console.log("match found");
                otuId = bacteriaArray[i].otu_ids;
                samplesData = bacteriaArray[i].sample_values;
                otuLabels = bacteriaArray[i].otu_labels;
                
                var sortedId=[], sortedLabel=[];
                for(var j=0; j<10; j++){
               
                    sortedId.push("OTU " + otuId[j]);
                    sortedLabel.push(samplesData[j]);
                    
                    
                }
                sortedId.reverse();
                sortedLabel.reverse();
                    
                var trace1 ={
                    x: sortedLabel,
                    y: sortedId,
                    type: "bar",
                    orientation: 'h'
                };

                var plotdata = [trace1];
                var layout = {
                    title: "Top 10 Bacteria Cultures Found"
                };
                        
                Plotly.newPlot("bar", plotdata, layout);

                var desired_maximum_marker_size = 40;

                var trace2 = {
                    x: otuId,
                    y: samplesData,
                    mode: 'markers',
                    marker: {
                         size: samplesData,
                         color: otuId,
                         colorscale: "Viridis",
                         sizeref: 2.0 * Math.max(samplesData) / (desired_maximum_marker_size**2)
                     }
                };
                
                var bubbledata = [trace2];
                
                var layout2 = {
                    title: 'Bacteria Cultures Per Sample',
                    xaxis: {
                        title: {
                          text: 'OTU ID'
                        }
                    },
                    showlegend: false
                   
                };
                
                Plotly.newPlot('bubble', bubbledata, layout2);


            }


            }
        
    })
}
   