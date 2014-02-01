//Stats functions
var Resources = [
	{ name: "money", amount: 0, $element:$("#money"), animating: false },
	{ name: "power", amount: 0, $element:$("#power"), animating: false },
	{ name: "science", amount: 0, $element:$("#science"), animating: false },
	{ name: "command", amount: 0, $element:$("#command"), animating: false },
	{ name: "crystals", amount: 0, $element:$("#crystals"), animating: false }
];

function addResource(resourceObj){
	var index = 0;
	for(; index < Resources.length; index++) {
		if(Resources[index].name == resourceObj.name) break;
	}
	
	Resources[index].amount += resourceObj.amount;
	Resources[index].$element.text(Resources[index].amount);
	
	if(!Resources[index].animating) {
		Resources[index].animating = true;
		
		Resources[index].$element.transition({"background-color":"green", "scale": 1.2}).transition({"background-color":"white", "scale": 1}, function(){
			Resources[index].animating = false;
		});
	}
}