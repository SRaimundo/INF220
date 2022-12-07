import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CssBaseline, Grid, TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useContext, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Icon from 'src/assets/Icon';
import { AuthContext } from 'src/contexts/AuthContext';
import * as yup from 'yup';

interface LoginInterface {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .email('O formato de email é inválido')
    .required('O email é obrigatório'),
  password: yup
    .string()
    .required('A senha é obrigatório')
    .min(6, 'A senha deve possuir no mínimo seis caractéres'),
});

function Login() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginInterface>({ resolver: yupResolver(schema) });

  useEffect(() => {
    register('email');
    register('password');
  }, [register]);

  const { authContext } = useContext(AuthContext);

  const onSubmit: SubmitHandler<LoginInterface> = async (data) => {
    try {
      await authContext.signIn(data.email, data.password);
    } catch (error) {
      const message = 'Falha no login. Email ou senha inválidos';
      setError('email', { message: message });
      setError('password', { message: message });
    }
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1517840901100-8179e982acb7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light'
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Icon
            style={{ alignSelf: 'center', marginBottom: '15%' }}
            width={'50%'}
          />
          <Box
            component="form"
            onSubmit={() => handleSubmit(onSubmit)()}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              error={!!errors?.email}
              helperText={errors?.email?.message || ''}
              onChange={(event) => setValue('email', event.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              error={!!errors?.password}
              helperText={errors?.password?.message || ''}
              onChange={(event) => setValue('password', event.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              children="Entrar"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit(onSubmit)();
              }}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Login;
