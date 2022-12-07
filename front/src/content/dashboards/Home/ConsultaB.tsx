import CleaningServicesTwoToneIcon from '@mui/icons-material/CleaningServicesTwoTone';
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
import { consultaB } from 'src/services/consultas';

const AvatarWrapperWarning = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.warning.lighter};
      color:  ${theme.colors.warning.main};
`
);

function ConsultaB() {
  const [filial] = useState('Viçosa');
  const [quarto] = useState('101');
  const [dataEntrada] = useState('26/02/2022');
  const [dataSaida] = useState('02/04/2022');
  const [camareiraList, setCamareiraList] = useState([]);

  useEffect(() => {
    consultaB(filial, quarto, dataEntrada, dataSaida).then((res) =>
      setCamareiraList(res)
    );
  }, [filial, quarto, dataEntrada, dataSaida]);

  return (
    <Card>
      <CardHeader title="Faxinas realizadas no quarto" />
      <List disablePadding>
        <ListItem sx={{ py: 1 }}>
          <ListItemAvatar>
            <AvatarWrapperWarning>
              <CleaningServicesTwoToneIcon fontSize="medium" />
            </AvatarWrapperWarning>
          </ListItemAvatar>
          <ListItemText
            primary={<Text color="black" children={`${filial} | ${quarto}`} />}
            primaryTypographyProps={{
              variant: 'body1',
              fontWeight: 'bold',
              color: 'textPrimary',
              gutterBottom: true,
              noWrap: true,
            }}
            secondary={
              <>
                <Text color="warning">De: {dataEntrada}</Text>
                <br />
                <Text color="warning">Até: {dataSaida}</Text>
              </>
            }
            secondaryTypographyProps={{ variant: 'body2', noWrap: true }}
          />
        </ListItem>
        <Divider />
        {camareiraList.map((camareira, index) => (
          <Box key={index}>
            <ListItem sx={{ py: 2 }}>
              <ListItemText
                primary={<Text color="black">{camareira.nome}</Text>}
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

export default ConsultaB;
