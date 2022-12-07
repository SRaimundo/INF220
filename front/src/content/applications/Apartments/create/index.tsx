import { Container, Grid } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import CreateApartmentForm from './CreateApartmentForm';
import PageHeader from './PageHeader';

function CreateApartment() {
  return (
    <>
      <Helmet children={<title children="Cadastrar Apartmento" />} />
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
            children={<Grid item xs={12} children={<CreateApartmentForm />} />}
          />
        }
      />
      <Footer />
    </>
  );
}

export default CreateApartment;
