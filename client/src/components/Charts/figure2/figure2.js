import Highcharts from "highcharts";
export const secondChartSettings = {
  chart: {
    type: "column",
    height: 550,
    spacingBottom: 100,
    spacingLeft: 0
  },
  title: {
    text: "Emissions per kg of CWM"
  },
  xAxis: {
    labels: {
      style: {
        width: "120px",
        whiteSpace: "normal" //set to normal
      },
      formatter: function() {
        //use formatter
        return (
          '<div align="center" style="width:120px">' + this.value + "</div>"
        );
      },
      autoRotation: false,
      align: "center",
      padding: 30
    },
    categories: [
      {
        name: "CO₂ Mineralization",
        categories: ["CWM"]
      },
      {
        name: "Incumbent"
      }
    ]
  },
  yAxis: {
    title: {
      text: "Emissions (kg CO₂eq emitted/kg CWM)"
    },
    stackLabels: {
      style: {
        fontWeight: "bold",
        color:
          // theme
          (Highcharts.defaultOptions.title.style &&
            Highcharts.defaultOptions.title.style.color) ||
          "gray"
      }
    }
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
    shadow: false
  },
  tooltip: {
    headerFormat: "<b>{point.x}</b><br/>",
    pointFormat: "{series.name}: {point.y}"
  },
  plotOptions: {
    column: {
      stacking: "normal"
    }
  },
  series: [
    {
      name: "CO₂ Converted",
      data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      type: 'column'
    },
    {
      name: "End Use",
      data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      type: 'column'
    },
    {
      name: "CO₂ Conversion Process",
      data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      type: 'column'
    },
    {
      name: "Hydrogen",
      data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      type: 'column'
    },
    {
      name: "CO₂ Capture Process",
      data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      type: 'column'
    },
    {
      name: "Net",
      data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      type: "scatter",
    },
  ]
};
