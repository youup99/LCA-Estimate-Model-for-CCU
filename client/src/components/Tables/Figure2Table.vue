<template>
  <div class="row">
    <div class="col-md-12">
      <el-table :data="summary">
        <el-table-column label="Metric (kg CO2eq/kg product)">
          <el-table-column prop="category" label="Category"></el-table-column>
          <el-table-column prop="subCategory" label="Sub-Category"></el-table-column>
          <el-table-column prop="product" label="Product"></el-table-column>
          <el-table-column prop="co2Converted2" label="CO2 Converted" :formatter="formatter"></el-table-column>
          <el-table-column
            prop="co2CaptureProcess2"
            label="CO2 Capture Process"
            :formatter="formatter"
          ></el-table-column>
          <el-table-column prop="electrolysis2" label="Electrolysis" :formatter="formatter"></el-table-column>
          <el-table-column
            prop="co2ConversionProcess2"
            label="CO2 Conversion Process"
            :formatter="formatter"
          ></el-table-column>
          <el-table-column prop="endUse2" label="End Use" :formatter="formatter"></el-table-column>
          <el-table-column prop="net2" label="Net" :formatter="formatter"></el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Event } from "@/event-bus";

export default {
  computed: {
    ...mapState("pathwayCalc", [
      "mineralization",
      "bioconversion",
      "reductionLight",
      "reductionHydrogen",
      "reductionElectricity",
      "reductionHydrocarbon"
    ])
  },
  mounted() {
    Event.$on("summary", pathway => {
      this.update(pathway);
    });
  },
  data() {
    return {
      summary: [],
      temp: [],
      ready: new Array(6).fill(false)
    };
  },
  methods: {
    update(pathway) {
      if (pathway === "mineralization") {
        this.ready[0] = true;
      } else if (pathway === "reductionElectricity") {
        this.ready[1] = true;
      } else if (pathway === "reductionHydrocarbon") {
        this.ready[2] = true;
      } else if (pathway === "reductionHydrogen") {
        this.ready[3] = true;
      } else if (pathway === "reductionLight") {
        this.ready[4] = true;
      } else if (pathway === "bioconversion") {
        this.ready[5] = true;
      }

      // Calculate when all the pathways are ready
      if (!this.ready.includes(false)) {
        this.getMineralization();
        this.getReductionElectricity();
        this.getReductionHydrocarbon();
        this.getReductionHydrogen();
        this.getReductionLight();
        this.getBioconversion();

        this.$store.dispatch("summary/updateFigure2", this.temp).then(() => {
          Event.$emit("ready");
        });
        this.ready = this.ready.fill(false);
        this.summary = this.temp;
        this.temp = [];
      }
    },
    formatter(row, column, cellValue, index) {
      if (cellValue) {
        return parseFloat(cellValue).toPrecision(3);
      }
    },
    getMineralization() {
      var _mineralization = this.mineralization.summary;
      _mineralization.forEach(value => {
        var subset = (({
          category,
          subCategory,
          product,
          co2Converted2,
          co2CaptureProcess2,
          electrolysis2,
          co2ConversionProcess2,
          endUse2,
          net2
        }) => ({
          category,
          subCategory,
          product,
          co2Converted2,
          co2CaptureProcess2,
          electrolysis2,
          co2ConversionProcess2,
          endUse2,
          net2
        }))(value);
        this.temp.push(subset);
      });
    },
    getReductionElectricity() {
      var _reductionElectricity = this.reductionElectricity.summary;
      _reductionElectricity.forEach(value => {
        var subset = (({
          category,
          subCategory,
          product,
          co2Converted2,
          co2CaptureProcess2,
          electrolysis2,
          co2ConversionProcess2,
          endUse2,
          net2
        }) => ({
          category,
          subCategory,
          product,
          co2Converted2,
          co2CaptureProcess2,
          electrolysis2,
          co2ConversionProcess2,
          endUse2,
          net2
        }))(value);
        this.temp.push(subset);
      });
    },
    getReductionHydrocarbon() {
      var _reductionHydrocarbon = this.reductionHydrocarbon.summary;
      _reductionHydrocarbon.forEach(value => {
        var subset = (({
          category,
          subCategory,
          product,
          co2Converted2,
          co2CaptureProcess2,
          electrolysis2,
          co2ConversionProcess2,
          endUse2,
          net2
        }) => ({
          category,
          subCategory,
          product,
          co2Converted2,
          co2CaptureProcess2,
          electrolysis2,
          co2ConversionProcess2,
          endUse2,
          net2
        }))(value);
        this.temp.push(subset);
      });
    },
    getReductionHydrogen() {
      var _reductionHydrogen = this.reductionHydrogen.summary;
      _reductionHydrogen.forEach(value => {
        var subset = (({
          category,
          subCategory,
          product,
          co2Converted2,
          co2CaptureProcess2,
          electrolysis2,
          co2ConversionProcess2,
          endUse2,
          net2
        }) => ({
          category,
          subCategory,
          product,
          co2Converted2,
          co2CaptureProcess2,
          electrolysis2,
          co2ConversionProcess2,
          endUse2,
          net2
        }))(value);
        this.temp.push(subset);
      });
    },
    getReductionLight() {
      var _reductionLight = this.reductionLight.summary;
      _reductionLight.forEach(value => {
        var subset = (({
          category,
          subCategory,
          product,
          co2Converted2,
          co2CaptureProcess2,
          electrolysis2,
          co2ConversionProcess2,
          endUse2,
          net2
        }) => ({
          category,
          subCategory,
          product,
          co2Converted2,
          co2CaptureProcess2,
          electrolysis2,
          co2ConversionProcess2,
          endUse2,
          net2
        }))(value);
        this.temp.push(subset);
      });
    },
    getBioconversion() {
      var _bioconversion = this.bioconversion.summary;
      _bioconversion.forEach(value => {
        var subset = (({
          category,
          subCategory,
          product,
          co2Converted2,
          co2CaptureProcess2,
          electrolysis2,
          co2ConversionProcess2,
          endUse2,
          net2
        }) => ({
          category,
          subCategory,
          product,
          co2Converted2,
          co2CaptureProcess2,
          electrolysis2,
          co2ConversionProcess2,
          endUse2,
          net2
        }))(value);
        this.temp.push(subset);
      });
    }
  }
};
</script>
