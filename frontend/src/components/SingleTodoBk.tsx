import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./style.css";
import { Draggable } from "react-beautiful-dnd";
import getDate from "../utils";

interface Props {
  id: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: React.FC<Props> = ({
  id,
  todo,
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleDone = (id: number, index: number) => {
    console.log(getDate(),"completed task with id -", id);
    setCompletedTodos([
      { ...todos[index], isDone: !todo.isDone },
      ...completedTodos,
    ]);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleDelete = (id: number) => {
    console.log(getDate(),"deleted task with id -", id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    console.log(getDate(),"edited task with id -", id);
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <Draggable draggableId={todo.id.toString()} index={id}>
      {(provided, snapshot) => (
        <form
          className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
          onSubmit={(e) => handleEdit(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <input
              type="text"
              ref={inputRef}
              value={editTodo}
              className="todos__single--text"
              onChange={(e) => {
                setEditTodo(e.target.value);
              }}
            />
          ) : todo.isDone ? (
            <s className="todos__single--text">{todo.todo}</s>
          ) : (
            <span className="todos__single--text">{todo.todo}</span>
          )}
          <div>
            {!todo.isDone ? (
              <span
                className="icon"
                onClick={() => {
                  if (!edit && !todo.isDone) {
                    setEdit(!edit);
                  }
                }}
              >
                <AiFillEdit />
              </span>
            ) : (
              ""
            )}
            <span className="icon" onClick={() => handleDelete(todo.id)}>
              <AiFillDelete />
            </span>
            {!todo.isDone ? (
              <span className="icon" onClick={() => handleDone(todo.id, id)}>
                <MdDone />
              </span>
            ) : (
              ""
            )}
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
