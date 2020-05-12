<template>
  <el-card class="box-card" style="height: 610px">
    <div slot="header" class="row">
      <div class="col-md-11">
        <h4><b>Figure 1</b></h4>
      </div>
      <div class="col-md-1">
        <el-tooltip
          style="float: right"
          class="item"
          effect="dark"
          placement="left-end"
        >
          <div slot="content">
            The metric of evaluation presented in Figure 1 is kg<br />
            CO2eq emitted per kgCO2 converted.<br /><br />

            This metric is useful to compare different CCU<br />
            pathways and/or products in terms of CO2 utilization.<br />
            However, other metrics of comparison are needed<br />
            such as per kg of product (see Figure 2).<br /><br />

            Using default settings, all emission factors of all<br />
            pathways are assumed to be the same and are set on<br />
            the left-hand side of the Main Input & Output tab.<br />
            However, the intensity can be changed in the top<br />
            panel (General Assumptions), and individual pathways<br />
            can be changed below that section.<br /><br />

            The legend entries are related to each life cycle phase:<br /><br />
            - CO2 Converted: CO2 that is converted in each<br />
            pathway. This value is held constant at -1 in Figure 1.<br />
            - CO2 Capture Process: emissions associated with<br />
            capturing the CO2 necessary for each pathway.<br />
            - Electrolysis: emissions of the electrolysis process for<br />
            hydrogen production in the CO2 Reduction Involving<br />
            Electricity pathway.<br />
            - CO2 Conversion Process: emissions associated with<br />
            the CO2 conversion step.<br />
            - End Use: emissions related to the use phase of each<br />
            end product.<br />
            - Net: net emissions of each pathway - summation of<br />
            the emissions of all life cycle phases.<br />
          </div>
          <el-button icon="el-icon-info">Chart Info </el-button>
        </el-tooltip>
      </div>
    </div>
    <highcharts :options="options" class="column" ref="chart"> </highcharts>
  </el-card>
</template>

<script>
import Highcharts from "highcharts";
import { firstChartSettings } from "./figure1";

export default {
  data() {
    return {
      chart: null,
      options: firstChartSettings,
    };
  },
  mounted() {
    this.chart = this.$refs.chart;
  }
};
</script>