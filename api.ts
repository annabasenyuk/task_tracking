import { Todo } from "./types/Todo";
import todo from './api/api.json';

function wait(delay: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

function get(): Promise<Todo[]> {
  return wait(300)
    .then(() => {
      return todo as Todo[];
    });
}

export const getTodos = () => get();
