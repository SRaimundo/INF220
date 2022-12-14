import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import DoneTwoToneIcon from '@mui/icons-material/DoneAllTwoTone';
import FastfoodTwoToneIcon from '@mui/icons-material/FastfoodTwoTone';
import KeyboardReturnTwoToneIcon from '@mui/icons-material/KeyboardTwoTone';
import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import PropTypes from 'prop-types';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Accommodations } from 'src/models/accommodations';
import { Apartments } from 'src/models/apartments';
import { Clients } from 'src/models/clients';
import { Hotels } from 'src/models/hotels';
import { Reservations } from 'src/models/reservations';
import { findAll, remove } from 'src/services/accommodations';
import { findAll as findApartments } from 'src/services/apartments';
import { findAll as findClients } from 'src/services/clients';
import { findAll as findHotels } from 'src/services/hotels';
import { findAll as findReservations } from 'src/services/reservations';

// const getStatusLabel = (accommodationStatus: ClientStatus): JSX.Element => {
//   const map = {
//     active: {
//       text: 'Ativo',
//       color: 'success',
//     },
//     inactive: {
//       text: 'Inativo',
//       color: 'error',
//     },
//   };

//   const { text, color }: any = map[accommodationStatus];

//   return <Label color={color}>{text}</Label>;
// };

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 150,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
};

const applyPagination = (
  accommodations: Accommodations[],
  page: number,
  limit: number
): Accommodations[] => {
  return accommodations.slice(page * limit, page * limit + limit);
};

