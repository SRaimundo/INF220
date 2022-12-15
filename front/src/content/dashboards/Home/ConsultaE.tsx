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
import { consultaE } from 'src/services/consultas';

const AvatarWrapperError = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.error.lighter};
      color:  ${theme.colors.error.main};
`
);

function ConsultaE() {
  const [cidade] = useState('Rio de Janeiro');
  // const[data] = useState('2022-12-07');
  const [clientList, setClientList] = useState([]);

  useEffect(() => {
    consultaE(cidade).then((res) => {
      setClientList(res);
    });
  }, [cidade]);

  return (
    <Card>
      <CardHeader title="Reservas que não possuem hospedagem na filial" />
      <List disablePadding>
        <ListItem sx={{ py: 1 }}>
          <ListItemAvatar>
            <AvatarWrapperError>
              <LocationCityIcon fontSize="medium" />
            </AvatarWrapperError>
          </ListItemAvatar>
          <ListItemText
            primary={<Text color="black" children={`${cidade}`} />}
            primaryTypographyProps={{
              variant: 'body1',
              fontWeight: 'bold',
              color: 'textPrimary',
              gutterBottom: true,
              noWrap: true,
            }}
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
                secondary={<Text color="error">{client.Email}</Text>}
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

export default ConsultaE;
