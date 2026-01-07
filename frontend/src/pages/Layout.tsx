import React from 'react';
import { Container, Grid, InputAdornment, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/SearchOutlined';
import { Outlet } from 'react-router-dom';

import { SideMenu } from '../components/SideMenu';
import { useHomeStyles } from './theme';
import { SearchTextField } from '../components/SearchTextField';
import { Tags } from '../components/Tags';
import { Users } from '../components/Users';

export const Layout: React.FC = (): React.ReactElement => {
  const classes = useHomeStyles();

  return (
    <Container sx={classes.wrapper} maxWidth="lg">
      <Grid container spacing={3}>
        <Grid sm={1} md={3} item>
          <SideMenu classes={classes} />
        </Grid>
        <Grid sm={8} md={6} item>
          <Outlet />
        </Grid>
        <Grid sm={3} md={3} item>
          <Box sx={classes.rightSide}>
            <SearchTextField
              variant="outlined"
              placeholder="Поиск по Твиттеру"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
            <Tags classes={classes} />
            <Users />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
