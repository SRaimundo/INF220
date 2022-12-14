import { yupResolver } from '@hookform/resolvers/yup';
import PublishTwoToneIcon from '@mui/icons-material/PublishTwoTone';
import {
  Alert,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  Snackbar,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { PhoneMaskCustom } from 'src/components/Masks/phoneMask';
import { Clients } from 'src/models/clients';
import { create } from 'src/services/clients';
import * as yup from 'yup';

const schema = yup.object().shape({
  Nome: yup.string().required('Nome é um campo obrigatório'),
  Pais_origem: yup.string().required('Pais_origem é um campo obrigatório'),
  Telefone: yup.string().required('Telefone é um campo obrigatório'),
  Email: yup.string().required('Email é um campo obrigatório'),
  Senha: yup.string().required('Senha é um campo obrigatório'),
  Rua: yup.string().required('Rua é um campo obrigatório'),
  Numero: yup.string().required('Numero é um campo obrigatório'),
  Bairro: yup.string().required('Bairro é um campo obrigatório'),
  Cidade: yup.string().required('Cidade é um campo obrigatório'),
  UF: yup.string().required('Estado é um campo obrigatório'),
  // pais: yup.string().required('País é um campo obrigatório'),
});

function CreateClientsForm() {
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Clients> = (data) => {
    create(data).then((res) => {
      setOpenConfirm(false);
      return navigate('/clients');
    });
  };

  const [openErrors, setOpenErrors] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Clients>({ resolver: yupResolver(schema) });

  useEffect(() => {
    register('Nome');
    register('Pais_origem');
    register('Telefone');
    register('Email');
    register('Senha');
    register('Rua');
    register('Numero');
    register('Bairro');
    register('Cidade');
    register('UF');
    // register('Pais');
  }, [register]);

  return (
    <Container>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={3}
      >
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title="Dados Pessoais"
              subheader="Informe os dados para cadastro do cliente."
            />
            <Divider />
            <CardContent>
              <Grid
                container
                component="form"
                noValidate
                autoComplete="on"
                spacing={2}
              >
                <Grid item md={12} xs={12}>
                  <TextField
                    type="string"
                    name="Nome"
                    fullWidth
                    error={!!errors?.Nome}
                    helperText={errors?.Nome?.message || ''}
                    label="Nome Completo"
                    required
                    onChange={(event) => setValue('Nome', event.target.value)}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    type="string"
                    name="Pais_origem"
                    fullWidth
                    error={!!errors?.Pais_origem}
                    helperText={errors?.Pais_origem?.message || ''}
                    label="Pais_origem"
                    required
                    onChange={(event) =>
                      setValue('Pais_origem', event.target.value)
                    }
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    // type="string"
                    // name="Telefone"
                    fullWidth
                    error={!!errors?.Telefone}
                    helperText={errors?.Telefone?.message || ''}
                    label="Telefone"
                    value={watch('Telefone') || ''}
                    required
                    onChange={(event) =>
                      setValue('Telefone', event.target.value)
                    }
                    InputProps={{
                      inputComponent: PhoneMaskCustom as any,
                    }}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title="Dados Cadastrais"
              subheader="Informe os dados de autenticação"
            />
            <Divider />
            <CardContent>
              <Grid
                container
                component="form"
                noValidate
                autoComplete="on"
                spacing={2}
              >
                <Grid item md={6} xs={12}>
                  <TextField
                    type="string"
                    name="Email"
                    fullWidth
                    error={!!errors?.Email}
                    helperText={errors?.Email?.message || ''}
                    label="Email"
                    required
                    onChange={(event) => setValue('Email', event.target.value)}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    type="string"
                    name="Senha"
                    fullWidth
                    error={!!errors?.Senha}
                    helperText={errors?.Senha?.message || ''}
                    label="Senha"
                    required
                    onChange={(event) => setValue('Senha', event.target.value)}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title="Endereço do Cliente"
              subheader="Informe o endereço de residencia do cliente"
            />
            <Divider />
            <CardContent>
              <Grid
                container
                component="form"
                noValidate
                autoComplete="on"
                spacing={2}
              >
                <Grid item md={6} xs={12}>
                  <TextField
                    type="string"
                    name="Rua"
                    fullWidth
                    error={!!errors?.Rua}
                    helperText={errors?.Rua?.message || ''}
                    label="Rua"
                    required
                    onChange={(event) => setValue('Rua', event.target.value)}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <TextField
                    type="number"
                    name="Numero"
                    fullWidth
                    error={!!errors?.Numero}
                    helperText={errors?.Numero?.message || ''}
                    label="0"
                    required
                    onChange={(event) => setValue('Numero', Number(event.target.value))}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <TextField
                    type="string"
                    name="Bairro"
                    fullWidth
                    error={!!errors?.Bairro}
                    helperText={errors?.Bairro?.message || ''}
                    label="Bairro"
                    required
                    onChange={(event) => setValue('Bairro', event.target.value)}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    type="string"
                    name="Cidade"
                    fullWidth
                    error={!!errors?.Cidade}
                    helperText={errors?.Cidade?.message || ''}
                    label="Cidade"
                    required
                    onChange={(event) => setValue('Cidade', event.target.value)}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <TextField
                    type="string"
                    name="UF"
                    fullWidth
                    error={!!errors?.UF}
                    helperText={errors?.UF?.message || ''}
                    label="Estado (UF)"
                    required
                    onChange={(event) => setValue('UF', event.target.value)}
                  />
                </Grid>
                {/* <Grid item md={3} xs={12}>
                  <TextField
                    type="string"
                    name="country"
                    fullWidth
                    error={!!errors?.Pais}
                    helperText={errors?.Pais?.message || ''}
                    label="País"
                    required
                    onChange={(event) => setValue('Pais', event.target.value)}
                  />
                </Grid> */}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Button
            style={{ float: 'right', marginTop: 10 }}
            disabled={openConfirm}
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
            onClick={() => handleSubmit(onSubmit)() && setOpenErrors(true)}
            startIcon={<PublishTwoToneIcon fontSize="small" />}
            children="Salvar"
            type="submit"
          />
          <Snackbar
            open={Object.keys(errors).length !== 0 && openErrors}
            autoHideDuration={6000}
            onClose={() => setOpenErrors(false)}
            children={
              <Alert
                onClose={() => setOpenErrors(false)}
                severity="error"
                sx={{ width: '100%' }}
                children="Ocorreu um erro ao cadastrar o cliente!"
              />
            }
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default CreateClientsForm;
