<template>
  <el-card class="box-card" style="height: 660px; overflow: auto">
    <div slot="header" class="row">
      <div class="col-md-11">
        <h4>
          <b>Pathway: {{ activeLabel }}</b>
        </h4>
      </div>
      <div class="col-md-1">
        <el-button
          style="float: right"
          type="primary"
          icon="el-icon-refresh-right"
          @click="resetForm"
          >Reset</el-button
        >
      </div>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="CO2 Mineralization" name="first">
        <mineralization-form></mineralization-form>
      </el-tab-pane>
      <el-tab-pane label="CO2 Bioconversion" name="second">
        <bioconversion-form></bioconversion-form>
      </el-tab-pane>
      <el-tab-pane label="CO2 Reduction Involving Electricity" name="third">
        <reduction-electricity-form></reduction-electricity-form
      ></el-tab-pane>
      <el-tab-pane label="CO2 Reduction by Hydrocarbon" name="fourth">
        <reduction-hydrocarbon-form></reduction-hydrocarbon-form
      ></el-tab-pane>
      <el-tab-pane label="CO2 Reduction Involving Light" name="fifth">
        <reduction-light-form></reduction-light-form
      ></el-tab-pane>
      <el-tab-pane label="CO2 Reduction by Hydrogen" name="sixth">
        <reduction-hydrogen-form></reduction-hydrogen-form
      ></el-tab-pane>
    </el-tabs>
  </el-card>
</template>
<script>
import MineralizationForm from "./Pathways/MineralizationForm.vue";
import BioconversionForm from "./Pathways/BioconversionForm.vue";
import ReductionElectricityForm from "./Pathways/ReductionElectricityForm.vue";
import ReductionHydrocarbonForm from "./Pathways/ReductionHydrocarbonForm.vue";
import ReductionLightForm from "./Pathways/ReductionLightForm.vue";
import ReductionHydrogenForm from "./Pathways/ReductionHydrogenForm.vue";

export default {
  components: {
    MineralizationForm,
    BioconversionForm,
    ReductionElectricityForm,
    ReductionHydrocarbonForm,
    ReductionLightForm,
    ReductionHydrogenForm,
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
    resetForm() {
      // this.$refs.form.resetFields();
    },
  },
};
</script>
