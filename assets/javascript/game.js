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

    // FUNCTIONS
    ///////////////////////////////////////////////////////////////////////////////

    function startGame (){
        createCharacters(charactersObjects);
        pickCharacter();
    };


    function createCharacters (arg){

        if (arg.length === 4){
            for (var i=0; i < arg.length; i++){

                // Creating jQuery object to store the character div
                var $attacker = $('<div id='+arg[i].nickname+'>');
                $attacker.append('<div class="characterName">'+ arg[i].charName);
                $attacker.append(arg[i].charImage);
                $attacker.append('<div class="characterHealth">'+arg[i].healthPoints);
                $attacker.attr('class', 'character col-md-3');
                $attacker.attr('data_hp', arg[i].healthPoints);
                $attacker.attr('data_nickname', arg[i].nickname);

                // Pushing the character nickname to the characters array
                characters.push(arg[i].nickname);

                // Appending the attacker object to the characters section
                $('#characters').append($attacker);


            }
        } 
        
        else if (arg.length <= 3) {

            // Empty out the remaining enemies div
            $('#remainingEnemies').empty();

            // Set characters to an empty array
            characters = [];

            // Appending a "Remaining Enemies" title
            $('#remainingEnemies').append('<div class="title">Remaining Enemies:</div>')
            
            for (var i = 0; i < arg.length; i++){   
                // Creating jQuery object to store the defender (remaining enemies) div
                var $defender = $('<div id='+arg[i].nickname+'>');
                $defender.append('<div class="characterName">'+ arg[i].charName);
                $defender.append(arg[i].charImage);
                $defender.append('<div class="characterHealth">'+arg[i].healthPoints);
                $defender.attr('class', 'enemy');

                // Pushing the character nickname to the characters array
                characters.push(arg[i].nickname);

                // Appending the defender object to the characters section
                $('#remainingEnemies').append($defender);
            }
        }
        
        
    };

    function pickCharacter (){
        $('.character').on('click', function(){

            // Once a character is selected, clear out the div
            $('#characters').empty();

            // Appending a new title 
            $('#characters').append('<div class="title">Your Character:</div>');

            $chosenCharacter = $(this);
            $chosenCharacter.addClass('chosenCharacter');
            $chosenCharacter.removeClass('character col-md-3');
            $('#characters').append($chosenCharacter);
            console.log(this);

            var charRemove = characters.indexOf($chosenCharacter.attr('data_nickname'))
            charactersObjects.splice(charRemove, 1);
            
            createCharacters(charactersObjects);

            
        });
    };




    startGame();
});
