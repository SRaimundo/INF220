import { Container, Grid } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import ApartmentsTable from './ApartmentsTable';
import PageHeader from './PageHeader';

function Apartments() {
  return (
    <>
      <Helmet children={<title children="Apartamentos" />} />
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
            children={<Grid item xs={12} children={<ApartmentsTable />} />}
          />
        }
      />
      <Footer />
    </>
  );
}

export default Apartments;
