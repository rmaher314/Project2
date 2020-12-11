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
    var uniqueDivisionArray=[];
    var opt;
    for (var i = 0; i < race_stats.length; i++) {
        opt = race_stats[i].Division;
        if(!uniqueDivisionArray.includes(opt)){
            console.log("Unique division name found: " + opt);
            uniqueDivisionArray.push(opt);
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


// map data pull

d3.json("/api/world_map").then((map_data) => {
    var counts ={};
    for(var i =0; i < map_data.length; i++) {
        counts[map_data[i].Country] = 1 + (counts[map_data[i].Country] || 0);
    }
});
function createMap(homeCountry) {

    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "light-v10",
        accessToken: API_KEY
      });

    var baseMaps = {
    "Light Map": lightmap
    };

    var ovlerlayMaps = {
    "Home Country": homeCountry
    };

    var map = L.map("world", {
    center: [15.5594, -28.6731],
    zoom: 2,
    layers: [lightmap, homeCountry]
    });

    L.contol.layers(baseMaps, ovlerlayMaps, {
    collapsed: false
    }).addTo(map);
}

function createMarkers(response) {

    var world_map = response.data.world_map;

    var countryMarkers = []

    for (var index = 0; index < world_map.length; index++) {
        var worldMap = world_map[index];

        var countryMarker = L.marker([worldMap.Latitude_average, worldMap.Longitude_average])
            .bindPopup("<h3>" + worldMap.country + "<h3><h3>Total Competitors: " + counts +"</h3>");

        countryMarkers.push(countryMarker);
    }

    createMap(L.layerGroup(countryMarkers));
}

d3.json("/api/world_map", createMarkers);
