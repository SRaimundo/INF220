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
import { ApartmentTypes } from 'src/models/apartmentTypes';
import { findAll, remove } from 'src/services/apartmentTypes';
import Label from 'src/components/Label';

// const getStatusLabel = (apartmentTypeStatus: ClientStatus): JSX.Element => {
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

//   const { text, color }: any = map[apartmentTypeStatus];

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
  apartmentTypes: ApartmentTypes[],
  page: number,
  limit: number
): ApartmentTypes[] => {
  return apartmentTypes.slice(page * limit, page * limit + limit);
};

const ApartmentTypesTable = () => {
  const [apartmentTypes, setApartmentTypes] = useState<ApartmentTypes[]>([]);

  const fetchApartmentTypes = useCallback(async () => {
    const apartmentTypes = await findAll();
    setApartmentTypes(apartmentTypes);
  }, []);

  useEffect(() => {
    fetchApartmentTypes();
  }, [fetchApartmentTypes]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [selectId, setSelectId] = useState<string>();

  const handleSelectedClientId = (id): void => {
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

  const filteredApartmentTypes = apartmentTypes;
  const paginatedApartmentTypes = applyPagination(
    filteredApartmentTypes,
    page,
    limit
  );
  const theme = useTheme();

  const handleDelete = async (id) => {
    const apartmentType: ApartmentTypes = await remove(id);
    if (apartmentType.idTipo === id) fetchApartmentTypes();
    else alert('Erro ao deletar o apartmentType!');
  };

  return (
    <>
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell children="ID" />
                <TableCell children="Camas" />
                <TableCell children="Variações" />
                <TableCell children="Valor" />
                <TableCell align="right" children="Ações" />
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedApartmentTypes.map((apartmentType) => {
                return (
                  <TableRow hover key={apartmentType.idTipo}>
                    <TableCell
                      children={
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                          children={apartmentType.idTipo}
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
                            children={`${apartmentType.Numero_camas_casal} de casal`}
                          />
                          <Typography
                            variant="body1"
                            fontWeight="bold"
                            color="text.primary"
                            gutterBottom
                            noWrap
                            children={`${apartmentType.Numero_camas_solteiro} de solteiro`}
                          />
                        </>
                      }
                    />
                    <TableCell>
                      <Label
                        color={apartmentType.Adaptado ? 'success' : 'error'}
                        children="Adaptado para pessoas com deficiência"
                      />
                      <br />
                      <Label
                        color={apartmentType.Tem_tv ? 'success' : 'error'}
                        children="Possui televisão"
                      />
                      {/* <br />
                      <Label
                        color={
                          apartmentType.possuiFrigobar ? 'success' : 'error'
                        }
                        children="Possui Frigobar"
                      /> */}
                    </TableCell>
                    <TableCell
                      children={
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                          children={`R$ ${apartmentType.Valor}`}
                        />
                      }
                    />
                    <TableCell align="right">
                      <Tooltip
                        title="Excluir Tipo de Apartamento"
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
                              handleSelectedClientId(apartmentType.idTipo);
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
              count={filteredApartmentTypes.length}
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
            children="Confirme a exclusão do tipo de apartamento!"
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

ApartmentTypesTable.propTypes = {
  apartmentTypes: PropTypes.array.isRequired,
};

ApartmentTypesTable.defaultProps = {
  apartmentTypes: [],
};

export default ApartmentTypesTable;
