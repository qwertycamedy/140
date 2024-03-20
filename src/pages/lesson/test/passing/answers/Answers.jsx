import Answer from "./answer/Answer"


const Answers = ({answers}) => {
  return (
    <ul className="flex flex-col gap-14">
        {answers?.map((ans, i) => (
            <Answer ans={ans} i={i} key={ans.ID} />
        ))}
    </ul>
  )
}

export default Answers