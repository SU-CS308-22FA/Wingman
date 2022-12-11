import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

// chart options
const columnChartOptions = {
    chart: {
        type: 'bar',
        width: 2390,
        height: 430,
        toolbar: {
            show: false
        }
    },
    plotOptions: {
        bar: {
            columnWidth: '30%',
            borderRadius: 4
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        show: true,
        width: 8,
        colors: ['transparent']
    },
    xaxis: {
        categories: ["Default"]
      },
    yaxis: {
        title: {
            text: 'Numbers'
        }
    },
    fill: {
        opacity: 1
    },
    tooltip: {
        y: {
            formatter(val) {
                return `${val}`;
            }
        }
    },
    legend: {
        show: false,
        fontFamily: `'Public Sans', sans-serif`,
        offsetX: 10,
        offsetY: 10,
        labels: {
            useSeriesColors: false
        },
        markers: {
            width: 16,
            height: 16,
            radius: '50%',
            offsexX: 2,
            offsexY: 2
        },
        itemMargin: {
            horizontal: 0,
            vertical: 50
        }
    },
    responsive: [
        {
            breakpoint: 600,
            options: {
                yaxis: {
                    show: false
                }
            }
        }
    ]
};

// ==============================|| SALES COLUMN CHART ||============================== //

const RefereeBarChart = ({ data, opt}) => {
    const theme = useTheme();

    const { primary, secondary } = theme.palette.text;
    const line = theme.palette.divider;

    const warning = theme.palette.warning.main;
    const primaryMain = theme.palette.primary.main;
    const successDark = theme.palette.success.dark;

    const [series] = useState([
        {
            name: 'Current Season',
            data: data[0]
        },
        {
            name: 'All Seasons',
            data: data[1]
        }
    ]);

    const [options, setOptions] = useState(columnChartOptions);

    useEffect(() => {
        setOptions((prevState) => ({
            ...prevState,
            colors: ["#335c67" ,"#9e2a2b"],
            xaxis: {
                labels: {
                    style: {
                        colors: ["#252323"],
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: ["#252323"]
                    }
                }
            },
            grid: {
                borderColor: line
            },
            tooltip: {
                theme: 'light'
            },
        }));
    }, [primary, secondary, line, warning, primaryMain, successDark]);
    options.xaxis.categories= opt;
    
    return (
        <div id="chart">
            <ReactApexChart options={options} series={series} type="bar" height={250} width = {250} />
        </div>
    );
};

export default RefereeBarChart;