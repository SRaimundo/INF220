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
  const [filial] = useState('Rio de Janeiro');
  const [clientList, setClientList] = useState([]);

  useEffect(() => {
    consultaE(filial).then((res) => {
      setClientList(res);
    });
  }, [filial]);

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
            primary={<Text color="black" children={`${filial}`} />}
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
                primary={<Text color="black">{client.nome}</Text>}
                primaryTypographyProps={{
                  variant: 'body1',
                  fontWeight: 'bold',
                  color: 'textPrimary',
                  gutterBottom: true,
                  noWrap: true,
                }}
                secondary={<Text color="error">{client.email}</Text>}
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
