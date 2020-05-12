<template>
  <el-card class="box-card" style="height: 660px">
    <div slot="header" class="row">
      <div class="col-md-11">
        <h4>
          <b>Figure 2</b>
        </h4>
      </div>
      <div class="col-md-1">
        <el-tooltip
          style="float: right"
          class="item"
          effect="dark"
          placement="left-end"
        >
          <div slot="content">
            In Figure 2, the metric of evaluation is kg CO2eq <br />
            emitted per kg of product produced by each pathway.
            <br /><br />

            Comparison across products is not allowed in this <br />
            section, since for example, 1 kg of magnesite is not <br />
            equivalent to 1 kg of diesel or methane.
            <br /><br />

            The last column in the figure is the net emissions of <br />
            the incumbent technology. <br />
            The incumbent technology is one estimate of a <br />
            conventional production method. Competitors were <br />
            not considered.
            <br /><br />

            For consistency, the emission factors defined in the <br />
            General Assumptions section are applied to the <br />
            incumbent fuels. Importantly, even though it is <br />
            possible to change the intensities of inputs for <br />
            incumbents, the incumbent technology estimate does <br />
            not cover the full range of possible technologies that <br />
            CCU pathways will compete against in the future.<br />
          </div>
          <el-button icon="el-icon-info">Chart Info </el-button>
        </el-tooltip>
      </div>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="CWM" name="first"> </el-tab-pane>
      <el-tab-pane label="Calcite" name="second"> </el-tab-pane>
      <el-tab-pane label="Magnesite" name="third"> </el-tab-pane>
      <el-tab-pane label="Methane" name="fourth"> </el-tab-pane>
      <el-tab-pane label="Methanol" name="fifth"> </el-tab-pane>
      <el-tab-pane label="Diesel" name="sixth"> </el-tab-pane>
      <el-tab-pane label="Ethanol" name="seventh"> </el-tab-pane>
    </el-tabs>
    <highcharts :options="options" class="column" ref="chart"> </highcharts>
  </el-card>
</template>

<script>
import Highcharts from "highcharts";
import { secondChartSettings } from "./figure2";

