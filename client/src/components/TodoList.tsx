import * as React from "react";
import { observer } from "mobx-react";
import store from "../store";
import {
  Typography,
  Divider,
  Theme,
  createStyles,
  makeStyles,
  ListItem,
  Button,
  List,
  ListItemSecondaryAction,
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import EditTodo from "./EditTodo";
import { Checkbox } from "@material-ui/core";
import { Todo } from "../types/interfaces";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: { display: "flex", justifyContent: "center", padding: "2rem" },
    todoList: {
      display: "flex",
      justifyContent: "space-around",
      padding: ".5rem",
      width: "100%",
    },
    text: {
      maxWidth: "400px",
      [theme.breakpoints.down("xs")]: {
        maxWidth: "100px",
      },
    },
  })
);

function TodoListItems() {
  const classes = useStyles();
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [itemToEdit, setItemToEdit] = React.useState<Todo>({
    id: 0,
    text: "",
    done: false,
  });

  const handleComplete = (evt: React.MouseEvent, todo: Todo) => {
    store.toggleDone(todo);
  };

  React.useEffect(() => {
    store.loadTodos();
  }, []);

  return (
    <List>
      {store.todos.length ? (
        store.todos?.map((todo) => (
          <ListItem>
            <Checkbox
              color='primary'
              onClick={(evt) => handleComplete(evt, todo)}
              checked={todo.done}
            />
            <Typography noWrap className={classes.text}>
              {todo.text}
            </Typography>
            <ListItemSecondaryAction>
              <Button
                onClick={(evt) => {
                  evt.preventDefault();
                  setItemToEdit(todo);
                  setOpenEditModal(true);
                }}
              >
                <EditIcon color='secondary' />
              </Button>
              <Button
                onClick={() => {
                  store.removeTodo(todo.id);
                }}
              >
                <DeleteForeverIcon color='error' />
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        ))
      ) : (
        <ListItem className={classes.todoList}>
          <div className={classes.title}>No todos to Display</div>
        </ListItem>
      )}
      <EditTodo
        item={itemToEdit}
        open={openEditModal}
        setOpenEditModal={setOpenEditModal}
      />
    </List>
  );
}

const ObservedTodoListItems = observer(TodoListItems);

function TodoList() {
  const classes = useStyles();

  return (
    <>
      <Typography variant={"h4"} className={classes.title}>
        To-Do List
      </Typography>
      <Divider />
      <ObservedTodoListItems />
      <Divider />
    </>
  );
}

export default TodoList;
