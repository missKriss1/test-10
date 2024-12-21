import { INewsMutation } from '../../types';
import { useState } from 'react';
import * as React from 'react';
import Grid from '@mui/material/Grid2';
import { Button, TextField } from '@mui/material';
import FileInput from './FileInput.tsx';

const initialState: INewsMutation ={
  title: '',
  description: '',
  image:  null
}

interface Props {
  onSubmit: (news: INewsMutation) => void;
}

const AddForm: React.FC <Props> = ({onSubmit}) => {
  const [form, setForm] = useState<INewsMutation>({...initialState});

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const {name, value} = e.target;
    setForm((prev) => ({...prev, [name]: value}));
  }

  const getFile = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const { name, files } = e.target;
    if (files) {
      setForm((prev) => ({
        ...prev,
        [name]: files[0] || null,
      }));
    }
  }

  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.description.trim() || !form.title.trim() ) {
      alert('Title and description is required!');
      return;
    }
    const submission = {
      ...form,
      date: new Date().toISOString(),
    };
    onSubmit(submission);
    setForm({ ...initialState });
  };

  return (
    <div>
      <form onSubmit={onSubmitForm}>
        <Grid container direction="column" spacing={2}>
          <Grid>
            <TextField
              id="title"
              name="title"
              label="Title"
              value={form.title}
              onChange={onInputChange}
              placeholder="Enter your name (optional)"
              fullWidth
            />
          </Grid>
          <Grid>
            <TextField
              multiline
              id="description"
              name="description"
              label="Description"
              value={form.description}
              onChange={onInputChange}
              placeholder="Enter your description "
              fullWidth
            />
          </Grid>
          <Grid>
            <FileInput name="image" label="Image" onChange={getFile}/>
          </Grid>
          <Grid>
            <Button type="submit" variant="contained" color="primary">
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddForm;