import { Container, Grid } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import ApartmentTypesTable from './ApartmentTypesTable';
import PageHeader from './PageHeader';

function ApartmentTypes() {
  return (
    <>
      <Helmet children={<title children="Tipos de Apartamento" />} />
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
            children={<Grid item xs={12} children={<ApartmentTypesTable />} />}
          />
        }
      />
      <Footer />
    </>
  );
}

export default ApartmentTypes;
