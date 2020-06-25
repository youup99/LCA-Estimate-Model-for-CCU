<template>
  <el-table :data="active">
    <el-table-column label="Electricity Intensity">
      <el-table-column prop="electricityName" label="Name"></el-table-column>
      <el-table-column prop="electricityValue" label="Value"></el-table-column>
      <el-table-column prop="electricityUnit" label="Unit"></el-table-column>
    </el-table-column>
    <el-table-column label="Heat Intensity">
      <el-table-column prop="heatName" label="Name"></el-table-column>
      <el-table-column prop="heatValue" label="Value"></el-table-column>
      <el-table-column prop="heatUnit" label="Unit"></el-table-column>
    </el-table-column>
    <el-table-column label="Steam Intensity">
      <el-table-column prop="steamName" label="Name"></el-table-column>
      <el-table-column prop="steamValue" label="Value"></el-table-column>
      <el-table-column prop="steamUnit" label="Unit"></el-table-column>
    </el-table-column>
    <el-table-column label="Hydrogen Intensity">
      <el-table-column prop="hydrogenName" label="Name"></el-table-column>
      <el-table-column prop="hydrogenValue" label="Value"></el-table-column>
      <el-table-column prop="hydrogenUnit" label="Unit"></el-table-column>
    </el-table-column>
    <el-table-column label="CO2 Capture Process">
      <el-table-column prop="co2Name" label="Name"></el-table-column>
      <el-table-column prop="co2Value" label="Value"></el-table-column>
      <el-table-column prop="co2Unit" label="Unit"></el-table-column>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapState } from "vuex";
import { Event } from "@/event-bus";

export default {
  computed: {
    ...mapState("generalAssumptions", [
      "defaultEmission",
      "customEmission",
      "showAdditional"
    ]),
    ...mapState("constants", [
      "emissionFactors",
      "energyUnitConversions",
      "constants",
      "processCorrelations"
    ]),
    electricity: function() {
      if (this.customEmission.electricity.use == true) {
        return this.customEmission.electricity.value;
      }
      return this.defaultEmission.electricity[
        this.defaultEmission.electricity.active
      ];
    },
    co2: function() {
      if (this.customEmission.co2.use == true) {
        return this.customEmission.co2.value;
      }
      return this.defaultEmission.co2[this.defaultEmission.co2.active];
    },
    heat: function() {
      if (this.customEmission.heat.use == true) {
        return this.customEmission.heat.value;
      }
      return this.defaultEmission.heat[this.defaultEmission.heat.active];
    },
    steam: function() {
      if (this.customEmission.steam.use == true) {
        return this.customEmission.steam.value;
      }
      return this.defaultEmission.steam[this.defaultEmission.steam.active];
    },
    hydrogen: function() {
      if (this.customEmission.hydrogen.use == true) {
        return this.customEmission.hydrogen.value;
      }
      return this.defaultEmission.hydrogen[
        this.defaultEmission.hydrogen.active
      ];
    }
  },
  mounted() {
    this.active = this.getActive();
    Event.$on("calculate", () => {
      this.active = this.getActive();
    });
  },
  data() {
    return {
      active: []
    };
  },
  methods: {
    getActive() {
      var data = {
        electricityName: this.defaultEmission.electricity.active,
        electricityValue: this.electricity,
        electricityUnit: "kg CO2eq/kWh",
        heatName: this.defaultEmission.heat.active,
        heatValue: this.heat,
        heatUnit: "kg CO2eq/kWh",
        steamName: this.defaultEmission.steam.active,
        steamValue: this.steam,
        steamUnit: "kg CO2eq/MJ",
        hydrogenName: this.defaultEmission.hydrogen.active,
        hydrogenValue: this.hydrogen,
        hydrogenUnit: "kg CO2eq/kg Hydrogen",
        co2Name: this.defaultEmission.co2.active,
        co2Value: this.co2,
        co2Unit: "kg CO2eq/kg CO2 captured"
      };
      return [data];
    }
  }
};
</script>
