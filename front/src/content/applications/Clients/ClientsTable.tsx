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
import * as React from 'react';
import { ChangeEvent, useEffect, useState } from 'react';
import { default as NumberFormat } from 'react-number-format';
import { Clients } from 'src/models/clients';
import { findAll, remove } from 'src/services/clients';

// const getStatusLabel = (clientStatus: ClientsStatus): JSX.Element => {
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

//   const { text, color }: any = map[clientStatus];

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
  clients: Clients[],
  page: number,
  limit: number
): Clients[] => {
  return clients.slice(page * limit, page * limit + limit);
};

const ClientsTable = () => {
  const fetchClients = async () => {
    let clients = [];
    clients = await findAll();
    console.log(clients);
    setClients(clients);
  };
  const [clients, setClients] = useState<Clients[]>([]);
  useEffect(() => {
    const fetch = async () => {
      let clients = [];
      clients = await findAll();
      setClients(clients);
    };
    fetch();
  }, [setClients]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [selectId, setSelectId] = useState<string>();

  const handleSelectedClientsId = (id): void => {
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

  const paginatedClients = applyPagination(clients, page, limit);
  const theme = useTheme();

  const handleDelete = async (id) => {
    const clientId = id;
    const client: Clients = await remove(clientId);
    if (client.idCliente === clientId) {
      fetchClients();
    } else {
      alert('Erro ao deletar o cliente!');
    }
  };

  return (
    <>
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Contato</TableCell>
                <TableCell>Endereço</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedClients.map((client) => {
                return (
                  <TableRow hover key={client.idCliente}>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                        children={client.idCliente}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                        children={client.Nome}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                        children={
                          <NumberFormat
                            value={client.Telefone}
                            displayType={'text'}
                            format={
                              client.Telefone?.length > 10
                                ? '(##) #####-####'
                                : '(##) ####-####'
                            }
                          />
                        }
                      />
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                        children={client.Email}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                        children={`${client.Rua}, N° ${client.Numero}. ${client.Bairro}, ${client.Cidade} - ${client.UF}`}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Excluir cadastro" arrow>
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
                            handleSelectedClientsId(client.idCliente);
                            handleOpen();
                          }}
                        >
                          <DeleteTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box p={2}>
          <TablePagination
            component="div"
            count={clients.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25, 30]}
          />
        </Box>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirme a exclusão do cliente!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Grid container>
              <Grid item xs={6} md={6}>
                <Button
                  sx={{ mt: { xs: 0, md: 0 } }}
                  variant="outlined"
                  startIcon={<KeyboardReturnTwoToneIcon fontSize="small" />}
                  onClick={handleClose}
                >
                  Retornar
                </Button>
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
                >
                  Excluir
                </Button>
              </Grid>
            </Grid>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

ClientsTable.propTypes = {
  clients: PropTypes.array.isRequired,
};

ClientsTable.defaultProps = {
  clients: [],
};

export default ClientsTable;
