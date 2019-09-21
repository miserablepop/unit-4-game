$(document).ready(function() {

    // VARIABLES
    ///////////////////////////////////////////////////////////////////////////////


    // defining character objects

    // boba fett object
    var bobaFett = {
        nickname: 'boba',
        charName: 'Boba Fett',
        healthPoints: 110,
        attackPoints: 8,
        counterPoints: 15,
        charImage: '<img src="assets/images/characters/bobafett.png" class="image" >'
    };

    // han solo object
    var hanSolo = {
        nickname: 'han',
        charName: 'Han Solo',
        healthPoints: 150,
        attackPoints: 10,
        counterPoints: 20,
        charImage: '<img src="assets/images/characters/hansolo.png" class="image" >'
    };

    // lobot object
    var lobot = {
        nickname: 'lobot',
        charName: 'Lobot',
        healthPoints: 100,
        attackPoints: 2,
        counterPoints: 10,
        charImage: '<img src="assets/images/characters/lobot.png" class="image" >'
    };
 
    // lando object
    var lando = {
        nickname: 'lando',
        charName: 'Lando Calrissian',
        healthPoints: 120,
        attackPoints: 5,
        counterPoints: 12,
        charImage: '<img src="assets/images/characters/lando.png" class="image" >'
    };

    

    // Setting character objects array
    var charactersObjects = [bobaFett, hanSolo, lobot, lando];
    
    // Setting characters empty array
    var characters = [];

    var $chosenCharacter;
    var $currentDefender;

    var attackerHealth;
    var attackerDamage;
    var attackerCounter;

    var currentDefenderHealth = 0;
    var currentDefenderAttack = 0;
    var currentDefenderCounter = 0;

    var compoundAttack = 0;
    var counter = 0;

    var isThereDefender = false;

    // FUNCTIONS
    ///////////////////////////////////////////////////////////////////////////////

    function startGame (){
        createCharacters(charactersObjects);
        pickCharacter();
        pickDefender();

    };


    function createCharacters (arg){

        if (arg.length === 4){
            for (var i=0; i < arg.length; i++){

                // Creating jQuery object to store the character div
                var $attacker = $('<div id='+arg[i].nickname+'>');
                $attacker.append('<div class="characterName">'+ arg[i].charName);
                $attacker.append(arg[i].charImage);
                $attacker.append('<div class="characterHealth">'+arg[i].healthPoints);
                $attacker.attr('data_hp', arg[i].healthPoints);
                $attacker.attr('data_attack', arg[i].attackPoints);
                $attacker.attr('data_counter', arg[i].counterPoints);
                $attacker.attr('data_nickname', arg[i].nickname);
                $attacker.attr('data_name', arg[i].charName);
                $attacker.attr('class', 'character col-md-3');

                // Pushing the character nickname to the characters array
                characters.push(arg[i].nickname);

                // Appending the attacker object to the characters section
                $('#characters').append($attacker);


            }
        } 
        
        else if (arg.length <= 3) {

            // Empty out the remaining enemies div
            $('#remainingDefenders').empty();

            // Set characters to an empty array
            characters = [];

            // Appending a "Remaining Enemies" title
            $('#remainingDefenders').append('<div class="title">Enemies Available to Attack:</div>')
            
            for (var i = 0; i < arg.length; i++){   
                // Creating jQuery object to store the defender (remaining enemies) div
                var $defender = $('<div id='+arg[i].nickname+'>');
                $defender.append('<div class="characterName">'+ arg[i].charName);
                $defender.append(arg[i].charImage);
                $defender.append('<div class="characterHealth">'+arg[i].healthPoints);
                $defender.attr('data_hp', arg[i].healthPoints);
                $defender.attr('data_attack', arg[i].attackPoints);
                $defender.attr('data_counter', arg[i].counterPoints);
                $defender.attr('data_nickname', arg[i].nickname);
                $defender.attr('data_name', arg[i].charName);
                $defender.attr('class', 'defender');

                // Pushing the character nickname to the characters array
                characters.push(arg[i].nickname);
                
                // Appending the defender object to the characters section
                $('#remainingDefenders').append($defender);
            }

            // if (!$currentDefender) {
            //     pickDefender();
            // }
        }  
    };

    function pickCharacter (){
        $('.character').on('click', function(){

            // Once a character is selected, clear out the div
            $('#characters').empty();

            // Appending a new title 
            $('#characters').append('<div class="title">Your Character:</div>');

            // Storing the chosen character into a jQuery variable
            $chosenCharacter = $(this);
            $chosenCharacter.addClass('chosenCharacter');
            $chosenCharacter.removeClass('character col-md-3');

            // Taking the attr and storing them to use for fight()
            attackerHealth = parseInt($chosenCharacter.attr('data_hp'));
            attackerDamage = parseInt($chosenCharacter.attr('data_attack'));
            attackerCounter = parseInt($chosenCharacter.attr('data_counter'));

            // Adding the character
            $('#characters').append($chosenCharacter);
            
            // Removing the character from the characters array
            var charRemove = characters.indexOf($chosenCharacter.attr('data_nickname'));
            charactersObjects.splice(charRemove, 1);
            
            // Running the createCharacters function
            createCharacters(charactersObjects);

            
        });
    };

    function pickDefender (){
        $(document).on('click', '.defender', function(){
            
            // Clearing out the screen 
            $('#characters').empty();
            $('#currentDefender').empty();
            $('#attackButton').empty();
            $('#messages').empty();

            //Storing the chosen defender into a jQuery object
            $currentDefender = $(this);


            $currentDefender.addClass('currentDefender');
            $currentDefender.removeClass('defender');
            
            // Appending the character, button, and, defender to the fight area
            $('#chosenCharacter').append($chosenCharacter);

            $('#attackButton').append('<button type="button" class="btn btn-light">Attack</button>');

            $('#currentDefender').append($currentDefender);

            isThereDefender = true;

            // Removing the chosen defender from the characters array
            var charRemove = characters.indexOf($currentDefender.attr('data_nickname'));
            charactersObjects.splice(charRemove, 1);
            
            // Running the createCharacters function
            createCharacters(charactersObjects);

            currentDefenderAttack = 0;

            // Storing the defender attr for further use in fight()
            currentDefenderAttack = parseInt($currentDefender.attr('data_attack'));
            currentDefenderHealth = parseInt($currentDefender.attr('data_hp'));
            currentDefenderCounter = parseInt($currentDefender.attr('data_counter'));

            // Alerting if there is no defender chosen            
            $('#attackButton').on('click', function(){
                if (isThereDefender){
                    fight();
                } else {
                    alert("You need to pick a defender.")
                }
            });


        });
    };

    function fight (){
        
        // Setting the compound attack
        compoundAttack += attackerDamage;

        // Setting the attack logic
        currentDefenderHealth = currentDefenderHealth - compoundAttack;
        attackerHealth = attackerHealth - currentDefenderCounter;

        // Updating the attacker and defenders health
        $('.currentDefender > .characterHealth').html(currentDefenderHealth);
        $('.chosenCharacter > .characterHealth').html(attackerHealth);

        // Updating health and attack messages
        $('#messages').html('You attacked ' + $currentDefender.attr('data_name') + ' for ' + compoundAttack + ' damage.');
        $('#messages').append('<br />' + $currentDefender.attr('data_name') + ' attacked you back for ' + $currentDefender.attr('data_counter') + ' damage.');

        // Checking to see if the attacker or the defender won
        if (currentDefenderHealth <= 0 && attackerHealth > 0){

            isThereDefender = false;
            console.log(attackerHealth);

            $('#messages').html('You defeated ' + $currentDefender.attr('data_name') + ', you can choose to fight another enemy.');

            $('#currentDefender').empty();

            if (characters.length === 0){
                $('.newGame').append('<div class="title">You won!!! Game over!!!</div>');
                restartGame();
            } else {
                pickDefender();
            }

        } else if (attackerHealth <= 0){
            $('.newGame').append('<div class="title">You were defeated!</div>');
            restartGame();
        }
    };

    // Restart game button
    function restartGame() {
		$('.row').empty();
		$('.newGame').append('<button class="restartBtn btn btn-lg btn-warning">Restart Game</button>');
			$('.restartBtn').on('click', function() {
				location.reload();
			})
	}


    // Calling function to start game
    startGame();
});
