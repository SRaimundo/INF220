import { Container, Grid } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import ClientsTable from './HospedeTable';
import PageHeader from './PageHeader';

function Hospedes() {
  return (
    <>
      <Helmet>
        <title>Hospedes</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <ClientsTable />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Hospedes;
