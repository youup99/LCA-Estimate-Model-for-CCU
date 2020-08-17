<template>
  <el-card class="box-card">
    <active-table></active-table>
    <br />
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="CO2 Mineralization" name="first">
        <mineralization-calc></mineralization-calc>
      </el-tab-pane>
      <el-tab-pane label="CO2 Bioconversion" name="second">
        <bioconversion-calc></bioconversion-calc>
      </el-tab-pane>
      <el-tab-pane label="CO2 Reduction Involving Light" name="third">
        <light-calc></light-calc>
      </el-tab-pane>
      <el-tab-pane label="CO2 Reduction by Hydrogen" name="fourth">
        <hydrogen-calc></hydrogen-calc>
      </el-tab-pane>
      <el-tab-pane label="CO2 Reduction Involving Electricity" name="fifth">
        <electricity-calc></electricity-calc>
      </el-tab-pane>
      <el-tab-pane label="CO2 Reduction by Hydrocarbon" name="sixth">
        <hydrocarbon-calc></hydrocarbon-calc>
      </el-tab-pane>
      <el-tab-pane label="Pathway Test" name="seventh">
        <pathway-test-calc></pathway-test-calc>
      </el-tab-pane>
      <el-tab-pane label="Incumbents" name="eight">
        <incumbents-calc></incumbents-calc>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>
<script>
import IncumbentsCalc from "@/components/Calculation/IncumbentsCalc.vue";
import MineralizationCalc from "@/components/Calculation/MineralizationCalc.vue";
import BioconversionCalc from "@/components/Calculation/BioconversionCalc.vue";
import LightCalc from "@/components/Calculation/LightCalc.vue";
import HydrogenCalc from "@/components/Calculation/HydrogenCalc.vue";
import ElectricityCalc from "@/components/Calculation/ElectricityCalc.vue";
import HydrocarbonCalc from "@/components/Calculation/HydrocarbonCalc.vue";
import ActiveTable from "@/components/Tables/ActiveTable";
import PathwayTestCalc from "@/components/Calculation/PathwayTestCalc.vue";

import { Event } from "@/event-bus";
import { mapState } from "vuex";
import { exportCalculation } from "@/excel/excelExport";

export default {
  components: {
    ActiveTable,
    IncumbentsCalc,
    MineralizationCalc,
    BioconversionCalc,
    LightCalc,
    HydrogenCalc,
    ElectricityCalc,
    HydrocarbonCalc,
    PathwayTestCalc
  },
  computed: {
    ...mapState("pathwayCalc", [
      "bioconversion",
      "mineralization",
      "reductionElectricity",
      "reductionHydrocarbon",
      "reductionHydrogen",
      "reductionLight",
      "pathwayTest"
    ])
  },
  mounted() {
    Event.$on("export", () => {
      exportCalculation(this);
    });
  },
  data() {
    return {
      activeName: "first",
      activeLabel: "CO2 Mineralization"
    };
  },
  methods: {
    handleClick(tab, event) {
      this.activeLabel = tab.label;
    }
  }
};
</script>
