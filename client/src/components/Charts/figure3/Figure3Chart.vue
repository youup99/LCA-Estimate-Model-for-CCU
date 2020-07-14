<template>
  <el-card class="box-card" style="height: 670px">
    <div slot="header" class="row">
      <div class="col-md-11">
        <h4>
          <b>Figure 3</b>
        </h4>
      </div>
      <div class="col-md-1">
        <el-tooltip style="float: right" class="item" effect="dark" placement="left-end">
          <div slot="content">
            CCU pathways are compared to the incumbent
            <br />technologies in Figure 3. Avoided Emissions are
            <br />calculated as follows:
            <br />
            <br />Avoided Emissions = [(Net Incumbent per kg of
            <br />product) - (Net CCU per kg of product)]
            <br />
            <br />Thus, if Avoided Emissions result is positive, the CCU
            <br />pathway has lower net emissions than the incumbent
            <br />option.
            <br />
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
    <highcharts :options="options" class="column" ref="chart"></highcharts>
  </el-card>
</template>

<script>
import { mapState } from "vuex";
import { Event } from "@/event-bus";
import Highcharts from "highcharts";
import { thirdChartSettings } from "./figure3";

export default {
  computed: {
    ...mapState("summary", ["Figure3"])
  },
  data() {
    return {
      chart: null,
      options: thirdChartSettings
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
      var filtered = this.Figure3.filter(value => {
        return value.product !== "Syngas" && value.subCategory !== "PEM";
      });
      var avoidedEmission = [];
      filtered.forEach(value => {
        avoidedEmission.push(parseFloat(value.avoidedEmission.toPrecision(3)));
      });
      this.options.series[0].data = avoidedEmission;
    }
  }
};
</script>
