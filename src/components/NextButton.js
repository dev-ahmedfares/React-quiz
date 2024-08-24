import { useQuiz } from "../contexts/QuizContext";

function NextButton() {
  const {dispatch,questions,index,answerIdx}  = useQuiz()
  if (answerIdx === null ) return;


  if (index < questions.length - 1) 
  return (
    <button className="btn btn-ui" onClick={() => dispatch({ type: "nextQ" })}>
      Next
    </button>
  );

  if (index === questions.length - 1) 
    return (
      <button className="btn btn-ui" onClick={()=> dispatch({type:"finish"})}>Finish</button>
    )
}

export default NextButton;
