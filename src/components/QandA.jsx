import React, { useRef, useState } from "react";

import { useUser } from "../hooks/useUser";
import useFetch from "../hooks/useFetch";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";

const QandA = (props) => {
  const { user } = useUser();

  const fetchData = useFetch();
  const [answerState, setAnswerState] = useState(false);
  const answerRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.role === "contributor") {
      addAnswer();
    } else {
      console.log(`not logged in`);
    }
  };

  const addAnswer = async () => {
    try {
      const res = await fetchData(
        "/api/projects/a/" + props.id,
        "PATCH",
        { answer: answerRef.current.value },
        user.accessToken
      );

      if (res.ok) {
        props.getQandA();
        setAnswerState(false);
      } else {
        alert(JSON.stringify(res.data));
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="body1">Question:</Typography>
          <Typography variant="body1">{props.question}</Typography>
          <br />
          <hr />
          <br />
          <Typography variant="body1">Answer:</Typography>

          {props.answer !== null && (
            <>
              {!answerState && (
                <Typography variant="body1">{props.answer}</Typography>
              )}
            </>
          )}
          {(props.answer === null || props.answer === "") && (
            <>
              {!answerState && (
                <Typography variant="body1">Unanswered</Typography>
              )}
            </>
          )}

          {answerState && (
            <>
              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  id="standard-basic"
                  inputRef={answerRef}
                  label=""
                  defaultValue={props.answer}
                  maxRows={5}
                  variant="standard"
                  fullWidth
                  inputProps={{ minLength: 20, maxLength: 360 }}
                  sx={{ maxWidth: 600 }}
                />
                {answerState && (
                  <Button size="small" type="submit">
                    Done
                  </Button>
                )}
              </Box>
            </>
          )}
        </CardContent>
        <CardActions>
          {user.id === props.projectOwner && (
            <>
              {!answerState && (
                <>
                  <Button size="small" onClick={() => setAnswerState(true)}>
                    Answer Question
                  </Button>
                </>
              )}
            </>
          )}
        </CardActions>
      </Card>

      <br />
      <br />
    </>
  );
};

export default QandA;

/*
NOTES:
refer to Signup.jsx line 109 onwards for input 
  -wrap textfield and button in a container type"form", and set button type "submit"

  -validate question length using the form

  -get individual project by id, api call attached to getAllProjects 
    -use if else statement
    -if req.query.project id -> find one project by query id
    -else get all projects
*/
