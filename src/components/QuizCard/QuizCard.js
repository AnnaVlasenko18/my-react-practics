export const QuizCard = ({
  quiz: { id, topic, level, time, questions },
  onDelete,
}) => {
  return (
    <>
      <h2>{topic}</h2>
      <button onClick={() => onDelete(id)}>Delite</button>
      <div>
        <p>Level: {level}</p>
        <p>Time: {time} min</p>
        <p>Questions: {questions}</p>
      </div>
    </>
  );
};
