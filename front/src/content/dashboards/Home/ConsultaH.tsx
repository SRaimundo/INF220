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
import { consultaH } from 'src/services/consultas';

const AvatarWrapperSuccess = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.success.lighter};
      color:  ${theme.colors.success.main};
`
);

function ConsultaH() {
  const [contaList, setContaList] = useState([]);

  useEffect(() => {
    consultaH().then((res) => {
      setContaList(res);
    });
  }, []);

  return (
    <Card>
      <CardHeader title="Listar Vagas Disponiveis no Hotel" />
      <List disablePadding>
        <Divider />
        {contaList.map((conta, index) => (
          <Box key={index} display="flex">
            <ListItem sx={{ py: 1 }}>
              <ListItemAvatar>
                <AvatarWrapperSuccess>
                  <LocationCityIcon fontSize="medium" />
                </AvatarWrapperSuccess>
              </ListItemAvatar>
              <ListItemText
                primary={<Text color="black" children={`${conta.Vaga}`} />}
                primaryTypographyProps={{
                  variant: 'body1',
                  fontWeight: 'bold',
                  color: 'textPrimary',
                  gutterBottom: true,
                  noWrap: true,
                }}
              />
            </ListItem>
            <ListItem sx={{ py: 2 }}>
              <ListItemText
                primary={<Text color="black">{conta.Hotel}</Text>}
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
          </Box>
        ))}
      </List>
    </Card>
  );
}

export default ConsultaH;
