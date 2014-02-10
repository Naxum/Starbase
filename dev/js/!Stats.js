//Stats functions
var Resources = [
	{ name: "money", amount: 0, $element:$("#money"), animating: false },
	{ name: "power", amount: 0, $element:$("#power"), animating: false },
	{ name: "science", amount: 0, $element:$("#science"), animating: false },
	{ name: "command", amount: 0, $element:$("#command"), animating: false }
];

function getResourceNameFromFaction(faction){
	var search = faction;
	if(faction.name != ""){
		search = faction.name;
	}
	
	if(search == "operations") return "power";
	else if(search == "civilian") return "money";
	else return search;
}

function addResource(resourceObj){
	var index = 0;
	for(; index < Resources.length; index++) {
		if(Resources[index].name == resourceObj.name) break;
	}
	
	Resources[index].amount += resourceObj.amount;
	Resources[index].$element.text(Resources[index].amount + " " + (resourceObj.amount > 0 ? "+" : "") + resourceObj.amount);
	
	if(!Resources[index].animating) {
		Resources[index].animating = true;
		
		Resources[index].$element.addClass(Resources[index].name + " animate").transition({"scale": 1.2}).transition({"scale": 1}, function(){
			Resources[index].animating = false;
			Resources[index].$element.removeClass(Resources[index].name + " animate");
			Resources[index].$element.text(Resources[index].amount);
		});
	}
}

function getResource(resourceName) {
	for(var i = 0; i < Resources.length; i++){
		if(Resources[i].name == resourceName) return Resources[i];
	}
	console.log("Could not find resource with inputted name!", resourceName);
	return null;
}