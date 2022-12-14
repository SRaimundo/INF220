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
import { Hospede } from 'src/models/hospede';
import { create } from 'src/services/hospede';
import * as yup from 'yup';

const schema = yup.object().shape({
  nome: yup.string().required('Nome é um campo obrigatório'),
  Pais_origem: yup.string().required('Pais_origem é um campo obrigatório'),
  telefone: yup.string().required('Telefone é um campo obrigatório'),
  email: yup.string().required('Email é um campo obrigatório'),
  senha: yup.string().required('Senha é um campo obrigatório'),
  rua: yup.string().required('Rua é um campo obrigatório'),
  numero: yup.string().required('Numero é um campo obrigatório'),
  bairro: yup.string().required('Bairro é um campo obrigatório'),
  cidade: yup.string().required('Cidade é um campo obrigatório'),
  estado: yup.string().required('Estado é um campo obrigatório'),
  pais: yup.string().required('País é um campo obrigatório'),
});

function CreateHospedeForm() {
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Hospede> = (data) => {
    create(data).then((res) => {
      setOpenConfirm(false);
      return navigate('/hospede');
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
  } = useForm<Hospede>({ resolver: yupResolver(schema) });

  useEffect(() => {
    register('Id_hospede');
    register('Hospedagem');
    register('Nome');
    register('Email');
    register('CPF');
    register('Nascimento');
    register('Sexo');
    register('Profissao');
    register('Nacionalidade');
    register('Descricao_documento');
    register('Tipo_documento');
    register('Orgao_exp');
    register('DDI_celular');
    register('DDD_celular');
    register('Numero_celular');
    register('DDD_telefone');
    register('DDI_telefone');
    register('Numero_telefone');
    register('Endereco');
    register('Bairro');
    register('Numero');
    register('Cidade');
    register('Estado');
    register('Pais');
    register('CEP');
    register('Ultima_cidade');
    register('Ultima_estado');
    register('Ultima_pais');
    register('Proxima_cidade');
    register('Proxima_estado');
    register('Proxima_pais');
    register('Motivo');
    register('Meio_transporte');
    register('Observacoes');
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
              subheader="Informe os dados para cadastro do hospede."
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
                <Grid item md={4} xs={12}>
                  <TextField
                    type="string"
                    name="name"
                    fullWidth
                    error={!!errors?.Nome}
                    helperText={errors?.Nome?.message || ''}
                    label="Nome Completo"
                    required
                    onChange={(event) => setValue('Nome', event.target.value)}
                  />
                </Grid>
                <Grid item md={4} xs={12}>
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
                <Grid item md={1} xs={12}>
                  <TextField
                    type="string"
                    name="DDI_telefone"
                    fullWidth
                    error={!!errors?.DDI_telefone}
                    helperText={errors?.DDI_telefone?.message || ''}
                    label="DDI"
                    required
                    onChange={(event) => setValue('DDI_telefone', event.target.value)}
                  />
                </Grid>
                <Grid item md={1} xs={12}>
                  <TextField
                    type="string"
                    name="DDD_telefone"
                    fullWidth
                    error={!!errors?.DDD_telefone}
                    helperText={errors?.DDD_telefone?.message || ''}
                    label="DDD"
                    required
                    onChange={(event) => setValue('DDD_telefone', event.target.value)}
                  />
                </Grid>
                <Grid item md={2} xs={12}>
                  <TextField
                    type="string"
                    name="Numero_telefone"
                    fullWidth
                    error={!!errors?.Numero_telefone}
                    helperText={errors?.Numero_telefone?.message || ''}
                    label="Telefone"
                    required
                    onChange={(event) => setValue('Numero_telefone', event.target.value)}
                  />
                </Grid>

                <Grid item md={1} xs={12}>
                  <TextField
                    type="string"
                    name="DDI_celular"
                    fullWidth
                    error={!!errors?.DDI_celular}
                    helperText={errors?.DDI_celular?.message || ''}
                    label="DDI"
                    required
                    onChange={(event) => setValue('DDI_celular', event.target.value)}
                  />
                </Grid>
                <Grid item md={1} xs={12}>
                  <TextField
                    type="string"
                    name="DDD_celular"
                    fullWidth
                    error={!!errors?.DDD_celular}
                    helperText={errors?.DDD_celular?.message || ''}
                    label="DDD"
                    required
                    onChange={(event) => setValue('DDD_celular', event.target.value)}
                  />
                </Grid>
                <Grid item md={2} xs={12}>
                  <TextField
                    type="string"
                    name="Numero_celular"
                    fullWidth
                    error={!!errors?.Numero_celular}
                    helperText={errors?.Numero_celular?.message || ''}
                    label="Celular"
                    required
                    onChange={(event) => setValue('Numero_celular', event.target.value)}
                  />
                </Grid>

                <Grid item md={2} xs={12}>
                  <TextField
                    type="string"
                    name="Profissao"
                    fullWidth
                    error={!!errors?.Profissao}
                    helperText={errors?.Profissao?.message || ''}
                    label="Profissao"
                    required
                    onChange={(event) => setValue('Profissao', event.target.value)}
                  />
                </Grid>
                <Grid item md={2} xs={12}>
                  <TextField
                    type="string"
                    name="Nacionalidade"
                    fullWidth
                    error={!!errors?.Nacionalidade}
                    helperText={errors?.Nacionalidade?.message || ''}
                    label="Nacionalidade"
                    required
                    onChange={(event) => setValue('Nacionalidade', event.target.value)}
                  />
                </Grid>
                <Grid item md={2} xs={12}>
                  <TextField
                    type="string"
                    name="Nascimento"
                    fullWidth
                    error={!!errors?.Nascimento}
                    helperText={errors?.Nascimento?.message || ''}
                    label="Nascimento"
                    required
                    onChange={(event) => setValue('Nascimento', event.target.value)}
                  />
                </Grid>
                <Grid item md={2} xs={12}>
                  <TextField
                    type="string"
                    name="Sexo"
                    fullWidth
                    error={!!errors?.Sexo}
                    helperText={errors?.Sexo?.message || ''}
                    label="Sexo"
                    required
                    onChange={(event) => setValue('Sexo', event.target.value)}
                  />
                </Grid>
                <Grid item md={2} xs={12}>
                  <TextField
                    type="string"
                    name="Descricao_documento"
                    fullWidth
                    error={!!errors?.Descricao_documento}
                    helperText={errors?.Descricao_documento?.message || ''}
                    label="Documento"
                    required
                    onChange={(event) => setValue('Descricao_documento', event.target.value)}
                  />
                </Grid>
                
                <Grid item md={1} xs={12}>
                  <TextField
                    type="string"
                    name="Tipo_documento"
                    fullWidth
                    error={!!errors?.Tipo_documento}
                    helperText={errors?.Tipo_documento?.message || ''}
                    label="Tipo"
                    required
                    onChange={(event) => setValue('Tipo_documento', event.target.value)}
                  />
                </Grid>

                <Grid item md={1} xs={12}>
                  <TextField
                    type="string"
                    name="Orgao_exp"
                    fullWidth
                    error={!!errors?.Orgao_exp}
                    helperText={errors?.Orgao_exp?.message || ''}
                    label="Emissor"
                    required
                    onChange={(event) => setValue('Orgao_exp', event.target.value)}
                  />
                </Grid>

                <Grid item md={2} xs={12}>
                  <TextField
                    type="string"
                    name="CPF"
                    fullWidth
                    error={!!errors?.CPF}
                    helperText={errors?.CPF?.message || ''}
                    label="CPF"
                    required
                    onChange={(event) => setValue('CPF', event.target.value)}
                  />
                </Grid>

                
                
                {/* <Grid item md={6} xs={12}>
                  <TextField
                    type="string"
                    name="nationality"
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
                </Grid> */}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        {/* <Grid item xs={12}>
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
                    name="email"
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
                    type="password"
                    name="senha"
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
        </Grid> */}
        
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title="Endereço atual do hospede"
              subheader="Informe o endereço de residencia do hospede"
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
                    name="street"
                    fullWidth
                    error={!!errors?.Endereco}
                    helperText={errors?.Endereco?.message || ''}
                    label="Endereco"
                    required
                    onChange={(event) => setValue('Endereco', event.target.value)}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <TextField
                    type="string"
                    name="Numero"
                    fullWidth
                    error={!!errors?.Numero}
                    helperText={errors?.Numero?.message || ''}
                    label="0"
                    required
                    onChange={(event) => setValue('Numero', event.target.value)}
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
                <Grid item md={4} xs={12}>
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
                    name="state"
                    fullWidth
                    error={!!errors?.Estado}
                    helperText={errors?.Estado?.message || ''}
                    label="Estado (UF)"
                    required
                    onChange={(event) => setValue('Estado', event.target.value)}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
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
                </Grid>
                <Grid item md={2} xs={12}>
                  <TextField
                    type="string"
                    name="CEP"
                    fullWidth
                    error={!!errors?.CEP}
                    helperText={errors?.CEP?.message || ''}
                    label="CEP"
                    required
                    onChange={(event) => setValue('CEP', event.target.value)}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        {/* Ultima precedencia */}
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title="Ultima precedencia"
              subheader="Informe a ultima precedencia do hospede"
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
                    name="Ultima_cidade"
                    fullWidth
                    error={!!errors?.Ultima_cidade}
                    helperText={errors?.Ultima_cidade?.message || ''}
                    label="Ultima cidade"
                    required
                    onChange={(event) => setValue('Ultima_cidade', event.target.value)}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <TextField
                    type="string"
                    name="Ultima_estado"
                    fullWidth
                    error={!!errors?.Ultima_estado}
                    helperText={errors?.Ultima_estado?.message || ''}
                    label="Ultima estado"
                    required
                    onChange={(event) => setValue('Ultima_estado', event.target.value)}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <TextField
                    type="string"
                    name="Ultima_pais"
                    fullWidth
                    error={!!errors?.Ultima_pais}
                    helperText={errors?.Ultima_pais?.message || ''}
                    label="Ultimo pais"
                    required
                    onChange={(event) => setValue('Ultima_pais', event.target.value)}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Proxima precedencia */}
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title="Proxima precedencia"
              subheader="Informe a proxima precedencia do hospede"
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
                    name="Proxima_cidade"
                    fullWidth
                    error={!!errors?.Proxima_cidade}
                    helperText={errors?.Proxima_cidade?.message || ''}
                    label="Proxima cidade"
                    required
                    onChange={(event) => setValue('Proxima_cidade', event.target.value)}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <TextField
                    type="string"
                    name="Proxima_estado"
                    fullWidth
                    error={!!errors?.Proxima_estado}
                    helperText={errors?.Proxima_estado?.message || ''}
                    label="Proximo estado"
                    required
                    onChange={(event) => setValue('Proxima_estado', event.target.value)}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <TextField
                    type="string"
                    name="Proxima_pais"
                    fullWidth
                    error={!!errors?.Proxima_pais}
                    helperText={errors?.Proxima_pais?.message || ''}
                    label="Proximo pais"
                    required
                    onChange={(event) => setValue('Proxima_pais', event.target.value)}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Ultimos dados */}
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title="Proxima precedencia"
              subheader="Informe a proxima precedencia do hospede"
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
                <Grid item md={2} xs={12}>
                  <TextField
                    type="number"
                    name="Motivo"
                    fullWidth
                    error={!!errors?.Motivo}
                    helperText={errors?.Motivo?.message || ''}
                    label="Motivo"
                    required
                    onChange={(event) => setValue('Motivo', Number(event.target.value))}
                  />
                </Grid>
                <Grid item md={2} xs={12}>
                  <TextField
                    type="number"
                    name="Meio_transporte"
                    fullWidth
                    error={!!errors?.Meio_transporte}
                    helperText={errors?.Meio_transporte?.message || ''}
                    label="Meio_transporte"
                    required
                    onChange={(event) => setValue('Meio_transporte', Number(event.target.value))}
                  />
                </Grid>
                <Grid item md={8} xs={12}>
                  <TextField
                    type="string"
                    name="Observacoes"
                    fullWidth
                    error={!!errors?.Observacoes}
                    helperText={errors?.Observacoes?.message || ''}
                    label="Observacoes"
                    required
                    onChange={(event) => setValue('Observacoes', event.target.value)}
                  />
                </Grid>
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
                children="Ocorreu um erro ao cadastrar o hospede!"
              />
            }
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default CreateHospedeForm;
