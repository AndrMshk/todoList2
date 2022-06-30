import { TextField } from '@mui/material';
import React, { useState } from 'react';

export type EditableSpanPropsType = {
  title: string
  refactor: (title: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = React.memo((props) => {

  const [editMode, setEditMode] = useState<boolean>(false);
  const [title, setTitle] = useState(props.title);

  const onChangeHandler = () => {
    if (title.trim() !== '') {
      props.refactor(title);
    } else {
      props.refactor(props.title);
      setTitle(props.title);
    }
    setEditMode(false);
  };

  const onPressEnterKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onChangeHandler();
    }
  };

  return (
    editMode
      ? <TextField
        variant={'standard'}
        value={title}
        onChange={(event) => {setTitle(event.target.value);}}
        onBlur={onChangeHandler}
        onKeyPress={onPressEnterKey}
        autoFocus />
      : <span onDoubleClick={() => setEditMode(true)}>{props.title}</span>
  );
});