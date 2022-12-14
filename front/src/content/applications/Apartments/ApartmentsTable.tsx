import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import KeyboardReturnTwoToneIcon from '@mui/icons-material/KeyboardReturnTwoTone';
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
import { Apartments } from 'src/models/apartments';
import { ApartmentTypes } from 'src/models/apartmentTypes';
import { Hotels } from 'src/models/hotels';
import { findAll, remove } from 'src/services/apartments';
import { findAll as findHotel } from 'src/services/hotels';
import { findAll as findType } from 'src/services/apartmentTypes';

// const getStatusLabel = (hotelStatus: ApartmentTypeStatus): JSX.Element => {
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

//   const { text, color }: any = map[hotelStatus];

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
  apartments: Apartments[],
  page: number,
  limit: number
): Apartments[] => {
  return apartments.slice(page * limit, page * limit + limit);
};

const ApartmentsTable = () => {
  const [apartments, setApartments] = useState<Apartments[]>([]);

  const fetchApartments = useCallback(async () => {
    const apartments = await findAll();
    setApartments(apartments);
  }, []);

  useEffect(() => {
    fetchApartments();
  }, [fetchApartments]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [selectId, setSelectId] = useState<string>();

  const handleSelectedApartmentTypeId = (id): void => {
    setSelectId(id);
  };
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

  // const statusOptions = [
  //   {
  //     id: 'all',
  //     name: 'All',
  //   },
  //   {
  //     id: 'active',
  //     name: 'Ativo',
  //   },
  //   {
  //     id: 'inactive',
  //     name: 'Inativo',
  //   },
  // ];

  // const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
  //   let value = null;

  //   if (e.target.value !== 'all') {
  //     value = e.target.value;
  //   }

  //   setFilters((prevFilters) => ({
  //     ...prevFilters,
  //     status: value,
  //   }));
  // };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredApartments = apartments;
  const paginatedApartments = applyPagination(filteredApartments, page, limit);
  const theme = useTheme();

  const handleDelete = async (id) => {
    const hotel: Apartments = await remove(id);
    if (hotel.Codigo === id) fetchApartments();
    else alert('Erro ao deletar o hotel!');
  };

  const [hotels, setHotels] = useState<Hotels[]>([]);
  const [apartmentTypes, setApartmentTypes] = useState<ApartmentTypes[]>([]);

  const fetchApartmentTypes = useCallback(async () => {
    const apartmentTypes = await findType();
    setApartmentTypes(apartmentTypes);
  }, []);

  const fetchHotels = useCallback(async () => {
    const hotels = await findHotel();
    setHotels(hotels);
  }, []);

  useEffect(() => {
    fetchApartmentTypes();
    fetchHotels();
  }, [fetchApartmentTypes, fetchHotels]);

  const formatHotel = (id): string => {
    if (hotels.length > 0) {
      const hotel = hotels.find((hotel) => hotel.Id_hotel === id);
      return hotel.Cidade;
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
        type.Tem_tv
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
                <TableCell children="Filial" />
                <TableCell children="Número do Apartamento" />
                <TableCell children="Tipo de Apartamento" />
                <TableCell align="right" children="Ações" />
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedApartments.map((apartment) => {
                return (
                  <TableRow hover key={apartment.Codigo}>
                    <TableCell
                      children={
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                          children={apartment.idApartamento}
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
                          children={formatHotel(apartment.Codigo)}
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
                          children={apartment.numero}
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
                          children={formatApartmentType(apartment.Id_tipo)}
                        />
                      }
                    />
                    <TableCell align="right">
                      <Tooltip
                        title="Excluir Hotel"
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
                              handleSelectedApartmentTypeId(
                                apartment.idApartamento
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
              count={filteredApartments.length}
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
            children="Confirme a exclusão do hotel!"
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

ApartmentsTable.propTypes = {
  apartments: PropTypes.array.isRequired,
};

ApartmentsTable.defaultProps = {
  apartments: [],
};

export default ApartmentsTable;
