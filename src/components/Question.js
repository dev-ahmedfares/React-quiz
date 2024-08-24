import { useQuiz } from "../contexts/QuizContext";

function Question() {
  const { questions,index, dispatch, answerIdx } = useQuiz()
  const { options, correctOption, points, id } = questions[index];
  const hasAnswered =answerIdx !== null;
  
  return (
    <div>
      <h4>{questions.question}</h4>
      <div className="options">
        {options.map((option, idx) => (
          <button
            key={option}
            onClick={() => dispatch({ type: "answer", payload: idx,points: correctOption === idx ? points : 0 })}
            className={`btn btn-option ${answerIdx === idx ? "answer" : ""} ${hasAnswered ? correctOption === idx ? "correct" : "wrong" : ""}`} 
            disabled={hasAnswered}
          >
            {option}
          </button>
        ))}
      </div>
      
    </div>
  );
}

export default Question;
