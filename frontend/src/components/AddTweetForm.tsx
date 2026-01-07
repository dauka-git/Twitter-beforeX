import React from 'react';
import { Avatar, Alert, Button, CircularProgress, IconButton, TextareaAutosize, Box } from '@mui/material';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { useHomeStyles } from '../pages/theme';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddTweet, setAddFormState } from '../store/ducks/tweets/actionCreators';
import { selectAddFormState } from '../store/ducks/tweets/selectors';
import { AddFormState } from '../store/ducks/tweets/contracts/state';
import { UploadImages } from './UploadImages';
import { uploadImage } from '../utils/uploadImage';

interface AddTweetFormProps {
  classes: ReturnType<typeof useHomeStyles>;
  maxRows?: number;
}

const MAX_LENGTH = 280;

export interface ImageObj {
  blobUrl: string;
  file: File;
}

export const AddTweetForm: React.FC<AddTweetFormProps> = ({
  classes,
  maxRows,
}: AddTweetFormProps): React.ReactElement => {
  const dispatch = useDispatch();
  const [text, setText] = React.useState<string>('');
  const [images, setImages] = React.useState<ImageObj[]>([]);

  const addFormState = useSelector(selectAddFormState);
  const textLimitPercent = Math.round((text.length / 280) * 100);
  const textCount = MAX_LENGTH - text.length;

  const handleChangeTextare = (e: React.FormEvent<HTMLTextAreaElement>): void => {
    if (e.currentTarget) {
      setText(e.currentTarget.value);
    }
  };

  const handleClickAddTweet = async (): Promise<void> => {
    let result = [];
    dispatch(setAddFormState(AddFormState.LOADING));
    for (let i = 0; i < images.length; i++) {
      const file = images[i].file;
      const { url } = await uploadImage(file);
      result.push(url);
    }
    dispatch(fetchAddTweet({ text, images: result }));
    setText('');
    setImages([]);
  };

  return (
    <Box>
      <Box sx={classes.addFormBody}>
        <Avatar sx={classes.tweetAvatar} alt={`Аватарка пользователя UserAvatar`} />
        <TextareaAutosize
          onChange={handleChangeTextare}
          style={classes.addFormTextarea}
          placeholder="Что происходит?"
          value={text}
          maxRows={maxRows}
        />
      </Box>
      <Box sx={classes.addFormBottom}>
        <Box sx={{ ...classes.tweetFooter, ...classes.addFormBottomActions }}>
          <UploadImages images={images} onChangeImages={setImages} />
        </Box>
        <Box sx={classes.addFormBottomRight}>
          {text && (
            <>
              <span>{textCount}</span>
              <Box sx={classes.addFormCircleProgress}>
                <CircularProgress
                  variant="determinate"
                  size={20}
                  thickness={5}
                  value={text.length >= MAX_LENGTH ? 100 : textLimitPercent}
                  style={text.length >= MAX_LENGTH ? { color: 'red' } : undefined}
                />
                <CircularProgress
                  style={{ color: 'rgba(0, 0, 0, 0.1)' }}
                  variant="determinate"
                  size={20}
                  thickness={5}
                  value={100}
                />
              </Box>
            </>
          )}
          <Button
            onClick={handleClickAddTweet}
            disabled={addFormState === AddFormState.LOADING || !text || text.length >= MAX_LENGTH}
            color="primary"
            variant="contained">
            {addFormState === AddFormState.LOADING ? (
              <CircularProgress color="inherit" size={16} />
            ) : (
              'Твитнуть'
            )}
          </Button>
        </Box>
      </Box>
      {addFormState === AddFormState.ERROR && (
        <Alert severity="error">
          Ошибка при добавлении твита{' '}
          <span aria-label="emoji-plak" role="img">
            😞
          </span>
        </Alert>
      )}
    </Box>
  );
};
