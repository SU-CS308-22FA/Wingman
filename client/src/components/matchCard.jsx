import PropTypes from 'prop-types';

// material-ui
import { Box, Chip, Grid, Stack, Typography } from '@mui/material';
import MainCard from './MainCard';

// project import
// assets


const SmallCard = ({ title, subtitle,value}) => (
    <MainCard contentSX={{ p: 2.25 }}>
        <Stack spacing={0.5}>
            <Typography variant="h6" color="#252323" font fontWeight="bold">
                {title}
            </Typography>
            <Grid container alignItems="center">
                <Grid item>
                    <Typography variant="h5" color="#A99985" font fontWeight="light">
                        {subtitle}
                    </Typography>
                </Grid>
                {value &&
                <Grid item>
                <Chip
                    label={(value < 65 ? "Fair" : value <= 80 ? "Mediocre" : "Severe")}
                    color={ value < 65 ? "success" : value <= 80 ? "secondary" : "error"}
                    sx={{ ml: 1.25, mb:1, pl: 0 }}
                    size="small"
                />
             
                </Grid>
                }

            
            </Grid>
        </Stack>

    </MainCard>
);

SmallCard.propTypes = {
    color: PropTypes.string,
    title: PropTypes.string,
    count: PropTypes.string,

};

SmallCard.defaultProps = {
    color: 'primary'
};

export default SmallCard;