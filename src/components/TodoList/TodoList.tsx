import React, { useState, useEffect } from "react";
import { Todo } from "../../types/Todo";
import { getTodos } from "../../api";
import './TodoList.scss';
import type { RootState, AppDispatch } from '../../store/store';
import { useSelector, useDispatch } from 'react-redux'
import { todoAddedToStore, updateTodo } from "../../store/todos/todosSlice";
import { InputForm } from "../InputForm/InputForm";
import cn from "classnames";
import { TodoCard } from "../TodoCard/TodoCard";

export const TodoList: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const todos = useSelector((state: RootState) => state.todos);
  const filter = useSelector((state: RootState) => state.filters);
  const dispatch = useDispatch<AppDispatch>();
  const [inputValue, setInputValue] = useState('');
  const [editItemId, setEditItemId] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);

    if (!todos.length) {
      getTodos()
        .then((todos) => {
          todos.forEach((todo) => {
            dispatch(todoAddedToStore(todo));
          });
          setLoading(false);
        })
        .catch((error) => {
          console.error('Failed to fetch todos:', error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [dispatch, todos]);

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>, todoId: string) => {
    if (event.key === 'Enter' && inputValue.length > 0) {
      dispatch(updateTodo({ id: todoId, title: inputValue }));
      setEditItemId(null);
    }

    if (event.key === 'Escape') {
      setEditItemId(null);
    }
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'ACTIVE') {
      return !todo.completed;
    } else if (filter === 'COMPLETED') {
      return todo.completed;
    } else {
      return true;
    }
  });

  return (
    <section className="section">
      {loading ? (
        <div className="section__loader">Loading...</div>
      ) : (
        <>
          <div className="section__list">
            {filteredTodos.map((todo: Todo) => (
              <React.Fragment
                key={todo.id}
              >
                {editItemId === todo.id ? (
                  <div className="section__form">
                    <InputForm
                      inputValue={inputValue}
                      setInputValue={setInputValue}
                      handleKeyUp={(event) => handleKeyUp(event, todo.id)}
                      previousValue={todo.title}
                    />
                  </div>
                ) : (
                  <TodoCard
                    setEditItemId={setEditItemId}
                    todo={todo}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className={cn({
            "section__empty": !filteredTodos.length,
            "visibility": filteredTodos.length
          })}>
            <div className="section__empty-filter">
              {filter}
            </div>
            list is empty ...
          </div>
        </>
      )}
    </section>
  );
}