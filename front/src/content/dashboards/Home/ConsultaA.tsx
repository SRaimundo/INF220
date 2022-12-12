import LocationCityIcon from '@mui/icons-material/LocationCityTwoTone';
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import Text from 'src/components/Text';
import { consultaA } from 'src/services/consultas';

const AvatarWrapperPrimary = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.primary.lighter};
      color:  ${theme.colors.primary.main};
`
);

function ConsultaA() {
  const [filial] = useState('Rio de Janeiro');
  const [dataEntrada] = useState('26/02/2022');
  const [dataSaida] = useState('01/03/2022');
  const [clientList, setClientList] = useState([]);

  useEffect(() => {
    consultaA(filial, dataEntrada, dataSaida).then((res) => {
      setClientList(res);
    });
  }, [filial, dataEntrada, dataSaida]);

  return (
    <Card>
      <CardHeader title="Clientes Hospedados em Filial por Data" />
      <List disablePadding>
        <ListItem sx={{ py: 1 }}>
          <ListItemAvatar>
            <AvatarWrapperPrimary>
              <LocationCityIcon fontSize="medium" />
            </AvatarWrapperPrimary>
          </ListItemAvatar>
          <ListItemText
            primary={<Text color="black" children={`${filial}`} />}
            primaryTypographyProps={{
              variant: 'body1',
              fontWeight: 'bold',
              color: 'textPrimary',
              gutterBottom: true,
              noWrap: true,
            }}
            secondary={
              <>
                <Text color="success">Entrada: {dataEntrada}</Text>
                <br />
                <Text color="success">Saída: {dataSaida}</Text>
              </>
            }
            secondaryTypographyProps={{ variant: 'body2', noWrap: true }}
          />
        </ListItem>
        <Divider />
        {clientList.map((client, index) => (
          <Box key={index}>
            <ListItem sx={{ py: 2 }}>
              <ListItemText
                primary={<Text color="black">{client.nome}</Text>}
                primaryTypographyProps={{
                  variant: 'body1',
                  fontWeight: 'bold',
                  color: 'textPrimary',
                  gutterBottom: true,
                  noWrap: true,
                }}
                secondary={<Text color="primary">{client.email}</Text>}
                secondaryTypographyProps={{ variant: 'body2', noWrap: true }}
              />
            </ListItem>
            <Divider />
          </Box>
        ))}
      </List>
    </Card>
  );
}

export default ConsultaA;
