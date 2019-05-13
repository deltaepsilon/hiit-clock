import React, { useCallback, useContext, useState, useRef } from 'react';
import { AuthenticationContext } from '../contexts/authentication-context';
import { Button } from '@rmwc/button';
import { IconButton } from '@rmwc/icon-button';
import { DeleteOutline } from '../svg';

import './image-upload-input.css';

export default ({ id, text = 'Upload', label, value, onChange }) => {
  const { currentUser } = useContext(AuthenticationContext);
  const [previewUrl, setPreviewUrl] = useState(value);
  const inputRef = useRef(null);
  const triggerInput = useCallback(() => inputRef.current.click(), [inputRef]);

  return (
    <div className="image-upload-input">
      <label htmlFor={id}>
        <Button raised disabled={!currentUser} onClick={triggerInput}>
          {text}
        </Button>
      </label>

      

      <input
        id={id}
        type="file"
        ref={inputRef}
        disabled={!currentUser}
        onChange={getFileChangeHandler({ setPreviewUrl, onChange })}
      />
      <div className="image-upload-preview">
        {!!currentUser ? (
          <>
            {previewUrl ? (
              <>
                <img src={previewUrl} alt="timer image preview" />
                <IconButton
                  icon={<DeleteOutline />}
                  onClick={e => {
                    e.preventDefault();
                    onChange(null);
                  }}
                />
              </>
            ) : (
              <span onClick={triggerInput}>Click to upload</span>
            )}
          </>
        ) : (
          <div className="image-upload-error">Log in to upload</div>
        )}
      </div>
    </div>
  );
};

function getFileChangeHandler({ setPreviewUrl, onChange }) {
  return e => {
    const [file] = e.target.files;
    const reader = new FileReader();

    reader.addEventListener('load', () => setPreviewUrl(reader.result), false);

    if (file) {
      reader.readAsDataURL(file);
    }

    onChange(file);
  };
}
