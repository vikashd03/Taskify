import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Todo } from "../model";
import "./style.css";
import SingleTodo from "./SingleTodo";

interface Props {
  todos: Todo[];
  completedTodos: Todo[];
  baseUrl: string;
  setDataChange: React.Dispatch<React.SetStateAction<boolean>>;
  dataChange: boolean;
}

const TodoList: React.FC<Props> = ({
  dataChange,
  setDataChange,
  baseUrl,
  todos,
  completedTodos,
}) => {
  return (
    <div className="container">
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Active Tasks</span>
            {todos.map((todo, index) => (
              <SingleTodo
                dataChange={dataChange}
                setDataChange={setDataChange}
                baseUrl={baseUrl}
                key={todo.id}
                todo={todo}
                index={index}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => (
          <div
            className={`todos remove ${
              snapshot.isDraggingOver ? "dragcomplete" : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Completed Tasks</span>
            {completedTodos.map((todo, index) => (
              <SingleTodo
                dataChange={dataChange}
                setDataChange={setDataChange}
                baseUrl={baseUrl}
                key={todo.id}
                todo={todo}
                index={index}
                // work on stporing index in db
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