const AccommodationsTable = () => {
  const theme = useTheme();

  const [accommodations, setAccommodations] = useState<Accommodations[]>([]);
  const [reservations, setReservations] = useState<Reservations[]>([]);
  const [apartments, setApartments] = useState<Apartments[]>([]);
  const [hotels, setHotels] = useState<Hotels[]>([]);
  const [clients, setClients] = useState<Clients[]>([]);

  const fetchAccommodations = useCallback(async () => {
    const accommodations = await findAll();
    setAccommodations(accommodations);
  }, []);

  const fetchApartments = useCallback(async () => {
    const apartments = await findApartments();
    setApartments(apartments);
  }, []);

  const fetchReservations = useCallback(async () => {
    const reservations = await findReservations();
    setReservations(reservations);
  }, []);

  const fetchHotels = useCallback(async () => {
    const hotels = await findHotels();
    setHotels(hotels);
  }, []);

  const fetchClients = useCallback(async () => {
    const clients = await findClients();
    setClients(clients);
  }, []);

  useEffect(() => {
    fetchAccommodations();
    fetchApartments();
    fetchReservations();
    fetchHotels();
    fetchClients();
  }, [
    fetchAccommodations,
    fetchApartments,
    fetchReservations,
    fetchHotels,
    fetchClients,
  ]);

  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredAccommodations = accommodations;
  const paginatedAccommodations = applyPagination(
    filteredAccommodations,
    page,
    limit
  );

  const handleDelete = async (id) => {
    const accommodation: Accommodations = await remove(id);
    if (accommodation.Id_hospedagem === id) fetchAccommodations();
    else alert('Erro ao deletar a hospedagem!');
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [selectId, setSelectId] = useState<string>();

  const handleSelectedClientId = (id): void => {
    setSelectId(id);
  };

  const formatHotel = (id): string => {
    if (hotels.length > 0) {
      const hotel = hotels.find((hotel) => hotel.Id_hotel === id);
      return hotel.Cidade;
    } else {
      return 'Buscando...';
    }
  };

  const formatApartment = (id): string => {
    if (apartments.length > 0) {
      const apartment = apartments.find(
        (apartment) => apartment.idApartamento === id
      );
      return `Filial ${formatHotel(apartment.Codigo)} | Quarto: ${
        apartment.numero
      }`;
    } else {
      return 'Buscando...';
    }
  };

  const formatClient = (id): string => {
    if (clients.length > 0) {
      const client = clients.find((client) => client.Id_cliente === id);
      return client.Nome;
    } else {
      return 'Buscando...';
    }
  };

  const formatReservationClient = (id): string => {
    if (reservations.length > 0) {
      const reservation = reservations.find(
        (reservation) => reservation.Id_reserva === id
      );
      return `Cliente: ${formatClient(reservation.Id_cliente)}`;
    } else {
      return 'Buscando...';
    }
  };

  const formatReservation = (id): string => {
    if (reservations.length > 0) {
      const reservation = reservations.find(
        (reservation) => reservation.Id_reserva === id
      );
      return `ID Reserva: ${reservation.Id_reserva} | Número de hóspedes: ${reservation.numPessoas}`;
    } else {
      return 'Buscando...';
    }
  };

  return (
    <>
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell children="ID" />
                <TableCell children="Apartamento" />
                <TableCell children="Reserva" />
                <TableCell children="Cliente" />
                <TableCell children="Data" />
                <TableCell children="Diária" />
                <TableCell align="right" children="Ações" />
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedAccommodations.map((accommodation) => {
                return (
                  <TableRow hover key={accommodation.Id_hospedagem}>
                    <TableCell
                      children={
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                          children={accommodation.Id_hospedagem}
                        />
                      }
                    />
                    <TableCell
                      children={
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                          children={`${formatApartment(
                            accommodation.idApartamento
                          )}`}
                        />
                      }
                    />
                    <TableCell
                      children={
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                          children={`${formatReservation(
                            accommodation.Id_reserva
                          )}`}
                        />
                      }
                    />
                    <TableCell
                      children={
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                          children={`${formatReservationClient(
                            accommodation.Id_reserva
                          )}`}
                        />
                      }
                    />
                    <TableCell
                      children={
                        <>
                          <Typography
                            variant="body1"
                            fontWeight="bold"
                            color="text.primary"
                            gutterBottom
                            noWrap
                            children={`Data de Entrada: ${accommodation.dataEntrada}`}
                          />
                          <Typography
                            variant="body1"
                            fontWeight="bold"
                            color="text.primary"
                            gutterBottom
                            noWrap
                            children={`Data de Saída: ${accommodation.dataSaida}`}
                          />
                        </>
                      }
                    />
                    <TableCell
                      children={
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                          children={`R$ ${accommodation.diaria}`}
                        />
                      }
                    />
                    <TableCell align="right">
                      {!accommodation.saida ? (
                        <>
                          <Tooltip
                            title="Registrar Consumo"
                            arrow
                            children={
                              <IconButton
                                component={NavLink}
                                to={`/expenditures/new?idAccommodation=${accommodation.Id_hospedagem}`}
                                sx={{
                                  '&:hover': {
                                    background: theme.colors.primary.lighter,
                                  },
                                  color: theme.palette.primary.main,
                                }}
                                color="inherit"
                                size="small"
                                children={
                                  <FastfoodTwoToneIcon fontSize="small" />
                                }
                              />
                            }
                          />
                          <Tooltip
                            title="Checkout"
                            arrow
                            children={
                              <IconButton
                                component={NavLink}
                                to={`/checkout/${accommodation.Id_hospedagem}`}
                                sx={{
                                  '&:hover': {
                                    background: theme.colors.success.lighter,
                                  },
                                  color: theme.palette.success.main,
                                }}
                                color="inherit"
                                size="small"
                                children={<DoneTwoToneIcon fontSize="small" />}
                              />
                            }
                          />
                        </>
                      ) : null}
                      <Tooltip
                        title="Excluir Hospedagem"
                        arrow
                        children={
                          <IconButton
                            sx={{
                              '&:hover': {
                                background: theme.colors.error.lighter,
                              },
                              color: theme.palette.error.main,
                            }}
                            color="inherit"
                            size="small"
                            onClick={() => {
                              handleSelectedClientId(
                                accommodation.Id_hospedagem
                              );
                              handleOpen();
                            }}
                            children={<DeleteTwoToneIcon fontSize="small" />}
                          />
                        }
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          p={2}
          children={
            <TablePagination
              component="div"
              count={filteredAccommodations.length}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleLimitChange}
              page={page}
              rowsPerPage={limit}
              rowsPerPageOptions={[5, 10, 25, 30]}
            />
          }
        />
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            children="Confirme a exclusão da hospedagem!"
          />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Grid container>
              <Grid item xs={6} md={6}>
                <Button
                  sx={{ mt: { xs: 0, md: 0 } }}
                  variant="outlined"
                  startIcon={<KeyboardReturnTwoToneIcon fontSize="small" />}
                  onClick={handleClose}
                  children="Retornar"
                />
              </Grid>
              <Grid item xs={6} md={6}>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteTwoToneIcon />}
                  onClick={() => {
                    handleDelete(selectId);
                    handleClose();
                  }}
                  children="Excluir"
                />
              </Grid>
            </Grid>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

AccommodationsTable.propTypes = {
  accommodations: PropTypes.array.isRequired,
};

AccommodationsTable.defaultProps = {
  accommodations: [],
};

export default AccommodationsTable;
