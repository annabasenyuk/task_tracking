import React, { useState, useEffect } from "react";
import cn from "classnames";
import closeIcon from "../../assets/close-icon.svg";
import './InputForm.scss';

type Props = {
  inputValue: string,
  setInputValue: (value: string) => void,
  handleKeyUp: (event: React.KeyboardEvent<HTMLInputElement>) => void,
  previousValue: string,
};

export const InputForm: React.FC<Props> = ({
  inputValue,
  setInputValue,
  handleKeyUp,
  previousValue,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPreviousValue, setIsPreviousValue] = useState(false);

  useEffect(() => {
    if (!isPreviousValue) {
      setInputValue(previousValue);
      setIsPreviousValue(true);
    }
  }, [previousValue, setInputValue, isPreviousValue]);

  const handleFocus = () => {
    setIsFocused(true)
  }

  const hadleBlur = () => {
    setIsFocused(false)
  }

  const handleOnClick = () => {
    setInputValue('');
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  }

  return (
    <form
      className="form"
      onSubmit={handleSubmit}
      onBlur={handleSubmit}
    >
      <input
        type="text"
        className={cn('form__input', {
          'focus': isFocused,
        })}
        placeholder="Create your todo..."
        value={inputValue}
        onKeyUp={handleKeyUp}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={hadleBlur}
      />
      <img
        src={closeIcon}
        alt="close Icon"
        className={cn('form__icon', {
          'visibility': !inputValue.length
        })}
        onClick={handleOnClick}
      />
    </form>

  )
}