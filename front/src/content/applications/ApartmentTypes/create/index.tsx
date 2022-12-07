import { Container, Grid } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import CreateApartmentTypesForm from './CreateApartmentTypeForm';
import PageHeader from './PageHeader';

function CreateApartmentTypes() {
  return (
    <>
      <Helmet children={<title children="Cadastrar Tipo de Apartamento" />} />
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
              <Grid item xs={12} children={<CreateApartmentTypesForm />} />
            }
          />
        }
      />
      <Footer />
    </>
  );
}

export default CreateApartmentTypes;
