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
import { Gasto as CalcGasto } from 'src/services/consultas';

const AvatarWrapperSuccess = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.success.lighter};
      color:  ${theme.colors.success.main};
`
);

function Gasto() {
  const [contaList, setContaList] = useState([]);

  useEffect(() => {
    CalcGasto(1,'2022-12-07').then((res) => {
      setContaList(res);
    });
  }, []);

  return (
    <Card>
      <CardHeader title="Gasto Cliente" />
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
                primary={<Text color="black" children={`${conta.Hospedagem}`} />}
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
                // primary={<Text color="black">{conta.Nome}</Text>}
                primaryTypographyProps={{
                  variant: 'body1',
                  fontWeight: 'bold',
                  color: 'textPrimary',
                  gutterBottom: true,
                  noWrap: true,
                }}
                secondary={
                  <Text color="success">
                    R$ {parseFloat(conta.Soma)}
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

export default Gasto;
