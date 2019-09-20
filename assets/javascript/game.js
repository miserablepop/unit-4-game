$(document).ready(function() {

    // VARIABLES
    ///////////////////////////////////////////////////////////////////////////////


    // defining character objects

    // boba fett object
    var bobaFett = {
        nickname: 'boba',
        charName: 'Boba Fett',
        healthPoints: 110,
        attackPoints: 20,
        counterPoints: 15,
        charImage: '<img src="assets/images/characters/bobafett.png" class="image" >'
    };

    // han solo object
    var hanSolo = {
        nickname: 'han',
        charName: 'Han Solo',
        healthPoints: 150,
        attackPoints: 25,
        counterPoints: 20,
        charImage: '<img src="assets/images/characters/hansolo.png" class="image" >'
    };

    // lobot object
    var lobot = {
        nickname: 'lobot',
        charName: 'Lobot',
        healthPoints: 100,
        attackPoints: 10,
        counterPoints: 10,
        charImage: '<img src="assets/images/characters/lobot.png" class="image" >'
    };

    // lando object
    var lando = {
        nickname: 'lando',
        charName: 'Lando Calrissian',
        healthPoints: 120,
        attackPoints: 15,
        counterPoints: 12,
        charImage: '<img src="assets/images/characters/lando.png" class="image" >'
    };

    

    // Setting character objects array
    var charactersObjects = [bobaFett, hanSolo, lobot, lando];
    
    var characters = [];


    // FUNCTIONS
    ///////////////////////////////////////////////////////////////////////////////

    function startGame (){
        createCharacters(charactersObjects);
    };


    function createCharacters (arg){
        if (arg.length === 4){
            for (var i=0; i < arg.length; i++){
                var $attacker = $('<div id='+arg[i].nickname+'>');
                $attacker.append('<div class="characterName">'+ arg[i].charName);
                $attacker.append(arg[i].charImage);
                $attacker.append('<div class="characterHealth">'+arg[i].healthPoints);
                $attacker.attr('class', 'character col-md-3');

                characters.push(arg[i].nickname);
                $('#characters').append($attacker);

            }
        }
        
    };

    




    startGame();
});
