<template>
  <div>
    <el-tabs v-model="activeTabName" @tab-click="handleClick" type="card">
      <el-tab-pane label="D-H2 - Diesel" name="first"
        ><div class="row">
          <div class="col-md-12">
            <span><b>Sub-Pathway: D-H2</b></span>
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col-md-12">
            <span><b>Product: Diesel</b></span>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="D-H2 - Methane" name="second">
        <div class="row">
          <div class="col-md-12">
            <span><b>Sub-Pathway: D-H2</b></span>
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col-md-12">
            <span><b>Product: Methane</b></span>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="D-H2 - Methanol" name="third">
        <div class="row">
          <div class="col-md-12">
            <span><b>Sub-Pathway: D-H2</b></span>
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col-md-12">
            <span><b>Product: Methanol</b></span>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Summary" name="fourth">
        <div class="row">
          <div class="col-md-12">
            <span><b>Summary</b></span>
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
import CalculationTable from "../CalculationTable.vue";

export default {
  components: {
    CalculationTable,
  },
  computed: {
    ...mapState("generalAssumptions", [
      "defaultEmission",
      "customEmission",
      "showAdditional",
    ]),
    ...mapState("constants", [
      "emissionFactors",
      "energyUnitConversions",
      "constants",
      "processCorrelations",
    ]),
    ...mapState("pathways", ["reductionHydrogen"]),
    ...mapState("incumbents", ["Diesel", "Ethanol", "Methane", "Methanol"]),
    electricity: function() {
      if(this.customEmission.electricity.use == true){
        return this.customEmission.electricity.value;
      }
      return this.defaultEmission.electricity[
        this.defaultEmission.electricity.active
      ];
    },
    co2: function() {
      if(this.customEmission.co2.use == true){
        return this.customEmission.co2.value;
      }
      return this.defaultEmission.co2[this.defaultEmission.co2.active];
    },
    heat: function() {
      if(this.customEmission.heat.use == true){
        return this.customEmission.heat.value;
      }
      return this.defaultEmission.heat[this.defaultEmission.heat.active];
    },
    steam: function() {
      if(this.customEmission.steam.use == true){
        return this.customEmission.steam.value;
      }
      return this.defaultEmission.steam[this.defaultEmission.steam.active];
    },
    hydrogen: function() {
      if(this.customEmission.hydrogen.use == true){
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
    },
    fischerTropschDiesel: function() {
      return this.energyUnitConversions.LHV.fischerTropschDiesel;
    },
  },
  mounted() {
    Event.$on("incumbentReady", () => {
      this.calculate();
    });
  },
  data() {
    return {
      activeTabName: "first",
      activeTabLabel: "D-H2 - Diesel",
      subPathways: [],
      summary: [],
    };
  },
  methods: {
    calculate() {
      this.subPathways = [];
      this.subPathways.push(
        {
          name: "D-H2 - Diesel",
          value: this.getDiesel(),
        },
        {
          name: "D-H2 - Methane",
          value: this.getMethane(),
        },
        {
          name: "D-H2 - Methanol",
          value: this.getMethanol(),
        }
      );
      this.summary = this.getSummary();
      this.$store
        .dispatch("pathwayCalc/updateReductionHydrogen", {
          subPathways: this.subPathways,
          summary: this.summary,
        })
        .then(() => {
          Event.$emit("summary", "reductionHydrogen");
        });
    },
    handleClick(tab, event) {
      this.activeTabLabel = tab.label;
      this.$emit("tabChange", this.activeTabName, this.activeTabLabel);
    },
    getDiesel() {
      // D-H2 - Diesel - CO2 Converted
      var referenceAmount = 3.159625;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var emission = -activeAmount;
      var converted = -emission / emission;
      var converted2 = emission / this.fischerTropschDiesel;
      var data0 = {
        item: "CO2 Converted",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2/kg Diesel ",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2/kg Diesel",
        activeAmount: activeAmount,
        activeUnit: "kg CO2/kg Diesel",
        emission: emission,
        converted: converted,
        converted2: converted2,
      };

      // D-H2 - Diesel - CO2 Unconverted
      var referenceAmount = 0.351;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var data1 = {
        item: "CO2 Unconverted",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2/kg Diesel",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2/kg Diesel",
        activeAmount: activeAmount,
        activeUnit: "kg CO2/kg Diesel",
      };

      // D-H2 - Diesel - CO2 Capture Process
      var referenceAmount = this.co2;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var emission = activeAmount * (data0.activeAmount + data1.activeAmount);
      var converted = -emission / data0.emission;
      var converted2 = emission / this.fischerTropschDiesel;
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
        converted2: converted2,
      };

      // D-H2 - Diesel - Amount of H2
      var referenceAmount = 0.428375;
      var intermediateAmount = referenceAmount;
      var activeAmount = this.reductionHydrogen.DH2.diesel.hydrogen;
      var data3 = {
        item: "Amount of H2",
        referenceAmount: referenceAmount,
        referenceUnit: "kg H2/kg Diesel",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg H2/kg Diesel",
        activeAmount: activeAmount,
        activeUnit: "kg H2/kg Diesel",
      };

      // D-H2 - Diesel - Hydrogen Intensity
      var referenceAmount = this.hydrogen;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var data4 = {
        item: "Hydrogen Intensity",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2eq/kg H2",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2eq/kg H2",
        activeAmount: activeAmount,
        activeUnit: "kg CO2eq/kg H2",
      };

      // D-H2 - Diesel - Fischer-Tropsch
      var referenceAmount = 0.03;
      var intermediateAmount = referenceAmount * this.fischerTropschDiesel;
      var activeAmount = intermediateAmount;
      var emission =
        data4.activeAmount * data3.activeAmount +
        activeAmount +
        data1.activeAmount;
      var converted = -emission / data0.emission;
      var converted2 = emission / this.fischerTropschDiesel;
      var data5 = {
        item: "Fischer-Tropsch",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2/MJ Diesel",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2/kg Diesel",
        activeAmount: activeAmount,
        activeUnit: "kg CO2/kg Diesel",
        emission: emission,
        converted: converted,
        converted2: converted2,
      };

      // D-H2 - Diesel - Combustion
      var referenceAmount = data0.referenceAmount;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var emission = activeAmount;
      var converted = -emission / data0.emission;
      var converted2 = emission / this.fischerTropschDiesel;
      var data6 = {
        item: "Combustion",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2/kg Diesel",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2/kg Diesel",
        activeAmount: activeAmount,
        activeUnit: "kg CO2/kg Diesel",
        emission: emission,
        converted: converted,
        converted2: converted2,
      };

      // D-H2 - Diesel - Net
      var emission =
        data0.emission + data2.emission + data5.emission + data6.emission;
      var converted =
        data0.converted + data2.converted + data5.converted + data6.converted;
      var converted2 =
        data0.converted2 +
        data2.converted2 +
        data5.converted2 +
        data6.converted2;
      var data7 = {
        item: "Net",
        emission: emission,
        converted: converted,
        converted2: converted2,
      };

      return [
        data0,
        data1,
        data2,
        {},
        data3,
        data4,
        data5,
        {},
        data6,
        {},
        data7,
      ];
    },
    getMethane() {
      // D-H2 - Methane - CO2 Converted
      var referenceAmount = 2.75;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var emission = -activeAmount;
      var converted = -emission / emission;
      var converted2 = emission / this.methane;
      var data0 = {
        item: "CO2 Converted",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2/kg Methane",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2/kg Methane",
        activeAmount: activeAmount,
        activeUnit: "kg CO2/kg Methane",
        emission: emission,
        converted: converted,
        converted2: converted2,
      };

      // D-H2 - Methane - CO2 Unconverted
      var referenceAmount = (data0.referenceAmount * 10) / 90;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var data1 = {
        item: "CO2 Unconverted",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2/kg Methane",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2/kg Methane",
        activeAmount: activeAmount,
        activeUnit: "kg CO2/kg Methane",
      };

      // D-H2 - Methane - CO2 Capture Process
      var referenceAmount = this.co2;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var emission = activeAmount * (data0.activeAmount + data1.activeAmount);
      var converted = -emission / data0.emission;
      var converted2 = emission / this.methane;
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
        converted2: converted2,
      };

      // D-H2 - Methane - Hydrogen Amount
      var referenceAmount = 0.52;
      var intermediateAmount = referenceAmount;
      var activeAmount = this.reductionHydrogen.DH2.methane.hydrogen;
      var data3 = {
        item: "Hydrogen Amount",
        referenceAmount: referenceAmount,
        referenceUnit: "kg H2/kg Methane",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg H2/kg Methane",
        activeAmount: activeAmount,
        activeUnit: "kg H2/kg Methane",
      };

      // D-H2 - Methane - Hydrogen Intensity
      var referenceAmount = this.hydrogen;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var data4 = {
        item: "Hydrogen Intensity",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2eq/kg H2",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2eq/kg H2",
        activeAmount: activeAmount,
        activeUnit: "kg CO2eq/kg H2",
      };

      // D-H2 - Methane - Methanation
      var referenceAmount = 0.335;
      var intermediateAmount = referenceAmount;
      var activeAmount = this.reductionHydrogen.DH2.methane.electricity;
      var emission =
        activeAmount * this.electricity +
        data3.activeAmount * data4.activeAmount +
        data1.activeAmount;
      var converted = -emission / data0.emission;
      var converted2 = emission / this.methane;
      var data5 = {
        item: "Methanation",
        referenceAmount: referenceAmount,
        referenceUnit: "kWh/kg Methane",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kWh/kg Methane",
        activeAmount: activeAmount,
        activeUnit: "kWh/kg Methane",
        emission: emission,
        converted: converted,
        converted2: converted2,
      };

      // D-H2 - Methane - Combustion
      var referenceAmount = this.emissionFactors.fuelCycleEmissions.methane;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var emission = activeAmount;
      var converted = -emission / data0.emission;
      var converted2 = emission / this.methane;
      var data6 = {
        item: "Combustion",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2/kg Methane",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2/kg Methane",
        activeAmount: activeAmount,
        activeUnit: "kg CO2/kg Methane",
        emission: emission,
        converted: converted,
        converted2: converted2,
      };

      // D-H2 - Methane - Net
      var emission =
        data0.emission + data2.emission + data5.emission + data6.emission;
      var converted =
        data0.converted + data2.converted + data5.converted + data6.converted;
      var converted2 =
        data0.converted2 +
        data2.converted2 +
        data5.converted2 +
        data6.converted2;
      var data7 = {
        item: "Net",
        emission: emission,
        converted: converted,
        converted2: converted2,
      };

      return [
        data0,
        data1,
        data2,
        {},
        data3,
        data4,
        data5,
        {},
        data6,
        {},
        data7,
      ];
    },
    getMethanol() {
      // D-H2 - Methanol - CO2 Converted
      var referenceAmount = 1.46 * 0.9385;
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
        converted2: converted2,
      };

      // D-H2 - Methanol - CO2 Unconverted
      var referenceAmount = 1.46 * (1 - 0.9385);
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var data1 = {
        item: "CO2 Unconverted",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2/kg Methanol",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2/kg Methanol",
        activeAmount: activeAmount,
        activeUnit: "kg CO2/kg Methanol",
      };

      // D-H2 - Methanol - CO2 Capture Process
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
        converted2: converted2,
      };

      // D-H2 - Methanol - Hydrogen Amount
      var referenceAmount = 0.199;
      var intermediateAmount = referenceAmount;
      var activeAmount = this.reductionHydrogen.DH2.methanol.hydrogen;
      var data3 = {
        item: "Hydrogen Amount",
        referenceAmount: referenceAmount,
        referenceUnit: "kg H2/kg Methanol",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg H2/kg Methanol",
        activeAmount: activeAmount,
        activeUnit: "kg H2/kg Methanol",
      };

      // D-H2 - Methanol - Hydrogen Intensity
      var referenceAmount = this.hydrogen;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var data4 = {
        item: "Hydrogen Intensity",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2eq/kg H2",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2eq/kg H2",
        activeAmount: activeAmount,
        activeUnit: "kg CO2eq/kg H2",
      };

      // D-H2 - Methanol - Electricity Consumption
      var referenceAmount = 0.169;
      var intermediateAmount = referenceAmount;
      var activeAmount = this.reductionHydrogen.DH2.methanol.electricity;
      var data5 = {
        item: "Electricity Consumption",
        referenceAmount: referenceAmount,
        referenceUnit: "kWh/kg Methanol",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kWh/kg Methanol",
        activeAmount: activeAmount,
        activeUnit: "kWh/kg Methanol",
      };

      // D-H2 - Methanol - Heat
      var referenceAmount = 0.439;
      var intermediateAmount = referenceAmount;
      var activeAmount = this.reductionHydrogen.DH2.methanol.heat;
      var data6 = {
        item: "Heat",
        referenceAmount: referenceAmount,
        referenceUnit: "kWh/kg Methanol",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kWh/kg Methanol",
        activeAmount: activeAmount,
        activeUnit: "kWh/kg Methanol",
      };

      // D-H2 - Methanol - Cooling
      var referenceAmount = 0.862;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var data7 = {
        item: "Cooling",
        referenceAmount: referenceAmount,
        referenceUnit: "kWh/kg Methanol",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kWh/kg Methanol",
        activeAmount: activeAmount,
        activeUnit: "kWh/kg Methanol",
      };

      // D-H2 - Methanol - Cooling Emission Factor
      var referenceAmount = this.emissionFactors.upstreamEmissions.cooling;
      var intermediateAmount = referenceAmount / 0.2777778;
      var activeAmount = intermediateAmount;
      var emission =
        data3.activeAmount * data4.activeAmount +
        data5.activeAmount * this.electricity +
        data6.activeAmount * this.heat +
        data7.activeAmount * activeAmount +
        data1.activeAmount;
      var converted = -emission / data0.emission;
      var converted2 = emission / this.methanol;
      var data8 = {
        item: "Cooling Emission Factor",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2eq/MJ",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2eq/MJ",
        activeAmount: activeAmount,
        activeUnit: "kg CO2eq/MJ",
        emission: emission,
        converted: converted,
        converted2: converted2,
      };

      // D-H2 - Methanol - Combustion
      var referenceAmount = this.emissionFactors.fuelCycleEmissions.methanol
        .emission;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var emission = activeAmount;
      var converted = -emission / data0.emission;
      var converted2 = emission / this.methanol;
      var data9 = {
        item: "Combustion",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2eq/kg Methanol",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2eq/kg Methanol",
        activeAmount: activeAmount,
        activeUnit: "kg CO2eq/kg Methanol",
        emission: emission,
        converted: converted,
        converted2: converted2,
      };

      // D-H2 - Methanol - Net
      var emission =
        data0.emission + data2.emission + data8.emission + data9.emission;
      var converted =
        data0.converted + data2.converted + data8.converted + data9.converted;
      var converted2 =
        data0.converted2 +
        data2.converted2 +
        data8.converted2 +
        data9.converted2;
      var data10 = {
        item: "Net",
        emission: emission,
        converted: converted,
        converted2: converted2,
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
        data8,
        {},
        data9,
        {},
        data10,
      ];
    },
    getSummary() {
      // D-H2 - Methane
      var avoidedEmission =
        this.Methane[this.Methane.length - 1].emission -
        this.subPathways[1].value[10].emission;
      var gerp = avoidedEmission * this.constants.methane * 0.5;
      var data0 = {
        category: "CO2 Reduction by Hydrogen",
        subCategory: "D-H2",
        product: "Methane",
        co2Converted: this.subPathways[1].value[0].converted,
        co2CaptureProcess: this.subPathways[1].value[2].converted,
        electrolysis: 0,
        co2ConversionProcess: this.subPathways[1].value[6].converted,
        endUse: this.subPathways[1].value[8].converted,
        net: this.subPathways[1].value[10].converted,
        // TODO: Literature Values
        co2Converted2: this.subPathways[1].value[0].emission,
        co2CaptureProcess2: this.subPathways[1].value[2].emission,
        electrolysis2: 0,
        co2ConversionProcess2: this.subPathways[1].value[6].emission,
        endUse2: this.subPathways[1].value[8].emission,
        net2: this.subPathways[1].value[10].emission,
        // TODO: Literature Values
        avoidedEmission: avoidedEmission,
        globalEmissionReductionPotential: gerp,
      };

      // D-H2 - Methanol
      var avoidedEmission =
        this.Methanol[this.Methanol.length - 1].emission -
        this.subPathways[2].value[13].emission;
      var gerp = avoidedEmission * this.constants.methanol * 0.5;
      var data1 = {
        category: "CO2 Reduction by Hydrogen",
        subCategory: "D-H2",
        product: "Methanol",
        co2Converted: this.subPathways[2].value[0].converted,
        co2CaptureProcess: this.subPathways[2].value[2].converted,
        electrolysis: 0,
        co2ConversionProcess: this.subPathways[2].value[9].converted,
        endUse: this.subPathways[2].value[11].converted,
        net: this.subPathways[2].value[13].converted,
        // TODO: Literature Values
        co2Converted2: this.subPathways[2].value[0].emission,
        co2CaptureProcess2: this.subPathways[2].value[2].emission,
        electrolysis2: 0,
        co2ConversionProcess2: this.subPathways[2].value[9].emission,
        endUse2: this.subPathways[2].value[11].emission,
        net2: this.subPathways[2].value[13].emission,
        // TODO: Literature Values
        avoidedEmission: avoidedEmission,
        globalEmissionReductionPotential: gerp,
      };

      // D-H2 - Diesel
      var avoidedEmission =
        this.Diesel[this.Diesel.length - 1].emission -
        this.subPathways[0].value[10].emission;
      var gerp = avoidedEmission * this.constants.diesel * 0.5;
      var data2 = {
        category: "CO2 Reduction by Hydrogen",
        subCategory: "D-H2",
        product: "Diesel",
        co2Converted: this.subPathways[0].value[0].converted,
        co2CaptureProcess: this.subPathways[0].value[2].converted,
        electrolysis: 0,
        co2ConversionProcess: this.subPathways[0].value[6].converted,
        endUse: this.subPathways[0].value[8].converted,
        net: this.subPathways[0].value[10].converted,
        // TODO: Literature Values
        co2Converted2: this.subPathways[0].value[0].emission,
        co2CaptureProcess2: this.subPathways[0].value[2].emission,
        electrolysis2: 0,
        co2ConversionProcess2: this.subPathways[0].value[6].emission,
        endUse2: this.subPathways[0].value[8].emission,
        net2: this.subPathways[0].value[10].emission,
        // TODO: Literature Values
        avoidedEmission: avoidedEmission,
        globalEmissionReductionPotential: gerp,
      };

      return [data0, data1, data2];
    },
  },
};
</script>
