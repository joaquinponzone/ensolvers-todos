import * as React from "react";
import { observer } from "mobx-react";
import store from "../store";
import {
  Button,
  createStyles,
  Grid,
  makeStyles,
  TextField,
  Theme,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: "1rem",
      justifyContent: "center",
    },
    addButton: {
      marginTop: "1rem",
      width: "100%",
    },
  })
);

function TodoAdd() {
  const classes = useStyles();
  return (
    <Grid container className={classes.container}>
      <form
        onSubmit={(evt: React.FormEvent) => {
          evt.preventDefault();
          store.addTodo({ text: store.newTodo, done: false });
        }}
      >
        <TextField
          fullWidth
          variant='outlined'
          value={store.newTodo}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
            (store.newTodo = evt.target.value)
          }
          placeholder='New todo'
        />
        <Button
          type='submit'
          variant='contained'
          color='primary'
          className={classes.addButton}
        >
          Add Todo
        </Button>
      </form>
    </Grid>
  );
}

export default observer(TodoAdd);
