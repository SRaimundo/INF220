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
    register('Id_hospedagem');
    register('Reserva');
    register('Quarto');
    register('Check_in');
    register('Check_out');
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
        const id = !!reservation.Id_reserva
          ? reservation.Id_reserva
          : reservation;
        setValue('Reserva', id);
        const reserva = reservationList.find(
          (reservation) => reservation.Id_reserva === id
        );

        if (!!reserva) {
          const Id_tipo = reserva.Tipo;
          const tipo = types.find((apartment) => apartment.Id_tipo === Id_tipo);

          // if (!!tipo) {
          //   setValue('diaria', tipo.Valor);
          // }

          const filterApartments = apartmentList.filter(
            (ap) =>
              ap.Numero === reserva.Tipo && ap.Tipo === reserva.Tipo
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

    // const fetchReservationList = async () => {
    //   const res = (await findReservations()).filter(
    //     (reserve) => !reserve.cancelada
    //   );

    //   setReservationList(res);
    // };
    fetchApartmentList();
    // fetchReservationList();
  }, [setApartmentList, setReservationList]);

  useEffect(() => {
    const reservation = reservationList.find((reservation) => {
      return (
        reservation.Id_reserva ===
        (parseInt(searchParams.get('Id_reservation')) ??
          reservationList[0].Id_reserva)
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
      const hotel = hotels.find((hotel) => hotel.Id_hotel === id);
      return hotel.Cidade;
    } else {
      return 'Buscando...';
    }
  };

  const formatApartment = (id): string => {
    if (apartmentList.length > 0) {
      const apartment = apartmentList.find(
        (apartment) => apartment.Numero === id
      );
      return `Filial ${formatHotel(apartment.Numero)} | Quarto: ${
        apartment.Numero
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

                <Grid item md={4} xs={12}>
                  <TextField
                    type="number"
                    name="Reserva"
                    fullWidth
                    error={!!errors?.Reserva}
                    helperText={errors?.Reserva?.message || ''}
                    label="Insira o ID da Reserva"
                    required
                    onChange={(event) => setValue('Reserva', Number(event.target.value))}
                  />
                </Grid>

                <Grid item md={4} xs={12}>
                  <TextField
                    type="number"
                    name="Quarto"
                    fullWidth
                    error={!!errors?.Quarto}
                    helperText={errors?.Quarto?.message || ''}
                    label="Insira o Numero do Quarto"
                    required
                    onChange={(event) => setValue('Quarto', Number(event.target.value))}
                  />
                </Grid>

                <Grid item md={4} xs={12}>
                  <TextField
                    type="number"
                    name="Hotel"
                    fullWidth
                    error={!!errors?.Hotel}
                    helperText={errors?.Hotel?.message || ''}
                    label="Insira o ID da Hotel"
                    required
                    onChange={(event) => setValue('Hotel', Number(event.target.value))}
                  />
                </Grid>

                {/* <Grid item md={6} xs={12}>
                  <FormControl fullWidth error={!!errors?.Reserva}>
                    <InputLabel children="Selecione a reserva" />
                    <Select
                      value={watch().Reserva ?? ''}
                      label="Selecione a reserva"
                      onChange={(reserva: SelectChangeEvent<string>) =>
                        selectReservation(parseInt(reserva.target.value))
                      }
                    >
                      {reservationList.map((reservation) => (
                        <MenuItem
                          key={reservation.Id_reserva}
                          value={reservation.Id_reserva}
                          children={`ID da Reserva: ${reservation.Id_reserva}`}
                        />
                      ))}
                    </Select>
                    <FormHelperText
                      children={errors?.Reserva?.message || ''}
                    />
                  </FormControl>
                </Grid> */}
                {/* <Grid item md={6} xs={12}>
                  <FormControl fullWidth error={!!errors?.Quarto}>
                    <InputLabel children="Selecione o apartamento" />
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={watch().Quarto ?? ''}
                      label="Selecione o apartamento"
                      onChange={(apartamento: SelectChangeEvent<string>) =>
                        setValue(
                          'Quarto',
                          parseInt(apartamento.target.value)
                        )
                      }
                    >
                      {filteredApartments.map((apartment) => (
                        <MenuItem
                          key={apartment.Numero}
                          value={apartment.Numero}
                          children={formatApartment(apartment.Numero)}
                        />
                      ))}
                    </Select>
                    <FormHelperText
                      children={errors?.Quarto?.message || ''}
                    />
                  </FormControl>
                </Grid> */}
                {/* <Grid item md={6} xs={12}>
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
                </Grid> */}
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
                 <TextField
                   type="string"
                   name="Check_in"
                   fullWidth
                   error={!!errors?.Check_in}
                   helperText={errors?.Check_in?.message || ''}
                   label="Insira da data de para check_in"
                   required
                   onChange={(event) => setValue('Check_in', event.target.value)}
                 />
               </Grid>

               <Grid item sm={6} xs={12}>
                 <TextField
                   type="string"
                   name="Check_out"
                   fullWidth
                   error={!!errors?.Check_out}
                   helperText={errors?.Check_out?.message || ''}
                   label="Insira da data de para check_out"
                   required
                   onChange={(event) => setValue('Check_out', event.target.value)}
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