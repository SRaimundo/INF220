import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import KeyboardReturnTwoToneIcon from '@mui/icons-material/KeyboardReturnTwoTone';
import MeetingRoomTwoToneIcon from '@mui/icons-material/MeetingRoomTwoTone';
import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
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
import Modal from '@mui/material/Modal';
import PropTypes from 'prop-types';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Label from 'src/components/Label';
import { ApartmentTypes } from 'src/models/apartmentTypes';
import { Clients } from 'src/models/clients';
import { Hotels } from 'src/models/hotels';
import { Reservations } from 'src/models/reservations';
import { findAll as findType } from 'src/services/apartmentTypes';
import { findAll as findClient } from 'src/services/clients';
import { findAll as findHotel } from 'src/services/hotels';
import { cancel, findAll, remove } from 'src/services/reservations';
// const getStatusLabel = (reservationStatus: ClientStatus): JSX.Element => {
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

//   const { text, color }: any = map[reservationStatus];

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
  reservations: Reservations[],
  page: number,
  limit: number
): Reservations[] => {
  return reservations.slice(page * limit, page * limit + limit);
};

const ReservationsTable = () => {
  const theme = useTheme();

  const [reservations, setReservations] = useState<Reservations[]>([]);
  const [hotels, setHotels] = useState<Hotels[]>([]);
  const [clients, setClients] = useState<Clients[]>([]);
  const [apartmentTypes, setApartmentTypes] = useState<ApartmentTypes[]>([]);

  const fetchReservations = useCallback(async () => {
    const reservations = await findAll();
    setReservations(reservations);
  }, []);

  const fetchClients = useCallback(async () => {
    const clients = await findClient();
    setClients(clients);
  }, []);

  const fetchHotels = useCallback(async () => {
    const hotels = await findHotel();
    setHotels(hotels);
  }, []);

  const fetchApartmentTypes = useCallback(async () => {
    const apartmentTypes = await findType();
    setApartmentTypes(apartmentTypes);
  }, []);

  useEffect(() => {
    fetchReservations();
    fetchClients();
    fetchHotels();
    fetchApartmentTypes();
  }, [fetchReservations, fetchClients, fetchHotels, fetchApartmentTypes]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [selectId, setSelectId] = useState<string>();

  const handleSelectedClientId = (id): void => {
    setSelectId(id);
  };
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredReservations = reservations;
  const paginatedReservations = applyPagination(
    filteredReservations,
    page,
    limit
  );

  const handleCancel = async (id) => {
    const reservation: number = await cancel(id);
    if (reservation === 200) fetchReservations();
    else alert('Erro ao cancelar a reserva!');
  };

  const handleDelete = async (id) => {
    const reservation: Reservations = await remove(id);
    // if (reservation.Id_reserva === id) 
    fetchReservations();
    // else alert('Erro ao deletar a reserva!');
  };

  const formatHotel = (id): string => {
    if (hotels.length > 0) {
      const hotel = hotels.find((hotel) => hotel.Id_hotel === id);
      return hotel.Cidade;
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

  const formatBoolean = (value: boolean): string => (value ? 'Sim' : 'Não');

  const formatApartmentType = (id): string => {
    if (apartmentTypes.length > 0) {
      const type = apartmentTypes.find((type) => type.Id_tipo === id);
      return `
      ${type.Numero_camas_casal} Camas de Casal &
      ${type.Numero_camas_solteiro} Camas de Solteiro |
      Tv: ${formatBoolean(
        type.Tem_TV
      )} PCD: ${formatBoolean(type.Adaptado)}`;
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
                {/* <TableCell children="Filial" /> */}
                <TableCell children="Cliente" />
                <TableCell children="Tipo de Apartamento" />
                <TableCell children="Data" />
                <TableCell align="right" children="Ações" />
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedReservations.map((reservation) => {
                return (
                  <TableRow hover key={reservation.Id_reserva}>
                    <TableCell
                      children={
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                          children={
                            // reservation.cancelada ? (
                            //   <Label color="error" children="Cancelada" />
                            // ) : 
                            (
                              reservation.Id_reserva
                            )
                          }
                        />
                      }
                    />
                    {/* <TableCell
                      children={
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                          children={`${formatHotel(reservation.Codigo)}`}
                        />
                      }
                    /> */}
                    <TableCell
                      children={
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                          children={`${formatClient(reservation.Cliente)}`}
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
                          children={formatApartmentType(reservation.Tipo)}
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
                            children={`Previsão de Entrada: ${reservation.Data_prevista_entrada}`}
                          />
                          <Typography
                            variant="body1"
                            fontWeight="bold"
                            color="text.primary"
                            gutterBottom
                            noWrap
                            children={`Previsão de Saída: ${reservation.Data_prevista_saida}`}
                          />
                        </>
                      }
                    />
                    <TableCell align="right">
                      {/* {!reservation.cancelada ? (
                        <Tooltip
                          title="Realizar Check-in"
                          arrow
                          children={
                            <IconButton
                              sx={{
                                '&:hover': {
                                  background: theme.colors.primary.lighter,
                                },
                                color: theme.palette.primary.main,
                              }}
                              color="inherit"
                              size="small"
                              component={NavLink}
                              to={`/accommodations/new?Id_reservation=${reservation.Id_reserva}`}
                              children={
                                <MeetingRoomTwoToneIcon fontSize="small" />
                              }
                            />
                          }
                        />
                      ) : null} */}
                      {/* {!reservation.cancelada ? (
                        <Tooltip
                          title="Cancelar Reserva"
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
                                handleCancel(reservation.Id_reserva);
                              }}
                              children={<CancelTwoToneIcon fontSize="small" />}
                            />
                          }
                        />
                      ) : null} */}
                      <Tooltip
                        title="Excluir Reserva"
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
                              handleSelectedClientId(reservation.Id_reserva);
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
              count={filteredReservations.length}
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
            children="Confirme a exclusão da reserva!"
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

ReservationsTable.propTypes = {
  reservations: PropTypes.array.isRequired,
};

ReservationsTable.defaultProps = {
  reservations: [],
};

export default ReservationsTable;
