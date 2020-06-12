<template>
  <el-card class="box-card" style="height: 670px">
    <div slot="header" class="row">
      <div class="col-md-11">
        <h4>
          <b>Figure 4</b>
        </h4>
      </div>
      <div class="col-md-1">
        <el-tooltip style="float: right" class="item" effect="dark" placement="left-end">
          <div slot="content">
            The Global Emission Reduction Potential is an
            <br />estimate of the amount of avoided emissions of a
            <br />pathway multiplied by the potential market size of
            <br />the pathway, as follows:
            <br />
            <br />Global Emissions Reduction Potential = [Avoided
            <br />Emissions per kg product] x [Market Size]
            <br />
            <br />Pathways that do not result in reduction in emissions,
            <br />are listed as zero.
            <br />
            <br />The Market Size values used were based on 2015
            <br />markets. A market penetration rate of 50% was
            <br />assumed.
            <br />
            <br />This is an extremely rough estimate of the potential
            <br />impact of the pathway in a global scale. Future work
            <br />will employ more sophisticated modelling to estimate
            <br />market size.
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
import { fourthChartSettings } from "./figure4";

export default {
  computed: {
    ...mapState("summary", ["Figure4"])
  },
  data() {
    return {
      chart: null,
      options: fourthChartSettings
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
      var filtered = this.Figure4.filter(value => {
        return value.product !== "Syngas" && value.subCategory !== "PEM";
      });
      var globalReductionPotential = [];
      filtered.forEach(value => {
        globalReductionPotential.push(parseFloat(value.globalReductionPotential.toPrecision(3)));
      });
      this.options.series[0].data = globalReductionPotential;
    }
  }
};
</script>
