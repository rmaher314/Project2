var tbody = d3.select("tbody");

// d3.json("/api/race_stats").then((race_stats) => {      
//     console.log(race_stats);
// }) ;   

// Setting the intial INT run the drop down function.  
function init(){
    // create dropdown
    d3.json("/api/race_stats").then((race_stats) => {   
        console.log(race_stats)   
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
    d3.json("/api/bar_chart/initial").then((bar_data) => {
        console.log(bar_data)
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

        var trace1 = {
            x: ['F18-24','F25-29','F30-34','F35-39','F40-44','F45-49','F50-54','F55-59','F60-64','F65-69','F70-74','FPRO'],
            y: swim,
            name: 'Swim',
            type: 'bar'
        }
        var trace2 = {
            x: ['F18-24','F25-29','F30-34','F35-39','F40-44','F45-49','F50-54','F55-59','F60-64','F65-69','F70-74','FPRO'],
            y: bike,
            name: 'Bike',
            type: 'bar',
            // marker: {
            //     opacity: 
            // }
        }
        var trace3 = {
            x: ['F18-24','F25-29','F30-34','F35-39','F40-44','F45-49','F50-54','F55-59','F60-64','F65-69','F70-74','FPRO'],
            y: run,
            name: 'Run',
            type: 'bar'
        }

        var traceData = [trace1, trace2, trace3]

        var layout = {barmode: 'stack'};
    
        Plotly.newPlot('bar', traceData, layout)
    });

    var myMap = L.map("world", {
        center: [15.5994, -28.6731],
        zoom:2
    });
    
    L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: "mapbox/streets-v11",
      accessToken: API_KEY
    }).addTo(myMap);

    // d3.json("/api/world_map").then((map_data) => {
    //     var markers = L.markerClusterGroup();

    //     for (var i = 0; i < map_data.length; i++) {
    //         var latitude = map_data[i].Latitude_average
    //         var longitude = map_data[i].Longitude_average

            

    //         if (latitude) {
    //             markers.addLayer( L.marker([latitude, longitude])
    //                 .bindPopup("<h3>Country: " + map_data[i].Country + "</h3>"))
    //         }
    //     }
    //     myMap.addLayer(markers)
    // })
    
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
  updateBarGraph(selectedOption);  
  
}

function updateBarGraph(selectedOption) {
    // Create initial bar graph
  d3.json("/api/bar_chart/" + selectedOption).then((bar_data) => {

    // push all swim values to an array and convert seconds to hours
    var swim = []
    bar_data.forEach(function(data) {
        swim.push(data.Swim)
    })
    // push all bike values to an array and convert seconds to hours
    var bike = []
    bar_data.forEach(function(data) {
        bike.push(data.Bike)
    })
    // push all run values to an array and convert seconds to hours
    var run = []
    bar_data.forEach(function(data) {
        run.push(data.Run)
    })
    // if females division is selected then display all female divisions
    if (selectedOption.charAt(0) === 'F') {
        var trace_swim = {
            x: ['F18-24','F25-29','F30-34','F35-39','F40-44','F45-49','F50-54','F55-59','F60-64','F65-69','F70-74','FPRO'],
            y: swim,
            name: 'Swim',
            type: 'bar'
        }
        var trace_bike = {
            x: ['F18-24','F25-29','F30-34','F35-39','F40-44','F45-49','F50-54','F55-59','F60-64','F65-69','F70-74','FPRO'],
            y: bike,
            name: 'Bike',
            type: 'bar',
        }
        var trace_run = {
            x: ['F18-24','F25-29','F30-34','F35-39','F40-44','F45-49','F50-54','F55-59','F60-64','F65-69','F70-74','FPRO'],
            y: run,
            name: 'Run',
            type: 'bar'
        }
    }
    // if males division is selected then display all male divisions
    else {
        var trace_swim = {
            x: ['M18-24','M25-29','M30-34','M35-39','M40-44','M45-49','M50-54','M55-59','M60-64','M65-69','M70-74','M75-79','M80-84','MPRO'],
            y: swim,
            name: 'Swim',
            type: 'bar'
        }
        var trace_bike = {
            x: ['M18-24','M25-29','M30-34','M35-39','M40-44','M45-49','M50-54','M55-59','M60-64','M65-69','M70-74','M75-79','M80-84','MPRO'],
            y: bike,
            name: 'Bike',
            type: 'bar',
        }
        var trace_run = {
            x: ['M18-24','M25-29','M30-34','M35-39','M40-44','M45-49','M50-54','M55-59','M60-64','M65-69','M70-74','M75-79','M80-84','MPRO'],
            y: run,
            name: 'Run',
            type: 'bar'
        }
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
   

// function createMap(racers) {

//     // Create the tile layer that will be the background of our map
//     var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//       attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//       maxZoom: 18,
//       id: "light-v10",
//       accessToken: API_KEY
//     });
  
//     // Create a baseMaps object to hold the lightmap layer
//     var baseMaps = {
//       "Light Map": lightmap
//     };
//     // Create an overlayMaps object to hold the bikeStations layer
//     var overlayMaps = {
//         "Racers": racers
//     };
//     // Create the map object with options
//     var map = L.map("map-id", {
//         center: [40.73, -74.0059],
//         zoom: 2,
//         layers: [lightmap, racers]
//     });
    
//     // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
//     L.control.layers(baseMaps, overlayMaps, {
//       collapsed: false
//     }).addTo(map);
// }

// function createMarkers(map_stats) {
//     console.log(map_stats)

//         // var counts = {};
//         // for(var i =0; i < map_stats.length; i++) {
//         //     counts[map_stats[i].Country] = 1 + (counts[map_stats[i].Country] || 0);
//         // }


            
//         // Initialize an array to hold bike markers
//         var racerMarkers = [];
    
//         // Loop through the stations array
//         map_stats.forEach(function(racer) {
        
//             // For each station, create a marker and bind a popup with the station's name
//             var racerMarker = L.marker([racer.Latitude_average, racer.Longitude_average])
//                 .bindPopup("<h3>" + racer.Country + "<h3>");
        
//             // Add the marker to the bikeMarkers array
//             racerMarkers.push(racerMarker);
//         });
    
//         // Create a layer group made from the bike markers array, pass it into the createMap function
//         createMap(L.layerGroup(racerMarkers));
    
// }

