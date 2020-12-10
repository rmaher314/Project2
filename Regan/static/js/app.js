var tbody = d3.select("tbody");




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

    //looping through raw data and only putting unique Divisions in the array
    for (var i = 0; i < race_stats.length; i++) {
        opt = race_stats[i].Division;
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

  updateTopTenTable(selectedOption);  
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

// The following code is for the table output.


