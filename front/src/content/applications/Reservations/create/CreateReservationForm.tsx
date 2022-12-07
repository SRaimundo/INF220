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
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ApartmentTypes } from 'src/models/apartmentTypes';
import { Clients } from 'src/models/clients';
import { Hotels } from 'src/models/hotels';
import { Reservations } from 'src/models/reservations';
import { findAll as findType } from 'src/services/apartmentTypes';
import { findAll as findClient } from 'src/services/clients';
import { findAll as findHotel } from 'src/services/hotels';
import { create } from 'src/services/reservations';
import * as yup from 'yup';

const schema = yup.object().shape({
  idHotel: yup.string().required('É obrigatório informar uma filial'),
  idTipo: yup
    .string()
    .required('É obrigatório informar um tipo de apartamento'),
  idCliente: yup.string().required('É obrigatório informar um cliente'),
  numPessoas: yup
    .string()
    .required('É obrigatório informar o número de pessoas hospedadas'),
  dataPrevistaEntrada: yup
    .date()
    .required('É obrigatório informar a data prevista de entrada'),
  dataPrevistaSaida: yup
    .date()
    .required('É obrigatório informar a data prevista de saída'),
});

function CreateReservationForm() {
  const navigate = useNavigate();

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Reservations>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<Reservations> = (data) => {
    create(data).then((res) => {
      setOpenConfirm(false);
      return navigate('/reservations/');
    });
  };

  useEffect(() => {
    const initDate = new Date();
    initDate.setDate(initDate.getDate() + 1);

    register('idHotel');
    register('idTipo');
    register('idCliente');
    register('numPessoas');
    register('dataPrevistaEntrada', { value: initDate });
    register('dataPrevistaSaida', { value: initDate });
  }, [register]);

  const [openErrors, setOpenErrors] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const [hotelList, setHotelList] = useState<Hotels[]>([]);
  const [typeList, setTypeList] = useState<ApartmentTypes[]>([]);
  const [clientList, setClientList] = useState<Clients[]>([]);

  useEffect(() => {
    const fetchHotelList = async () => {
      findHotel().then((res) => {
        setHotelList(res);
      });
    };
    const fetchClientList = async () => {
      findClient().then((res) => {
        setClientList(res);
      });
    };
    const fetchApartmentTypeList = async () => {
      findType().then((res) => {
        setTypeList(res);
      });
    };
    fetchHotelList();
    fetchClientList();
    fetchApartmentTypeList();
  }, [setHotelList, setClientList, setTypeList]);

  const formatBoolean = (value: boolean): string => (value ? 'Sim' : 'Não');

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
              title="Cadastrar Reserva"
              subheader="Selecione os dados da reserva."
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
                  <FormControl fullWidth error={!!errors?.idHotel}>
                    <InputLabel children="Selecione a filial do nosso hotel" />
                    <Select
                      value={watch().idHotel ?? ''}
                      label="Selecione a filial do nosso hotel"
                      onChange={(hotel: SelectChangeEvent<string>) =>
                        setValue('idHotel', parseInt(hotel.target.value))
                      }
                    >
                      {hotelList.map((hotel) => (
                        <MenuItem
                          key={hotel.idHotel}
                          value={hotel.idHotel}
                          children={hotel.cidade}
                        />
                      ))}
                    </Select>
                    <FormHelperText children={errors?.idHotel?.message || ''} />
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth error={!!errors?.idCliente}>
                    <InputLabel children="Selecione o cliente" />
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={watch().idCliente ?? ''}
                      label="Selecione o cliente"
                      onChange={(cliente: SelectChangeEvent<string>) =>
                        setValue('idCliente', parseInt(cliente.target.value))
                      }
                    >
                      {clientList.map((cliente) => (
                        <MenuItem
                          key={cliente.idCliente}
                          value={cliente.idCliente}
                          children={cliente.nome}
                        />
                      ))}
                    </Select>
                    <FormHelperText
                      children={errors?.idCliente?.message || ''}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth error={!!errors?.idTipo}>
                    <InputLabel children="Selecione o tipo de apartamento" />
                    <Select
                      value={watch().idTipo ?? ''}
                      label="Selecione o tipo de apartamento"
                      onChange={(tipo: SelectChangeEvent<string>) =>
                        setValue('idTipo', parseInt(tipo.target.value))
                      }
                    >
                      {typeList.map((tipo) => (
                        <MenuItem
                          key={tipo.idTipo}
                          value={tipo.idTipo}
                          children={`
                          ${tipo.numCamasCasal} Camas de Casal &
                          ${tipo.numCamasSolteiro} Camas de Solteiro |
                          Frigobar: ${formatBoolean(
                            tipo.possuiFrigobar
                          )} Tv: ${formatBoolean(
                            tipo.possuiFrigobar
                          )} PCD: ${formatBoolean(tipo.adaptadoPcd)}`}
                        />
                      ))}
                    </Select>
                    <FormHelperText children={errors?.idTipo?.message || ''} />
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    type="number"
                    name="number"
                    fullWidth
                    error={!!errors?.numPessoas}
                    helperText={errors?.numPessoas?.message || ''}
                    label="Numero de Pessoas"
                    required
                    onChange={(event) =>
                      setValue('numPessoas', parseInt(event.target.value))
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
              title="Data da Reserva"
              subheader="Informe a data desejada para a reserva."
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
                <Grid item sm={6} xs={12}>
                  <DateTimePicker
                    label="Previsão de Chegada"
                    value={watch().dataPrevistaEntrada}
                    onChange={(date) => {
                      setValue('dataPrevistaEntrada', date);
                      if (
                        watch().dataPrevistaEntrada > watch().dataPrevistaSaida
                      )
                        setValue('dataPrevistaSaida', date);
                    }}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        {...params}
                        error={!!errors?.dataPrevistaEntrada}
                      />
                    )}
                    ampm={false}
                    inputFormat="dd/MM/yyyy HH:mm"
                    minDateTime={new Date()}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <DateTimePicker
                    label="Previsão de Saída"
                    value={watch().dataPrevistaSaida}
                    onChange={(date) => setValue('dataPrevistaSaida', date)}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        {...params}
                        error={!!errors?.dataPrevistaSaida}
                      />
                    )}
                    ampm={false}
                    inputFormat="dd/MM/yyyy HH:mm"
                    minDateTime={watch().dataPrevistaEntrada}
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
                children="Ocorreu um erro ao cadastrar a reserva!"
              />
            }
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default CreateReservationForm;
