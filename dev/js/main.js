//main javascript file!
var dicks = "Woah!";
console.log("Dang!" + dicks); 

$(function(){
	for(var i = 0; i < 5; i++)
	{
		var building = $("<div class='building'></div>");
		building.css("transform", "translate(" + ((i * 20) + (i * 300) + 20) + "px, 0px)");
		$("#buildings").append(building);
	}
});