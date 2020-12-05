function init(){
    d3.json("./samples.json").then((data) => {      
    nameArray = data.names;
    var ddlItems = document.getElementById("selDataset")

        for (var i = 0; i < nameArray.length; i++) {
            var opt = nameArray[i];
            var element = document.createElement("option");
            element.textContent = opt;
            element.value = opt;
            ddlItems.appendChild(element);
          }
    })    
}  

init();