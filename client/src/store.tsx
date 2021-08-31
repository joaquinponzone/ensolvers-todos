import axios from "axios";
import { makeAutoObservable } from "mobx";
import { Todo } from "./types/interfaces";
import { NewTodo } from "./types/interfaces";

// Standard interface and functions
const addTodo = (todos: Todo[], newTodo: Todo): Todo[] => [...todos, newTodo];
//
const editTodo = (todos: Todo[], newTodo: Todo): any => {
  todos.forEach((todo) => {
    if (todo.id === newTodo.id) {
      todo.text = newTodo.text;
    }
  });
  return todos;
};
//
const toggleDone = (todos: Todo[], newTodo: Todo): any => {
  todos.forEach((todo) => {
    if (todo.id === newTodo.id) {
      todo.done = !todo.done;
    }
  });
  return todos;
};

//
const removeTodo = (todos: Todo[], id: number): Todo[] =>
  todos.filter((todo) => todo.id !== id);
//
// MobX implementation
class Todos {
  todos: Todo[] = [];
  newTodo: string = "";
  newStatus: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }

  loadTodos() {
    axios
      .get(`http://localhost:3001/todos`)
      .then((resp) => {
        this.todos = resp.data;
      })
      .catch((err) => console.log(err));
  }

  addTodo(newTodo: NewTodo) {
    axios
      .post(`http://localhost:3001/todos`, newTodo)
      .then((resp) => {
        this.todos = addTodo(this.todos, resp.data);
        this.newTodo = "";
      })
      .catch((err) => console.log(err));
  }

  editTodo(todo: Todo) {
    axios
      .put(`http://localhost:3001/todos/${todo.id}`, { text: todo.text })
      .then(() => {
        this.todos = editTodo(this.todos, todo);
      })
      .catch((err) => console.log(err));
  }

  toggleDone(todo: Todo) {
    axios
      .put(`http://localhost:3001/todos/${todo.id}`, { done: !todo.done })
      .then(() => {
        this.todos = toggleDone(this.todos, todo);
      })
      .catch((err) => console.log(err));
  }

  removeTodo(id: number) {
    axios
      .delete(`http://localhost:3001/todos/${id}`)
      .then((resp) => {
        this.todos = removeTodo(this.todos, resp.data.id);
        this.loadTodos();
      })
      .catch((err) => console.log(err));
  }
}

const store = new Todos();

export default store;
