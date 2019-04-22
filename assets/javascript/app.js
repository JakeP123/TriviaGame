
$( document ).ready(function() {

    // Trivia Questions
        var game = {
            questions: [
            {
                   question: '1) Who Pushed Bran Out Of His Winterfell Castle Window?',
                   possibles: ['Cersei Lanister', 'Jaime Lanister', 'Tyrion Lanister', 'Tywin Lanister'],
                   id: 'question-one',
                   answer: 1
            },
        
             {
                question: '2) Who Is The Father Of Cersei Lanisters Children?',
                possibles: ['Jaime Lanister', 'Robert Baratheon', 'Ned Stark', 'Jon Snow', 'Bran Stark'],
                id: 'question-two',
                answer: 0
            }, {
                question: '3) Who Is The Mother Of Dragons?',
                possibles: ['Sansa Stark', 'Arya Stark', 'Brienne of Tarth', 'Margaery Tyrell', 'Daenerys Targaryen'],
                id: 'question-three',
                answer: 4
            }, {
                question: '4) What Present Did Ned Stark Give ALL Of His Children In Season One?',
                possibles: ['Swords', 'Dire Wolves', 'Gold', 'Horses', 'Amulets'],
                id: 'question-four',
                answer: 1
            }, {
                question: '5) Who Killed Joffrey Lanister?',
                possibles: ['Lady Olenna Tyrell', 'Sansa Stark', 'Tyrion Lanister', 'Margaery Tyrell', 'Lord Petyr Baelish'],
                id: 'question-five',
                answer: 0
            }, {
                question: '6) How Many Kingdoms Does The King Rule?',
                possibles: ['1', '7', '5', '9', '3'],
                id: 'question-six',
                answer: 1
    
            }, {
                question: '7) What Nickname Did Ramsey Bolten Give To Theon Greyjoy?',
                possibles: ['TJoy', 'Footlong', 'Reek', 'Jake Phillips', 'Little Bitch'],
                id: 'question-seven',
                answer: 2
            }, {
                question: '8) Who Is The Ultimate Enemy In Season 7?',
                possibles: ['Dorn', 'Unsullied', 'Dothraki', 'Golden Company', 'The White Walkers'],
                id: 'question-eight',
                answer: 4
            }
            ]}
    
  

    
        var message = 'OFF WITH HIS HEAD!!';
        var $message = $('#message');
      
    
    // Start Button 
        $(".startGame").on("click", function (){
    // Reveals The Hidden Questions
            $('.wrapper').show();
            console.log('hello');
    
            $(this).hide();
        });
    
        // Timer 
        var number = 90;
        $('#timeLeft').on('click', run);
    
      
        function decrement(){
            // Decrease number by one.
            number--;
            // Show time left.
            $('#timeLeft').html('<h2>' + number + " seconds"+'</h2>');
             
            if (number === 0){
     
            stop();
     
            // alert time up
            $('#message').html('time up-OFF WTIH THE HEAD!');
            checkAnswers();
            }
        }

            function writeMessage (){

             	$message.html(message);
             }
  

        function run(){
            counter = setInterval(decrement, 1000);
        }
        
        // STOP
        function stop(){
        
            clearInterval(counter);
        }
    
        // Execute run.
        run();
    

    function formTemplate(data) {
    // Question String
        var qString = "<br><form id='questionOne'>"+ data.question +"<br><br>";
    // Question Answer Possibilities
        var choices = data.possibles;
  
        for (var i = 0; i < choices.length; i++) {
            var possible = choices[i];
            console.log(possible);
            qString = qString + "<input type='radio' name='"+data.id+"' value="+ i +">"+possible;
    
        }
        return qString + "</form>";
    }
    window.formTemplate = formTemplate;
    
    // this function takes the template created in the last function and by appending it,
    // allows it to be displayed on the page
    function buildQuestions(){
        var questionHTML = ''
        for (var i = 0; i<game.questions.length; i++) {
            questionHTML = questionHTML + formTemplate(game.questions[i]);
        }
        $('#questions-container').append(questionHTML);
    
    }
    
    // function that 
    function isCorrect(question){
        var answers = $('[name='+question.id+']');
        var correct = answers.eq(question.answer);
        var isChecked = correct.is(':checked');
        return isChecked;
    }
    
    // call the buildQuestions function
    buildQuestions();
    
    // function to build the display of guesser results
    function resultsTemplate(question){
        var htmlBlock = '<div>'
        htmlBlock = htmlBlock + question.question + ': ' + isChecked;
        return htmlBlock + "</div>";
    }
    
    // function to tabulate the guesser results
    function checkAnswers (){
    
    // vars to hold results
        var resultsHTML = '';
        var guessedAnswers = [];
        var right = 0;
        var wrong = 0;
        var unAnswered =0
    
    //For Loops For Questions
        for (var i = 0; i<game.questions.length; i++) {
            if (isCorrect(game.questions[i])) {
                right++;
            } else {

                if (checkAnswered(game.questions[i])) {
                    wrong++;
                } else {
                    unAnswered++;
                }
            }
    
        }
  
        $('.results').html('correct: '+right+ "<br>" +'incorrect: '+wrong+ "<br>" +'unanswered: '+unAnswered);
    }
    
 
    function checkAnswered(question){
        var anyAnswered = false;
        var answers = $('[name='+question.id+']');

        for (var i = 0; i < answers.length; i++) {
            if (answers[i].checked) {
                anyAnswered = true;
            }
        }

        return anyAnswered;
    
    }
    
    // check answers + stop clock
    // 
        $('#doneButton').on('click', function() {
        checkAnswers();
        stop();
        $("#messageDiv").html("OFF WITH HIS HEAD!");
        })
    });