export default {
  data() {
    return {
      chart: null,
      options: secondChartSettings,
      activeName: "first",
    };
  },
  mounted() {
    this.chart = this.$refs.chart;
    this.options.xAxis.categories = [
      {
        name: "CO2 Mineralization",
        categories: ["WMC"],
      },
      {
        name: "Incumbent"
      },
    ];
    this.options.series = [
      {
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
    ];
  },
  methods: {
    handleClick(tab) {
      this.options.title.text = "Emissions per kg of " + tab.label;
      this.options.yAxis.title.text =
        "Emissions (kg CO2eq emitted/kg " + tab.label + ")";
      if (tab.label === "CWM") {
        this.options.xAxis.categories = [
          {
            name: "CO2 Mineralization",
            categories: ["WMC"],
          },
          {
            name: "Incumbent"
          },
        ];
        this.options.series = [
          {
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
        ];
      } else if (tab.label === "Calcite") {
        this.options.xAxis.categories = [
          {
            name: "CO2 Mineralization",
            categories: ["DMC-W"],
          },
          {
            name: "Incumbent"
          },
        ];
        this.options.series = [
          {
            name: "CO2 Converted",
            data: [-0.6, 0],
          },
          {
            name: "Electrolysis",
            data: [0, 0],
          },
          {
            name: "CO2 Conversion Process",
            data: [0.3, 0],
          },
          {
            name: "End Use",
            data: [0, 0],
          },
          {
            name: "CO2 Capture Process",
            data: [0.1, 0],
          },
        ];
      } else if (tab.label === "Magnesite") {
        this.options.xAxis.categories = [
          {
            name: "CO2 Mineralization",
            categories: ["DMC-O"],
          },
          {
            name: "Incumbent"
          },
        ];
        this.options.series = [
          {
            name: "CO2 Converted",
            data: [-0.5, 0],
          },
          {
            name: "Electrolysis",
            data: [0, 0],
          },
          {
            name: "CO2 Conversion Process",
            data: [0.3, 0],
          },
          {
            name: "End Use",
            data: [0, 0],
          },
          {
            name: "CO2 Capture Process",
            data: [0.1, 0],
          },
        ];
      } else if (tab.label === "Methane") {
        this.options.xAxis.categories = [
          {
            name: "CO2 Reduction Involving Electricity",
            categories: ["SOEC-CO", "SOEC-EL"],
          },
          {
            name: "CO2 Reduction by Hydrogen",
            categories: ["D-H2"],
          },
          {
            name: "CO2 Reduction Involving Light",
            categories: ["P.CAT"],
          },
          {
            name: "Incumbent"
          },
        ];
        this.options.series = [
          {
            name: "CO2 Converted",
            data: [-2.5, -2.5, -2.5, -2.5, 0],
          },
          {
            name: "Electrolysis",
            data: [3.0, 10.5, 0, 0, 0],
          },
          {
            name: "CO2 Conversion Process",
            data: [7.2, 1.5, 6.0, 1.0, 0],
          },
          {
            name: "End Use",
            data: [2.75, 2.75, 2.75, 2.75, 0],
          },
          {
            name: "CO2 Capture Process",
            data: [0.5, 0.5, 0.5, 0.5, 0],
          },
        ];
      } else if (tab.label === "Methanol") {
        this.options.xAxis.categories = [
          {
            name: "CO2 Reduction Involving Electricity",
            categories: ["SOEC-CO", "SOEC-EL"],
          },
          {
            name: "CO2 Reduction by Hydrocarbon",
            categories: ["DMR-CO", "DMR-H2"],
          },
          {
            name: "CO2 Reduction by Hydrogen",
            categories: ["D-H2"],
          },
          {
            name: "CO2 Reduction Involving Light",
            categories: ["P.CAT"],
          },
          {
            name: "Incumbent"
          },
        ];
        this.options.series = [
          {
            name: "CO2 Converted",
            data: [-1.3, -1.3, -2.0, -1.0, -1.3, -1.3, 0.0],
          },
          {
            name: "Electrolysis",
            data: [4.2, 3.8, 0, 1.0, 0, 0, 0],
          },
          {
            name: "CO2 Conversion Process",
            data: [0.7, 0.7, 6.0, 3.0, 2.8, 0.75, 0],
          },
          {
            name: "End Use",
            data: [1.3, 1.3, 1.3, 1.3, 1.3, 1.3, 0],
          },
          {
            name: "CO2 Capture Process",
            data: [0.27, 0.27, 0.37, 0.17, 0.26, 0.28, 0],
          },
        ];
      } else if (tab.label === "Diesel") {
        this.options.xAxis.categories = [
          {
            name: "CO2 Reduction Involving Electricity",
            categories: ["SOEC-CO", "SOEC-EL"],
          },
          {
            name: "CO2 Reduction by Hydrogen",
            categories: ["D-H2"],
          },
          {
            name: "CO2 Bioconversion",
            categories: ["P-DE", "P-WE"],
          },
          {
            name: "Incumbent"
          },
        ];
        this.options.series = [
          {
            name: "CO2 Converted",
            data: [-3.1, -3.1, -3.1, -8.1, -3.3, 0],
          },
          {
            name: "Electrolysis",
            data: [1.3, 11.8, 0, 0, 0, 0],
          },
          {
            name: "CO2 Conversion Process",
            data: [9.6, 1.6, 6.2, 4.8, 0.3, 0],
          },
          {
            name: "End Use",
            data: [3.1, 3.1, 3.1, 2.9, 2.9, 0],
          },
          {
            name: "CO2 Capture Process",
            data: [0.63, 0.63, 0.63, 1.46, 0.6, 0],
          },
        ];
      } else if (tab.label === "Ethanol") {
        this.options.xAxis.categories = [
          {
            name: "CO2 Reduction Involving Electricity",
            categories: ["SOEC-CO"],
          },
          {
            name: "Incumbent"
          },
        ];
        this.options.series = [
          {
            name: "CO2 Converted",
            data: [-1.9, 0],
          },
          {
            name: "Electrolysis",
            data: [7.15, 0],
          },
          {
            name: "CO2 Conversion Process",
            data: [0, 0],
          },
          {
            name: "End Use",
            data: [1.9, 0],
          },
          {
            name: "CO2 Capture Process",
            data: [0.32, 0],
          },
        ];
      }
    },
  },
};
</script>
