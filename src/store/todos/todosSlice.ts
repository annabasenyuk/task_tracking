import { createSlice, nanoid } from '@reduxjs/toolkit'
import { Todo } from '../../types/Todo'
import type { PayloadAction } from '@reduxjs/toolkit'

const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    todoAddedToStore(state, action) {
      state.push({
        id: action.payload.id,
        title: action.payload.title,
        completed: action.payload.completed,
      })
    },
    addTodo: {
      reducer: (state, action: PayloadAction<Todo>) => {
        state.push(action.payload)
      },
      prepare: (title: string) => {
        const id = nanoid()
        const completed = false
        return { payload: { id, title, completed } }
      },
    },
    removeTodo(state, action) {
      return state.filter((todo) => todo.id !== action.payload);
    },
    updateTodo(state, action) {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      const updatedState = [...state];
      updatedState[index].title = action.payload.title;
    },
    toggleTodo(state, action) {
      const todo = state.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    }
  },
})

export const { addTodo, removeTodo, todoAddedToStore, updateTodo, toggleTodo } = todosSlice.actions
export default todosSlice.reducer