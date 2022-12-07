import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MainCard from '../MainCard';
import { Chip, Grid, Stack } from '@mui/material';

export default function RedYellowCardCard({numRed,numYellow}) {
  return (
    <MainCard contentSX={{ p: 2.25, width:350 }}>
    <Stack spacing={0.5}>
    <Grid container
  direction="column"
  justifyContent="center"
  alignItems="flex-start">
        <Grid item>
            <Typography variant="h6" color="#252323" font fontWeight="bold">
                Total Red Cards: <span style={{ color: 'red' }}>{numRed}</span>
              </Typography>
        </Grid>
                <Grid item>
                    <Typography variant="h6" color="#252323" font fontWeight="bold">
                    Total Yellow Cards: <span style={{ color: '#8B8000' }}>{numYellow}</span>
                    </Typography>
            </Grid>
    </Grid>
    </Stack>

</MainCard>
  );
}