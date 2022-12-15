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
import { create } from 'src/services/expenditures';
import * as yup from 'yup';

const schema = yup.object().shape({
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
    register('Id_despesa');
    register('Hospedagem');
    register('Valor');
    // register('entregueNoQuarto');
    register('Data');
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
        setValue('Id_despesa', id);
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
              title="Cadastrar Consumo"
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

                <Grid item md={4} xs={12}>
                  <TextField
                    type="number"
                    name="Hospedagem"
                    fullWidth
                    error={!!errors?.Hospedagem}
                    helperText={errors?.Hospedagem?.message || ''}
                    label="Insira o ID da Hospedagem"
                    required
                    onChange={(event) => setValue('Hospedagem', Number(event.target.value))}
                  />
                </Grid>

                <Grid item md={4} xs={12}>
                  <TextField
                    type="string"
                    name="Descricao"
                    fullWidth
                    error={!!errors?.Descricao}
                    helperText={errors?.Descricao?.message || ''}
                    label="Insira descrição do produto"
                    required
                    onChange={(event) => setValue('Descricao', event.target.value)}
                  />
                </Grid>

                <Grid item md={4} xs={12}>
                  <TextField
                    type="number"
                    name="Valor"
                    fullWidth
                    error={!!errors?.Valor}
                    helperText={errors?.Valor?.message || ''}
                    label="O valor do produto"
                    required
                    onChange={(event) => setValue('Valor', Number(event.target.value))}
                  />
                </Grid>

                <Grid item md={4} xs={12}>
                  <TextField
                    type="string"
                    name="Data"
                    fullWidth
                    error={!!errors?.Data}
                    helperText={errors?.Data?.message || ''}
                    label="Insira data da compra"
                    required
                    onChange={(event) => setValue('Data', event.target.value)}
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
