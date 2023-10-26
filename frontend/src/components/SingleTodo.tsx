import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./style.css";
import { Draggable } from "react-beautiful-dnd";
import getDate from "../utils";
import axios from "axios";

interface Props {
  todo: Todo;
  baseUrl: string;
  setDataChange: React.Dispatch<React.SetStateAction<boolean>>;
  dataChange: boolean;
  index: number;
}

const SingleTodo: React.FC<Props> = ({
  dataChange,
  setDataChange,
  baseUrl,
  todo,
  index,
}) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  const url = baseUrl + "todo/" + todo.id.toString();

  const handleDone = async (id: number) => {
    await axios
      .patch(url, { isDone: true })
      .then(() => {
        console.log(getDate(), "completed", id);
      })
      .catch((err) => {
        console.log(getDate(), err, id);
      });
    setDataChange(!dataChange);
  };

  const handleDelete = async (id: number) => {
    await axios
      .delete(url)
      .then(() => {
        console.log(getDate(), "deleted", id);
      })
      .catch((err) => {
        console.log(getDate(), err, id);
      });
    setDataChange(!dataChange);
  };

  const handleEdit = async (e: React.FormEvent, id: number) => {
    e.preventDefault();
    if (todo.todo.trim() != editTodo.trim()) {
      await axios
        .patch(url, { todo: editTodo.trim() })
        .then(() => {
          console.log(getDate(), "edited", id);
        })
        .catch((err) => {
          console.log(getDate(), err, id);
        });
      setDataChange(!dataChange);
    }
    setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
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
              <span className="icon" onClick={() => handleDone(todo.id)}>
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
