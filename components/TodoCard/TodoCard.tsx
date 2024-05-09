import React from "react";
import CheckMark from '../../assets/check-mark-icon.svg';
import './TodoCard.scss'
import type { AppDispatch } from '../../store/store';
import { useDispatch } from 'react-redux'
import { removeTodo, toggleTodo } from "../../store/todos/todosSlice";
import { Todo } from "../../types/Todo";
import cn from "classnames";

type Props = {
  setEditItemId: (value: string | null) => void;
  todo: Todo;
};

export const TodoCard: React.FC<Props> = ({
  setEditItemId,
  todo
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleRemoveTodo = (id: string) => {
    dispatch(removeTodo(id))
  }

  const handleToggleTodo = (todoId: string) => {
    dispatch(toggleTodo(todoId));
  }


  return (
    <div className="card">
      <button
        type="button"
        className="card__toggler"
        onClick={() => handleToggleTodo(todo.id)}
      >
        <img
          src={CheckMark}
          alt="Check mark icon"
          className={cn({
            'card__mark': todo.completed,
            'visibility': !todo.completed
          })}
        />
      </button>

      <div
        className="card__cover"
        onClick={() => setEditItemId(todo.id)}
      >
        <div className="card__title">
          {todo.title}
        </div>

        <button
          type="button"
          className="card__button"
          onClick={() => handleRemoveTodo(todo.id)}
        >
          X
        </button>
      </div>
    </div>
  );
}