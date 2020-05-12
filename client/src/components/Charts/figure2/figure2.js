import Highcharts from "highcharts";
export const secondChartSettings = {
    chart: {
        type: "column",
        height: 550,
        spacingBottom: 100,
        spacingLeft: 0
    },
    title: {
        text: "Emissions per kg of CWM",
    },
    xAxis: {
        labels: {
            style: {
                width: '120px',
                whiteSpace: 'normal', //set to normal
            },
            formatter: function() { //use formatter
                return '<div align="center" style="width:120px">' + this.value + '</div>';
            },
            autoRotation: false,
            align: 'center',
            padding: 30,
        },
        categories: [{
                name: "CO2 Mineralization",
                categories: ["CWM"],
            },
            {
                name: "Incumbent"
            }
        ],
    },
    yAxis: {
        title: {
            text: "Emissions (kg CO2eq emitted/kg CWM)",
        },
        stackLabels: {
            style: {
                fontWeight: "bold",
                color:
                // theme
                    (Highcharts.defaultOptions.title.style &&
                        Highcharts.defaultOptions.title.style.color) ||
                    "gray",
            },
        },
    },
    legend: {
        align: "center",
        verticalAlign: "bottom",
        y: 40,
        floating: true,
        backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || "white",
        borderColor: "#CCC",
        borderWidth: 1,
        shadow: false,
    },
    tooltip: {
        headerFormat: "<b>{point.x}</b><br/>",
        pointFormat: "{series.name}: {point.y}",
    },
    plotOptions: {
        column: {
            stacking: "normal",
        },
    },
    series: [{
            name: "CO2 Converted",
            data: [-0.2, 0],
        },
        {
            name: "Electrolysis",
            data: [0, 0],
        },
        {
            name: "CO2 Conversion Process",
            data: [0, 0],
        },
        {
            name: "End Use",
            data: [0, 0],
        },
        {
            name: "CO2 Capture Process",
            data: [0.02, 0],
        },
    ],
};