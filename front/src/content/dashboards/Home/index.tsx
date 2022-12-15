import { Container, Grid } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import ConsultaA from './ConsultaA';
import ConsultaB from './ConsultaB';
import ConsultaC from './ConsultaC';
import ConsultaE from './ConsultaE';
import ConsultaF from './ConsultaF';
import ConsultaH from './ConsultaH';
import Consultas from './Consultas';
import Gasto from './gasto';
import Diaria from './diaria';
import PageHeader from './PageHeader';

function Home() {
  return (
    <>
      <Helmet>
        <title>Início</title>
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
            <Consultas />
          </Grid>
          <Grid item lg={4} xs={12}>
            <ConsultaA />
          </Grid>
          <Grid item lg={8} xs={12}>
            <ConsultaC />
          </Grid>
          <Grid item lg={4} xs={12}>
            <ConsultaE />
          </Grid>
          <Grid item lg={4} xs={12}>
            <ConsultaF />
          </Grid>
          <Grid item lg={4} xs={12}>
            <ConsultaB />
          </Grid>
          <Grid item lg={3} xs={12}>
            <ConsultaH />
          </Grid>
          <Grid item lg={3} xs={12}>
            <Gasto />
          </Grid>
          <Grid item lg={3} xs={12}>
            <Diaria />
          </Grid>
        </Grid>

        {/* <Grid
          container
          direction="row"
          justifyContent="left"
          alignItems="stretch"
          spacing={3}
        >
          
        </Grid> */}
        
      </Container>
      <Footer />
    </>
  );
}

export default Home;
