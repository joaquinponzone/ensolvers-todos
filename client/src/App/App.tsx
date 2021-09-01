import * as React from "react";
import {
  Container,
  createStyles,
  CssBaseline,
  Grid,
  makeStyles,
  Paper,
  Theme,
} from "@material-ui/core";
import TodoList from "../components/TodoList";
import TodoAdd from "../components/TodoAdd";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "3rem",
      [theme.breakpoints.down("xs")]: {
        padding: "0",
        width: "320px",
      },
    },
  })
);

export function App() {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <Container maxWidth='lg' className={classes.root}>
        <Paper>
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <TodoList />
            </Grid>
            <Grid item xs={12}>
              <TodoAdd />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
}
