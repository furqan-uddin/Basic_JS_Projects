document.addEventListener("DOMContentLoaded",function(){
    const questions = [
        {
          question: "What is the capital of France?",
          choices: ["Paris", "London", "Berlin", "Madrid"],
          answer: "Paris",
        },
        {
          question: "Which planet is known as the Red Planet?",
          choices: ["Mars", "Venus", "Jupiter", "Saturn"],
          answer: "Mars",
        },
        {
          question: "Who wrote 'Hamlet'?",
          choices: [
            "Charles Dickens",
            "Jane Austen",
            "William Shakespeare",
            "Mark Twain",
          ],
          answer: "William Shakespeare",
        },
    ];

    const questionContainer = document.getElementById("question-container");
    const questionText = document.getElementById("question-text");
    const choicesList = document.getElementById("choices-list");
    const nextBtn = document.getElementById("next-btn");

    const resultContainer = document.getElementById("result-container");
    const scoreDisplay = document.getElementById("score");
    const restartBtn = document.getElementById("restart-btn");

    const startBtn = document.getElementById("start-btn");
    
    let score = 0;
    let currentQuestionIndex = 0;

    startBtn.addEventListener("click",startQuiz);

    function startQuiz(){
        startBtn.classList.add("hidden");
        resultContainer.classList.add("hidden");
        questionContainer.classList.remove("hidden");
        showQuestion();        
    };
    function showQuestion(){
        nextBtn.classList.add("hidden")
        questionText.innerHTML = questions[currentQuestionIndex].question;
        choicesList.innerHTML = "";
        questions[currentQuestionIndex].choices.forEach(choice =>{
            const li = document.createElement("li");
            li.textContent = choice;
            li.addEventListener("click", () => selectAns(choice));
            choicesList.append(li);
        });
    };
    function selectAns(choice){
        // console.log(choice);
        const correctAnswer = questions[currentQuestionIndex].answer;
        const msg = document.createElement("div");
        if(choice === correctAnswer){
            // console.log("correct answer")
            // currentQuestionIndex++;
            score++;
            msg.innerHTML=`Correct answer`
            questionContainer.appendChild(msg)
            nextBtn.classList.remove("hidden");
        }else{
            console.log("Incorrect answer")
            msg.innerHTML = `Incorrect answer choose another option`;
            questionContainer.appendChild(msg);
        }
    };
    nextBtn.addEventListener("click",function(){
        currentQuestionIndex++;
        if(currentQuestionIndex < questions.length){
            showQuestion();
        }
        else{
            showResult();
        }
    });
    function showResult(){
        questionContainer.classList.add("hidden");
        resultContainer.classList.remove("hidden");
        scoreDisplay.textContent = `${score} out of ${questions.length}`;
    };
    restartBtn.addEventListener("click",function(){
        currentQuestionIndex = 0;
        score = 0;
        startQuiz();
    });
});
