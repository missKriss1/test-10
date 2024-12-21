import { AppBar, styled, Toolbar, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

const StyledLink = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit'
  },
});

const AppToolbar = () => {
  return (
    <AppBar position="sticky" sx={{mb: 2}}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
          <StyledLink to="/">News</StyledLink>
        </Typography>
      </Toolbar>
    </AppBar>

  );

};

export default AppToolbar