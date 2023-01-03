import { useState, useEffect } from 'react';
import Chip from "@material-ui/core/Chip"; 

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

// chart options
const areaChartOptions = {
    chart: {
        height: 400,
        type: 'area',
        toolbar: {
            show: false
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth',
        width: 2
    },
    grid: {
        strokeDashArray: 0
    }
};


function getCardString(value) {
    if (value >= 50 && value <= 75) {
      return <Chip label="Fair" />; // Return a Chip component with the label "Fair"
    } else if (value > 90) {
      return <Chip label="High" />; // Return a Chip component with the label "High"
    } else {
      // You can return a default string for other values
      return <Chip label="Other" />; // Return a Chip component with the label "Other"
    }
  }

const RateAreaChart = ({ data }) => {
    const theme = useTheme();

    const { primary, secondary } = theme.palette.text;
    const line = theme.palette.divider;

    const [options, setOptions] = useState(areaChartOptions);

    useEffect(() => {
        setOptions((prevState) => ({
            ...prevState,
            colors: ["#70798C"],
            xaxis: {
                categories: data.map(ref => ref.surname),
                labels: {
                  rotate: -45
                },
                offsetX: -3,
                axisBorder: {
                    show: true,
                    color: "#70798C"
                },
            },
            yaxis: {
                labels: {
                    style: {
                        colors: [secondary]
                    }
                }
            },
            grid: {
                borderColor: line
            },
            tooltip: {
                theme: 'light'
            }
        }));
    }, [primary, secondary, line, theme, data]);

    const [series, setSeries] = useState([
        {
            name: 'Referee Average Rating',
            data: data.map(ref => Number(ref.avg_rating).toFixed(2))
        } 
 
    ]);

    useEffect(() => {
        setSeries([
            {
                name: 'Referee Average Rating',
                data: data.map(ref => Number(ref.avg_rating).toFixed(2))
            },
 
        ]);
    }, [data]);

    return <ReactApexChart options={options} series={series} type="area" height={250} />;
};


export default RateAreaChart;