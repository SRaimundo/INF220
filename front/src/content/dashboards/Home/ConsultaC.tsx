import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Grid,
  Tooltip,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ConsultaC as Consulta, consultaC } from 'src/services/consultas';

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
        background: transparent;
        margin-left: -${theme.spacing(0.5)};
        margin-bottom: ${theme.spacing(1)};
        margin-top: ${theme.spacing(2)};
`
);

const AvatarAddWrapper = styled(Avatar)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        color: ${theme.colors.primary.main};
        width: ${theme.spacing(8)};
        height: ${theme.spacing(8)};
`
);

const CardAddAction = styled(Card)(
  ({ theme }) => `
        border: ${theme.colors.primary.main} dashed 1px;
        height: 100%;
        color: ${theme.colors.primary.main};
        
        .MuiCardActionArea-root {
          height: 100%;
          justify-content: center;
          align-items: center;
          display: flex;
        }
        
        .MuiTouchRipple-root {
          opacity: .2;
        }
        
        &:hover {
          border-color: ${theme.colors.alpha.black[100]};
        }
`
);

function ConsultaC() {
  const [produtoA] = useState('Red Bull');
  const [clientListA, setClientListA] = useState<Consulta[]>([]);
  const [produtoB] = useState('Coca Cola');
  const [clientListB, setClientListB] = useState<Consulta[]>([]);
  const [produtoC] = useState('Sonho de Valsa');
  const [clientListC, setClientListC] = useState<Consulta[]>([]);

  useEffect(() => {
    consultaC(produtoA).then((res) => setClientListA(res));
    consultaC(produtoB).then((res) => setClientListB(res));
    consultaC(produtoC).then((res) => setClientListC(res));
  }, [produtoA, produtoB, produtoC]);

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{ pb: 3 }}
      >
        <Typography variant="h3" children="Consumos" />
        <Button
          size="small"
          variant="outlined"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          component={NavLink}
          to="/expenditures/new"
          children="Adicionar novo consumo"
        />
      </Box>
      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3} item>
          <Card sx={{ px: 1 }}>
            <CardContent>
              <AvatarWrapper
                children={
                  <img
                    alt="RedBull"
                    src="/static/images/placeholders/logo/redbull.png"
                    width={'50px'}
                  />
                }
              />
              <Typography
                variant="h5"
                sx={{ py: 1 }}
                noWrap
                children={produtoA}
              />
              <Divider />
              <Box sx={{ pt: 3 }}>
                {clientListA.map((lista, index) => (
                  <Box key={index}>
                    <Typography
                      gutterBottom
                      noWrap
                      children={`${lista.Cidade_hotel} | ${lista.numero_ap}`}
                    />
                    <Typography gutterBottom noWrap children={lista.cliente} />
                    <Divider />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} sm={6} md={3} item>
          <Card sx={{ px: 1 }}>
            <CardContent>
              <AvatarWrapper
                children={
                  <img
                    alt="Coca"
                    src="/static/images/placeholders/logo/coca.png"
                    width={'50px'}
                  />
                }
              />
              <Typography
                variant="h5"
                sx={{ py: 1 }}
                noWrap
                children={produtoB}
              />
              <Divider />
              <Box sx={{ pt: 3 }}>
                {clientListB.map((lista, index) => (
                  <Box key={index}>
                    <Typography
                      gutterBottom
                      noWrap
                      children={`${lista.Cidade_hotel} | ${lista.numero_ap}`}
                    />
                    <Typography gutterBottom noWrap children={lista.cliente} />
                    <Divider />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} sm={6} md={3} item>
          <Card sx={{ px: 1 }}>
            <CardContent>
              <AvatarWrapper
                children={
                  <img
                    alt="RedBull"
                    src="/static/images/placeholders/logo/sonho.png"
                    width={'50px'}
                  />
                }
              />
              <Typography
                variant="h5"
                sx={{ py: 1 }}
                noWrap
                children={produtoC}
              />
              <Divider />
              <Box sx={{ pt: 3 }}>
                {clientListC.map((lista, index) => (
                  <Box key={index}>
                    <Typography
                      gutterBottom
                      noWrap
                      children={`${lista.Cidade_hotel} | ${lista.numero_ap}`}
                    />
                    <Typography gutterBottom noWrap children={lista.cliente} />
                    <Divider />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} sm={6} md={3} item>
          <Tooltip arrow title="Clique para adicionar um novo consumo">
            <CardAddAction>
              <CardActionArea
                sx={{ px: 1 }}
                component={NavLink}
                to="/expenditures/new"
              >
                <CardContent>
                  <AvatarAddWrapper>
                    <AddTwoToneIcon fontSize="large" />
                  </AvatarAddWrapper>
                </CardContent>
              </CardActionArea>
            </CardAddAction>
          </Tooltip>
        </Grid>
      </Grid>
    </>
  );
}

export default ConsultaC;
