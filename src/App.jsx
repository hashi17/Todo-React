import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncomplateTodos] = useState([]);
  const [completeTodos, setComplateTodos] = useState([]);

  const onChangeTodoText = (event) => setTodoText(event.target.value);
  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodo = [...incompleteTodos, todoText];
    setIncomplateTodos(newTodo);
    setTodoText("");
  };
  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setIncomplateTodos(newTodos);
  };

  const onClickComplete = (index) => {
    const newIncomplateTodos = [...incompleteTodos];
    newIncomplateTodos.splice(index, 1);

    const newComplateTodos = [...completeTodos, incompleteTodos[index]];
    setIncomplateTodos(newIncomplateTodos);
    setComplateTodos(newComplateTodos);
  };

  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);

    const newInCompleteTodos = [...incompleteTodos, completeTodos[index]];
    setComplateTodos(newCompleteTodos);
    setIncomplateTodos(newInCompleteTodos);
  };
  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteTodos.length >= 5}
      />
      {incompleteTodos.length >= 5 && (
        <p style={{ color: "red" }}>
          登録出来るtodoは5個までです。消化してください
        </p>
      )}
      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};
