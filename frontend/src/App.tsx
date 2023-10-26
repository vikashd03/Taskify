import React, { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import axios from "axios";
import "./App.css";
import InputField from "./components/InputField";
import { Todo } from "./model";
import TodoList from "./components/TodoList";
import getDate from "./utils";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const [dataChange, setDataChange] = useState<boolean>(false);
  const baseUrl = "http://localhost:8000/taskify/";

  const fetchAndSetTodos = async (todosType: string) => {
    const url = baseUrl + todosType + "/";
    await axios
      .get(url)
      .then((res) => {
        console.log(getDate(), "get:", todosType, "-->", res.data);
        todosType === "todos"
          ? setTodos(res.data)
          : setCompletedTodos(res.data);
      })
      .catch((err) => {
        console.log(getDate(), "get:", err);
      });
  };

  useEffect(() => {
    fetchAndSetTodos("todos");
    fetchAndSetTodos("completedtodos");
  }, [dataChange]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      const url = baseUrl + "todo/";
      const tododata = { todo: todo.trim(), isDone: false };
      await axios
        .post(url, tododata)
        .then((res) => {
          console.log(getDate(), "post: todo created with id -", res.data.id);
        })
        .catch((err) => {
          console.log(getDate(), "post: todo not created -", err);
        });
      setTodo("");
      setDataChange(!dataChange);
    }
  };

  const onDragEnd = async (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    console.log(
      getDate(),
      result.draggableId,
      "-",
      source.droppableId,
      "-->",
      destination.droppableId
    );

    const url = baseUrl + "todo/" + result.draggableId;
    if (
      source.droppableId === "TodosList" &&
      destination.droppableId === "TodosRemove"
    ) {
      await axios.patch(url, { isDone: true });
    } else if (
      source.droppableId === "TodosRemove" &&
      destination.droppableId === "TodosList"
    ) {
      await axios.patch(url, { isDone: false });
    }

    setDataChange(!dataChange);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskify</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          dataChange={dataChange}
          setDataChange={setDataChange}
          baseUrl={baseUrl}
          todos={todos}
          completedTodos={completedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
