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
        >Reset Pathway</el-button>
      </div>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="CO2 Mineralization" name="mineralization">
        <mineralization-form ref="mineralization"></mineralization-form>
      </el-tab-pane>
      <el-tab-pane label="CO2 Bioconversion" name="bioconversion">
        <bioconversion-form ref="bioconversion"></bioconversion-form>
      </el-tab-pane>
      <el-tab-pane label="CO2 Reduction Involving Electricity" name="reductionElectricity">
        <reduction-electricity-form ref="reductionElectricity"></reduction-electricity-form>
      </el-tab-pane>
      <el-tab-pane label="CO2 Reduction by Hydrocarbon" name="reductionHydrocarbon">
        <reduction-hydrocarbon-form ref="reductionHydrocarbon"></reduction-hydrocarbon-form>
      </el-tab-pane>
      <el-tab-pane label="CO2 Reduction Involving Light" name="reductionLight">
        <reduction-light-form ref="reductionLight"></reduction-light-form>
      </el-tab-pane>
      <el-tab-pane label="CO2 Reduction by Hydrogen" name="reductionHydrogen">
        <reduction-hydrogen-form ref="reductionHydrogen"></reduction-hydrogen-form>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>
<script>
import MineralizationForm from "@/components/Forms/MineralizationForm.vue";
import BioconversionForm from "@/components/Forms/BioconversionForm.vue";
import ReductionElectricityForm from "@/components/Forms/ReductionElectricityForm.vue";
import ReductionHydrocarbonForm from "@/components/Forms/ReductionHydrocarbonForm.vue";
import ReductionLightForm from "@/components/Forms/ReductionLightForm.vue";
import ReductionHydrogenForm from "@/components/Forms/ReductionHydrogenForm.vue";

export default {
  components: {
    MineralizationForm,
    BioconversionForm,
    ReductionElectricityForm,
    ReductionHydrocarbonForm,
    ReductionLightForm,
    ReductionHydrogenForm
  },
  data() {
    return {
      activeName: "mineralization",
      activeLabel: "CO2 Mineralization"
    };
  },
  methods: {
    handleClick(tab, event) {
      this.activeLabel = tab.label;
    },
    resetForm() {
      this.$refs[this.activeName].reset();
    }
  }
};
</script>
