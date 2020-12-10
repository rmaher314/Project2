var tbody = d3.select("tbody");

// d3.json("/api/race_stats").then((race_stats) => {      
//     console.log(race_stats);
// }) ;   

// Setting the intial INT run the drop down function.  
function init(){
    // create dropdown
    d3.json("/api/race_stats").then((race_stats) => {      
        // divisionArray = race_stats.Division;
        var ddlItems = document.getElementById("selDataset")
        // create empty array for each unique division
        var uniqueDivisionArray=[];

        //looping through raw data and only putting unique Divisions in the array
        for (var i = 0; i < race_stats.length; i++) {
            var opt = race_stats[i].Division;
            if(!uniqueDivisionArray.includes(opt)){  //if opt is not in the array, push opt
                uniqueDivisionArray.push(opt);
            }
        }        
        uniqueDivisionArray.sort();

        //looping through sorted array and adding each element to the dropdown menu
        for (var j = 0; j < uniqueDivisionArray.length; j++){
            opt = uniqueDivisionArray[j];
            var element = document.createElement("option");
                element.textContent = opt;
                element.value = opt;
                ddlItems.appendChild(element);
        }   
    });

    // Create initial top ten table
    var list = d3.select(".divisiontable");
    list.html("");
    d3.json("/api/top_ten_table/F18-24").then((ranks) => {      
        console.log(ranks);
      
        ranks.forEach((racer) => {
            var row = tbody.append("tr");
            Object.entries(racer).forEach(([key, value]) => {
                var cell = row.append("td");
                cell.text(value);
            });
        });  
    }) ;

    // Create initial bar graph
    d3.json("/api/bar_chart").then((bar_data) => {
        // push all swim values to an array and convert seconds to hours
        var swim = []
        bar_data.forEach(function(data) {
            swim.push(data.Swim / 3600)
        })
        // push all bike values to an array and convert seconds to hours
        var bike = []
        bar_data.forEach(function(data) {
            bike.push(data.Bike / 3600)
        })
        // push all run values to an array and convert seconds to hours
        var run = []
        bar_data.forEach(function(data) {
            run.push(data.Run / 3600)
        })
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
  var dropdownMenu = d3.selectAll("#selDataset").node();

  // Assign the dropdown menu option to a variable
  var selectedOption = dropdownMenu.value;
  console.log("option selected: " + selectedOption);

  // call updateTopTenTable 
  updateTopTenTable(selectedOption); 
  //TODO - call functions with selected data
  updateBarGraph();  
  

}

function updateBarGraph() {
    // Create initial bar graph
  d3.json("/api/bar_chart").then((bar_data) => {
    // push all swim values to an array and convert seconds to hours
    var swim = []
    bar_data.forEach(function(data) {
        swim.push(data.Swim / 3600)
    })
    // push all bike values to an array and convert seconds to hours
    var bike = []
    bar_data.forEach(function(data) {
        bike.push(data.Bike / 3600)
    })
    // push all run values to an array and convert seconds to hours
    var run = []
    bar_data.forEach(function(data) {
        run.push(data.Run / 3600)
    })
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
        type: 'bar',
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

function updateTopTenTable(opt){
    var list = d3.select(".divisiontable");
    list.html("");
    console.log("option selected: " + opt);
    d3.json("/api/top_ten_table/" + opt).then((ranks) => {      
      console.log(ranks);
  
      ranks.forEach((racer) => {
          var row = tbody.append("tr");
          Object.entries(racer).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
          });
        });  
      }) ;
}
   
