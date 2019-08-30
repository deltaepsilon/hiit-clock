import React, { useCallback, useEffect, useContext, useState, useRef } from 'react';
import Link from 'next/link';
import { AuthenticationContext } from '../contexts/authentication-context';
import { Button } from '@rmwc/button';
import { IconButton } from '@rmwc/icon-button';
import { LinearProgress } from '@rmwc/linear-progress';
import { DeleteOutline, RotateRight } from '../svg';
import Pica from 'pica';
import md5 from 'md5';
import constants from '../constants';

import './image-upload-input.css';

export default ({ id, text = 'Upload', file, onChange }) => {
  const initialFileUrl = file && (file.dataUrl || file.downloadURL);
  const { currentUser } = useContext(AuthenticationContext);
  const [fileUrl, setFileUrl] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const imgRef = useRef(null);
  const canvasRef = useRef(null);
  const triggerInput = useCallback(
    e => (e.preventDefault(), e.stopPropagation(), inputRef.current.click()),
    [inputRef]
  );
  const handleImageLoad = useCallback(() => {
    if (isLoading) {
      (async () => {
        const { blob, dataUrl, dimensions } = await resizeImage(imgRef, canvasRef);

        if (dataUrl) {
          const hash = md5(dataUrl);
          const hashWithoutSlashes = hash.replace(/\//, '|');

          onChange({ blob, dataUrl, dimensions, key: hashWithoutSlashes });
        }

        setIsLoading(false);

        inputRef.current.value = '';
      })();
    }
  }, [isLoading, canvasRef, inputRef, imgRef, onChange, setIsLoading]);

  useEffect(() => {
    setFileUrl(initialFileUrl);
    setPreviewUrl(initialFileUrl);
  }, [initialFileUrl]);

  useEffect(() => {
    const needsUpdate = fileUrl != previewUrl;

    needsUpdate && setPreviewUrl(fileUrl);
  }, [previewUrl, fileUrl]);

  return (
    <>
      <div className="image-upload-input" is-loading={String(isLoading)}>
        {isLoading && <LinearProgress />}

        {/*<label htmlFor={id}>
          <Button raised disabled={!currentUser} onClick={triggerInput}>
            {text}
          </Button>
        </label> */}

        <input
          id={id}
          type="file"
          ref={inputRef}
          disabled={!currentUser}
          onChange={getFileChangeHandler({ setIsLoading, setPreviewUrl })}
        />
        <div className="image-upload-preview">
          {!!currentUser && !currentUser.isAnonymous ? (
            <>
              {previewUrl ? (
                <>
                  <img
                    className="full-size"
                    ref={imgRef}
                    src={previewUrl}
                    crossOrigin="anonymous"
                    onLoad={handleImageLoad}
                  />
                  <img className="constrained-size" src={previewUrl} crossOrigin="anonymous" />
                  <canvas ref={canvasRef} />
                  <IconButton
                    className="rotate-button"
                    icon={<RotateRight fill={constants.COLORS.BUTTON_ON_WHITE} />}
                    onClick={async e => {
                      e.preventDefault();

                      await rotateImage({ imgRef, setFileUrl, setIsLoading });
                    }}
                  />
                  <IconButton
                    className="delete-button"
                    icon={<DeleteOutline fill={constants.COLORS.BUTTON_ON_WHITE} />}
                    onClick={e => {
                      e.preventDefault();
                      onChange(null);
                      setFileUrl(null);
                      setPreviewUrl(null);
                      inputRef.current.value = '';
                    }}
                  />
                </>
              ) : (
                <span onClick={triggerInput}>Click to upload</span>
              )}
            </>
          ) : (
            <div className="image-upload-error">
              <Link href={constants.ROUTES.SETTINGS}>
                <a href={constants.ROUTES.SETTINGS}>Log in with Google</a>
              </Link>
              <span> to upload</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

function getFileChangeHandler({ setIsLoading, setPreviewUrl }) {
  return e => {
    if (e.target.value) {
      const [file] = e.target.files;
      const reader = new FileReader();

      setIsLoading(true);

      reader.addEventListener('load', () => setPreviewUrl(reader.result), false);

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };
}

async function rotateImage({ imgRef, setFileUrl, setIsLoading }) {
  const image = imgRef.current;
  const { width, height } = getNewDimensions(imgRef);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = height;
  canvas.height = width;

  ctx.translate(height, 0);
  ctx.rotate(90 * (Math.PI / 180));
  ctx.drawImage(image, 0, 0);
  ctx.fill();

  setIsLoading(true);

  const pica = Pica();
  const blob = await pica.toBlob(canvas, 'image/jpeg');
  const dataUrl = await getDataUrl(blob);

  setFileUrl(dataUrl);
}

async function resizeImage(imgRef, canvasRef) {
  const { width, height } = setCanvasDimensions(imgRef, canvasRef);
  let result = {};

  if (width && height) {
    const pica = Pica();
    const resized = await pica.resize(imgRef.current, canvasRef.current, { quality: 3 });
    const blob = await pica.toBlob(resized, 'image/jpeg', 0.9);
    const dataUrl = await getDataUrl(blob);

    result = { blob, dataUrl, dimensions: { width, height } };
  }

  return result;
}

function setCanvasDimensions(imgRef, canvasRef) {
  const { width, height } = getNewDimensions(imgRef);

  canvasRef.current.width = width;
  canvasRef.current.height = height;

  return { width, height };
}

function getNewDimensions(imgRef) {
  const { width, height } = imgRef.current;
  const aspectRatio = width / height;
  const maxWidth = Math.min(width, constants.DIMENSIONS.PREVIEW_IMAGE.MAX_WIDTH);
  const maxHeight = Math.min(height, constants.DIMENSIONS.PREVIEW_IMAGE.MAX_HEIGHT);
  const heightIsGreater = maxHeight > maxWidth;
  let adjustedWidth;
  let adjustedHeight;

  if (heightIsGreater) {
    adjustedHeight = maxHeight;
    adjustedWidth = Math.round(adjustedHeight * aspectRatio);
  } else {
    adjustedWidth = maxWidth;
    adjustedHeight = Math.round(adjustedWidth / aspectRatio);
  }

  return { width: adjustedWidth, height: adjustedHeight };
}

async function getDataUrl(fileOrBlob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    try {
      reader.addEventListener(
        'load',
        () => {
          try {
            resolve(reader.result);
          } catch (error) {
            reject(error);
          }
        },
        false
      );

      reader.readAsDataURL(fileOrBlob);
    } catch (error) {
      reject(error);
    }
  });
}
