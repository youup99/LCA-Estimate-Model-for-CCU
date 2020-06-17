<template>
  <div class="row">
    <div class="col-md-12">
      <el-table :data="summary">
        <el-table-column label="Metric (kg CO2eq/kg CO2 converted)">
          <el-table-column prop="category" label="Category"></el-table-column>
          <el-table-column prop="subCategory" label="Sub-Category"></el-table-column>
          <el-table-column prop="product" label="Product"></el-table-column>
          <el-table-column prop="co2Converted" label="CO2 Converted" :formatter="formatter"></el-table-column>
          <el-table-column
            prop="co2CaptureProcess"
            label="CO2 Capture Process"
            :formatter="formatter"
          ></el-table-column>
          <el-table-column prop="electrolysis" label="Electrolysis" :formatter="formatter"></el-table-column>
          <el-table-column
            prop="co2ConversionProcess"
            label="CO2 Conversion Process"
            :formatter="formatter"
          ></el-table-column>
          <el-table-column prop="endUse" label="End Use" :formatter="formatter"></el-table-column>
          <el-table-column prop="net" label="Net" :formatter="formatter"></el-table-column>
          <el-table-column prop="lit1" label="Lit1" :formatter="formatter"></el-table-column>
          <el-table-column prop="lit2" label="Lit2" :formatter="formatter"></el-table-column>
          <el-table-column prop="lit3" label="Lit3" :formatter="formatter"></el-table-column>
          <el-table-column prop="lit4" label="Lit4" :formatter="formatter"></el-table-column>
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

        this.$store.dispatch("summary/updateFigure1", this.temp).then(() => {
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
          co2Converted,
          co2CaptureProcess,
          electrolysis,
          co2ConversionProcess,
          endUse,
          net,
          lit1,
          lit2,
          lit3,
          lit4
        }) => ({
          category,
          subCategory,
          product,
          co2Converted,
          co2CaptureProcess,
          electrolysis,
          co2ConversionProcess,
          endUse,
          net,
          lit1,
          lit2,
          lit3,
          lit4
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
          co2Converted,
          co2CaptureProcess,
          electrolysis,
          co2ConversionProcess,
          endUse,
          net,
          lit1,
          lit2,
          lit3,
          lit4
        }) => ({
          category,
          subCategory,
          product,
          co2Converted,
          co2CaptureProcess,
          electrolysis,
          co2ConversionProcess,
          endUse,
          net,
          lit1,
          lit2,
          lit3,
          lit4
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
          co2Converted,
          co2CaptureProcess,
          electrolysis,
          co2ConversionProcess,
          endUse,
          net,
          lit1,
          lit2,
          lit3,
          lit4
        }) => ({
          category,
          subCategory,
          product,
          co2Converted,
          co2CaptureProcess,
          electrolysis,
          co2ConversionProcess,
          endUse,
          net,
          lit1,
          lit2,
          lit3,
          lit4
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
          co2Converted,
          co2CaptureProcess,
          electrolysis,
          co2ConversionProcess,
          endUse,
          net,
          lit1,
          lit2,
          lit3,
          lit4
        }) => ({
          category,
          subCategory,
          product,
          co2Converted,
          co2CaptureProcess,
          electrolysis,
          co2ConversionProcess,
          endUse,
          net,
          lit1,
          lit2,
          lit3,
          lit4
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
          co2Converted,
          co2CaptureProcess,
          electrolysis,
          co2ConversionProcess,
          endUse,
          net,
          lit1,
          lit2,
          lit3,
          lit4
        }) => ({
          category,
          subCategory,
          product,
          co2Converted,
          co2CaptureProcess,
          electrolysis,
          co2ConversionProcess,
          endUse,
          net,
          lit1,
          lit2,
          lit3,
          lit4
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
          co2Converted,
          co2CaptureProcess,
          electrolysis,
          co2ConversionProcess,
          endUse,
          net,
          lit1,
          lit2,
          lit3,
          lit4
        }) => ({
          category,
          subCategory,
          product,
          co2Converted,
          co2CaptureProcess,
          electrolysis,
          co2ConversionProcess,
          endUse,
          net,
          lit1,
          lit2,
          lit3,
          lit4
        }))(value);
        this.temp.push(subset);
      });
    }
  }
};
</script>
