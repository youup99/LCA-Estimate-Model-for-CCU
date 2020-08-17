<template>
  <el-card class="box-card" style="height: 660px">
    <div slot="header" class="row">
      <div class="col-md-11">
        <h4>
          <b>Figure 2</b>
        </h4>
      </div>
      <div class="col-md-1">
        <el-tooltip style="float: right" class="item" effect="dark" placement="left-end">
          <div slot="content">
            In Figure 2, the metric of evaluation is kg CO2eq
            <br />emitted per kg of product produced by each pathway.
            <br />
            <br />Comparison across products is not allowed in this
            <br />section, since for example, 1 kg of magnesite is not
            <br />equivalent to 1 kg of diesel or methane.
            <br />
            <br />The last column in the figure is the net emissions of
            <br />the incumbent technology.
            <br />The incumbent technology is one estimate of a
            <br />conventional production method. Competitors were
            <br />not considered.
            <br />
            <br />For consistency, the emission factors defined in the
            <br />General Assumptions section are applied to the
            <br />incumbent fuels. Importantly, even though it is
            <br />possible to change the intensities of inputs for
            <br />incumbents, the incumbent technology estimate does
            <br />not cover the full range of possible technologies that
            <br />CCU pathways will compete against in the future.
            <br />
          </div>
          <el-button icon="el-icon-info">Chart Info</el-button>
        </el-tooltip>
      </div>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="CWM" name="first"></el-tab-pane>
      <el-tab-pane label="Calcite" name="second"></el-tab-pane>
      <el-tab-pane label="Magnesite" name="third"></el-tab-pane>
      <el-tab-pane label="Methane" name="fourth"></el-tab-pane>
      <el-tab-pane label="Methanol" name="fifth"></el-tab-pane>
      <el-tab-pane label="Diesel" name="sixth"></el-tab-pane>
      <el-tab-pane label="Ethanol" name="seventh"></el-tab-pane>
    </el-tabs>
    <highcharts :options="options" class="column" ref="chart"></highcharts>
  </el-card>
</template>

<script>
import { mapState } from "vuex";
import { Event } from "@/event-bus";
import Highcharts from "highcharts";
import { secondChartSettings } from "./figure2";

