$(document).ready(function() {
	function makeChar(n, i, h, a, c) {
		this.name = n;
		this.img = i;
		this.hp = h;
		this.attack = a;
		this.counterAttack = c;
	}
	var characters = {
		aang : new makeChar('Aang', 'assets/images/aang.png', 80, 30, 15),
		katara : new makeChar('Katara', 'assets/images/katara.png', 50, 20, 10),
		sokka : new makeChar('Sokka', 'assets/images/sokka.png', 100, 20, 15),
		zuko : new makeChar('Zuko', 'assets/images/zuko.png', 80, 30, 12),
		toph : new makeChar('Toph', 'assets/images/toph.png', 100, 25, 10),
		azula : new makeChar('Azula', 'assets/images/azula.png', 70, 35, 20)
	};

	var charArray = Object.keys(characters); // array of character objects
	var remainingChars = charArray;
	var hero; // character chosen by user
	var opponent; 
	var nextChar; //used for generating divs with characters in them; passed into displayChar()


/********************************************
	DISPLAY CHARACTER
********************************************/
	for (i=0; i<charArray.length; i++) {
		$("#instructions").html("Choose your character.");
		$(".row2").append(displayChar(characters[charArray[i]].img, characters[charArray[i]].name, characters[charArray[i]].hp, characters[charArray[i]].attack, "pickHero"));
	}

	function displayChar(displayImg, displayName, displayHp, displayAttack, round){
		var displayBlock = $("<div>");
		displayBlock.addClass("charBox").addClass(round);
		displayBlock.attr("id", displayName.toLowerCase());
		displayBlock.html('<img src="' + displayImg + '" alt="' + displayName + '"> <h3>' + displayName +'</h3><p>Health: ' + displayHp + "<br>Attack: " + displayAttack + "</p>");
		return displayBlock;
	};

/********************************************
	CHOOSE CHARACTER
*********************************************/
	$(".pickHero").on("click", function(){
		hero = characters[$(this).attr("id")];
		$(".row2").empty();
		$(".row2").append(displayChar(hero.img, hero.name, hero.hp, hero.attack, "hero"));
		remainingChars.splice(remainingChars.indexOf(hero.name.toLowerCase()), 1);
		for (i=0; i<remainingChars.length; i++) {
			$("#instructions").html("Choose your opponent.");
			$(".row3").append(displayChar(characters[remainingChars[i]].img, characters[remainingChars[i]].name, characters[remainingChars[i]].hp, characters[remainingChars[i]].attack, "pickOpp"));
		}
		//$(this).blur(); //doesn't seem to affect anything
	});

/********************************************
	CHOOSE OPPONENT
*********************************************/
	$(".pickOpp").on("click", function(){
		console.log("hi");
		opponent = characters[$(this).attr("id")];
		$(".row3").empty();
		$(".row2").append(displayChar(opponent.img, opponent.name, opponent.hp, opponent.attack, "opponent"));
		remainingChars.splice(remainingChars.indexOf(opponent.name.toLowerCase()), 1);
		for (i=0; i<remainingChars.length; i++) {
			$("#instructions").html("Attack your opponent!");
			$(".row4").append(displayChar(characters[remainingChars[i]].img, characters[remainingChars[i]].name, characters[remainingChars[i]].hp, characters[remainingChars[i]].attack, "nextOpp"));
		}
	});
});