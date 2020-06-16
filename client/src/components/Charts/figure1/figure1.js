import Highcharts from "highcharts";
export const firstChartSettings = {
  chart: {
    type: "column",
    height: 550,
    spacingBottom: 100,
    spacingLeft: 0,
  },
  title: {
    text: "Emissions per kg of CO2 converted",
  },
  xAxis: {
    labels: {
      groupedOptions: [
        {},
        {
          // useHTML: true, //set to true
          style: {
            width: "120px",
            whiteSpace: "normal", //set to normal
          },
          step: 1,
          formatter: function() {
            //use formatter
            return (
              '<div align="center" style="word-wrap: break-word;word-break: break-all;width:120px">' +
              this.value +
              "</div>"
            );
          },
        },
      ],
      autoRotation: false,
      align: "center",
      padding: 30,
    },
    categories: [
      {
        name: "CO2 Mineralization",
        categories: [
          {
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
        categories: [
          {
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
        categories: [
          {
            name: "DMR-CO",
            categories: ["Methanol"],
          },
          {
            name: "DMR-H2",
            categories: ["Methanol"],
          },
        ],
      },
      {
        name: "CO2 Reduction by Hydrogen",
        categories: [
          {
            name: "D-H2",
            categories: ["Methane", "Methanol", "Diesel"],
          },
        ],
      },
      {
        name: "CO2 Reduction Involving Light",
        categories: [
          {
            name: "P.CAT",
            categories: ["Methane", "Methanol"],
          },
        ],
      },
      {
        name: "CO2 Bioconversion",
        categories: [
          {
            name: "P-DE",
            categories: ["Diesel"],
          },
          {
            name: "P-WE",
            categories: ["Diesel"],
          },
        ],
      },
    ],
  },
  yAxis: {
    title: {
      text: "Emissions (kg CO2eq emitted/kg CO2 converted)",
    },
    stackLabels: {
      // enabled: true,
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
    backgroundColor:
      Highcharts.defaultOptions.legend.backgroundColor || "white",
    borderColor: "#CCC",
    borderWidth: 1,
    shadow: false,
  },
  tooltip: {
    // formatter: function() {
    //   var sum = 0,
    //     cont = this,
    //     series = cont.series.chart.series,
    //     each = Highcharts.each;
    //   each(series, function(p, i) {
    //     each(p.data, function(ob, j) {
    //       if (cont.point.index === ob.x) {
    //         sum += ob.y;
    //       }
    //     });
    //   });
    //   return (
    //     "<b>" +
    //     this.x +
    //     "</b><br/>" +
    //     this.series.name +
    //     ": " +
    //     this.y +
    //     " <br/>" +
    //     "Total: " +
    //     sum.toPrecision(3)
    //   );
    // },
  },
  plotOptions: {
    column: {
      stacking: "normal",
    },
    scatter: {
      tooltip: {
        pointFormat: "Net: <b>{point.y}</b>"
      },
    },
  },
  series: [
    {
      name: "CO2 Converted",
      data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      type: "column",
    },
    {
      name: "End Use",
      data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      type: "column",
    },
    {
      name: "CO2 Conversion Process",
      data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      type: "column",
    },
    {
      name: "Hydrogen",
      data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      type: "column",
    },
    {
      name: "CO2 Capture Process",
      data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      type: "column",
    },
    {
      name: "Net",
      data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      type: "scatter",
    },
  ],
};
