import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import KeyboardReturnTwoToneIcon from '@mui/icons-material/KeyboardReturnTwoTone';
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
import Label from 'src/components/Label';
import { Expenditures } from 'src/models/expenditures';
import { findAll, remove } from 'src/services/expenditures';

// const getStatusLabel = (expenditureStatus: ClientStatus): JSX.Element => {
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

//   const { text, color }: any = map[expenditureStatus];

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
  expenditures: Expenditures[],
  page: number,
  limit: number
): Expenditures[] => {
  return expenditures.slice(page * limit, page * limit + limit);
};

const ExpendituresTable = () => {
  const theme = useTheme();

  const [expenditures, setExpenditures] = useState<Expenditures[]>([]);

  const fetchExpenditures = useCallback(async () => {
    const expenditures = await findAll();
    setExpenditures(expenditures);
  }, []);

  useEffect(() => {
    fetchExpenditures();
  }, [fetchExpenditures]);

  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredExpenditures = expenditures;
  const paginatedExpenditures = applyPagination(
    filteredExpenditures,
    page,
    limit
  );

  const handleDelete = async (id) => {
    const expenditure: Expenditures = await remove(id);
    // if (expenditure.Id_despesa === id) 
    fetchExpenditures();
    // else alert('Erro ao deletar a consumo!');
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [selectId, setSelectId] = useState<string>();

  const handleSelectedClientId = (id): void => {
    setSelectId(id);
  };

  return (
    <>
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell children="ID" />
                <TableCell children="Produto" />
                <TableCell children="Valor" />
                <TableCell children="Data de Consumo" />
                {/* <TableCell children="Entregue no Quarto" /> */}
                <TableCell children="ID da Hospedagem" />
                <TableCell align="right" children="Ações" />
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedExpenditures.map((expenditure) => {
                return (
                  <TableRow hover key={expenditure.Id_despesa}>
                    <TableCell
                      children={
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                          children={expenditure.Id_despesa}
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
                          children={`${expenditure.Descricao}`}
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
                          children={`R$ ${expenditure.Valor}`}
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
                          children={`${expenditure.Data}`}
                        />
                      }
                    />
                    {/* <TableCell
                      children={
                        <Label
                          color={
                            expenditure.entregueNoQuarto ? 'success' : 'error'
                          }
                          children="Entregue no quarto"
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
                          children={`${expenditure.Hospedagem}`}
                        />
                      }
                    />
                    <TableCell align="right">
                      <Tooltip
                        title="Excluir Consumo"
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
                              handleSelectedClientId(expenditure.Id_despesa);
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
              count={filteredExpenditures.length}
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
            children="Confirme a exclusão da consumo!"
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

ExpendituresTable.propTypes = {
  expenditures: PropTypes.array.isRequired,
};

ExpendituresTable.defaultProps = {
  expenditures: [],
};

export default ExpendituresTable;
