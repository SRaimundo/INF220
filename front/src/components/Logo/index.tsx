import { Box, Hidden, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const LogoWrapper = styled(Link)(
  ({ theme }) => `
        color: ${theme.palette.text.primary};
        padding: ${theme.spacing(0, 1, 0, 0)};
        display: flex;
        text-decoration: none;
        font-weight: ${theme.typography.fontWeightBold};
`
);

const LogoSignWrapper = styled(Box)(
  ({ theme }) => `
        background: transparent;
        margin-left: ${theme.spacing(0.5)};
        margin-right: ${theme.spacing(0.5)};
        margin-bottom: ${theme.spacing(0.5)};
        margin-top: ${theme.spacing(0.5)};
`
);

const LogoTextWrapper = styled(Box)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
`
);

const VersionBadge = styled(Box)(
  ({ theme }) => `
        background: ${theme.palette.success.main};
        color: ${theme.palette.success.contrastText};
        padding: ${theme.spacing(0.4, 1)};
        border-radius: ${theme.general.borderRadiusSm};
        text-align: center;
        display: inline-block;
        line-height: 1;
        font-size: ${theme.typography.pxToRem(11)};
`
);

const LogoText = styled(Box)(
  ({ theme }) => `
        font-size: ${theme.typography.pxToRem(15)};
        font-weight: ${theme.typography.fontWeightBold};
`
);

function Logo() {
  return (
    <LogoWrapper to="/">
      <LogoSignWrapper>
        <img
          height="60px"
          width="60px"
          alt="Hoteis BomSono"
          src="/static/images/logo/rectangle.svg"
        />
      </LogoSignWrapper>
      <Hidden smDown>
        <LogoTextWrapper>
          <Tooltip title="Version 0.1" arrow placement="right">
            <VersionBadge>0.1</VersionBadge>
          </Tooltip>
          <LogoText>Hoteis BomSono</LogoText>
        </LogoTextWrapper>
      </Hidden>
    </LogoWrapper>
  );
}

export default Logo;
