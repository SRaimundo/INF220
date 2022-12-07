import { Box, Button, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Helmet } from 'react-helmet-async';

const MainContent = styled(Box)(
  ({ theme }) => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
);

function Status404() {
  return (
    <>
      <Helmet>
        <title>Status - 404</title>
      </Helmet>
      <MainContent>
        <Container maxWidth="md">
          <Box textAlign="center">
            <img alt="404" height={180} src="/static/images/status/404.svg" />
            <Typography
              variant="h2"
              sx={{ my: 2 }}
              children="A página que você está procurando não existe"
            />
            <Typography
              variant="h4"
              color="text.secondary"
              fontWeight="normal"
              sx={{ mb: 4 }}
              children="Volte para a página inicial clicando no botão abaixo"
            />
            <Button
              href="/"
              variant="outlined"
              children="Ir para página inicial"
            />
          </Box>
        </Container>
      </MainContent>
    </>
  );
}

export default Status404;
