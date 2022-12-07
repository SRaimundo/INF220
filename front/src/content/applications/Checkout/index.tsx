import { Container, Grid } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import CheckoutForm from './CheckoutForm';
import PageHeader from './PageHeader';

function Checkout() {
  return (
    <>
      <Helmet children={<title children="Check-Out" />} />
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
            children={<Grid item xs={12} children={<CheckoutForm />} />}
          />
        }
      />
      <Footer />
    </>
  );
}

export default Checkout;
