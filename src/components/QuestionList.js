import { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((resp) => resp.json())
      .then(setQuestions)
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (_id) => {
    fetch(`http://localhost:4000/questions/${_id}`, { method: "DELETE" })
      .then((resp) => resp.json())
      .then((data) => {
        const update = questions.filter((question) => question.id !== _id);
        setQuestions(update);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e, _id) => {
    const correctIndex = parseInt(e.target.value);
    fetch(`http://localhost:4000/questions/${_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        const update = questions.map((question) =>
          question.id === _id ? data : question
        );
        setQuestions(update);
      })
      .catch((err) => console.log(err));
  };

  const allQuestions = questions.map((question) => (
    <QuestionItem
      key={question.id}
      question={question}
      handleDelete={handleDelete}
      handleChange={handleChange}
    />
  ));

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{allQuestions}</ul>
    </section>
  );
};

export default QuestionList;
