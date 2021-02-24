import Layout from '../components/layout';
import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

export default function NestedGrid() {
  const classes = useStyles();

  function FormRow() {
    return (
      <React.Fragment>
        <Grid item xs={4}>
          <Paper className={classes.paper}>Placeholder text</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>Placeholder text</Paper>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <div className={classes.root} >
      <Grid container spacing={1} >
        <Grid container item xs={12} spacing={3}>
          <FormRow />
        </Grid>
        <Grid container item xs={12} spacing={3} >
          <FormRow />
        </Grid>
      </Grid>
    </div>
  );
}