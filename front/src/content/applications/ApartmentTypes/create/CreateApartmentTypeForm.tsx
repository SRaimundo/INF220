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
  InputAdornment,
  Snackbar,
  Switch,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Label from 'src/components/Label';
import { MoneyMaskCustom } from 'src/components/Masks/currencyMask';
import { ApartmentTypes } from 'src/models/apartmentTypes';
import { create } from 'src/services/apartmentTypes';
import * as yup from 'yup';

const schema = yup.object().shape({
  AdaptadoPcd: yup
    .boolean()
    .required('É obrigatório informar se o tipo é Adaptado para PCD'),
  possuiTv: yup
    .boolean()
    .required('É obrigatório informar se o tipo possui televisão'),
  possuiFrigobar: yup
    .boolean()
    .required('É obrigatório informar se o tipo possui frigobar'),
  numCamasSolteiro: yup
    .number()
    .required('É obrigatório informar quantas camas de solteiro possui'),
  numCamasCasal: yup
    .number()
    .required('É obrigatório informar quantas camas de casal possui'),
  ValorApartamento: yup
    .number()
    .required('É obrigatório informar o Valor do apartamento'),
});

function CreateApartmentTypesForm() {
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ApartmentTypes> = (data) => {
    console.log(data);
    create(data).then((res) => {
      setOpenConfirm(false);
      return navigate('/apartments/type');
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
  } = useForm<ApartmentTypes>({ resolver: yupResolver(schema) });

  useEffect(() => {
    register('Adaptado', { value: false });
    register('Tem_TV', { value: false });
    register('Numero_camas_solteiro');
    register('Numero_camas_casal');
    register('Valor');
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
              title="Informações do Tipo de Apartamento"
              subheader="Informe os atributos deste tipo de apartamento."
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
                <Grid item xs={12}>
                  <Label
                    children="Possui televisão?"
                    color={watch().Tem_TV ? 'success' : 'error'}
                  />
                  <Switch
                    value={watch().Tem_TV}
                    onChange={(event) =>
                      setValue('Tem_TV', !watch().Tem_TV)
                    }
                  />
                </Grid>

                {/* <Grid item xs={12}>
                  <Label
                    children="Possui frigobar?"
                    color={watch().possuiFrigobar ? 'success' : 'error'}
                  />
                  <Switch
                    value={watch().possuiFrigobar}
                    onChange={(event) =>
                      setValue('possuiFrigobar', !watch().possuiFrigobar)
                    }
                  />
                </Grid> */}
                <Grid item xs={12}>
                  <Label
                    children="É Adaptado para pessoas com deficiência?"
                    color={watch().Adaptado ? 'success' : 'error'}
                  />
                  <Switch
                    value={watch().Adaptado}
                    onChange={(event) =>
                      setValue('Adaptado', !watch().Adaptado)
                    }
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title="Cadastrar Tipo de Apartamento"
              subheader="Informe o número de quartos e o Valor deste tipo de apartamento."
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
                    type="number"
                    name="Numero_camas_solteiro"
                    fullWidth
                    error={!!errors?.Numero_camas_solteiro}
                    helperText={errors?.Numero_camas_solteiro?.message || ''}
                    label="Número de Camas de Solteiro"
                    required
                    onChange={(event) =>
                      setValue('Numero_camas_solteiro', parseInt(event.target.value))
                    }
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    type="number"
                    name="Numero_camas_casal"
                    fullWidth
                    error={!!errors?.Numero_camas_casal}
                    helperText={errors?.Numero_camas_casal?.message || ''}
                    label="Número de Camas de Casal"
                    required
                    onChange={(event) =>
                      setValue('Numero_camas_casal', parseInt(event.target.value))
                    }
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    type="number"
                    name="Valor"
                    fullWidth
                    error={!!errors?.Valor}
                    helperText={errors?.Valor?.message || ''}
                    label="Preço"
                    required
                    onChange={(event) =>
                      setValue('Valor', parseInt(event.target.value))
                    }
                  />
                </Grid>
                {/* <Grid item sm={6} md={4} xs={12}>
                  <TextField
                    id="outlined-required"
                    error={!!errors?.Valor}
                    label="Preço"
                    required
                    fullWidth
                    value={
                      !!watch('Valor')
                        ? watch('Valor').toString()
                        : ''
                    }
                    onChange={(ticket) =>
                      setValue(
                        'Valor',
                        parseFloat(ticket.target.value)
                      )
                    }
                    InputProps={{
                      inputComponent: MoneyMaskCustom as any,
                      startAdornment: (
                        <InputAdornment position="start">R$</InputAdornment>
                      ),
                    }}
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
                children="Ocorreu um erro ao cadastrar o Tipo do apartamento!"
              />
            }
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default CreateApartmentTypesForm;
