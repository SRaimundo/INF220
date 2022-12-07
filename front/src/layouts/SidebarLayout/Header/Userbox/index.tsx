import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import {
  Box,
  Button,
  Divider,
  Hidden,
  lighten,
  List,
  ListItem,
  ListItemText,
  Popover,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useContext, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from 'src/contexts/AuthContext';

const UserBoxButton = styled(Button)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
        color: ${lighten(theme.palette.secondary.main, 0.5)}
`
);

function HeaderUserbox() {
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const { state, authContext } = useContext(AuthContext);
  const user = state.data;

  return (
    <>
      <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
        <Hidden mdDown>
          <UserBoxText>
            <UserBoxLabel variant="body1" children={user.name} />
            <UserBoxDescription variant="body2" children={user.email} />
          </UserBoxText>
        </Hidden>
        <Hidden smDown>
          <ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
        </Hidden>
      </UserBoxButton>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuUserBox sx={{ minWidth: 210 }} display="flex">
          <UserBoxText>
            <UserBoxLabel variant="body1" children={user.name} />
            <UserBoxDescription variant="body2" children={user.email} />
          </UserBoxText>
        </MenuUserBox>
        <Divider sx={{ mb: 0 }} />
        {user.role === 'admin' ? (
          <>
            <List sx={{ p: 1 }} component="nav">
              <ListItem
                button
                to="/users"
                component={NavLink}
                onClick={handleClose}
              >
                <SettingsTwoToneIcon fontSize="small" />
                <ListItemText primary="Área do Administrador" />
              </ListItem>
            </List>
            <Divider />
          </>
        ) : null}
        <Box
          sx={{ m: 1 }}
          children={
            <Button
              color="primary"
              fullWidth
              to="/"
              component={NavLink}
              onClick={() => authContext.signOut()}
              children={
                <>
                  <LockOpenTwoToneIcon sx={{ mr: 1 }} />
                  Sair
                </>
              }
            />
          }
        />
      </Popover>
    </>
  );
}

export default HeaderUserbox;
