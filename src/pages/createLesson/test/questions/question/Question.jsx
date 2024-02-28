import { clsx } from "clsx";

const Question = ({ index, question }) => {
  return (
    <div className="flex flex-col gap-10">
      <p className="text text-14 fw-700"><strong>#{index}</strong> {question.title}</p>
      <ul className="flex flex-col gap-8">
        {question.questions.map((ques) => (
          <li className={clsx("text text-10", {"color-accent": ques.id === 1})} key={ques.id}>
            <span>{ques.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
