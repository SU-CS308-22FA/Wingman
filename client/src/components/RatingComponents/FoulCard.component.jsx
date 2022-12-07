import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MainCard from '../MainCard';
import { Chip, Grid, Stack } from '@mui/material';

export default function FoulCard({numFoul,numFoulPerCard}) {
  return (
    <MainCard contentSX={{ p: 2.25, width:350 }}>
    <Stack spacing={0.5}>
    <Grid container
  direction="column"
  justifyContent="center"
  alignItems="flex-start">
        <Grid item>
            <Typography variant="h6" color="#252323" font fontWeight="bold">
                Total Fouls: {numFoul}
              </Typography>
        </Grid>
                <Grid item>
                    <Typography variant="subtitle1" color="#A99985" font fontWeight="light">
                    Cards per Foul: %{numFoulPerCard}
                    </Typography>
            </Grid>
    </Grid>
    </Stack>

</MainCard>
  );
}