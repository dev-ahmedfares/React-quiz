import { createContext, useContext, useEffect, useReducer } from "react"

const QuizContext = createContext()

const SEC_PER_QUE = 30

const initialValue = {
    questions: [],
    status: "loading",
    index: 0,
    answerIdx: null,
    points: 0,
    highScore: 0,
    secondsRemaining: null
  };

function reducer(state, action) {
    // Status => "loading | ready | active | error | finish"
    
    switch (action.type) {
      case "dataReceived":
        return { ...state, questions: action.questions, status: "ready" };
      case "dataFailed":
        return { ...state, status: "error" };
      case "start":
        return { ...state, status: "active", secondsRemaining: state.questions.length * SEC_PER_QUE };
      case "answer":
        return {
          ...state,
          answerIdx: action.payload,
          points: Number(state.points) + Number(action.points),
        };
      case "nextQ":
        return { ...state, answerIdx: null, index: state.index + 1 };
      case "finish":
        return {
          ...state,
          status: "finished",
          highScore:
            state.highScore > state.points ? state.highScore : state.points,
        };
      case "timer":
        return {
          ...state,
          secondsRemaining: state.secondsRemaining - 1,
          status: state.secondsRemaining === 0 ? "finished" : state.status,
          highScore:
          state.highScore > state.points ? state.highScore : state.points,
        };
      case "reset":
        return {
          ...initialValue,questions : state.questions,status: "ready"
        }
        // return {
        //   ...state,
        //   status: "ready",
        //   highScore: 0,
        //   points: 0,
        //   index: 0,
        //   answerIdx:null
        // };
      default:
        throw new Error("Error Of Fetching Data");
    }
  }


function QuizProvider({children}) {
    const [{ questions, status, index, answerIdx, points, highScore,secondsRemaining }, dispatch] =
    useReducer(reducer, initialValue);

    const maxPossiblePoints = questions.reduce(
        (acc, curr) => acc + curr.points,
        0
      );

      useEffect(() => {
        async function fetchData() {
          try {
            const res = await fetch(`https://my-json-server.typicode.com/dev-ahmedfares/restFul-api-for-quiz-app/questions`);
            const data = await res.json();
    
            dispatch({ type: "dataReceived", questions: data });
          } catch (err) {
            dispatch({ type: "dataFailed" });
          }
        }
    
        fetchData();
      }, []);

    return (
        <QuizContext.Provider value={{questions, status, index, answerIdx, points, highScore,secondsRemaining,maxPossiblePoints,dispatch}}>
            {children}
        </QuizContext.Provider>
    )
}

function useQuiz() {
    const context = useContext(QuizContext)
    return context
}

export  {QuizProvider,useQuiz}
