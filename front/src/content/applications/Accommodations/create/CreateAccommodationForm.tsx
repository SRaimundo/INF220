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
import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Accommodations } from 'src/models/accommodations';
import { Apartments } from 'src/models/apartments';
import { ApartmentTypes } from 'src/models/apartmentTypes';
import { Hotels } from 'src/models/hotels';
import { Reservations } from 'src/models/reservations';
import { create } from 'src/services/accommodations';
import { findAll as findAPartments } from 'src/services/apartments';
import { findAll as findHotels } from 'src/services/hotels';
import { findAll as findTypes } from 'src/services/apartmentTypes';
import { findAll as findReservations } from 'src/services/reservations';
import * as yup from 'yup';

const schema = yup.object().shape({
  idApartamento: yup
    .string()
    .required('É obrigatório selecionar um apartamento'),
  idReserva: yup.string().required('É obrigatório selecionar uma reserva'),
  diaria: yup.number().required('É obrigatório informar um valor de diária'),
  dataEntrada: yup
    .date()
    .required('É obrigatório informar uma data de entrada'),
  dataSaida: yup.date().required('É obrigatório informar uma data de saída'),
});

function CreateReservationForm() {
  const navigate = useNavigate();

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Accommodations>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<Accommodations> = (data) => {
    create(data).then((res) => {
      setOpenConfirm(false);
      return navigate('/accommodations/');
    });
  };

  useEffect(() => {
    const initDate = new Date();
    register('idApartamento');
    register('idReserva');
    register('diaria');
    register('dataEntrada', { value: initDate });
    register('dataSaida', { value: initDate });
  }, [register]);

  const [openErrors, setOpenErrors] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const [apartmentList, setApartmentList] = useState<Apartments[]>([]);
  const [filteredApartments, setFilteredApartments] = useState<Apartments[]>(
    []
  );
  const [reservationList, setReservationList] = useState<Reservations[]>([]);
  const [hotels, setHotels] = useState<Hotels[]>([]);
  const [types, setTypes] = useState<ApartmentTypes[]>([]);

  const [searchParams] = useSearchParams();

  const selectReservation = useCallback(
    (reservation) => {
      if (!!reservation) {
        const id = !!reservation.idReserva
          ? reservation.idReserva
          : reservation;
        setValue('idReserva', id);
        const reserva = reservationList.find(
          (reservation) => reservation.idReserva === id
        );

        if (!!reserva) {
          const idTipo = reserva.idTipo;
          const tipo = types.find((apartment) => apartment.idTipo === idTipo);

          if (!!tipo) {
            setValue('diaria', tipo.Valor);
          }

          const filterApartments = apartmentList.filter(
            (ap) =>
              ap.Codigo === reserva.Codigo && ap.idTipo === reserva.idTipo
          );

          setFilteredApartments(filterApartments);
        }
      }
    },
    [setValue, reservationList, apartmentList, types]
  );

  useEffect(() => {
    const fetchApartmentList = async () => {
      findAPartments().then((res) => {
        setApartmentList(res);
      });
    };

    const fetchReservationList = async () => {
      const res = (await findReservations()).filter(
        (reserve) => !reserve.cancelada
      );

      setReservationList(res);
    };
    fetchApartmentList();
    fetchReservationList();
  }, [setApartmentList, setReservationList]);

  useEffect(() => {
    const reservation = reservationList.find((reservation) => {
      return (
        reservation.idReserva ===
        (parseInt(searchParams.get('idReservation')) ??
          reservationList[0].idReserva)
      );
    });
    selectReservation(reservation);
  }, [searchParams, reservationList, selectReservation]);

  const fetchHotels = useCallback(async () => {
    const hotels = await findHotels();
    setHotels(hotels);
  }, []);

  const fetchTypes = useCallback(async () => {
    const types = await findTypes();
    setTypes(types);
  }, []);

  useEffect(() => {
    fetchHotels();
    fetchTypes();
  }, [fetchHotels, fetchTypes]);

  const formatHotel = (id): string => {
    if (hotels.length > 0) {
      const hotel = hotels.find((hotel) => hotel.idHotel === id);
      return hotel.Cidade;
    } else {
      return 'Buscando...';
    }
  };

  const formatApartment = (id): string => {
    if (apartmentList.length > 0) {
      const apartment = apartmentList.find(
        (apartment) => apartment.idApartamento === id
      );
      return `Filial ${formatHotel(apartment.Codigo)} | Quarto: ${
        apartment.numero
      }`;
    } else {
      return 'Buscando...';
    }
  };

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
              title="Cadastrar Hospedagem"
              subheader="Selecione os dados da hospedagem."
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
                  <FormControl fullWidth error={!!errors?.idReserva}>
                    <InputLabel children="Selecione a reserva" />
                    <Select
                      value={watch().idReserva ?? ''}
                      label="Selecione a reserva"
                      onChange={(reserva: SelectChangeEvent<string>) =>
                        selectReservation(parseInt(reserva.target.value))
                      }
                    >
                      {reservationList.map((reservation) => (
                        <MenuItem
                          key={reservation.idReserva}
                          value={reservation.idReserva}
                          children={`ID da Reserva: ${reservation.idReserva}`}
                        />
                      ))}
                    </Select>
                    <FormHelperText
                      children={errors?.idReserva?.message || ''}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth error={!!errors?.idApartamento}>
                    <InputLabel children="Selecione o apartamento" />
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={watch().idApartamento ?? ''}
                      label="Selecione o apartamento"
                      onChange={(apartamento: SelectChangeEvent<string>) =>
                        setValue(
                          'idApartamento',
                          parseInt(apartamento.target.value)
                        )
                      }
                    >
                      {filteredApartments.map((apartment) => (
                        <MenuItem
                          key={apartment.idApartamento}
                          value={apartment.idApartamento}
                          children={formatApartment(apartment.idApartamento)}
                        />
                      ))}
                    </Select>
                    <FormHelperText
                      children={errors?.idApartamento?.message || ''}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    type="number"
                    name="diaria"
                    fullWidth
                    error={!!errors?.diaria}
                    value={watch().diaria || ''}
                    helperText={errors?.diaria?.message || ''}
                    label="Diária"
                    required
                    onChange={(event) =>
                      setValue('diaria', parseInt(event.target.value))
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
              title="Data da Entrada"
              subheader="Informe a data da entrada."
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
                    label="Data de Chegada"
                    value={watch().dataEntrada}
                    onChange={(date) => {
                      setValue('dataEntrada', date);
                      if (watch().dataEntrada > watch().dataSaida)
                        setValue('dataSaida', date);
                    }}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        {...params}
                        error={!!errors?.dataEntrada}
                        helperText={errors?.dataEntrada?.message || ''}
                      />
                    )}
                    ampm={false}
                    inputFormat="dd/MM/yyyy HH:mm"
                    minDateTime={new Date()}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <DateTimePicker
                    label="Data de Saída"
                    value={watch().dataSaida}
                    onChange={(date) => setValue('dataSaida', date)}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        {...params}
                        error={!!errors?.dataSaida}
                        helperText={errors?.dataSaida?.message || ''}
                      />
                    )}
                    ampm={false}
                    inputFormat="dd/MM/yyyy HH:mm"
                    minDateTime={watch().dataEntrada}
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
