import { yupResolver } from '@hookform/resolvers/yup';
import PublishTwoToneIcon from '@mui/icons-material/PublishTwoTone';
import { DateTimePicker } from '@mui/lab';
import {
  Alert,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  Switch,
  TextField,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Label from 'src/components/Label';
import { MoneyMaskCustom } from 'src/components/Masks/currencyMask';
import { Accommodations } from 'src/models/accommodations';
import { Expenditures } from 'src/models/expenditures';
import { findAll as findAccommodations } from 'src/services/accommodations';
import { create } from 'src/services/restaurantExpenditures';
import * as yup from 'yup';

const schema = yup.object().shape({
  Id_hospedagem: yup
    .string()
    .required('É obrigatório selecionar uma hospedagem'),
  produto: yup.string().required('É obrigatório selecionar uma descrição'),
  preco: yup.number().required('É obrigatório selecionar um valor'),
  entregueNoQuarto: yup.boolean().default(false),
  dataConsumo: yup
    .date()
    .required('É obrigatório informar uma data de consumo'),
});

function CreateReservationForm() {
  const navigate = useNavigate();

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Expenditures>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<Expenditures> = (data) => {
    create(data).then((res) => {
      setOpenConfirm(false);
      return navigate('/expenditures/');
    });
  };

  useEffect(() => {
    const initDate = new Date();
    register('Id_hospedagem');
    register('produto');
    register('preco');
    register('entregueNoQuarto');
    register('dataConsumo', { value: initDate });
  }, [register]);

  const [openErrors, setOpenErrors] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const [accommodationList, setReservationList] = useState<Accommodations[]>(
    []
  );

  const [searchParams] = useSearchParams();

  const selectAccommodation = useCallback(
    (accommodation) => {
      if (!!accommodation) {
        const id = !!accommodation.Id_hospedagem
          ? accommodation.Id_hospedagem
          : accommodation;
        setValue('Id_hospedagem', id);
      }
    },
    [setValue]
  );

  useEffect(() => {
    const fetchReservationList = async () => {
      findAccommodations().then((res) => {
        setReservationList(res);
        const accommodation = res.find((accommodation) => {
          return (
            accommodation.Id_hospedagem ===
            (parseInt(searchParams.get('idAccommodation')) ??
              res[0].Id_hospedagem)
          );
        });
        selectAccommodation(accommodation);
      });
    };

    fetchReservationList();
  }, [setReservationList, searchParams, selectAccommodation]);

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
              title="Cadastrar Consumo Restaurante"
              subheader="Selecione os dados do consumo."
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
                  <FormControl fullWidth error={!!errors?.Id_hospedagem}>
                    <InputLabel children="Selecione a hospedagem" />
                    <Select
                      value={watch().Id_hospedagem ?? ''}
                      label="Selecione a hospedagem"
                      onChange={(hospedagem: SelectChangeEvent<string>) =>
                        selectAccommodation(parseInt(hospedagem.target.value))
                      }
                    >
                      {accommodationList.map((accommodation) => (
                        <MenuItem
                          key={accommodation.Id_hospedagem}
                          value={accommodation.Id_hospedagem}
                          children={`ID da Hospedagem: ${accommodation.Id_hospedagem}`}
                        />
                      ))}
                    </Select>
                    <FormHelperText
                      children={errors?.Id_hospedagem?.message || ''}
                    />
                  </FormControl>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <DateTimePicker
                    label="Data de Consumo"
                    value={watch().dataConsumo}
                    onChange={(date) => setValue('dataConsumo', date)}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        {...params}
                        error={!!errors?.dataConsumo}
                        helperText={errors?.dataConsumo?.message || ''}
                      />
                    )}
                    ampm={false}
                    inputFormat="dd/MM/yyyy HH:mm"
                    minDateTime={new Date()}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    type="string"
                    name="item"
                    fullWidth
                    error={!!errors?.produto}
                    helperText={errors?.produto?.message || ''}
                    label="Descrição do Item"
                    required
                    onChange={(event) =>
                      setValue('produto', event.target.value)
                    }
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    id="outlined-required"
                    error={!!errors?.preco}
                    label="Preço"
                    required
                    fullWidth
                    value={!!watch('preco') ? watch('preco').toString() : ''}
                    onChange={(price) =>
                      setValue('preco', parseFloat(price.target.value))
                    }
                    InputProps={{
                      inputComponent: MoneyMaskCustom as any,
                      startAdornment: (
                        <InputAdornment position="start">R$</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Label
                    children="Entregue no quarto?"
                    color={watch().entregueNoQuarto ? 'success' : 'error'}
                  />
                  <Switch
                    value={watch().entregueNoQuarto}
                    color={'success'}
                    onChange={(event) =>
                      setValue('entregueNoQuarto', !watch().entregueNoQuarto)
                    }
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
                children={`Ocorreu um erro ao cadastrar a hospedagem!`}
              />
            }
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default CreateReservationForm;