export default {
  computed: {
    ...mapState("summary", ["Figure2"])
  },
  data() {
    return {
      chart: null,
      options: secondChartSettings,
      activeName: "first",
      activeLabel: "CWM",
      chartData: []
    };
  },
  mounted() {
    this.chart = this.$refs.chart;
    Event.$on("ready", () => {
      this.calculateData();
    });
  },
  methods: {
    calculateData() {
      var filtered = this.Figure2.filter(value => {
        return value.product !== "Syngas" && value.subCategory !== "PEM";
      });
      this.chartData["CWM"] = {
        co2Converted: [],
        endUse: [],
        co2ConversionProcess: [],
        hydrogen: [],
        co2CaptureProcess: [],
        net: []
      };
      this.chartData["Calcite"] = {
        co2Converted: [],
        endUse: [],
        co2ConversionProcess: [],
        hydrogen: [],
        co2CaptureProcess: [],
        net: []
      };
      this.chartData["Magnesite"] = {
        co2Converted: [],
        endUse: [],
        co2ConversionProcess: [],
        hydrogen: [],
        co2CaptureProcess: [],
        net: []
      };
      this.chartData["Methane"] = {
        co2Converted: [],
        endUse: [],
        co2ConversionProcess: [],
        hydrogen: [],
        co2CaptureProcess: [],
        net: []
      };
      this.chartData["Methanol"] = {
        co2Converted: [],
        endUse: [],
        co2ConversionProcess: [],
        hydrogen: [],
        co2CaptureProcess: [],
        net: []
      };
      this.chartData["Diesel"] = {
        co2Converted: [],
        endUse: [],
        co2ConversionProcess: [],
        hydrogen: [],
        co2CaptureProcess: [],
        net: []
      };
      this.chartData["Ethanol"] = {
        co2Converted: [],
        endUse: [],
        co2ConversionProcess: [],
        hydrogen: [],
        co2CaptureProcess: [],
        net: []
      };
      filtered.forEach(value => {
        this.chartData[value.product].co2Converted.push(
          value.co2Converted2 == undefined
            ? 0
            : parseFloat(value.co2Converted2.toPrecision(3))
        );
        this.chartData[value.product].endUse.push(
          value.endUse2 == undefined
            ? 0
            : parseFloat(value.endUse2.toPrecision(3))
        );
        this.chartData[value.product].co2ConversionProcess.push(
          value.co2ConversionProcess2 == undefined
            ? 0
            : parseFloat(value.co2ConversionProcess2.toPrecision(3))
        );
        this.chartData[value.product].hydrogen.push(
          value.electrolysis2 == undefined
            ? 0
            : parseFloat(value.electrolysis2.toPrecision(3))
        );
        this.chartData[value.product].co2CaptureProcess.push(
          value.co2CaptureProcess2 == undefined
            ? 0
            : parseFloat(value.co2CaptureProcess2.toPrecision(3))
        );
        this.chartData[value.product].net.push(
          parseFloat(value.net2.toPrecision(3))
        );
      });
      this.options.series[0].data = this.chartData[
        this.activeLabel
      ].co2Converted;
      this.options.series[1].data = this.chartData[this.activeLabel].endUse;
      this.options.series[2].data = this.chartData[
        this.activeLabel
      ].co2ConversionProcess;
      this.options.series[3].data = this.chartData[this.activeLabel].hydrogen;
      this.options.series[4].data = this.chartData[
        this.activeLabel
      ].co2CaptureProcess;
      this.options.series[5].data = this.chartData[this.activeLabel].net;
    },
    handleClick(tab) {
      this.activeLabel = tab.label;
      this.options.title.text = "Emissions per kg of " + tab.label;
      this.options.yAxis.title.text =
        "Emissions (kg CO₂eq emitted/kg " + tab.label + ")";
      this.options.series[0].data = this.chartData[
        this.activeLabel
      ].co2Converted;
      this.options.series[1].data = this.chartData[this.activeLabel].endUse;
      this.options.series[2].data = this.chartData[
        this.activeLabel
      ].co2ConversionProcess;
      this.options.series[3].data = this.chartData[this.activeLabel].hydrogen;
      this.options.series[4].data = this.chartData[
        this.activeLabel
      ].co2CaptureProcess;
      this.options.series[5].data = this.chartData[this.activeLabel].net;
      if (tab.label === "CWM") {
        this.options.xAxis.categories = [
          {
            name: "CO₂ Mineralization",
            categories: ["WMC"]
          },
          {
            name: "Incumbent"
          }
        ];
      } else if (tab.label === "Calcite") {
        this.options.xAxis.categories = [
          {
            name: "CO₂ Mineralization",
            categories: ["DMC-W"]
          },
          {
            name: "Incumbent"
          }
        ];
      } else if (tab.label === "Magnesite") {
        this.options.xAxis.categories = [
          {
            name: "CO₂ Mineralization",
            categories: ["DMC-O"]
          },
          {
            name: "Incumbent"
          }
        ];
      } else if (tab.label === "Methane") {
        this.options.xAxis.categories = [
          {
            name: "CO₂ Reduction Involving Electricity",
            categories: ["SOEC-CO", "SOEC-EL"]
          },
          {
            name: "CO₂ Reduction by Hydrogen",
            categories: ["D-H2"]
          },
          {
            name: "CO₂ Reduction Involving Light",
            categories: ["P.CAT"]
          },
          {
            name: "Incumbent"
          }
        ];
      } else if (tab.label === "Methanol") {
        this.options.xAxis.categories = [
          {
            name: "CO₂ Reduction Involving Electricity",
            categories: ["SOEC-CO", "SOEC-EL"]
          },
          {
            name: "CO₂ Reduction by Hydrocarbon",
            categories: ["DMR-CO", "DMR-H2"]
          },
          {
            name: "CO₂ Reduction by Hydrogen",
            categories: ["D-H2"]
          },
          {
            name: "CO₂ Reduction Involving Light",
            categories: ["P.CAT"]
          },
          {
            name: "Pathway Test",
            categories: ["DMR-CO", "DMR-H2"]
          },
          {
            name: "Incumbent"
          }
        ];
      } else if (tab.label === "Diesel") {
        this.options.xAxis.categories = [
          {
            name: "CO₂ Reduction Involving Electricity",
            categories: ["SOEC-CO", "SOEC-EL"]
          },
          {
            name: "CO₂ Reduction by Hydrogen",
            categories: ["D-H2"]
          },
          {
            name: "CO₂ Bioconversion",
            categories: ["P-DE", "P-WE"]
          },
          {
            name: "Incumbent"
          }
        ];
      } else if (tab.label === "Ethanol") {
        this.options.xAxis.categories = [
          {
            name: "CO₂ Reduction Involving Electricity",
            categories: ["SOEC-CO"]
          },
          {
            name: "Incumbent"
          }
        ];
      }
    }
  }
};
</script>
