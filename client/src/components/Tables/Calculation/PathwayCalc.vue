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
        <hydrocarbon-calc></hydrocarbon-calc
      ></el-tab-pane>
      <el-tab-pane label="Incumbents" name="seventh">
        <incumbents-calc></incumbents-calc>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>
<script>
import IncumbentsCalc from "./IncumbentsCalc.vue";
import MineralizationCalc from "./MineralizationCalc.vue";
import BioconversionCalc from "./BioconversionCalc.vue";
import LightCalc from "./LightCalc.vue";
import HydrogenCalc from "./HydrogenCalc.vue";
import ElectricityCalc from "./ElectricityCalc.vue";
import HydrocarbonCalc from "./HydrocarbonCalc.vue";
import ActiveTable from "../ActiveTable";

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
  },
  data() {
    return {
      activeName: "first",
      activeLabel: "CO2 Mineralization",
    };
  },
  methods: {
    handleClick(tab, event) {
      this.activeLabel = tab.label;
    },
  },
};
</script>
