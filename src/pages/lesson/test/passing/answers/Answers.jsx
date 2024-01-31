import Answer from "./answer/Answer"


const Answers = ({answers}) => {
  return (
    <ul>
        {answers?.map((ans, i) => (
            <Answer ans={ans} key={i} />
        ))}
    </ul>
  )
}

export default Answers