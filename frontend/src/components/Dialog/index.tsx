import React from 'react';
import {
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    IconButton,
    FormControl,
    FormGroup,
    Box,
}from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate} from 'react-router-dom';

// type ModalMode = 'signIn' | 'signUp';


interface ModalProps{
    open: boolean;
    onClose: ()=> void;
    title: string;
    mode?: 'signIn' | 'signUp';
    onSubmit?: (data: { email: string; password: string }) => void;

}


export const Modal: React.FC<ModalProps> = ({
  open, 
  onClose, 
  title, 
  mode = 'signIn',
  onSubmit
}: ModalProps) => {

  const navigate = useNavigate();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');

  const handleClose = () => {
    onClose();
    navigate(-1); 
  };
    
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ email, password });
    handleClose();
  };
  
  
  return (
  
      <Dialog
       open={open} onClose={handleClose} aria-labelledby="form-dialog-title"
      sx={{
        '& .MuiDialog-paper': {
          width: { xs: '100%', sm: '500px' },
          borderRadius: 2
        }
      }}
      >
        
        <Box component="form" onSubmit={handleSubmit}>
        <DialogTitle sx={{
           display: 'flex', 
           alignItems: 'center' 
        }}>
          <IconButton
            onClick={handleClose}
            sx={{ ml: 'auto' }}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Box sx={{ 
            flex: 1, 
            textAlign: 'center', 
            mb:3, 
            fontSize: '1.5rem',
            fontWeight: 500
          }}>
            {title}
          </Box>
        </DialogTitle>

        <DialogContent sx={{ pt: 2 }}>
          {mode === 'signUp' && (
            <TextField
              margin="normal"
              label="Имя"
              fullWidth
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: 2 }}
            />
          )}
          
          <TextField
            margin="normal"
            label="Email"
            type="email"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          
          <TextField
            margin="normal"
            label="Пароль"
            type="password"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            helperText="Пароль должен содержать минимум 8 символов"
          />
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              bgcolor: '#1DA1F2',
              color: 'white',
              '&:hover': { bgcolor: '#1991db' },
              py: 1.5,
              fontSize: '1rem'
            }}
          >
            {mode === 'signIn' ? 'Войти' : 'Зарегистрироваться'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>



  )
}

