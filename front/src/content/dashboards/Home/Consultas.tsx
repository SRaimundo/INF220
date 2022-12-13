import LocationCityIcon from '@mui/icons-material/LocationCityTwoTone';
import TrendingUp from '@mui/icons-material/TrendingUp';
import {
  Avatar,
  Box,
  Card,
  Divider,
  Grid,
  Hidden,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import {
  ConsultaD,
  consultaD,
  ConsultaG,
  consultaG,
} from 'src/services/consultas';
import ConsultasChart from './ConsultasChart';

const ConsultasChartWrapper = styled(ConsultasChart)(
  () => `
      width: 100%;
      height: 100%;
`
);
const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.success.main};
      color: ${theme.palette.success.contrastText};
      width: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
      box-shadow: ${theme.colors.shadows.success};
`
);

const AvatarWrapperSuccess = styled(Avatar)(
  ({ color }) => `
      background-color: ${color + 10};
      color:  ${color};
`
);

function Consultas() {
  // const bedBalance = {
  //   datasets: [
  //     {
  //       data: [20, 10, 40, 30],
  //       backgroundColor: ['#ff9900', '#1c81c2', '#333', '#5c6ac0'],
  //     },
  //   ],
  //   labels: ['Bitcoin', 'Ripple', 'Cardano', 'Ethereum'],
  // };

  const [hotelList, setHotelList] = useState<ConsultaD[]>([]);
  const [bedBalance, setBedBalance] = useState<any>();

  const [colors, setColors] = useState<string[]>([]);

  useEffect(() => {
    consultaD(1).then((res) => {
      setHotelList(res);
      const hoteis = res.map((a) => a.Cidade);
      const counts = res.map((a) => a.count);
      const colors = res.map(
        (a) =>
          '#' +
          Math.floor(Math.random() * 0x1000000)
            .toString(16)
            .padStart(6, '0')
      );
      setColors(colors);
      setBedBalance({
        datasets: [
          {
            data: counts,
            backgroundColor: colors,
          },
        ],
        labels: hoteis,
      });
    });
  }, []);

  const [contaList, setContaList] = useState<ConsultaG[]>([]);

  useEffect(() => {
    consultaG().then((res) => {
      setContaList(res);
    });
  }, []);

  return (
    <Card>
      <Grid spacing={0} container>
        <Grid item xs={12} md={6}>
          <Box p={4}>
            <Typography
              sx={{ pb: 3 }}
              variant="h4"
              children="Filiais com mais vendas e lucros"
            />
            <Box display="flex" flexWrap={'wrap'}>
              {contaList.map((conta, index) => (
                <Box
                  display="flex"
                  sx={{ py: 2, mr: 3 }}
                  alignItems="center"
                  key={index}
                >
                  <AvatarSuccess
                    sx={{ mr: 2 }}
                    variant="rounded"
                    children={<TrendingUp fontSize="medium" />}
                  />
                  <Box>
                    <Typography variant="h4" children={conta.filial} />
                    <Typography variant="h4" children={`R$ ${conta.vendas}`} />
                    <Typography
                      variant="subtitle2"
                      noWrap
                      children={`Em ${conta.quantidade} vendas`}
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
        <Grid
          sx={{ position: 'relative' }}
          display="flex"
          alignItems="center"
          item
          xs={12}
          md={6}
        >
          <Hidden mdDown>
            <Divider absolute orientation="vertical" />
          </Hidden>
          <Box p={4} flex={1}>
            <Typography
              sx={{ pb: 3 }}
              variant="h4"
              children="Hotéis com quarto com 1 cama de casal"
            />
            <Grid container spacing={0}>
              <Grid
                xs={12}
                sm={5}
                item
                display="flex"
                justifyContent="center"
                alignItems="center"
                children={
                  bedBalance ? (
                    <Box
                      style={{ height: '160px' }}
                      children={<ConsultasChartWrapper data={bedBalance} />}
                    />
                  ) : null
                }
              />
              <Grid xs={12} sm={7} item display="flex" alignItems="center">
                <List disablePadding sx={{ width: '100%' }}>
                  {hotelList.map((hotel, index) => (
                    <ListItem disableGutters key={index}>
                      <ListItemAvatar>
                        <AvatarWrapperSuccess color={colors[index]}>
                          <LocationCityIcon fontSize="medium" />
                        </AvatarWrapperSuccess>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Filial"
                        primaryTypographyProps={{ variant: 'h5', noWrap: true }}
                        secondary={hotel.Cidade}
                        secondaryTypographyProps={{
                          variant: 'subtitle2',
                          noWrap: true,
                        }}
                      />
                      <Box>
                        <Typography
                          align="right"
                          variant="h4"
                          noWrap
                          children={`${hotel.count} ${
                            parseInt(hotel.count) > 1 ? 'Quartos' : 'Quarto'
                          }`}
                        />
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}

export default Consultas;
