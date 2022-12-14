import MoneyTwoToneIcon from '@mui/icons-material/MoneyTwoTone';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { Clients } from 'src/models/clients';
import { checkout, findOne, getDiarias } from 'src/services/accommodations';
import { findOne as findClient } from 'src/services/clients';
import { findByAccommodation } from 'src/services/expenditures';
import { findOne as findReserve } from 'src/services/reservations';

function CheckoutForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [date] = useState<Date>(new Date());

  const onSubmit = () => {
    checkout(id, 'dinheiro').then((res) => navigate('/accommodations'));
  };

  const [openConfirm] = useState(false);

  const [cliente, setCliente] = useState<Clients>();
  const [consumo, setConsumo] = useState<any[]>([]);

  useEffect(() => {
    findOne(id).then((res) => {
      findReserve(res.Id_reserva).then((res) => {
        findClient(res.Id_cliente).then((res) => setCliente(res));
      });
      findByAccommodation(id).then((consumos) => {
        getDiarias(id).then((diarias) => {
          setConsumo(consumos.concat(diarias));
        });
      });
    });
  }, [id]);

  const sum = useCallback(() => {
    if (consumo.length > 0)
      return consumo
        .map((item) => item.preco)
        .reduce((prev, curr) => prev + curr, 0);
    else return 'Calculando...';
  }, [consumo]);

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
              title="Nota Fiscal"
              subheader={`Data de Emissão ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}
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
                <Grid
                  item
                  xs={12}
                  children={<Typography variant="h2" children="Cliente" />}
                />

                <Grid
                  item
                  xs={6}
                  md={4}
                  children={
                    <Typography
                      children={`Nome: ${
                        cliente ? cliente.Nome : 'Buscando...'
                      }`}
                    />
                  }
                />

                <Grid
                  item
                  xs={6}
                  md={4}
                  children={
                    <Typography
                      children={`Nacionalidade: ${
                        cliente ? cliente.Pais_origem : 'Buscando...'
                      }`}
                    />
                  }
                />

                <Grid
                  item
                  xs={6}
                  md={4}
                  children={
                    <Typography
                      children={`Telefone: ${
                        cliente ? cliente.Telefone : 'Buscando...'
                      }`}
                    />
                  }
                />

                <Grid
                  item
                  xs={6}
                  md={4}
                  children={
                    <Typography
                      children={`Email: ${
                        cliente ? cliente.Email : 'Buscando...'
                      }`}
                    />
                  }
                />

                <Grid
                  item
                  xs={6}
                  md={6}
                  children={
                    <Typography
                      children={`Endereço: ${
                        cliente
                          ? `${cliente.Rua}, N° ${cliente.Numero}. ${cliente.Bairro}, ${cliente.Cidade} - ${cliente.UF}`
                          : 'Buscando...'
                      }`}
                    />
                  }
                />
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <Divider />
            <CardContent>
              <Grid
                container
                component="form"
                noValidate
                autoComplete="on"
                spacing={2}
              >
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell children="Item" />
                        <TableCell children="Data" />
                        <TableCell align="right" children="Valor" />
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {consumo.map((item) => {
                        return (
                          <TableRow hover key={item.idConsumo}>
                            <TableCell
                              children={
                                <Typography
                                  variant="body1"
                                  fontWeight="bold"
                                  color="text.primary"
                                  gutterBottom
                                  noWrap
                                  children={item.produto}
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
                                  children={
                                    item.data_consumo
                                      ? item.data_consumo
                                      : item.data
                                  }
                                />
                              }
                            />
                            <TableCell
                              align="right"
                              children={
                                <Typography
                                  variant="body1"
                                  fontWeight="bold"
                                  color="text.primary"
                                  gutterBottom
                                  noWrap
                                  children={`R$ ${item.preco}`}
                                />
                              }
                            />
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Box
                  p={2}
                  display="flex"
                  justifyContent="flex-end"
                  width="100%"
                  children={
                    <Typography
                      align="right"
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                      children={`Valor total: R$ ${sum()}`}
                    />
                  }
                />
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
            onClick={() => onSubmit()}
            startIcon={<MoneyTwoToneIcon fontSize="small" />}
            children="Realizar pagamento"
            type="submit"
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default CheckoutForm;
