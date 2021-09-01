import * as React from "react";
import { observer } from "mobx-react";
import store from "../store";
import {
  Typography,
  Button,
  Checkbox,
  Grid,
  Input,
  Divider,
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import { useState } from "react";

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
      display: "flex",
      maxWidth: "80%",
      [theme.breakpoints.down("xs")]: {
        padding: "0",
        width: "120px",
      },
    },
    actions: {
      display: "flex",
    },
  })
);

function TodoListItems() {
  const classes = useStyles();
  const [openEdit, setOpenEdit] = useState(false);

  React.useEffect(() => {
    store.loadTodos();
  }, []);

  return (
    <Grid container spacing={2} justifyContent='center' alignItems='center'>
      {store.todos.length > 0 ? (
        store.todos?.map((todo) => (
          <Grid container key={todo.id} className={classes.todoList}>
            <Grid item>
              <Checkbox
                onClick={(evt) => {
                  evt.preventDefault();
                  store.toggleDone(todo);
                }}
                checked={todo.done}
              />
            </Grid>
            <Grid item className={classes.text}>
              <Input
                value={todo.text}
                onChange={(evt) => {
                  todo.text = evt.target.value;
                }}
                disableUnderline={!openEdit}
                readOnly={!openEdit}
              />
            </Grid>
            <Grid item className={classes.actions}>
              {openEdit ? (
                <Button
                  onClick={(evt) => {
                    evt.preventDefault();
                    store.editTodo(todo);
                    store.loadTodos();
                    setOpenEdit(!openEdit);
                  }}
                >
                  Save
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setOpenEdit(!openEdit);
                  }}
                >
                  <EditIcon />
                </Button>
              )}
              <Button
                onClick={() => {
                  store.removeTodo(todo.id);
                }}
              >
                <DeleteForeverIcon />
              </Button>
            </Grid>
          </Grid>
        ))
      ) : (
        <Grid container className={classes.todoList}>
          <div className={classes.title}>No todos to Display</div>
        </Grid>
      )}
    </Grid>
  );
}

const ObservedTodoListItems = observer(TodoListItems);

function TodoList() {
  const classes = useStyles();

  return (
    <>
      <Typography variant={"h4"} className={classes.title}>
        To-do List
      </Typography>
      <Divider />
      <ObservedTodoListItems />
      <Divider />
    </>
  );
}

export default TodoList;
