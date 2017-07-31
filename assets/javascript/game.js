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

	var charArray; // array of character objects
	var remainingChars;
	var hero; // character chosen by user
	var opponent; 
	var nextChar; //used for generating divs with characters in them; passed into displayChar()


/********************************************
	DISPLAY CHARACTER(S)
********************************************/
	startGame();

	function startGame(){
		// For restarting game
		$(".row2").empty();
		$(".row3").empty();
		$("#playAgain").css("display", "none");

		// Set up characters
		charArray = Object.keys(characters)
		remainingChars = charArray;
		for (i=0; i<charArray.length; i++) {
			$("#instructions").html("Choose your character.");
			$(".row2").append(displayChar(characters[charArray[i]].img, characters[charArray[i]].name, characters[charArray[i]].hp, characters[charArray[i]].attack, "pickHero"));
		}
	}

	function displayChar(displayImg, displayName, displayHp, displayAttack, round){
		var displayBlock = $("<div>");
		displayBlock.addClass("charBox").addClass(round);
		displayBlock.attr("id", displayName.toLowerCase());
		displayBlock.html('<img src="' + displayImg + '" alt="' + displayName + '"> <h3>' + displayName +'</h3><p>Health: ' + displayHp + '<br>Attack: ' + displayAttack + '</p>');
		return displayBlock;
	};

/********************************************
	CHOOSE CHARACTER
*********************************************/
	$(document).on("click", ".pickHero", function(){
		hero = characters[$(this).attr("id")];
		$(".row2").empty();
		$(".row2").append(displayChar(hero.img, hero.name, hero.hp, hero.attack, "hero"));
		remainingChars.splice(remainingChars.indexOf(hero.name.toLowerCase()), 1);
		$("#instructions").html("Choose your opponent.");
		for (i=0; i<remainingChars.length; i++) {
			$(".row3").append(displayChar(characters[remainingChars[i]].img, characters[remainingChars[i]].name, characters[remainingChars[i]].hp, characters[remainingChars[i]].counterAttack, "pickOpp"));
		}
		//$(this).blur(); //doesn't seem to affect anything
	});

/********************************************
	CHOOSE OPPONENT
*********************************************/
	$(document).on("click", ".pickOpp", function(){
		opponent = characters[$(this).attr("id")];
		$(".row3").empty();
		$(".row2").append("<h3 id='vs'>VS</h3>");
		$(".row2").append(displayChar(opponent.img, opponent.name, opponent.hp, opponent.counterAttack, "opponent"));
		remainingChars.splice(remainingChars.indexOf(opponent.name.toLowerCase()), 1);
		$("#instructions").html("Attack your opponent!");
		for (i=0; i<remainingChars.length; i++) {
			$(".row3").append(displayChar(characters[remainingChars[i]].img, characters[remainingChars[i]].name, characters[remainingChars[i]].hp, characters[remainingChars[i]].counterAttack, "nextOpp"));
		}
		$("#attackBtn").css("display", "inline-block");
	});

/********************************************
	ATTACK OPPONENT
********************************************/
	$(document).on("click", "#attackBtn", function(){
		//Attack and change stats
		opponent.hp -= hero.attack;
		hero.hp -= opponent.counterAttack;
		hero.attack += characters[hero.name.toLowerCase()].attack;
		console.log("hi");

		// Reprint with new stat values
		$(".row2").empty();
		$(".row2").append(displayChar(hero.img, hero.name, hero.hp, hero.attack, "hero"));
		$(".row2").append("<h3 id='vs'>VS</h3>");
		$(".row2").append(displayChar(opponent.img, opponent.name, opponent.hp, opponent.counterAttack, "opponent"));
		console.log("hi2")


		// Lose condition
		if (hero.hp<=0) {
			$("#instructions").html(hero.name + " has no health left! You lose.");
			$("#attackBtn").css("display", "none");
			$("#playAgain").css("display", "inline-block");
		}
		else if (opponent.hp <= 0) {
			$("#instructions").html(opponent.name + " has no health left! You win this round.<br>Pick a new opponent.");
			$("#attackBtn").css("display", "none");
			$(".row3").empty();
			$(".opponent").remove();
			$("#vs").remove();
			for (i=0; i<remainingChars.length; i++) {
				$(".row3").append(displayChar(characters[remainingChars[i]].img, characters[remainingChars[i]].name, characters[remainingChars[i]].hp, characters[remainingChars[i]].counterAttack, "pickOpp"));
			}
			console.log(remainingChars[0]);
			console.log(opponent.hp);

			// //Win condition
			// if (remainingChars[0] ==='undefined' && opponent.hp <=0){
			// 	$("#instructions").html("You have defeated all opponents! You win!");
			// 	$("#attackBtn").css("display", "none");
			// 	$("#playAgain").css("display", "inline-block");
			// }
		}

	});

/********************************************
	RESTART GAME
********************************************/
	$(document).on("click", "#playAgain", function(){
		startGame();
	});




});