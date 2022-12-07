import { Container, Grid } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import CreateReservationForm from './CreateReservationForm';
import PageHeader from './PageHeader';

function CreateReservation() {
  return (
    <>
      <Helmet children={<title children="Cadastrar Reserva" />} />
      <PageTitleWrapper children={<PageHeader />} />
      <Container
        maxWidth="lg"
        children={
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={3}
            children={
              <Grid item xs={12} children={<CreateReservationForm />} />
            }
          />
        }
      />
      <Footer />
    </>
  );
}

export default CreateReservation;
