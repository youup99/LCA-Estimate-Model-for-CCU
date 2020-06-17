<template>
  <div>
    <el-tabs v-model="activeTabName" @tab-click="handleClick" type="card">
      <el-tab-pane label="P.CAT - Methane" name="first">
        <div class="row">
          <div class="col-md-12">
            <span><b>Sub-Pathway: P.CAT</b></span>
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col-md-12">
            <span><b>Product: Methane</b></span>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="P.CAT - Methanol" name="second"
        ><div class="row">
          <div class="col-md-12">
            <span><b>Sub-Pathway: P.CAT</b></span>
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col-md-12">
            <span><b>Product: Methanol</b></span>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Summary" name="third">
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
    ...mapState("literature", ["reductionLightLit"]),
    ...mapState("pathways", ["reductionLight"]),
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
  },
  mounted() {
    Event.$on("incumbentReady", () => {
      this.calculate();
    });
  },
  data() {
    return {
      activeTabName: "first",
      activeTabLabel: "P.CAT - Methane",
      subPathways: [],
      summary: [],
    };
  },
  methods: {
    calculate() {
      this.subPathways = [];
      this.subPathways.push(
        {
          name: "P.CAT - Methane",
          value: this.getMethane(),
        },
        {
          name: "P.CAT - Methanol",
          value: this.getMethanol(),
        },
      );
      this.summary = this.getSummary();
      this.$store
        .dispatch("pathwayCalc/updateReductionLight", {
          subPathways: this.subPathways,
          summary: this.summary,
        })
        .then(() => {
          Event.$emit("summary", "reductionLight");
        });
    },
    handleClick(tab, event) {
      this.activeTabLabel = tab.label;
      this.$emit("tabChange", this.activeTabName, this.activeTabLabel);
    },
    getMethanol() {
      // P.CAT - Methanol - CO2 Converted
      var referenceAmount = 1.368;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var emission = -activeAmount;
      var converted = -emission / emission;
      var converted2 = emission / this.methanol;
      var data0 = {
        item: "CO2 Converted",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2conv/kg Methanol",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2conv/kg Methanol",
        activeAmount: activeAmount,
        activeUnit: "kg CO2conv/kg Methanol",
        emission: emission,
        converted: converted,
        converted2: converted2,
      };

      // P.CAT - Methanol - CO2 Unconverted
      var referenceAmount = 0.2377;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var data1 = {
        item: "CO2 Unconverted",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2 unconv/kg Methanol",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2 unconv/kg Methanol",
        activeAmount: activeAmount,
        activeUnit: "kg CO2 unconv/kg Methanol",
      };

      // P.CAT - Methanol - CO2 Captured Process
      var referenceAmount = this.co2;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var emission = activeAmount * (data0.activeAmount + data1.activeAmount);
      var converted = -emission / data0.emission;
      var converted2 = emission / this.methanol;
      var data2 = {
        item: "CO2 Capture & Process",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2eq/kg CO2 captured",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2eq/kg CO2 captured",
        activeAmount: activeAmount,
        activeUnit: "kg CO2eq/kg CO2 captured",
        emission: emission,
        converted: converted,
        converted2: converted2,
      };

      // P.CAT - Methanol - Electricity
      var referenceAmount = 0.00317063786641992;
      var intermediateAmount = referenceAmount;
      var activeAmount = this.reductionLight.PCAT.methanol.electricity;
      var data3 = {
        item: "Electricity (Desalination of water)",
        referenceAmount: referenceAmount,
        referenceUnit: "kWh/kg Methanol",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kWh/kg Methanol",
        activeAmount: activeAmount,
        activeUnit: "kWh/kg Methanol",
      };

      // P.CAT - Methanol - Natural Gas
      var referenceAmount = 6.28113146853147;
      var intermediateAmount = referenceAmount / this.naturalGas;
      var activeAmount = this.reductionLight.PCAT.methanol.naturalGas;
      var data4 = {
        item: "Natural Gas",
        referenceAmount: referenceAmount,
        referenceUnit: "MJ/kg Methanol",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "MJ/kg Methanol",
        activeAmount: activeAmount,
        activeUnit: "MJ/kg Methanol",
      };

      // P.CAT - Methanol - Hard Coal
      var referenceAmount = 0.0435604195804196;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var data5 = {
        item: "Hard Coal",
        referenceAmount: referenceAmount,
        referenceUnit: "MJ Hard Coal/kg Methanol",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "MJ Hard Coal/kg Methanol",
        activeAmount: activeAmount,
        activeUnit: "MJ Hard Coal/kg Methanol",
      };

      // P.CAT - Methanol - Oil
      var referenceAmount = 0.0533966433566434;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var data6 = {
        item: "Oil",
        referenceAmount: referenceAmount,
        referenceUnit: "MJ Oil/kg Methanol",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "MJ Oil/kg Methanol",
        activeAmount: activeAmount,
        activeUnit: "MJ Oil/kg Methanol",
      };

      // P.CAT - Methanol - N2O Emitted
      var referenceAmount = 2.66983216783217e-6;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var data7 = {
        item: "N2O Emitted",
        referenceAmount: referenceAmount,
        referenceUnit: "kg N2O/kg Methanol",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg N2O/kg Methanol",
        activeAmount: activeAmount,
        activeUnit: "kg N2O/kg Methanol",
      };

      // P.CAT - Methanol - Methane Emitted
      var referenceAmount = 0.000969570629370629;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var data8 = {
        item: "Methane Emitted",
        referenceAmount: referenceAmount,
        referenceUnit: "kg Methane/kg Methanol",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg Methane/kg Methanol",
        activeAmount: activeAmount,
        activeUnit: "kg Methane/kg Methanol",
      };

      // P.CAT - Methanol - CO2 Emitted
      var referenceAmount = 0.386423076923077;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var data9 = {
        item: "CO2 Emitted",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2/kg Methanol",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2/kg Methanol",
        activeAmount: activeAmount,
        activeUnit: "kg CO2/kg Methanol",
      };

      // P.CAT - Methanol - Total
      var intermediateAmount =
        data4.intermediateAmount *
          this.emissionFactors.upstreamEmissions.naturalGas.volume +
        data7.intermediateAmount * this.emissionFactors.gwp.n2o +
        data8.intermediateAmount * this.emissionFactors.gwp.ch4 +
        data9.intermediateAmount;
      var activeAmount =
        data3.activeAmount * this.electricity +
        data4.activeAmount *
          this.emissionFactors.upstreamEmissions.naturalGas.volume +
        data5.activeAmount *
          this.emissionFactors.upstreamEmissions.hardCoal.energy +
        data6.activeAmount * this.emissionFactors.upstreamEmissions.oil.energy +
        data7.activeAmount * this.emissionFactors.gwp.n2o +
        data8.activeAmount * this.emissionFactors.gwp.ch4 +
        data9.activeAmount +
        0.0459487978366754;
      var emission = activeAmount + data1.activeAmount;
      var converted = -emission / data0.emission;
      var converted2 = emission / this.methanol;
      var data10 = {
        item: "Total",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2eq/kg Methanol",
        activeAmount: activeAmount,
        activeUnit: "kg CO2eq/kg Methanol",
        emission: emission,
        converted: converted,
        converted2: converted2,
      };

      // P.CAT - Methanol - End Use
      var referenceAmount = this.emissionFactors.fuelCycleEmissions.methanol
        .emission;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var emission = activeAmount;
      var converted = -emission / data0.emission;
      var converted2 = emission / this.methanol;
      var data11 = {
        item: "End Use",
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

      // P.CAT - Methanol - Net
      var emission =
        data0.emission + data2.emission + data10.emission + data11.emission;
      var converted =
        data0.converted + data2.converted + data10.converted + data11.converted;
      var converted2 =
        data0.converted2 +
        data2.converted2 +
        data10.converted2 +
        data11.converted2;
      var data12 = {
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
        data9,
        data10,
        {},
        data11,
        {},
        data12,
      ];
    },
    getMethane() {
      // P.CAT - Methane - CO2 Converted
      var referenceAmount = 2.75;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var emission = -activeAmount;
      var converted = -emission / emission;
      var converted2 = emission / this.methane;
      var data0 = {
        item: "CO2 Converted",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2conv/kg Methane",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2conv/kg Methane",
        activeAmount: activeAmount,
        activeUnit: "kg CO2conv/kg Methane",
        emission: emission,
        converted: converted,
        converted2: converted2,
      };

      // P.CAT - Methane - CO2 Unconverted
      var referenceAmount = 0.795;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var data1 = {
        item: "CO2 Unconverted",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2 unconv/kg Methane",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2 unconv/kg Methane",
        activeAmount: activeAmount,
        activeUnit: "kg CO2 unconv/kg Methane",
      };

      // P.CAT - Methane - CO2 Captured Process
      var referenceAmount = this.co2;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var emission = activeAmount * (data0.activeAmount + data1.activeAmount);
      var converted = -emission / data0.emission;
      var converted2 = emission / this.methane;
      var data2 = {
        item: "CO2 Capture & Process",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2eq/kg CO2 captured",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2eq/kg CO2 captured",
        activeAmount: activeAmount,
        activeUnit: "kg CO2eq/kg CO2 captured",
        emission: emission,
        converted: converted,
        converted2: converted2,
      };

      // P.CAT - Methane - Electricity
      var referenceAmount = 0.00690414827960455;
      var intermediateAmount = referenceAmount;
      var activeAmount = this.reductionLight.PCAT.methane.electricity;
      var data3 = {
        item: "Electricity (Desalination of water)",
        referenceAmount: referenceAmount,
        referenceUnit: "kWh/kg Methane",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kWh/kg Methane",
        activeAmount: activeAmount,
        activeUnit: "kWh/kg Methane",
      };

      // P.CAT - Methane - Natural Gas
      var referenceAmount = 0.0034965034965035;
      var intermediateAmount = referenceAmount / this.naturalGas;
      var activeAmount = this.reductionLight.PCAT.methane.naturalGas;
      var data4 = {
        item: "Natural Gas",
        referenceAmount: referenceAmount,
        referenceUnit: "MJ/kg Methane",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "MJ/kg Methane",
        activeAmount: activeAmount,
        activeUnit: "MJ/kg Methane",
      };

      // P.CAT - Methane - Hard Coal and Oil
      var referenceAmount = 0.00524475524475524;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var data5 = {
        item: "Hard Coal and Oil",
        referenceAmount: referenceAmount,
        referenceUnit: "MJ Hard Coal/kg Methane",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "MJ Hard Coal/kg Methane",
        activeAmount: activeAmount,
        activeUnit: "MJ Hard Coal/kg Methane",
      };

      // P.CAT - Methane - Oil
      var referenceAmount = 0.00230769230769231;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var data6 = {
        item: "Oil",
        referenceAmount: referenceAmount,
        referenceUnit: "MJ Oil/kg Methane",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "MJ Oil/kg Methane",
        activeAmount: activeAmount,
        activeUnit: "MJ Oil/kg Methane",
      };

      // P.CAT - Methane - N2O Emitted
      var referenceAmount = 1.92307692307692e-7;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var data7 = {
        item: "N2O Emitted",
        referenceAmount: referenceAmount,
        referenceUnit: "kg N2O/kg Methane",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg N2O/kg Methane",
        activeAmount: activeAmount,
        activeUnit: "kg N2O/kg Methane",
      };

      // P.CAT - Methane - Methane Emitted
      var referenceAmount = 0.0000255244755244755;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var data8 = {
        item: "Methane Emitted",
        referenceAmount: referenceAmount,
        referenceUnit: "kg Methane/kg Methane",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg Methane/kg Methane",
        activeAmount: activeAmount,
        activeUnit: "kg Methane/kg Methane",
      };

      // P.CAT - Methane - CO2 Emitted
      var referenceAmount = 0.0242307692307692;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var data9 = {
        item: "CO2 Emitted",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2/kg Methane",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2/kg Methane",
        activeAmount: activeAmount,
        activeUnit: "kg CO2/kg Methane",
      };

      // P.CAT - Methane - Total
      var intermediateAmount =
        data4.intermediateAmount *
          this.emissionFactors.upstreamEmissions.naturalGas.volume +
        data7.intermediateAmount * this.emissionFactors.gwp.n2o +
        data8.intermediateAmount * this.emissionFactors.gwp.ch4 +
        data9.intermediateAmount;
      var activeAmount =
        data3.activeAmount * this.electricity +
        data4.activeAmount *
          this.emissionFactors.upstreamEmissions.naturalGas.volume +
        data5.activeAmount *
          this.emissionFactors.upstreamEmissions.hardCoal.energy +
        data6.activeAmount * this.emissionFactors.upstreamEmissions.oil.energy +
        data7.activeAmount * this.emissionFactors.gwp.n2o +
        data8.activeAmount * this.emissionFactors.gwp.ch4 +
        data9.activeAmount +
        0.100882969486038;
      var emission = activeAmount + data1.activeAmount;
      var converted = -emission / data0.emission;
      var converted2 = emission / this.methane;
      var data10 = {
        item: "Total",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2eq/kg Methane",
        activeAmount: activeAmount,
        activeUnit: "kg CO2eq/kg Methane",
        emission: emission,
        converted: converted,
        converted2: converted2,
      };

      // P.CAT - Methane - End Use
      var referenceAmount = this.emissionFactors.fuelCycleEmissions.methane;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var emission = activeAmount;
      var converted = -emission / data0.emission;
      var converted2 = emission / this.methane;
      var data11 = {
        item: "End Use",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2eq/kg Methane",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2eq/kg Methane",
        activeAmount: activeAmount,
        activeUnit: "kg CO2eq/kg Methane",
        emission: emission,
        converted: converted,
        converted2: converted2,
      };

      // P.CAT - Methane - Net
      var emission =
        data0.emission + data2.emission + data10.emission + data11.emission;
      var converted =
        data0.converted + data2.converted + data10.converted + data11.converted;
      var converted2 =
        data0.converted2 +
        data2.converted2 +
        data10.converted2 +
        data11.converted2;
      var data12 = {
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
        data9,
        data10,
        {},
        data11,
        {},
        data12,
      ];
    },
    getSummary() {
      // P.CAT - Methane
      var literatureValues = {
        lit1: 0
      }
      if(this.defaultEmission.electricity.active === "Natural gas"){
        literatureValues.lit1 = this.reductionLightLit.PCAT.methane.conversion.baseline;
      }
      var avoidedEmission =
        this.Methane[this.Methane.length - 1].emission -
        this.subPathways[0].value[15].emission;
      var gerp = avoidedEmission * this.constants.methane * 0.5;
      var data0 = {
        category: "CO2 Reduction Involving Light",
        subCategory: "P.CAT",
        product: "Methane",
        co2Converted: this.subPathways[0].value[0].converted,
        co2CaptureProcess: this.subPathways[0].value[2].converted,
        electrolysis: 0,
        co2ConversionProcess: this.subPathways[0].value[11].converted,
        endUse: this.subPathways[0].value[13].converted,
        net: this.subPathways[0].value[15].converted,
        lit1: literatureValues.lit1,
        co2Converted2: this.subPathways[0].value[0].emission,
        co2CaptureProcess2: this.subPathways[0].value[2].emission,
        electrolysis2: 0,
        co2ConversionProcess2: this.subPathways[0].value[11].emission,
        endUse2: this.subPathways[0].value[13].emission,
        net2: this.subPathways[0].value[15].emission,
        avoidedEmission: avoidedEmission,
        globalEmissionReductionPotential: gerp,
      };

      // P.CAT - Methanol
      var literatureValues = {
        lit1: 0
      }
      if(this.defaultEmission.electricity.active === "Natural gas"){
        literatureValues.lit1 = this.reductionLightLit.PCAT.methanol.conversion.baseline;
      }
      var avoidedEmission =
        this.Methanol[this.Methanol.length - 1].emission -
        this.subPathways[1].value[15].emission;
      var gerp = avoidedEmission * this.constants.methanol * 0.5;
      var data1 = {
        category: "CO2 Reduction Involving Light",
        subCategory: "P.CAT",
        product: "Methanol",
        co2Converted: this.subPathways[1].value[0].converted,
        co2CaptureProcess: this.subPathways[1].value[2].converted,
        electrolysis: 0,
        co2ConversionProcess: this.subPathways[1].value[11].converted,
        endUse: this.subPathways[1].value[13].converted,
        net: this.subPathways[1].value[15].converted,
        lit1: literatureValues.lit1,
        co2Converted2: this.subPathways[1].value[0].emission,
        co2CaptureProcess2: this.subPathways[1].value[2].emission,
        electrolysis2: 0,
        co2ConversionProcess2: this.subPathways[1].value[11].emission,
        endUse2: this.subPathways[1].value[13].emission,
        net2: this.subPathways[1].value[15].emission,
        avoidedEmission: avoidedEmission,
        globalEmissionReductionPotential: gerp,
      };

      return [data0, data1];
    },
  },
};
</script>
