import Grid from '@mui/material/Grid2';
import { Button, TextField } from '@mui/material';
import * as React from 'react';
import { useRef, useState } from 'react';

interface Props{
  name: string,
  label: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const FileInput: React.FC<Props> = ({name, label, onChange}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState('');

  const activateInput = () =>{
    if(inputRef.current){
      inputRef.current.click();
    }
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files && e.target.files[0]){
      setFileName(e.target.files[0].name)
    }else{
      setFileName('')
    }
    onChange(e)
  }

  return (
    <div>
      <input
        style={{display: 'none'}}
        type='file'
        name = {name}
        onChange={onFileChange}
        ref={inputRef}
      />
      <Grid container spacing={2} direction="row" alignItems="center">
        <Grid>
          <TextField
            disabled
            label={label}
            value={fileName}
            onClick={activateInput}
          />
        </Grid>
        <Grid>
          <Button variant='contained' onClick={activateInput}>Browse</Button>
        </Grid>
      </Grid>

    </div>
  );
};

export default FileInput;