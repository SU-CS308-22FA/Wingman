import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MainCard from '../MainCard';
import { Chip, Grid, Stack } from '@mui/material';

export default function CardReasonsCard({totalCardsDist}) {
  return (
    <MainCard contentSX={{ p: 2.25, width:350 }}>
    <Stack spacing={0.5}>
    <Box center>
        <Typography variant="h6" color="#252323" font fontWeight="bold">
            Total Number of Cards: {totalCardsDist[0]}
          </Typography>
    </Box>
        <Grid container
  direction="column"
  justifyContent="center"
  alignItems="flex-start">
            <Grid item>
                <Typography variant="subtitle1" color="#A99985" font fontWeight="light">
                    Cards for Foul: {totalCardsDist[1]}
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="subtitle1" color="#A99985" font fontWeight="light">
                Cards for Unprofessional Play: {totalCardsDist[2]}
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="subtitle1" color="#A99985" font fontWeight="light">
                Cards for Dive and Tackle: {totalCardsDist[3]}
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="subtitle1" color="#A99985" font fontWeight="light">
                Cards for Other Reasons: {totalCardsDist[4]}
                </Typography>
            </Grid>
        </Grid>
    </Stack>

</MainCard>
  );
}