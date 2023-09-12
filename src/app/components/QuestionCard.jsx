export function QuestionCard({ title, questions }) {
  return (
    <div>
      <h3>{title}</h3>
      {questions.map((item, index) => {
        <button key={index}>{item}</button>;
      })}
    </div>
  );
}
