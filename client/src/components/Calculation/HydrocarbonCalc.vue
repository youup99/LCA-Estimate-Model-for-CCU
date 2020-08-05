<template>
  <div>
    <el-tabs v-model="activeTabName" @tab-click="handleClick" type="card">
      <el-tab-pane v-for="item in items" :key="item.name" :label="item.label" :name="item.name">
        <div class="row">
          <div class="col-md-12">
            <span>
              <b>Sub-Pathway: {{ item.title }}</b>
            </span>
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col-md-12">
            <span>
              <b>Product: {{ item.product }}</b>
            </span>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Summary" name="third">
        <div class="row">
          <div class="col-md-12">
            <span>
              <b>Summary</b>
            </span>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <br />
    <calculation-table
      v-bind:activeTabName="activeTabName"
      v-bind:activeTabLabel="activeTabLabel"
      v-bind:subPathways="subPathways"
      v-bind:summary="summary"
    ></calculation-table>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { Event } from "@/event-bus";
import CalculationTable from "@/components/Tables/CalculationTable.vue";
import { hydrocarbonItems } from "./items";

export default {
  components: {
    CalculationTable
  },
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
    ...mapState("pathways", ["reductionHydrocarbon"]),
    ...mapState("incumbents", ["Diesel", "Ethanol", "Methane", "Methanol"]),
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
    },
    methane: function() {
      return this.energyUnitConversions.LHV.methane;
    },
    methanol: function() {
      return this.energyUnitConversions.LHV.methanol;
    },
    naturalGas: function() {
      return this.energyUnitConversions.LHV.naturalGas;
    }
  },
  mounted() {
    Event.$on("incumbentReady", () => {
      this.calculate();
    });
  },
  data() {
    return {
      activeTabName: "first",
      activeTabLabel: "DMR-CO - Methanol",
      items: hydrocarbonItems,
      subPathways: [],
      summary: []
    };
  },
  methods: {
    calculate() {
      this.subPathways = [];
      this.subPathways.push(
        {
          name: "DMR-CO - Methanol",
          value: this.getMethanol()
        },
        {
          name: "DMR-H2 - Methanol",
          value: this.getMethanol1()
        }
      );
      this.summary = this.getSummary();
      this.$store
        .dispatch("pathwayCalc/updateReductionHydrocarbon", {
          subPathways: this.subPathways,
          summary: this.summary
        })
        .then(() => {
          Event.$emit("summary", "reductionHydrocarbon");
        });
    },
    handleClick(tab, event) {
      this.activeTabLabel = tab.label;
      this.$emit("tabChange", this.activeTabName, this.activeTabLabel);
    },
    getMethanol() {
      // DMR-CO - Methanol - CO2 Converted
      var referenceAmount = 2.05757097791798;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var emission = -activeAmount;
      var converted = -emission / emission;
      var converted2 = emission / this.methanol;
      var data0 = {
        item: "CO2 Converted",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2/kg Methanol ",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2/kg Methanol",
        activeAmount: activeAmount,
        activeUnit: "kg CO2/kg Methanol",
        emission: emission,
        converted: converted,
        converted2: converted2
      };

      // DMR-CO - Methanol - CO2 Unconverted
      var referenceAmount = 0.0394321766561514;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var data1 = {
        item: "CO2 Unconverted",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2/kg Methanol",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2/kg Methanol",
        activeAmount: activeAmount,
        activeUnit: "kg CO2/kg Methanol"
      };

      // DMR-CO - Methanol - CO2 Capture Process
      var referenceAmount = this.co2;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var emission = activeAmount * (data0.activeAmount + data1.activeAmount);
      var converted = -emission / data0.emission;
      var converted2 = emission / this.methanol;
      var data2 = {
        item: "CO2 Capture & Process",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2/kg CO2 captured",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2/kg CO2 captured",
        activeAmount: activeAmount,
        activeUnit: "kg CO2/kg CO2 captured",
        emission: emission,
        converted: converted,
        converted2: converted2
      };

      // DMR-CO - Methanol - Methane Input
      var referenceAmount = 0.731072555205047;
      var intermediateAmount = referenceAmount;
      var activeAmount = this.reductionHydrocarbon.DMRCO.methanol.methane;
      var emission =
        activeAmount * this.emissionFactors.upstreamEmissions.methane.mass;
      var data3 = {
        item: "Methane Input",
        referenceAmount: referenceAmount,
        referenceUnit: "kg H₂/kg Methanol",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg H₂/kg Methanol",
        activeAmount: activeAmount,
        activeUnit: "kg H₂/kg Methanol",
        emission: emission
      };

      // DMR-CO - Methanol - CO Emitted
      var referenceAmount = 1.38643533123028;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var emission = activeAmount * this.emissionFactors.fuelCycleEmissions.co;
      var data4 = {
        item: "CO Emitted",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO/kg Methanol",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO/kg Methanol",
        activeAmount: activeAmount,
        activeUnit: "kg CO/kg Methanol",
        emission: emission
      };

      // DMR-CO - Methanol - Thermal Consumption
      var referenceAmount = 4.62890310725552;
      var intermediateAmount = referenceAmount;
      var activeAmount = this.reductionHydrocarbon.DMRCO.methanol.heat;
      var emission = activeAmount * this.heat;
      var data5 = {
        item: "Thermal Consumption",
        referenceAmount: referenceAmount,
        referenceUnit: "kWh/kg Methanol",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kWh/kg Methanol",
        activeAmount: activeAmount,
        activeUnit: "kWh/kg Methanol",
        emission: emission
      };

      // DMR-CO - Methanol - Electricity
      var referenceAmount = 0.203952143533123;
      var intermediateAmount = referenceAmount;
      var activeAmount = this.reductionHydrocarbon.DMRCO.methanol.electricity;
      var emission = activeAmount * this.electricity;
      var data6 = {
        item: "Electricity",
        referenceAmount: referenceAmount,
        referenceUnit: "kWh/kg Methanol",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kWh/kg Methanol",
        activeAmount: activeAmount,
        activeUnit: "kWh/kg Methanol",
        emission: emission
      };

      // DMR-CO - Methanol - Total
      var emission =
        data3.emission +
        data4.emission +
        data5.emission +
        data6.emission +
        data1.activeAmount;
      var converted = -emission / data0.emission;
      var converted2 = emission / this.methanol;
      var data7 = {
        item: "Total",
        emission: emission,
        converted: converted,
        converted2: converted2
      };

      // DMR-CO - Methanol - End Use
      var referenceAmount = this.emissionFactors.fuelCycleEmissions.methanol
        .emission;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var emission = activeAmount;
      var converted = -emission / data0.emission;
      var converted2 = emission / this.methanol;
      var data8 = {
        item: "End Use",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2/kg Methanol",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2/kg Methanol",
        activeAmount: activeAmount,
        activeUnit: "kg CO2/kg Methanol",
        emission: emission,
        converted: converted,
        converted2: converted2
      };

      // DMR-CO - Methanol - Net
      var emission =
        data0.emission + data2.emission + data7.emission + data8.emission;
      var converted =
        data0.converted + data2.converted + data7.converted + data8.converted;
      var converted2 =
        data0.converted2 +
        data2.converted2 +
        data7.converted2 +
        data8.converted2;
      var data9 = {
        item: "Net",
        emission: emission,
        converted: converted,
        converted2: converted2
      };

      return [
        data0,
        data1,
        data2,
        {},
        data3,
        data4,
        data5,
        data6,
        data7,
        {},
        data8,
        {},
        data9
      ];
    },
    getMethanol1() {
      // DMR-H2 - Methanol - CO2 Converted
      var referenceAmount = 0.930631276901004;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var emission = -activeAmount;
      var converted = -emission / emission;
      var converted2 = emission / this.methanol;
      var data0 = {
        item: "CO2 Converted",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2/kg Methanol",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2/kg Methanol",
        activeAmount: activeAmount,
        activeUnit: "kg CO2/kg Methanol",
        emission: emission,
        converted: converted,
        converted2: converted2
      };

      // DMR-H2 - Methanol - CO2 Unconverted
      var referenceAmount = 0.0230989956958393;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var data1 = {
        item: "CO2 Unconverted",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2/kg Methanol",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2/kg Methanol",
        activeAmount: activeAmount,
        activeUnit: "kg CO2/kg Methanol"
      };

      // DMR-H2 - Methanol - CO2 Capture Process
      var referenceAmount = this.co2;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var emission = activeAmount * (data0.activeAmount + data1.activeAmount);
      var converted = -emission / data0.emission;
      var converted2 = emission / this.methanol;
      var data2 = {
        item: "CO2 Capture & Process",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2/kg CO2 captured",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2/kg CO2 captured",
        activeAmount: activeAmount,
        activeUnit: "kg CO2/kg CO2 captured",
        emission: emission,
        converted: converted,
        converted2: converted2
      };

      // DMR-H2 - Methanol - H2 Amount
      var referenceAmount = 0.0911047345767575;
      var intermediateAmount = referenceAmount;
      var activeAmount = this.reductionHydrocarbon.DMRH2.methanol.h2;
      var emission = activeAmount * this.hydrogen;
      var data3 = {
        item: "H₂ Amount",
        referenceAmount: referenceAmount,
        referenceUnit: "kg H₂/kg Methanol",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg H₂/kg Methanol",
        activeAmount: activeAmount,
        activeUnit: "kg H₂/kg Methanol",
        emission: emission
      };

      // DMR-H2 - Methanol - Methane Input
      var referenceAmount = 0.332496413199426;
      var intermediateAmount = referenceAmount;
      var activeAmount = this.reductionHydrocarbon.DMRH2.methanol.methane;
      var emission =
        activeAmount * this.emissionFactors.upstreamEmissions.methane.mass;
      var data4 = {
        item: "Methane Input",
        referenceAmount: referenceAmount,
        referenceUnit: "kWh/kg Methanol",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kWh/kg Methanol",
        activeAmount: activeAmount,
        activeUnit: "kWh/kg Methanol",
        emission: emission
      };

      // DMR-H2 - Methanol - Thermal Consumption
      var referenceAmount = 3.43137529411765;
      var intermediateAmount = referenceAmount;
      var activeAmount = this.reductionHydrocarbon.DMRH2.methanol.heat;
      var emission = activeAmount * this.heat;
      var data5 = {
        item: "Thermal Consumption",
        referenceAmount: referenceAmount,
        referenceUnit: "kWh/kg Methanol",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kWh/kg Methanol",
        activeAmount: activeAmount,
        activeUnit: "kWh/kg Methanol",
        emission: emission
      };

      // DMR-H2 - Methanol - Electricity
      var referenceAmount = 0.291029246054519;
      var intermediateAmount = referenceAmount;
      var activeAmount = this.reductionHydrocarbon.DMRH2.methanol.electricity;
      var emission = activeAmount * this.electricity;
      var data6 = {
        item: "Electricity",
        referenceAmount: referenceAmount,
        referenceUnit: "kWh/kg Methanol",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kWh/kg Methanol",
        activeAmount: activeAmount,
        activeUnit: "kWh/kg Methanol",
        emission: emission
      };

      // DMR-H2 - Methanol - Total
      var emission =
        data3.emission +
        data4.emission +
        data5.emission +
        data6.emission +
        data1.activeAmount;
      var converted = -emission / data0.emission;
      var converted2 = emission / this.methanol;
      var data7 = {
        item: "Total",
        emission: emission,
        converted: converted,
        converted2: converted2
      };

      // DMR-H2 - Methanol - End Use
      var referenceAmount = this.emissionFactors.fuelCycleEmissions.methanol
        .emission;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var emission = activeAmount;
      var converted = -emission / data0.emission;
      var converted2 = emission / this.methanol;
      var data8 = {
        item: "End Use",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2/kg Methanol",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2/kg Methanol",
        activeAmount: activeAmount,
        activeUnit: "kg CO2/kg Methanol",
        emission: emission,
        converted: converted,
        converted2: converted2
      };

      // DMR-H2 - Methanol - Net
      var emission =
        data0.emission + data2.emission + data7.emission + data8.emission;
      var converted =
        data0.converted + data2.converted + data7.converted + data8.converted;
      var converted2 =
        data0.converted2 +
        data2.converted2 +
        data7.converted2 +
        data8.converted2;
      var data9 = {
        item: "Net",
        emission: emission,
        converted: converted,
        converted2: converted2
      };

      return [
        data0,
        data1,
        data2,
        {},
        data3,
        data4,
        data5,
        data6,
        data7,
        {},
        data8,
        {},
        data9
      ];
    },
    getSummary() {
      // DMR-CO - Methanol
      var avoidedEmission2 =
        this.Methanol[this.Methanol.length - 1].converted -
        this.subPathways[0].value[12].converted2;
      var avoidedEmission =
        this.Methanol[this.Methanol.length - 1].emission -
        this.subPathways[0].value[12].emission;
      var gerp = avoidedEmission * this.constants.methanol * 0.5;
      var data0 = {
        category: "CO2 Reduction by Hydrocarbon",
        subCategory: "DMR-CO",
        product: "Methanol",
        co2Converted: this.subPathways[0].value[0].converted,
        co2CaptureProcess: this.subPathways[0].value[2].converted,
        electrolysis: 0,
        co2ConversionProcess: this.subPathways[0].value[8].converted,
        endUse: this.subPathways[0].value[10].converted,
        net: this.subPathways[0].value[12].converted,
        co2Converted2: this.subPathways[0].value[0].emission,
        co2CaptureProcess2: this.subPathways[0].value[2].emission,
        electrolysis2: 0,
        co2ConversionProcess2: this.subPathways[0].value[8].emission,
        endUse2: this.subPathways[0].value[10].emission,
        net2: this.subPathways[0].value[12].emission,
        avoidedEmission2: avoidedEmission2,
        avoidedEmission: avoidedEmission,
        globalEmissionReductionPotential: gerp
      };

      // DMR-H2 - Methanol
      var avoidedEmission2 =
        this.Methanol[this.Methanol.length - 1].converted -
        this.subPathways[1].value[12].converted2;
      var avoidedEmission =
        this.Methanol[this.Methanol.length - 1].emission -
        this.subPathways[1].value[12].emission;
      var gerp = avoidedEmission * this.constants.methanol * 0.5;
      var data1 = {
        category: "CO2 Reduction by Hydrocarbon",
        subCategory: "DMR-H2",
        product: "Methanol",
        co2Converted: this.subPathways[1].value[0].converted,
        co2CaptureProcess: this.subPathways[1].value[2].converted,
        electrolysis: 0,
        co2ConversionProcess: this.subPathways[1].value[8].converted,
        endUse: this.subPathways[1].value[10].converted,
        net: this.subPathways[1].value[12].converted,
        co2Converted2: this.subPathways[1].value[0].emission,
        co2CaptureProcess2: this.subPathways[1].value[2].emission,
        electrolysis2: this.subPathways[1].value[4].emission,
        co2ConversionProcess2: this.subPathways[1].value[8].emission,
        endUse2: this.subPathways[1].value[10].emission,
        net2: this.subPathways[1].value[12].emission,
        avoidedEmission2: avoidedEmission2,
        avoidedEmission: avoidedEmission,
        globalEmissionReductionPotential: gerp
      };

      return [data0, data1];
    }
  }
};
</script>
