//Stats functions

var $money = $("#money");
var $crystals = $("#crystals");
var $power = $("#power");
var $science = $("#science");
var $command = $("#command");

function changeMoney(amount){
	money += amount;
	
	if(money < 0) money = 0;
	
	$money.text(money);
}

function refreshStats(){
	$money.text(money);
	$crystals.text(crystals);
	$power.text(power);
	$science.text(science);
	$command.text(command);
}

function resetTimerBar(){
	$('#timer').css({
		width: '0px'
	});
	
	$('#timer').transition({
		width: '100%'
	}, currentTimeout, 'linear');
}