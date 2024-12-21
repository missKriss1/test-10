
import { ICommentMutation } from '../../../types';
import { useState } from 'react';
import * as React from 'react';
import Grid from '@mui/material/Grid2';
import { Button, Container, TextField, Typography } from '@mui/material';
import { useAppDispatch } from '../../../app/hooks.ts';
import { addNewComments, fetchCommentByNewsId } from '../../container/comment/commentThunk.ts';
 interface Props{
   newsId: string
 }

const FromAddComment: React.FC <Props> = ({newsId}) => {
  console.log(newsId)
  const initialState: ICommentMutation ={
    author: '',
    comment: '',
    newsId: newsId
  }
  const [form, setForm] = useState<ICommentMutation>({...initialState});
  const dispatch = useAppDispatch();

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const {name, value} = e.target;
    setForm((prev) => ({...prev, [name]: value}));
  }

  const onSubmitForm = async (e: React.FormEvent) => {
    console.log(newsId)
    e.preventDefault();
    await dispatch(addNewComments(form))
    await dispatch(fetchCommentByNewsId(newsId))
    setForm({ ...initialState });
  };

  return (
    <Container>
      <Typography variant="h4" sx ={{ marginBottom: 2,}} component="h1">
        Add comment
      </Typography>
      <form onSubmit={onSubmitForm}>
        <Grid container direction="column" spacing={2}>
          <Grid>
            <TextField
              sx = {{width: "50%"}}
              id="author"
              name="author"
              label="Author"
              value={form.author}
              onChange={onInputChange}
              placeholder="Enter your name (optional)"
              fullWidth
            />
          </Grid>
          <Grid>
            <TextField
              sx = {{width: "50%"}}
              multiline
              id="comment"
              name="comment"
              label="Comment"
              value={form.comment}
              onChange={onInputChange}
              placeholder="Enter your description "
              fullWidth
            />
          </Grid>
          <Grid>
            <Button type="submit" variant="contained" color="primary">
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default FromAddComment;