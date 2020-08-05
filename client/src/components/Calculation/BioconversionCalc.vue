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
      <el-tab-pane label="Summary" name="third"></el-tab-pane>
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
import { bioconversionItems } from "./items";

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
    ...mapState("literature", ["bioconversionLit"]),
    ...mapState("pathways", ["bioconversion"]),
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
    fischerTropschDiesel: function() {
      return this.energyUnitConversions.LHV.fischerTropschDiesel;
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
      activeTabLabel: "P-DE",
      items: bioconversionItems,
      subPathways: [],
      summary: []
    };
  },
  methods: {
    calculate() {
      this.subPathways = [];
      this.subPathways.push(
        {
          name: "P-DE",
          value: this.getPDE()
        },
        {
          name: "P-WE",
          value: this.getPWE()
        }
      );
      this.summary = this.getSummary();
      this.$store
        .dispatch("pathwayCalc/updateBioconversion", {
          subPathways: this.subPathways,
          summary: this.summary
        })
        .then(() => {
          Event.$emit("summary", "bioconversion");
        });
    },
    handleClick(tab, event) {
      this.activeTabLabel = tab.label;
      this.$emit("tabChange", this.activeTabName, this.activeTabLabel);
    },
    getPDE() {
      var algae = 4.44;

      // P-DE - CO2 Captured
      var referenceAmount = parseFloat((1.83).toFixed(3));
      var intermediateAmount = referenceAmount * algae;
      var activeAmount = intermediateAmount;
      var emission = -activeAmount;
      var converted = -emission / emission;
      var converted2 = emission / this.fischerTropschDiesel;
      var data0 = {
        item: "CO2 Converted",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2conv/kg Algae",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2conv/kg Diesel",
        activeAmount: activeAmount,
        activeUnit: "kg CO2conv/kg Diesel",
        emission: emission,
        converted: converted,
        converted2: converted2
      };

      // P-DE - Algae
      var data1 = {
        referenceAmount: 4.44,
        referenceUnit: "kg Algae/kg Diesel"
      };

      // P-DE - CO2 Capture Process
      var referenceAmount = parseFloat(this.co2.toFixed(3));
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var emission = activeAmount * data0.activeAmount;
      var converted = -emission / data0.emission;
      var converted2 = emission / this.fischerTropschDiesel;
      var data2 = {
        item: "CO2 Capture & Process",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2 eq/kg CO2 captured",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2 eq/kg CO2 captured",
        activeAmount: activeAmount,
        activeUnit: "kg CO2 eq/kg CO2 captured",
        emission: emission,
        converted: converted,
        converted2: converted2
      };

      // P-DE - Total Electricty
      var referenceAmount = parseFloat((21.742068).toFixed(3));
      var intermediateAmount =
        referenceAmount * this.energyUnitConversions.energyConversion.MJtokWh;
      var activeAmount = this.bioconversion.PDE.diesel.electricity;
      var emission = activeAmount * this.electricity;
      var data3 = {
        item: "Total Electricity",
        referenceAmount: referenceAmount,
        referenceUnit: "MJ/kg Biodiesel",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kWh/kg Biodiesel",
        activeAmount: activeAmount,
        activeUnit: "kWh/kg Diesel",
        emission: emission
      };

      // P-DE - Hexane
      var referenceAmount = 114;
      var intermediateAmount =
        referenceAmount * this.emissionFactors.fuelCycleEmissions.hexane;
      var activeAmount = intermediateAmount;
      var emission = activeAmount;
      var data4 = {
        item: "Hexane",
        referenceAmount: referenceAmount,
        referenceUnit: "MJ/kg Biodiesel",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2/kg Biodiesel",
        activeAmount: activeAmount,
        activeUnit: "kg CO2/kg Biodiesel",
        emission: emission
      };

      // P-DE - Methanol
      var referenceAmount = 41.15;
      var intermediateAmount =
        (referenceAmount *
          this.emissionFactors.fuelCycleEmissions.methanol.emission) /
        this.emissionFactors.fuelCycleEmissions.methanol.heat;
      var activeAmount = intermediateAmount;
      var emission = activeAmount;
      var data5 = {
        item: "Methanol",
        referenceAmount: referenceAmount,
        referenceUnit: "MJ/kg Biodiesel",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2/kg Biodiesel",
        activeAmount: activeAmount,
        activeUnit: "kg CO2/kg Biodiesel",
        emission: emission
      };

      // P-DE - Total
      var emission = data3.emission + data4.emission + data5.emission;
      var converted = -emission / data0.emission;
      var converted2 = emission / this.fischerTropschDiesel;
      var data6 = {
        item: "Total",
        emission: emission,
        converted: converted,
        converted2: converted2
      };

      // P-DE - End Use
      var referenceAmount = this.emissionFactors.fuelCycleEmissions.biodiesel;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var emission = activeAmount;
      var converted = -emission / data0.emission;
      var converted2 = emission / this.fischerTropschDiesel;
      var data7 = {
        item: "End Use",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2/kg Biodiesel",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2/kg Biodiesel",
        activeAmount: activeAmount,
        activeUnit: "kg CO2/kg Biodiesel",
        emission: emission,
        converted: converted,
        converted2: converted2
      };

      // P-DE - Net
      var emission =
        data0.emission + data2.emission + data6.emission + data7.emission;
      var converted =
        data0.converted + data2.converted + data6.converted + data7.converted;
      var converted2 =
        data0.converted2 +
        data2.converted2 +
        data6.converted2 +
        data7.converted2;
      var data8 = {
        item: "Net",
        emission: emission,
        converted: converted,
        converted2: converted2
      };

      return [
        data0,
        data1,
        data2,
        data3,
        data4,
        data5,
        {},
        data6,
        data7,
        data8
      ];
    },
    getPWE() {
      // P-WE - CO2 Captured
      var referenceAmount = 3.38;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var emission = -activeAmount;
      var converted = -emission / emission;
      var converted2 = emission / this.fischerTropschDiesel;
      var data0 = {
        item: "CO2 Converted",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2conv/kg Biodiesel",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2conv/kg Biodiesel",
        activeAmount: activeAmount,
        activeUnit: "kg CO2conv/kg Biodiesel",
        emission: emission,
        converted: converted,
        converted2: converted2
      };

      // P-WE - CO2 Capture Process
      var referenceAmount = this.co2;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var emission = activeAmount * data0.activeAmount;
      var converted = -emission / data0.emission;
      var converted2 = emission / this.fischerTropschDiesel;
      var data1 = {
        item: "CO2 Capture & Process",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2 eq/kg CO2 captured",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2 eq/kg CO2 captured",
        activeAmount: activeAmount,
        activeUnit: "kg CO2 eq/kg CO2 captured",
        emission: emission,
        converted: converted,
        converted2: converted2
      };

      // P-WE - Total Electricty
      var referenceAmount = 0.63;
      var intermediateAmount = referenceAmount;
      var activeAmount = this.bioconversion.PWE.diesel.electricity;
      var emission = activeAmount * this.electricity;
      var data2 = {
        item: "Total Electricity",
        referenceAmount: referenceAmount,
        referenceUnit: "kWh/kg Biodiesel",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kwh/kg Biodiesel",
        activeAmount: activeAmount,
        activeUnit: "kwh/kg Biodiesel",
        emission: emission
      };

      // P-WE - Total Heat
      var referenceAmount = 0.29;
      var intermediateAmount = referenceAmount;
      var activeAmount = this.bioconversion.PWE.diesel.heat;
      var emission = activeAmount * this.heat;
      var data3 = {
        item: "Total Heat",
        referenceAmount: referenceAmount,
        referenceUnit: "kWh/kg Biodiesel",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kwh/kg Biodiesel",
        activeAmount: activeAmount,
        activeUnit: "kwh/kg Biodiesel",
        emission: emission
      };

      // P-WE - Total
      var emission = data2.emission + data3.emission;
      var converted = -emission / data0.emission;
      var converted2 = emission / this.fischerTropschDiesel;

      var data4 = {
        item: "Total",
        emission: emission,
        converted: converted,
        converted2: converted2
      };

      // P-WE - End Use
      var referenceAmount = this.emissionFactors.fuelCycleEmissions.biodiesel;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var emission = activeAmount;
      var converted = -emission / data0.emission;
      var converted2 = emission / this.fischerTropschDiesel;
      var data5 = {
        item: "End Use",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2/kg Biodiesel",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2/kg Biodiesel",
        activeAmount: activeAmount,
        activeUnit: "kg CO2/kg Biodiesel",
        emission: emission,
        converted: converted,
        converted2: converted2
      };

      // P-WE - Net
      var emission =
        data0.emission + data1.emission + data4.emission + data5.emission;
      var converted =
        data0.converted + data1.converted + data4.converted + data5.converted;
      var converted2 =
        data0.converted2 +
        data1.converted2 +
        data4.converted2 +
        data5.converted2;
      var data6 = {
        item: "Net",
        emission: emission,
        converted: converted,
        converted2: converted2
      };

      return [data0, data1, data2, data3, {}, data4, data5, data6];
    },
    getSummary() {
      // P-DE
      var literatureValues = {
        lit1: 0,
        lit2: 0,
        lit3: 0
      };
      if (this.defaultEmission.electricity.active === "Natural gas") {
        literatureValues.lit1 = this.bioconversionLit.PDE.diesel.conversion.baseline[0];
        literatureValues.lit2 = this.bioconversionLit.PDE.diesel.conversion.baseline[1];
        literatureValues.lit3 = this.bioconversionLit.PDE.diesel.conversion.baseline[2];
      }
      var avoidedEmission =
        this.Diesel[this.Diesel.length - 1].emission -
        this.subPathways[0].value[9].emission;
      var gerp = avoidedEmission * this.constants.diesel * 0.5;
      var data0 = {
        category: "CO2 Bioconversion",
        subCategory: "P-DE",
        product: "Diesel",
        co2Converted: this.subPathways[0].value[0].converted,
        co2CaptureProcess: this.subPathways[0].value[2].converted,
        electrolysis: 0,
        co2ConversionProcess: this.subPathways[0].value[7].converted,
        endUse: this.subPathways[0].value[8].converted,
        net: this.subPathways[0].value[9].converted,
        lit1: literatureValues.lit1,
        lit2: literatureValues.lit2,
        lit3: literatureValues.lit3,
        co2Converted2: this.subPathways[0].value[0].emission,
        co2CaptureProcess2: this.subPathways[0].value[2].emission,
        electrolysis2: 0,
        co2ConversionProcess2: this.subPathways[0].value[7].emission,
        endUse2: this.subPathways[0].value[8].emission,
        net2: this.subPathways[0].value[9].emission,
        avoidedEmission: avoidedEmission,
        globalEmissionReductionPotential: gerp
      };

      // P-WE
      var literatureValues = {
        lit1: 0,
        lit2: 0,
        lit3: 0
      };
      if (this.defaultEmission.electricity.active === "Natural gas") {
        literatureValues.lit1 = this.bioconversionLit.PWE.diesel.conversion.baseline[0];
        literatureValues.lit2 = this.bioconversionLit.PWE.diesel.conversion.baseline[1];
        literatureValues.lit3 = this.bioconversionLit.PWE.diesel.conversion.baseline[2];
      }
      var avoidedEmission =
        this.Diesel[this.Diesel.length - 1].emission -
        this.subPathways[1].value[7].emission;
      var gerp = avoidedEmission * this.constants.diesel * 0.5;
      var data1 = {
        category: "CO2 Bioconversion",
        subCategory: "P-WE",
        product: "Diesel",
        co2Converted: this.subPathways[1].value[0].converted,
        co2CaptureProcess: this.subPathways[1].value[1].converted,
        electrolysis: 0,
        co2ConversionProcess: this.subPathways[1].value[5].converted,
        endUse: this.subPathways[1].value[6].converted,
        net: this.subPathways[1].value[7].converted,
        lit1: literatureValues.lit1,
        lit2: literatureValues.lit2,
        lit3: literatureValues.lit3,
        co2Converted2: this.subPathways[1].value[0].emission,
        co2CaptureProcess2: this.subPathways[1].value[1].emission,
        electrolysis2: 0,
        co2ConversionProcess2: this.subPathways[1].value[5].emission,
        endUse2: this.subPathways[1].value[6].emission,
        net2: this.subPathways[1].value[7].emission,
        avoidedEmission: avoidedEmission,
        globalEmissionReductionPotential: gerp
      };

      return [data0, data1];
    }
  }
};
</script>
