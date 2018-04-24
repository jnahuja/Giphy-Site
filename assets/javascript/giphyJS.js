$(document).ready(function () {

    // Initial array of movies
    var topics = ["Dog", "Cat", "Rabbit", "Hampster"];

    // displayMovieInfo function re-renders the HTML to display the appropriate content
    function displayMovieInfo() {

        $("#gifs-view").empty();

        var topic = $(this).attr("data-name");
        // Constructing a queryURL using the topic
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=10";

        // Creating an AJAX call for the specific topic button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {


            // storing the data from the AJAX request in the results variable
            var results = response.data;

            // Looping through each result item
            for (var i = 0; i < results.length; i++) {

                // Creating and storing a div tag
                var topicDiv = $("<div class='gifDiv'>");

                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + results[i].rating);

                // Creating and storing an image tag
                var topicImage = $("<img>");
                // Setting the src attribute of the image to a property pulled off the result item
                topicImage.attr("src", results[i].images.fixed_height.url);
                topicImage.attr("data-still", results[i].images.fixed_height_still.url);
                topicImage.attr("data-animate", results[i].images.fixed_height.url);
                topicImage.attr("data-state", "animate");
                topicImage.attr("class", "gifClass");

                // Appending the paragraph and image tag to the topicDiv
                topicDiv.append(p);
                topicDiv.append(topicImage);

                // Prependng the topicDiv to the HTML page in the "#gifs-appear-here" div
                $("#gifs-view").prepend(topicDiv);
            }
        });

    }


    // Function for displaying topics data
    function renderButtons() {

        // Deleting the topics prior to adding new topics
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of topics
        for (var i = 0; i < topics.length; i++) {

            // Then dynamicaly generating buttons for each movie in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var a = $("<button>");
            // Adding a class of movie-btn to our button
            a.addClass("topic-btn");
            // Adding a data-attribute
            a.attr("data-name", topics[i]);
            // Providing the initial button text
            a.text(topics[i]);
            // Adding the button to the buttons-view div
            $("#buttons-view").append(a);
        }
    }

    // This function handles events where a topic button is clicked
    $("#add-topic").on("click", function (event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var topic = $("#topic-input").val().trim();
        var dupChecker = false;

        for (var i = 0; i < topics.length; i++) {
            if (topic == topics[i]) {
                dupChecker = true;
            }
        }

        if ((topic !== "") && (dupChecker == false)) {
            // Adding movie from the textbox to our array
            topics.push(topic);

            // Calling renderButtons which handles the processing of our movie array
            renderButtons();
        }
    });

    // Adding a click event listener to all elements with a class of "movie-btn"
    $(document).on("click", ".topic-btn", displayMovieInfo);

    // Calling the renderButtons function to display the intial buttons
    renderButtons();

    //   $(".gifClass").on("click", function() {
    $("body").on("click", ".gifClass", function () {
        console.log("gif click");
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });







































































    //     // Initialize the variables
    //     var currentTriviaQuestion = "";
    //     var currentCorrectAnswer = "";
    //     var currentTriviaAnswers = []; // ["", "", "", ""];
    //     var questionCounter = 0;
    //     var wins = 0;
    //     var losses = 0;
    //     var answerIndex = ["A. ", "B. ", "C. ", "D. "];

    //     // Sample of the triviaQuestions array that is dynamically updated as the program runs
    //     // var triviaQuestions = [{
    //     //     questionNumber: 0,
    //     //     question: "",
    //     //     correctAnswer: "",
    //     //     incorrectAnswers: ["","",""]
    //     // }];

    //     var triviaQuestions = [];

    //     var main = $("body");
    //     var btns = main.find("button");

    //     function initialize() {
    //         triviaQuestions = [];
    //         currentTriviaQuestion = "";
    //         currentTriviaAnswers = []; // ["", "", "", ""];
    //         questionCounter = 0;
    //     }


    //     // "https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple"

    //     // Function to make a call to a trivia API and store the results in a Trivia Object for each game
    //     function ajaxTriviaCall(difficulty) {

    //         var queryURL = "https://opentdb.com/api.php?amount=5&difficulty="+difficulty+"&type=multiple"

    //         $.ajax({
    //           url: queryURL,
    //           method: "GET"
    //         }).then(function (response) {
    //             console.log("In Ajax Call");
    //             console.log(response);

    //             for (i=0; i<response.results.length; i++) {
    //                 // triviaQuestions
    //                 var questionObject = {}
    //                 questionObject.questionNumber = difficulty + "_" + i;
    //                 questionObject.question = response.results[i].question;
    //                 questionObject.correctAnswer = response.results[i].correct_answer;
    //                 questionObject.incorrectAnswers = response.results[i].incorrect_answers;
    //                 triviaQuestions.push(questionObject);
    //                 // console.log(questionObject);
    //             }

    //             // triviaQuestions[0].question = response.results[0].question;;
    //             // console.log(triviaQuestions);
    //         });
    //     }

    //     // Function to build the trivia questions array by completing 3 AJAX calls for questions of different difficulties. Each AJAX call brings back 5 questions. The game "Who Wants to Be a Millionaire" has 15 questions.
    //     function buildTriviaQuestions() {
    //         ajaxTriviaCall("easy");
    //         ajaxTriviaCall("medium");
    //         ajaxTriviaCall("hard");
    //     }

    //     // The Begin function creates our initial Div with a Begin Button to start the game.
    //     function begin() {

    //         var answerDiv = $("<div>");
    //         answerDiv.addClass("row justify-content-center");

    //         var answerDivLeftTriangle = $("<div>");
    //         answerDivLeftTriangle.addClass("triangleLeft");

    //         var answerDivRightTriangle = $("<div>");
    //         answerDivRightTriangle.addClass("triangleRight");

    //         var buttonDiv = $("<button>");
    //         buttonDiv.addClass("beginButton");
    //         // buttonDiv.attr("data-answer", i);
    //         buttonDiv.text("Begin");

    //         $("#triviaQuestion").append(answerDiv);
    //         answerDiv.append(answerDivLeftTriangle);
    //         answerDiv.append(buttonDiv);
    //         answerDiv.append(answerDivRightTriangle);
    //     }

    //     // Function to display the next trivia question and answers in the div
    //     function displayTriviaQuestion(answerPosition) {

    //         // $("#triviaAnswers").empty();
    //         console.log("In display answers function");
    //         $("#triviaQuestion").empty();

    //         var questionDiv = $("<div>");
    //         questionDiv.addClass("row justify-content-center");

    //         var questionDivLeftTriangle = $("<div>");
    //         questionDivLeftTriangle.addClass("triangleLeft");

    //         var questionDivRightTriangle = $("<div>");
    //         questionDivRightTriangle.addClass("triangleRight");

    //         var questionButtonDiv = $("<button>");
    //         questionButtonDiv.addClass("triviaQuestionButton");
    //         questionButtonDiv.html(currentTriviaQuestion).text();

    //         $("#triviaQuestion").append(questionDiv);
    //         questionDiv.append(questionDivLeftTriangle);
    //         questionDiv.append(questionButtonDiv);
    //         questionDiv.append(questionDivRightTriangle);
    //         // $("#triviaQuestion").html(currentTriviaQuestion).text();

    //         $("#firstAnswerColumn").empty();
    //         $("#secondAnswerColumn").empty();



    //         // Looping through the array of questions
    //         for (var i = 0; i < 4; i++) {

    //           var answerDiv = $("<div>");
    //           answerDiv.addClass("row justify-content-center answerBlock");

    //           var answerDivLeftTriangle = $("<div>");
    //           answerDivLeftTriangle.addClass("triangleLeft");

    //           var answerDivRightTriangle = $("<div>");
    //           answerDivRightTriangle.addClass("triangleRight");


    //           var buttonDiv = $("<button>");
    //           buttonDiv.addClass("triviaAnswer");
    //           buttonDiv.addClass("answerButton");
    //           if (i==answerPosition) {
    //             buttonDiv.attr("answer-review", "correct");
    //           }
    //           else {
    //             buttonDiv.attr("answer-review", "incorrect");
    //           }
    //           //   buttonDiv.attr("data-answer", i);
    //         //   buttonDiv.attr("answerCorrect", i);
    //         //   buttonDiv.text(currentTriviaAnswers[i]);
    //         //   var answerContent = html(currentTriviaAnswers[i]);
    //         //   buttonDiv.text(answerContent + "ASDFADSF");
    //           buttonDiv.html("<span class='answerIndex'>"+answerIndex[i]+"</span>"+currentTriviaAnswers[i]).text();
    //         //   <span style="color:black">A. </span>

    //           if (i==0 || i==3) {
    //             $("#firstAnswerColumn").append(answerDiv);
    //           }
    //           else {
    //             $("#secondAnswerColumn").append(answerDiv);
    //           }

    //           answerDiv.append(answerDivLeftTriangle);
    //           answerDiv.append(buttonDiv);
    //           answerDiv.append(answerDivRightTriangle);
    //         }

    //         // Sample of the expected Div Output.
    // //         <div class="row justify-content-center answerButton">
    // //         <div class="triangleLeft"></div>
    // //         <button class="triviaAnswer" data-answer="1">Answer 1</button>
    // //         <div class="triangleRight"></div>
    // // </div>

    //     }


    //     // Function to get the current question from the triviaQuestions Array.
    //     function populateCurrentAnswers(questionIndex) {
    //         currentTriviaQuestion = "";
    //         currentCorrectAnswer = "";
    //         currentTriviaAnswers = [];
    //         currentTriviaQuestion = triviaQuestions[questionIndex].question;
    //         currentCorrectAnswer = triviaQuestions[questionIndex].correctAnswer;
    //         // console.log(currentTriviaQuestion);
    //         // console.log(triviaQuestions);
    //         var answerPosition = Math.floor(Math.random()*4);
    //         // console.log(answerPosition);
    //         var incorrectCounter = 0;
    //         for (i=0; i<4; i++) {
    //             // console.log("I iteration " + i);
    //             if (i==answerPosition) {
    //                 currentTriviaAnswers.push(triviaQuestions[questionIndex].correctAnswer)
    //             }
    //             else {
    //                 // console.log(incorrectCounter);
    //                 // console.log(triviaQuestions[0].incorrectAnswers[incorrectCounter]);
    //                 currentTriviaAnswers.push(triviaQuestions[questionIndex].incorrectAnswers[incorrectCounter]);
    //                 incorrectCounter = incorrectCounter + 1;
    //             }
    //         }
    //         console.log(currentTriviaAnswers);
    //         questionCounter = questionCounter + 1;
    //         // decodeString();
    //         displayTriviaQuestion(answerPosition);
    //     }

    //     // Function to reset our clock and get a new question.
    //     function runNewQuestion() {
    //         // $("#triviaQuestion").empty();
    //         // $("#firstAnswerColumn").empty();
    //         // $("#secondAnswerColumn").empty();
    //         // $("#triviaQuestion").text("That is Correct!");

    //         // if (questionCounter<15) {
    //         //     alert("You have Won the Game!")
    //         // }

    //         populateCurrentAnswers(questionCounter);

    //         stopwatch.reset();
    //         stopwatch.start();

    //     }

    //     // At the start of the game we need to display the "Begin" button and build our triviaQuestions array.
    //     begin();
    //     buildTriviaQuestions();
    //     // populateCurrentAnswers();

    //     // Our stopwatch object runs the timer and keeps track of the time for each question.
    //     var clockRunning = false;
    //     var stopwatch = {
    //         time: 30,
    //         reset: function() {      
    //           stopwatch.time = 30;
    //           // DONE: Change the "display" div to "00:00."
    //           $("#timer").text("30");
    //         },
    //         start: function() {
    //           // DONE: Use setInterval to start the count here and set the clock to running.
    //           if (!clockRunning) {
    //             intervalId = setInterval(stopwatch.count, 1000);
    //             clockRunning = true;
    //           }
    //         },
    //         stop: function() {

    //           // Use clearInterval to stop the count here and set the clock to not be running.
    //           clearInterval(intervalId);
    //           clockRunning = false;
    //         },
    //         count: function() {
    //           // Increment time by 1, remember we cant use "this" here.
    //           stopwatch.time = stopwatch.time - 1;
    //           // Get the current time, pass that into the stopwatch.timeConverter function, and save the result in a variable.
    //           var converted = stopwatch.timeConverter(stopwatch.time);
    //           if (converted == "00") {
    //             // $("#triviaQuestion").empty();
    //             losses = losses + 1;
    //             $("#winsDiv").text("Wins: "+ wins);
    //             $("#lossesDiv").text("Losses: "+losses);
    //             $("#firstAnswerColumn").empty();
    //             $("#secondAnswerColumn").empty();
    //             // $("#triviaQuestion").text('Time is up. The correct answer is "' + currentCorrectAnswer + '".');
    //             $(".triviaQuestionButton").text('Time is up. The correct answer is "' + currentCorrectAnswer + '".');
    //             stopwatch.stop();
    //             setTimeout(runNewQuestion,5000);
    //           }
    //           console.log(converted);
    //           // Use the variable we just created to show the converted time in the "display" div.
    //           $("#timer").text(converted);
    //         },
    //         timeConverter: function(seconds) {

    //           if (seconds < 10) {
    //             seconds = "0" + seconds;
    //           }
    //           return seconds;
    //         }
    //       };

    //     // Only applies to statically created buttons on the page's initial load
    //     $("button").on("click", function() {
    //         console.log("button click");
    //         // $("#triviaQuestion").empty();
    //         // console.log(triviaQuestions);
    //         populateCurrentAnswers(questionCounter);
    //         stopwatch.reset();
    //         // setInterval(stopwatch.count, 1000);
    //         stopwatch.start();

    //         // displayTriviaQuestion();
    //         // In this case, the "this" keyword refers to the button that was clicked
    //         // var person = $(this).attr("data-person");
    //     });

    //     // Function runs when the answer button is clicked.
    //     $("body").on("click", ".answerButton", function() {
    //         console.log("button click");
    //         console.log(this);
    //         console.log($(this).attr("answer-review"));

    //         if ($(this).attr("answer-review")=="correct") {
    //             // alert("correct");
    //             // displayCorrect();
    //             wins = wins + 1;
    //             $("#winsDiv").text("Wins: "+ wins);
    //             $("#lossesDiv").text("Losses: "+losses);
    //             $("#firstAnswerColumn").empty();
    //             $("#secondAnswerColumn").empty();
    //             $(".triviaQuestionButton").text("That is Correct!");
    //             stopwatch.stop();
    //             setTimeout(runNewQuestion,3000);

    //             // delayButtonAlert = setTimeout(function() {
    //             //     alert("Alert #2");
    //             //   }, 3000);

    //         }
    //         else {
    //             losses = losses + 1;
    //             $("#winsDiv").text("Wins: "+ wins);
    //             $("#lossesDiv").text("Losses: "+losses);
    //             $("#firstAnswerColumn").empty();
    //             $("#secondAnswerColumn").empty();
    //             $(".triviaQuestionButton").text('That is Incorrect. The correct answer is "' + currentCorrectAnswer + '".');
    //             stopwatch.stop();
    //             setTimeout(runNewQuestion,3000);
    //         }

    //     });
});