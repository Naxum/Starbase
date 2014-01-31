//Stats functions
var Resources = [
	{ name: "money", amount: 0, $element:$("#money") },
	{ name: "power", amount: 0, $element:$("#power") },
	{ name: "science", amount: 0, $element:$("#science") },
	{ name: "command", amount: 0, $element:$("#command") },
	{ name: "crystals", amount: 0, $element:$("#crystals") }
];

function addResource(resourceObj){
	var index = 0;
	for(; index < Resources.length; index++) {
		if(Resources[index].name == resourceObj.name) break;
	}
	
	Resources[index].amount += resourceObj.amount;
	Resources[index].$element.text(Resources[index].amount);
}