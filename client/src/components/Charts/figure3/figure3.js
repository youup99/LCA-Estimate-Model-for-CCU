import Highcharts from "highcharts";
export const thirdChartSettings = {
    chart: {
        type: "column",
        height: 620,
        spacingBottom: 70,
        spacingLeft: 0
    },
    title: {
        text: "Avoided Emissions",
    },
    xAxis: {
        labels: {
            groupedOptions: [{}, {
                // useHTML: true, //set to true
                style: {
                    width: '120px',
                    whiteSpace: 'normal', //set to normal
                },
                step: 1,
                formatter: function() { //use formatter
                    return '<div align="center" style="word-wrap: break-word;word-break: break-all;width:120px">' + this.value + '</div>';
                },
            }],
            autoRotation: false,
            align: 'center',
            // padding: 30,
        },
        categories: [{
                name: "CO2 Mineralization",
                categories: [{
                        name: "WMC",
                        categories: ["CWM"],
                    },
                    {
                        name: "DMC-W",
                        categories: ["Calcite"],
                    },
                    {
                        name: "DMC-O",
                        categories: ["Magnesite"],
                    },
                ],
            },
            {
                name: "CO2 Reduction Involving Electricity",
                categories: [{
                        name: "SOEC-CO",
                        categories: ["Methane", "Methanol", "Diesel", "Ethanol"],
                    },
                    {
                        name: "SOEC-EL",
                        categories: ["Methane", "Methanol", "Diesel"],
                    },
                ],
            },
            {
                name: "CO2 Reduction by Hydrocarbon",
                categories: [{
                        name: "DMR-CO",
                        categories: ["Methanol"]
                    },
                    {
                        name: "DMR-H2",
                        categories: ["Methanol"]
                    }
                ]
            },
            {
                name: "CO2 Reduction by Hydrogen",
                categories: [{
                    name: "D-H2",
                    categories: ["Methane", "Methanol", "Diesel"]
                }]
            },
            {
                name: "CO2 Reduction Involving Light",
                categories: [{
                    name: "P.CAT",
                    categories: ["Methane", "Methanol"]
                }]
            },
            {
                name: "CO2 Bioconversion",
                categories: [{
                        name: "P-DE",
                        categories: ["Diesel"]
                    },
                    {
                        name: "P-WE",
                        categories: ["Diesel"]
                    }
                ]
            }
        ],
    },
    yAxis: {
        height: 400,
        title: {
            align: "middle",
            text: "Avoided Emissions (kg CO2eq avoided/kg Product)",
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
        enabled: false
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
        data: [5, 3, 4, 7, 2, 5, 3, 4, 7, 2, 5, 3, 4, 7, 2, 5, 3, 4, 7],
    }]
};