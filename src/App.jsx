import React, { useState } from "react";
import { InputTodo } from "./components/inputTodo";
import { IncompleteTodos } from "./components/incompleteTodos";
import { CompleteTodos } from "./components/completeTodos";
import "./styles.css";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setincompleteTodos] = useState([]);
  const [completeTodos, setcompleteTodos] = useState([]);
  const onChangeTodoText = (event) => setTodoText(event.target.value);
  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...incompleteTodos, todoText];
    setincompleteTodos(newTodos);
    setTodoText("");
  };
  const onClickDel = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setincompleteTodos(newTodos);
  };
  const onClickComplete = (index) => {
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setincompleteTodos(newIncompleteTodos);
    setcompleteTodos(newCompleteTodos);
  };
  const onClickReturn = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);
    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    setcompleteTodos(newCompleteTodos);
    setincompleteTodos(newIncompleteTodos);
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
        <p style={{ color: "red" }}>登録できるtodo5こまでだよ消化しろ</p>
      )}

      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDel={onClickDel}
      />
      <CompleteTodos todos={completeTodos} onClickReturn={onClickReturn} />
    </>
  );
};
