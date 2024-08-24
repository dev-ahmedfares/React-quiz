import { useQuiz } from "../contexts/QuizContext"

function Progress() {
    const {index,questions,points,maxPossiblePoints} = useQuiz()
    return (
        <header className="progress">
            <progress max={questions.length} value={index}/>
            <p>Question <strong>{index+1}</strong> / {questions.length}</p>
            <p>Question <strong>{points}</strong> / {maxPossiblePoints}</p>
        </header>
    )
}

export default Progress
