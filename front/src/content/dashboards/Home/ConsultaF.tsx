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
import { consultaF } from 'src/services/consultas';

const AvatarWrapperSuccess = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.success.lighter};
      color:  ${theme.colors.success.main};
`
);

function ConsultaF() {
  const [contaList, setContaList] = useState([]);

  useEffect(() => {
    consultaF().then((res) => {
      setContaList(res);
    });
  }, []);

  return (
    <Card>
      <CardHeader title="5 Maiores Faturas" />
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
                primary={<Text color="black" children={`${conta.Cidade}`} />}
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
                primary={<Text color="black">{conta.nome}</Text>}
                primaryTypographyProps={{
                  variant: 'body1',
                  fontWeight: 'bold',
                  color: 'textPrimary',
                  gutterBottom: true,
                  noWrap: true,
                }}
                secondary={
                  <Text color="success">
                    R$ {parseFloat(conta.valor_total)}
                  </Text>
                }
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

export default ConsultaF;
