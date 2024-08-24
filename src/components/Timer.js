import { useEffect } from "react"
import { useQuiz } from "../contexts/QuizContext"

function Timer() {
    const {secondsRemaining,dispatch} = useQuiz()
    const min = Math.floor(secondsRemaining / 60 )
    const sec = secondsRemaining % 60


    useEffect(()=> {
        const id = setInterval(()=> {
            dispatch({type:"timer"})
        },1000)


        return () => clearInterval(id)
    },[])

    return (
        <p className="timer">
            {min < 10 ? "0" : ""}{min}:{sec < 10 ? "0" : ""}{sec}
        </p>
    )
}

export default Timer
