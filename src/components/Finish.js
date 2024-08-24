import { useQuiz } from "../contexts/QuizContext";

function Finish() {
    const {maxPossiblePoints,points,highScore,dispatch} = useQuiz()
    const precentage = (points / maxPossiblePoints) * 100;
    
    return (
        <>
            <p className="result">
                You scored {points} out of {maxPossiblePoints} ({(precentage).toFixed(2)}%)
            </p>
            <p className="highscore">(High Score {highScore} points)</p>
            <button className="btn btn-ui" onClick={()=> dispatch({type:"reset"})}>Restart quiz</button>
        </>
    )
}

export default Finish
