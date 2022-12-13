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
  const [cidadeHotel] = useState('Rio de Janeiro');
  const [dataInicio] = useState('2022-02-26');
  const [dataFim] = useState('2022-03-01');
  const [clientList, setClientList] = useState([]);

  useEffect(() => {
    consultaA(cidadeHotel, dataInicio, dataFim).then((res) => {
      setClientList(res);
    });
  }, [cidadeHotel, dataInicio, dataFim]);

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
            primary={<Text color="black" children={`${cidadeHotel}`} />}
            primaryTypographyProps={{
              variant: 'body1',
              fontWeight: 'bold',
              color: 'textPrimary',
              gutterBottom: true,
              noWrap: true,
            }}
            secondary={
              <>
                <Text color="success">Entrada: {dataInicio}</Text>
                <br />
                <Text color="success">Saída: {dataFim}</Text>
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
                primary={<Text color="black">{client.Nome}</Text>}
                primaryTypographyProps={{
                  variant: 'body1',
                  fontWeight: 'bold',
                  color: 'textPrimary',
                  gutterBottom: true,
                  noWrap: true,
                }}
                secondary={<Text color="primary">{client.Email}</Text>}
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
