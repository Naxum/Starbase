var SectionDefaults = {
	"version": 1,
	"rooms": [
		{
			"name": "Room",
			"description": "Room description, what it does.",
			"cost": [
				{ "name": "money", "amount": 50 }
			],
			"resources" : [
				{ "name": "money", "amount": 5 },
				{ "name": "power", "amount": 2 },
				{ "name": "command", "amount": 1 }
			],
			"terminals" : [
				{ "faction": 0, "unitId": "" },
				{ "faction": 2,	"unitId": "" }
			]
		},
		{
			"name": "Room 2",
			"description": "Room description, what it does.",
			"cost": [
				{ "name": "money", "amount": 50 }
			],
			"resources" : [
				{ "name": "money", "amount": 20 },
				{ "name": "power", "amount": 5 },
				{ "name": "command", "amount": 8 },
				{ "name": "crystals", "amount": 1 }
			],
			"terminals" : [
				{ "faction": 0, "unitId": "" },
				{ "faction": 1,	"unitId": "" },
				{ "faction": 3,	"unitId": "" },
				{ "faction": 2,	"unitId": "" }
			]
		},
		{
			"name": "Telemarketer Office",
			"description": "Make meager money working a meager business.",
			"cost": [
				{ "name": "money", "amount": 50 }
			],
			"resources" : [
				{ "name": "money", "amount": 1 }
			],
			"terminals" : [
				{ "faction": 0, "unitId": "" }
			]
		}
	]
};