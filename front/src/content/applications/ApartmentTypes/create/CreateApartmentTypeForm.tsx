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
  adaptadoPcd: yup
    .boolean()
    .required('É obrigatório informar se o tipo é adaptado para PCD'),
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
  valorApartamento: yup
    .number()
    .required('É obrigatório informar o valor do apartamento'),
});

function CreateApartmentTypesForm() {
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ApartmentTypes> = (data) => {
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
    register('adaptadoPcd', { value: false });
    register('possuiFrigobar', { value: false });
    register('possuiTv', { value: false });
    register('numCamasSolteiro');
    register('numCamasCasal');
    register('valorApartamento');
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
                    color={watch().possuiTv ? 'success' : 'error'}
                  />
                  <Switch
                    value={watch().possuiTv}
                    onChange={(event) =>
                      setValue('possuiTv', !watch().possuiTv)
                    }
                  />
                </Grid>

                <Grid item xs={12}>
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
                </Grid>
                <Grid item xs={12}>
                  <Label
                    children="É adaptado para pessoas com deficiência?"
                    color={watch().adaptadoPcd ? 'success' : 'error'}
                  />
                  <Switch
                    value={watch().adaptadoPcd}
                    onChange={(event) =>
                      setValue('adaptadoPcd', !watch().adaptadoPcd)
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
              subheader="Informe o número de quartos e o valor deste tipo de apartamento."
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
                    name="number"
                    fullWidth
                    error={!!errors?.numCamasSolteiro}
                    helperText={errors?.numCamasSolteiro?.message || ''}
                    label="Número de Camas de Solteiro"
                    required
                    onChange={(event) =>
                      setValue('numCamasSolteiro', parseInt(event.target.value))
                    }
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    type="number"
                    name="number"
                    fullWidth
                    error={!!errors?.numCamasCasal}
                    helperText={errors?.numCamasCasal?.message || ''}
                    label="Número de Camas de Casal"
                    required
                    onChange={(event) =>
                      setValue('numCamasCasal', parseInt(event.target.value))
                    }
                  />
                </Grid>
                <Grid item sm={6} md={4} xs={12}>
                  <TextField
                    id="outlined-required"
                    error={!!errors?.valorApartamento}
                    label="Preço"
                    required
                    fullWidth
                    value={
                      !!watch('valorApartamento')
                        ? watch('valorApartamento').toString()
                        : ''
                    }
                    onChange={(ticket) =>
                      setValue(
                        'valorApartamento',
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
                children="Ocorreu um erro ao cadastrar o hotel!"
              />
            }
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default CreateApartmentTypesForm;
