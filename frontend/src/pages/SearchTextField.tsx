import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

const TwitterSearchField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '50px',
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${theme.palette.divider}`,
    overflow: 'hidden', 
    transition: theme.transitions.create
    (['border-color', 'box-shadow']),
    '&:hover': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused': {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 1px ${theme.palette.primary.main}`,
      '& .MuiInputAdornment-root svg': {
        color: theme.palette.primary.main,
      },
    },
    '& fieldset': {
      border: 'none', // Remove default border
    },
  },
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.5, 1.5, 1.5, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    color: theme.palette.text.primary,
    '&::placeholder': {
      color: theme.palette.text.secondary,
      opacity: 1,
    },
  },
  '& .MuiInputLabel-root': {
    display: 'none', // Hide label completely
  },
}));

export const SearchTextField = (props) => (
  <TwitterSearchField
    {...props}
    variant="outlined"
    placeholder="Поиск в Твиттере"
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon sx={{ color: 'action.active' }} />
        </InputAdornment>
      ),
    }}
    sx={{
      width: '100%',
      maxWidth: 350,
      ...props.sx,
    }}
  />
);