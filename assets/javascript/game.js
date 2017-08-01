$(document).ready(function() {
	function makeChar(n, i, h, a, c) {
		this.name = n;
		this.img = i;
		this.hp = h;
		this.attack = a;
		this.counterAttack = c;
	}
	var characters;

	var charArray; // array of character objects
	var remainingChars;
	var hero; // character chosen by user
	var opponent; 
	var nextChar; //used for generating divs with characters in them; passed into displayChar()
	var baseAttack;


/********************************************
	DISPLAY CHARACTER(S)
********************************************/
	startGame();


	function startGame(){
		// For restarting game
		characters = {
			aang : new makeChar('Aang', 'assets/images/aang.png', 295, 10, 15),
			katara : new makeChar('Katara', 'assets/images/katara.png', 95, 40, 25),
			sokka : new makeChar('Sokka', 'assets/images/sokka.png', 55, 20, 10),
			zuko : new makeChar('Zuko', 'assets/images/zuko.png', 140, 35, 20),
			toph : new makeChar('Toph', 'assets/images/toph.png', 135, 75, 50),
			azula : new makeChar('Azula', 'assets/images/azula.png', 300, 5, 15)
		};
		$(".row2").empty();
		$("#playAgain").css("display", "none");
		partialReset();

		// Set up characters
		charArray = Object.keys(characters)
		remainingChars = charArray;
		for (i=0; i<charArray.length; i++) {
			$("#instructions").html("Choose your character.<br>Your character will have to defeat all others to win the game.");
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

	function partialReset(){
		$(".row3").empty();
		$(".row3, #divider, #attackBtn").css("display", "none");
	}

/********************************************
	CHOOSE CHARACTER
*********************************************/
	$(document).on("click", ".pickHero", function(){
		hero = characters[$(this).attr("id")];
		baseAttack = hero.attack;
		$(".row2").empty();
		$(".row2").append(displayChar(hero.img, hero.name, hero.hp, hero.attack, "hero"));
		remainingChars.splice(remainingChars.indexOf(hero.name.toLowerCase()), 1);
		$("#instructions").html("Choose your opponent.");
		$(".row3").css("display", "block")
		for (i=0; i<remainingChars.length; i++) {
			$(".row3").append(displayChar(characters[remainingChars[i]].img, characters[remainingChars[i]].name, characters[remainingChars[i]].hp, characters[remainingChars[i]].counterAttack, "pickOpp"));
		}
		$("#divider").css("display", "block");
	});

/********************************************
	CHOOSE OPPONENT
*********************************************/
	$(document).on("click", ".pickOpp", function(){
		$(".opponent, #vs").remove();
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
		hero.attack += baseAttack;
		$("#message").css("display", "block");
		$("#message").append("<p>You deliver <strong>" + hero.attack + "</strong> damage to " + opponent.name + ".<br>"
		 + opponent.name + " delivers <strong>" + opponent.counterAttack 
		 + "</strong> damage to you.<br>You gain experience, increasing your attack by <strong>" + baseAttack + "</strong>.<br></p><p id='ok'>OK</p>");

		$("#ok").on("click", function() {
			$("#message").empty();
			$("#message").css("display", "none");
			

			// Reprint with new stat values
			$(".row2").empty();
			$(".row2").append(displayChar(hero.img, hero.name, hero.hp, hero.attack, "hero"));
			$(".row2").append("<h3 id='vs'>VS</h3>");
			$(".row2").append(displayChar(opponent.img, opponent.name, opponent.hp, opponent.counterAttack, "opponent"));


			// Lose condition
			if (hero.hp<=0) {
				$("#instructions").html(hero.name + " has no health left! You lose.");
				$(".hero").fadeTo("fast",.5);
				partialReset();
				$("#playAgain").css("display", "inline-block");
			}
			else if (opponent.hp <= 0) {
				//Win condition
				if ((remainingChars[0] === undefined) && (opponent.hp <= 0)){
					partialReset();
					$("#instructions").html("You have defeated all opponents! You win!");
					$("#playAgain").css("display", "inline-block");
				} 
				// Keep playing until win/lose conditions are met
				else {
					$("#instructions").html(opponent.name + " has no health left! You win this round.<br>Pick a new opponent.");
					partialReset();
					$(".row3, #divider").css("display", "block");
					$(".opponent").fadeTo("fast",.5);
					for (i=0; i<remainingChars.length; i++) {
						$(".row3").append(displayChar(characters[remainingChars[i]].img, characters[remainingChars[i]].name, characters[remainingChars[i]].hp, characters[remainingChars[i]].counterAttack, "pickOpp"));
					}
				}
			}
		});	

	});

/********************************************
	RESTART GAME
********************************************/
	$(document).on("click", "#playAgain", function(){
		startGame();
	});


/********************************************
	ANIMATION EFFECTS
********************************************/
	$(document).on({
		mouseenter : function() {
		$(this).fadeTo("fast", .5);
		$("html, body").css("cursor", "pointer");
		},
		mouseleave : function(){
		$(this).fadeTo("fast", 1);
		$("html, body").css("cursor", "default");
		},
		click : function(){
		$(this).fadeTo("fast", 1);
		$("html, body").css("cursor", "default");
		}
	}, ".pickOpp, .pickHero");

});