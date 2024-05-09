import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../store/todos/todosSlice";
import { setFilter } from "../../store/filters/filtersSlice";
import { NavLink } from "react-router-dom";
import { InputForm } from "../InputForm/InputForm";
import './Header.scss';


export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue.length > 0) {
      dispatch(addTodo(inputValue));
      setInputValue('');
    }
  }

  const changeFilter = (filter: string) => {
    dispatch(setFilter(filter));
  }

  return (
    <div className="container">
      <div className="container_name">Todos</div>

      <div className="container_cover">
        <InputForm
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleKeyUp={handleKeyUp}
          previousValue=''
        />
      </div>


      <nav className="container_nav">
        <NavLink to="/all" className="container_title" onClick={() => changeFilter('ALL')}>All</NavLink>
        <NavLink to="/active" className="container_title" onClick={() => changeFilter('ACTIVE')}>Active</NavLink>
        <NavLink to="/completed" className="container_title" onClick={() => changeFilter('COMPLETED')}>Completed</NavLink>
      </nav>
    </div>
  )
}