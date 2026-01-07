import { Button, FormControl, FormGroup, TextField } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useStylesSignIn } from '..';
import { ModalBlock } from '../../../components/ModalBlock';
import type { AlertColor } from '@mui/material';
import { fetchSignUp } from '../../../store/ducks/user/actionCreators';
import { selectUserStatus } from '../../../store/ducks/user/selectors';
import { LoadingStatus } from '../../../store/types';

interface RegisterModalProps {
  open: boolean;
  onClose: () => void;
}

export interface RegisterFormProps {
  fullname: string;
  username: string;
  email: string;
  password: string;
  password2: string;
}

const RegisterFormSchema = yup.object().shape({
  fullname: yup.string().required('Введите своё имя'),
  email: yup.string().email('Неверная почта').required('Введите почту'),
  username: yup.string().required('Введите логин'),
  password: yup.string().min(6, '​Минимальная длина пароля 6 символов').required(),
  password2: yup.string().oneOf([yup.ref('password')], 'Пароли не соответствуют'),
});

export const RegisterModal: React.FC<RegisterModalProps> = ({
  open,
  onClose,
}): React.ReactElement => {
  const classes = useStylesSignIn();
  const dispatch = useDispatch();
  // TODO: Не бейте меня
  const openNotificationRef = React.useRef<(text: string, type: AlertColor) => void>(() => {});
  const loadingStatus = useSelector(selectUserStatus);

  const { control, handleSubmit, errors } = useForm<RegisterFormProps>({
    resolver: yupResolver(RegisterFormSchema),
  });

  const onSubmit = async (data: RegisterFormProps) => {
    dispatch(fetchSignUp(data));
  };

  React.useEffect(() => {
    if (loadingStatus === LoadingStatus.SUCCESS) {
      openNotificationRef.current('Регистрация успешна!', 'success');
      onClose();
    } else if (loadingStatus === LoadingStatus.ERROR) {
      openNotificationRef.current('Ошибка при регистрации!', 'error');
    }
  }, [loadingStatus, onClose]);

  return (
    <ModalBlock visible={open} onClose={onClose} classes={classes} title="Войти в аккаунт">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl sx={classes.loginFormControl} component="fieldset" fullWidth>
          <FormGroup aria-label="position" row>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={classes.registerField}
                  id="email"
                  label="E-Mail"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="filled"
                  type="email"
                  helperText={errors.email?.message}
                  error={!!errors.email}
                  fullWidth
                  autoFocus
                />
              )}
            />
            <Controller
              name="username"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={classes.registerField}
                  id="username"
                  label="Логин"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="filled"
                  type="text"
                  helperText={errors.username?.message}
                  error={!!errors.username}
                  fullWidth
                />
              )}
            />
            <Controller
              name="fullname"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={classes.registerField}
                  id="fullname"
                  label="Ваше имя"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="filled"
                  type="text"
                  helperText={errors.fullname?.message}
                  error={!!errors.fullname}
                  fullWidth
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={classes.registerField}
                  id="password"
                  label="Пароль"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="filled"
                  type="password"
                  helperText={errors.password?.message}
                  error={!!errors.password}
                  fullWidth
                />
              )}
            />
            <Controller
              name="password2"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={classes.registerField}
                  id="password2"
                  label="Пароль"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="filled"
                  type="password"
                  helperText={errors.password2?.message}
                  error={!!errors.password2}
                  fullWidth
                />
              )}
            />
            <Button
              disabled={loadingStatus === LoadingStatus.LOADING}
              type="submit"
              variant="contained"
              color="primary"
              fullWidth>
              Регистрация
            </Button>
          </FormGroup>
        </FormControl>
      </form>
    </ModalBlock>
  );
};
