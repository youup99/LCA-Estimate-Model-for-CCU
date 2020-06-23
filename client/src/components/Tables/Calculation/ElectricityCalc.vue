<template>
  <div>
    <el-tabs v-model="activeTabName" @tab-click="handleClick" type="card">
      <el-tab-pane label="SOEC-CO - Syngas" name="first">
        <div class="row">
          <div class="col-md-12">
            <span>
              <b>Sub-Pathway: SOEC-CO</b>
            </span>
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col-md-12">
            <span>
              <b>Product: Syngas</b>
            </span>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="SOEC-CO - Methane" name="second">
        <div class="row">
          <div class="col-md-12">
            <span>
              <b>Sub-Pathway: SOEC-CO</b>
            </span>
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col-md-12">
            <span>
              <b>Product: Methane</b>
            </span>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="SOEC-CO - Methanol" name="third">
        <div class="row">
          <div class="col-md-12">
            <span>
              <b>Sub-Pathway: SOEC-CO</b>
            </span>
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col-md-12">
            <span>
              <b>Product: Methanol</b>
            </span>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="SOEC-CO - Diesel" name="fourth">
        <div class="row">
          <div class="col-md-12">
            <span>
              <b>Sub-Pathway: SOEC-CO</b>
            </span>
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col-md-12">
            <span>
              <b>Product: Diesel</b>
            </span>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="SOEC-CO - Ethanol" name="fifth">
        <div class="row">
          <div class="col-md-12">
            <span>
              <b>Sub-Pathway: SOEC-CO</b>
            </span>
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col-md-12">
            <span>
              <b>Product: Ethanol</b>
            </span>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="SOEC-EL - Methane" name="sixth">
        <div class="row">
          <div class="col-md-12">
            <span>
              <b>Sub-Pathway: SOEC-EL</b>
            </span>
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col-md-12">
            <span>
              <b>Product: Methane</b>
            </span>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="SOEC-EL - Methanol" name="seventh">
        <div class="row">
          <div class="col-md-12">
            <span>
              <b>Sub-Pathway: SOEC-EL</b>
            </span>
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col-md-12">
            <span>
              <b>Product: Methanol</b>
            </span>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="SOEC-EL - Diesel" name="eighth">
        <div class="row">
          <div class="col-md-12">
            <span>
              <b>Sub-Pathway: SOEC-EL</b>
            </span>
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col-md-12">
            <span>
              <b>Product: Diesel</b>
            </span>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="PEM - Methane" name="ninth">
        <div class="row">
          <div class="col-md-12">
            <span>
              <b>Sub-Pathway: PEM</b>
            </span>
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col-md-12">
            <span>
              <b>Product: Methane</b>
            </span>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="PEM - Methanol" name="tenth">
        <div class="row">
          <div class="col-md-12">
            <span>
              <b>Sub-Pathway: PEM</b>
            </span>
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col-md-12">
            <span>
              <b>Product: Methanol</b>
            </span>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="PEM - Diesel" name="eleventh">
        <div class="row">
          <div class="col-md-12">
            <span>
              <b>Sub-Pathway: PEM</b>
            </span>
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col-md-12">
            <span>
              <b>Product: Diesel</b>
            </span>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Summary" name="twelvth">
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
import CalculationTable from "../CalculationTable.vue";

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
    ...mapState("literature", ["reductionElectricityLit"]),
    ...mapState("pathways", ["reductionElectricity"]),
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
    syngas: function() {
      return this.energyUnitConversions.LHV.syngas;
    },
    methane: function() {
      return this.energyUnitConversions.LHV.methane;
    },
    methanol: function() {
      return this.energyUnitConversions.LHV.methanol;
    },
    fischerTropschDiesel: function() {
      return this.energyUnitConversions.LHV.fischerTropschDiesel;
    },
    ethanol: function() {
      return this.energyUnitConversions.LHV.ethanol;
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
      activeTabLabel: "SOEC-CO - Syngas",
      subPathways: [],
      summary: []
    };
  },
  methods: {
    calculate() {
      this.subPathways = [];
      this.subPathways.push(
        {
          name: "SOEC-CO - Syngas",
          value: this.getSyngas()
        },
        {
          name: "SOEC-CO - Methane",
          value: this.getMethane()
        },
        {
          name: "SOEC-CO - Methanol",
          value: this.getMethanol()
        },
        {
          name: "SOEC-CO - Diesel",
          value: this.getDiesel()
        },
        {
          name: "SOEC-CO - Ethanol",
          value: this.getEthanol()
        },
        {
          name: "SOEC-EL - Methane",
          value: this.getMethane2()
        },
        {
          name: "SOEC-EL - Methanol",
          value: this.getMethanol2()
        },
        {
          name: "SOEC-EL - Diesel",
          value: this.getDiesel2()
        },
        {
          name: "PEM - Methane",
          value: this.getMethane3()
        },
        {
          name: "PEM - Methanol",
          value: this.getMethanol3()
        },
        {
          name: "PEM - Diesel",
          value: this.getDiesel3()
        }
      );
      this.summary = this.getSummary();
      this.$store
        .dispatch("pathwayCalc/updateReductionElectricity", {
          subPathways: this.subPathways,
          summary: this.summary
        })
        .then(() => {
          Event.$emit("summary", "reductionElectricity");
        });
    },
    handleClick(tab, event) {
      this.activeTabLabel = tab.label;
      this.$emit("tabChange", this.activeTabName, this.activeTabLabel);
    },
    getSyngas() {
      // SOEC-CO - Syngas - CO2 Converted
      var referenceAmount = 1.364;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var emission = -activeAmount;
      var converted = -emission / emission;
      var converted2 = emission / this.syngas;
      var data0 = {
        item: "CO2 Converted",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2eq/kg Syngas",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2eq/kg Syngas",
        activeAmount: activeAmount,
        activeUnit: "kg CO2eq/kg Syngas",
        emission: emission,
        converted: converted,
        converted2: converted2
      };

      // SOEC-CO - Syngas - CO2 Unconverted
      var referenceAmount = 0.157;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var data1 = {
        item: "CO2 Unconverted",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2 unconv/kg Syngas",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2 unconv/kg Syngas",
        activeAmount: activeAmount,
        activeUnit: "kg CO2 unconv/kg Syngas"
      };

      // SOEC-CO - Syngas - CO2 Capture Process
      var referenceAmount = this.co2;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var emission = activeAmount * (data0.activeAmount + data1.activeAmount);
      var converted = -emission / data0.emission;
      var converted2 = emission / this.syngas;
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
        converted2: converted2
      };

      // SOEC-CO - Syngas - Co-electrolysis
      var referenceAmount = 6.949;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var data3 = {
        item: "Co-electrolysis",
        referenceAmount: referenceAmount,
        referenceUnit: "kWh/kg Syngas",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kWh/kg Syngas",
        activeAmount: activeAmount,
        activeUnit: "kWh/kg Syngas"
      };

      // SOEC-CO - Syngas - Water Evaporation
      var referenceAmount = 22;
      var intermediateAmount = (referenceAmount * 24) / 5056;
      var activeAmount = intermediateAmount;
      var data4 = {
        item: "Water Evaporation",
        referenceAmount: referenceAmount,
        referenceUnit: "kW/5000 kg Syngas/day",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kWh/kg Syngas",
        activeAmount: activeAmount,
        activeUnit: "kWh/kg Syngas"
      };

      // SOEC-CO - Syngas - Preheating Feed
      var referenceAmount = 46;
      var intermediateAmount = (referenceAmount * 24) / 5056;
      var activeAmount = intermediateAmount;
      var data5 = {
        item: "Preheating Feed",
        referenceAmount: referenceAmount,
        referenceUnit: "kW/5000 kg Syngas/day",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kWh/kg Syngas",
        activeAmount: activeAmount,
        activeUnit: "kWh/kg Syngas"
      };

      // SOEC-CO - Syngas - Total
      var intermediateAmount =
        data3.intermediateAmount +
        data4.intermediateAmount +
        data5.intermediateAmount;
      var activeAmount =
        data3.activeAmount + data4.activeAmount + data5.activeAmount;
      var emission =
        data1.activeAmount +
        data3.activeAmount * this.electricity +
        (data4.activeAmount + data5.activeAmount) * this.heat;
      var converted = -emission / data0.emission;
      var converted2 = emission / this.syngas;
      var data6 = {
        item: "Total",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kWh/kg Syngas",
        activeAmount: activeAmount,
        activeUnit: "kWh/kg Syngas",
        emission: emission,
        converted: converted,
        converted2: converted2
      };

      // SOEC-CO - Syngas - Net
      var emission = data0.emission + data2.emission + data6.emission;
      var converted = data0.converted + data2.converted + data6.converted;
      var converted2 = data0.converted2 + data2.converted2 + data6.converted2;
      var data7 = {
        item: "Net",
        emission: emission,
        converted: converted,
        converted2: converted2
      };

      return [data0, data1, data2, {}, data3, data4, data5, data6, {}, data7];
    },
    getMethane() {
      // SOEC-CO - Methane - CO2 Converted
      var referenceAmount = 1.364;
      var intermediateAmount =
        referenceAmount * this.processCorrelations.SOECCOMethane.value;
      var activeAmount = intermediateAmount;
      var emission = -activeAmount;
      var converted = -emission / emission;
      var converted2 = emission / this.methane;
      var data0 = {
        item: "CO2 Converted",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2/kg Syngas",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2/kg Methane",
        activeAmount: activeAmount,
        activeUnit: "kg CO2/kg Methane",
        emission: emission,
        converted: converted,
        converted2: converted2
      };

      // SOEC-CO - Methane - CO2 Unconverted
      var referenceAmount = 0.157;
      var intermediateAmount =
        referenceAmount * this.processCorrelations.SOECCOMethane.value;
      var activeAmount = intermediateAmount;
      var data1 = {
        item: "CO2 Unconverted",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2/kg Syngas",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2eq/kg Methane",
        activeAmount: activeAmount,
        activeUnit: "kg CO2eq/kg Methane"
      };

      // SOEC-CO - Methane - CO2 Capture Process
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
        converted2: converted2
      };

      // SOEC-CO - Methane - Methanation
      var referenceAmount = 0.335;
      var intermediateAmount = referenceAmount;
      var activeAmount =
        intermediateAmount +
        6.949 * this.processCorrelations.SOECCOMethane.value; // 6.949 is the Co-electrolysis reference value
      var emission = activeAmount * this.electricity + data1.activeAmount;
      var converted =
        -(
          emission +
          this.reductionElectricity.SOECCO.methane.heat * this.heat
        ) / data0.emission;
      var converted2 = emission / this.methane;
      var data3 = {
        item: "Methanation",
        referenceAmount: referenceAmount,
        referenceUnit: "kWh/kg Methane",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kWh/kg Methane",
        activeAmount: activeAmount,
        activeUnit: "kWh/kg Methane",
        emission: emission,
        converted: converted,
        converted2: converted2
      };

      // SOEC-CO - Methane - Co-electrolysis
      var referenceAmount = 6.949;
      var data4 = {
        item: "Co-electrolysis",
        referenceAmount: referenceAmount,
        referenceUnit: "kWh/kg Syngas"
      };

      // SOEC-CO - Methane - Water Evaporation
      var referenceAmount = 22;
      var intermediateAmount =
        ((referenceAmount * 24) / 5056) *
          this.processCorrelations.SOECCOMethane.value +
        ((46 * 24) / 5056) * this.processCorrelations.SOECCOMethane.value; // 46 is the Preheating feed reference value
      var activeAmount = this.reductionElectricity.SOECCO.methane.heat;
      var emission = activeAmount * this.heat;
      var data5 = {
        item: "Water Evaporation",
        referenceAmount: referenceAmount,
        referenceUnit: "kW/5000 kg Syngas/day",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kWh/kg Methane",
        activeAmount: activeAmount,
        activeUnit: "kWh/kg Methane",
        emission: emission
      };

      // SOEC-CO - Methane - Preheating Feed
      var referenceAmount = 46;
      var emission = data3.emission + data5.emission;
      var data6 = {
        item: "Preheating Feed",
        referenceAmount: referenceAmount,
        referenceUnit: "kW/5000 kg Syngas/day",
        intermediateAmount: "(Heating)",
        emission: emission
      };

      // SOEC-CO - Methane - Electrolysis for extra H2
      var referenceAmount = 41;
      var intermediateAmount =
        referenceAmount * this.processCorrelations.SOECCOMethane.extra;
      var activeAmount = this.reductionElectricity.SOECCO.methane.electricity;
      var emission = activeAmount * this.electricity;
      var data7 = {
        item: "Electrolysis for extra H2",
        referenceAmount: referenceAmount,
        referenceUnit: "kWh/kg H2",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kWh/kg methane",
        activeAmount: activeAmount,
        activeUnit: "kWh/kg methane",
        emission: emission
      };

      // SOEC-CO - Methane - Total
      var emission = data7.emission;
      var converted = -emission / data0.emission;
      var converted2 = emission / this.methane;
      var data8 = {
        item: "Total",
        emission: emission,
        converted: converted,
        converted2: converted2
      };

      // SOEC-CO - Methane - Combustion
      var referenceAmount = this.emissionFactors.fuelCycleEmissions.methane;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var emission = activeAmount;
      var converted = -emission / data0.emission;
      var converted2 = emission / this.methane;
      var data9 = {
        item: "Combustion",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2/kg Methane",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2/kg Methane",
        activeAmount: activeAmount,
        activeUnit: "kg CO2/kg Methane",
        emission: emission,
        converted: converted,
        converted2: converted2
      };

      // SOEC-CO - Methane - Net
      var emission =
        data0.emission +
        data2.emission +
        data6.emission +
        data8.emission +
        data9.emission;
      var converted =
        data0.converted +
        data2.converted +
        data3.converted +
        data8.converted +
        data9.converted;
      var converted2 =
        data0.converted2 +
        data2.converted2 +
        data3.converted2 +
        data8.converted2 +
        data9.converted2;
      var data10 = {
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
        {},
        data7,
        data8,
        {},
        data9,
        {},
        data10
      ];
    },
    getMethanol() {
      // SOEC-CO - Methanol - CO2 Converted
      var referenceAmount = 1.364;
      var intermediateAmount =
        referenceAmount * this.processCorrelations.SOECCOMethanol;
      var activeAmount = intermediateAmount;
      var emission = -activeAmount;
      var converted = -emission / emission;
      var converted2 = emission / this.methanol;
      var data0 = {
        item: "CO2 Converted",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2/kg Syngas",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2/kg Methanol",
        activeAmount: activeAmount,
        activeUnit: "kg CO2/kg Methanol",
        emission: emission,
        converted: converted,
        converted2: converted2
      };

      // SOEC-CO - Methanol - CO2 Unconverted
      var referenceAmount = 0.157;
      var intermediateAmount =
        referenceAmount * this.processCorrelations.SOECCOMethanol;
      var activeAmount = intermediateAmount;
      var data1 = {
        item: "CO2 Unconverted",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2/kg Syngas",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2eq/kg Methanol",
        activeAmount: activeAmount,
        activeUnit: "kg CO2eq/kg Methanol"
      };

      // SOEC-CO - Methanol - CO2 Capture Process
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

      // SOEC-CO - Methanol - Methanol Synthesis Stage
      var referenceAmount = 1.271;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var emission = activeAmount * this.electricity + data1.activeAmount;
      var converted2 = emission / this.methanol;
      var data3 = {
        item: "Methanation",
        referenceAmount: referenceAmount,
        referenceUnit: "kWh/kg Methanol",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kWh/kg Methanol",
        activeAmount: activeAmount,
        activeUnit: "kWh/kg Methanol",
        emission: emission,
        converted2: converted2
      };

      // SOEC-CO - Methanol - Co-electrolysis
      var referenceAmount = 6.949;
      var intermediateAmount =
        referenceAmount * this.processCorrelations.SOECCOMethanol;
      var activeAmount = this.reductionElectricity.SOECCO.methanol.electricity;
      var emission = activeAmount * this.electricity;
      var data4 = {
        item: "Co-electrolysis",
        referenceAmount: referenceAmount,
        referenceUnit: "kWh/kg Syngas",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kWh/kg Methanol",
        activeAmount: activeAmount,
        activeUnit: "kWh/kg Methanol",
        emission: emission
      };

      // SOEC-CO - Methanol - Water Evaporation
      var referenceAmount = 22;
      var data5 = {
        item: "Water Evaporation",
        referenceAmount: referenceAmount,
        referenceUnit: "kW/5000 kg Syngas/day"
      };

      // SOEC-CO - Methanol - Preheating Feed
      var referenceAmount = 46;
      var intermediateAmount =
        (((data5.referenceAmount + referenceAmount) * 24) / 5056) *
        this.processCorrelations.SOECCOMethanol;
      var activeAmount = this.reductionElectricity.SOECCO.methanol.heat;
      var emission = activeAmount * this.heat;
      var data6 = {
        item: "Preheating Feed",
        referenceAmount: referenceAmount,
        referenceUnit: "kW/5000 kg Syngas/day",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kWh/kg Methanol",
        activeAmount: activeAmount,
        activeUnit: "kWh/kg Methanol",
        emission: emission
      };

      // SOEC-CO - Methanol - Total
      var intermediateAmount =
        data4.intermediateAmount + data6.intermediateAmount;
      var activeAmount = intermediateAmount;
      var emission = data3.emission + data4.emission + data6.emission;
      var converted = -emission / data0.emission;
      var converted2 = emission / this.methanol;
      var data7 = {
        item: "Total",
        intermediateAmount: intermediateAmount,
        activeAmount: activeAmount,
        emission: emission,
        converted: converted,
        converted2: converted2
      };

      // SOEC-CO - Methanol - Combustion
      var referenceAmount = this.emissionFactors.fuelCycleEmissions.methanol
        .emission;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var emission = activeAmount;
      var converted = -emission / data0.emission;
      var converted2 = emission / this.methanol;
      var data8 = {
        item: "Combustion",
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

      // SOEC-CO - Methanol - Net
      var emission =
        data0.emission + data2.emission + data7.emission + data8.emission;
      var converted =
        data0.converted + data2.converted + data7.converted + data8.converted;
      var converted2 =
        data0.converted2 +
        data2.converted2 +
        data3.converted2 +
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
    getDiesel() {
      // SOEC-CO - Diesel - CO2 Converted
      var referenceAmount = 1.364;
      var intermediateAmount =
        referenceAmount * this.processCorrelations.SOECCODiesel;
      var activeAmount = intermediateAmount;
      var emission = -activeAmount;
      var converted = -emission / emission;
      var converted2 = emission / this.fischerTropschDiesel;
      var data0 = {
        item: "CO2 Converted",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2/kg Syngas",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2/kg Diesel",
        activeAmount: activeAmount,
        activeUnit: "kg CO2/kg Diesel",
        emission: emission,
        converted: converted,
        converted2: converted2
      };

      // SOEC-CO - Diesel - CO2 Unconverted
      var referenceAmount = 0.157;
      var intermediateAmount =
        referenceAmount * this.processCorrelations.SOECCODiesel;
      var activeAmount = intermediateAmount;
      var data1 = {
        item: "CO2 Unconverted",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2/kg Syngas",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2eq/kg Diesel",
        activeAmount: activeAmount,
        activeUnit: "kg CO2eq/kg Diesel"
      };

      // SOEC-CO - Diesel - CO2 Capture Process
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
        converted2: converted2
      };

      // SOEC-CO - Diesel - Co-electrolysis
      var referenceAmount = 6.949;
      var intermediateAmount =
        referenceAmount * this.processCorrelations.SOECCODiesel;
      var activeAmount = this.reductionElectricity.SOECCO.diesel.electricity;
      var emission = activeAmount * this.electricity;
      var data3 = {
        item: "Co-electrolysis",
        referenceAmount: referenceAmount,
        referenceUnit: "kWh/kg Syngas",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kWh/kg Diesel",
        activeAmount: activeAmount,
        activeUnit: "kWh/kg Diesel",
        emission: emission
      };

      // SOEC-CO - Diesel - Water Evaporation
      var referenceAmount = 22;
      var data4 = {
        item: "Water Evaporation",
        referenceAmount: referenceAmount,
        referenceUnit: "kW/5000 kg Syngas/day"
      };

      // SOEC-CO - Diesel - Preheating Feed
      var referenceAmount = 46;
      var intermediateAmount =
        (((data4.referenceAmount + referenceAmount) * 24) / 5056) *
        this.processCorrelations.SOECCODiesel;
      var activeAmount = this.reductionElectricity.SOECCO.diesel.heat;
      var emission = activeAmount * this.heat;
      var data5 = {
        item: "Preheating Feed",
        referenceAmount: referenceAmount,
        referenceUnit: "kW/5000 kg Syngas/day",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kWh/kg Diesel",
        activeAmount: activeAmount,
        activeUnit: "kWh/kg Diesel",
        emission: emission
      };

      // SOEC-CO - Diesel - Fischer-Tropsch
      var referenceAmount = 1.3;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var emission = activeAmount;
      var data6 = {
        item: "Fischer-Tropsch",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2/kg Diesel",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2/kg Diesel",
        activeAmount: activeAmount,
        activeUnit: "kg CO2/kg Diesel",
        emission: emission
      };

      // SOEC-CO - Diesel - Total
      var emission =
        data1.activeAmount + data3.emission + data5.emission + data6.emission;
      var converted = -emission / data0.emission;
      var converted2 = emission / this.fischerTropschDiesel;
      var data7 = {
        item: "Total",
        emission: emission,
        converted: converted,
        converted2: converted2
      };

      // SOEC-CO - Diesel - Combustion
      var referenceAmount = this.emissionFactors.fuelCycleEmissions.diesel;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var emission = activeAmount;
      var converted = -emission / data0.emission;
      var converted2 = emission / this.fischerTropschDiesel;
      var data8 = {
        item: "Combustion",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2/kg Diesel",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2/kg Diesel",
        activeAmount: activeAmount,
        activeUnit: "kg CO2/kg Diesel",
        emission: emission,
        converted: converted,
        converted2: converted2
      };

      // SOEC-CO - Diesel - Net
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
    getEthanol() {
      // SOEC-CO - Ethanol - CO2 Converted
      var referenceAmount = 1.91304347826087;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var emission = -activeAmount;
      var converted = -emission / emission;
      var converted2 = emission / this.ethanol;
      var data0 = {
        item: "CO2 Converted",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2/kg Ethanol",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2/kg Ethanol",
        activeAmount: activeAmount,
        activeUnit: "kg CO2/kg Ethanol",
        emission: emission,
        converted: converted,
        converted2: converted2
      };

      // SOEC-CO - Ethanol - CO2 Unconverted
      var referenceAmount = 0.205467651992565;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var data1 = {
        item: "CO2 Unconverted",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2/kg Ethanol",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2/kg Ethanol",
        activeAmount: activeAmount,
        activeUnit: "kg CO2/kg Ethanol"
      };

      // SOEC-CO - Ethanol - CO2 Capture Process
      var referenceAmount = this.co2;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var emission = activeAmount * 7.04 * 0.252583488082951; // 0.25 is the reference value for allocation factor for Ethanol
      var converted = -emission / data0.emission;
      var converted2 = emission / this.ethanol;
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

      // SOEC-CO - Ethanol - Co-electrolysis
      var referenceAmount = 57.3522215169787;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var data3 = {
        item: "Co-electrolysis",
        referenceAmount: referenceAmount,
        referenceUnit: "kWh/kg Ethanol",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kWh/kg Ethanol",
        activeAmount: activeAmount,
        activeUnit: "kWh/kg Ethanol"
      };

      // SOEC-CO - Ethanol - Allocation Factor for Ethanol
      var referenceAmount = 0.252583488082951;
      var data4 = {
        item: "Allocation Factor for Ethanol",
        referenceAmount: referenceAmount,
        referenceUnit: "for Ethanol (energy)"
      };

      // SOEC-CO - Ethanol - Total
      var intermediateAmount = data3.intermediateAmount;
      var activeAmount = this.reductionElectricity.SOECCO.ethanol.electricity;
      var emission =
        (activeAmount * this.electricity + data1.activeAmount) *
        data4.referenceAmount;
      var converted = -emission / data0.emission;
      var converted2 = emission / this.ethanol;
      var data5 = {
        item: "Total",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kWh/kg Ethanol",
        activeAmount: activeAmount,
        activeUnit: "kWh/kg Ethanol",
        emission: emission,
        converted: converted,
        converted2: converted2
      };

      // SOEC-CO - Ethanol - Combustion
      var referenceAmount = this.emissionFactors.fuelCycleEmissions.ethanol;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var emission = activeAmount;
      var converted = -emission / data0.emission;
      var converted2 = emission / this.ethanol;
      var data6 = {
        item: "Combustion",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2/kg Ethanol",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2/kg Ethanol",
        activeAmount: activeAmount,
        activeUnit: "kg CO2/kg Ethanol",
        emission: emission,
        converted: converted,
        converted2: converted2
      };

      // SOEC-CO - Ethanol - Net
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
        {},
        data6,
        {},
        data7
      ];
    },
    getMethane2() {
      // SOEC-EL - Methane - CO2 Converted
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
        converted2: converted2
      };

      // SOEC-EL - Methane - CO2 Unconverted
      var referenceAmount = 0.306;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var data1 = {
        item: "CO2 Unconverted",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2/kg Methane",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2eq/kg Methane",
        activeAmount: activeAmount,
        activeUnit: "kg CO2eq/kg Methane"
      };

      // SOEC-EL - Methane - CO2 Capture Process
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
        converted2: converted2
      };

      // SOEC-EL - Methane - Hydrogen Amount
      var referenceAmount = 0.52;
      var data3 = {
        item: "Hydrogen Amount",
        referenceAmount: referenceAmount,
        referenceUnit: "kg H2/kg Methane"
      };

      // SOEC-EL - Methane - Electrolysis for H2
      var referenceAmount = 41;
      var intermediateAmount = referenceAmount * data3.referenceAmount;
      var activeAmount = this.reductionElectricity.SOECEL.methane.electrolysis;
      var emission = activeAmount * this.electricity;
      var converted = -emission / data0.emission;
      var converted2 = emission / this.methane;
      var data4 = {
        item: "Electrolysis for H2",
        referenceAmount: referenceAmount,
        referenceUnit: "kWh/kg H2",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kWh/kg Methane",
        activeAmount: activeAmount,
        activeUnit: "kWh/kg Methane",
        emission: emission,
        converted: converted,
        converted2: converted2
      };

      // SOEC-EL - Methane - Methanation
      var referenceAmount = 0.335;
      var intermediateAmount = referenceAmount;
      var activeAmount = this.reductionElectricity.SOECEL.methane
        .secondConversion;
      var emission = activeAmount * this.electricity + data1.activeAmount;
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
        converted2: converted2
      };

      // SOEC-EL - Methane - Combustion
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
        converted2: converted2
      };

      // SOEC-EL - Methane - Net
      var emission =
        data0.emission +
        data2.emission +
        data4.emission +
        data5.emission +
        data6.emission;
      var converted =
        data0.converted +
        data2.converted +
        data4.converted +
        data5.converted +
        data6.converted;
      var converted2 =
        data0.converted2 +
        data2.converted2 +
        data4.converted2 +
        data5.converted2 +
        data6.converted2;
      var data7 = {
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
        {},
        data5,
        {},
        data6,
        {},
        data7
      ];
    },
    getMethanol2() {
      // SOEC-EL - Methanol - CO2 Converted
      var referenceAmount = 1.374;
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

      // SOEC-EL - Methanol - CO2 Unconverted
      var referenceAmount = 0.153;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var data1 = {
        item: "CO2 Unconverted",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2/kg Methanol",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2eq/kg Methanol",
        activeAmount: activeAmount,
        activeUnit: "kg CO2eq/kg Methanol"
      };

      // SOEC-EL - Methanol - CO2 Capture Process
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

      // SOEC-EL - Methanol - Hydrogen Amount
      var referenceAmount = 0.189;
      var data3 = {
        item: "Hydrogen Amount",
        referenceAmount: referenceAmount,
        referenceUnit: "kg H2/kg Methanol"
      };

      // SOEC-EL - Methanol - Electrolysis for H2
      var referenceAmount = 41;
      var intermediateAmount = referenceAmount * data3.referenceAmount;
      var activeAmount = this.reductionElectricity.SOECEL.methanol.electrolysis;
      var emission = activeAmount * this.electricity;
      var converted = -emission / data0.emission;
      var converted2 = emission / this.methanol;
      var data4 = {
        item: "Electrolysis for H2",
        referenceAmount: referenceAmount,
        referenceUnit: "kWh/kg H2",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kWh/kg Methanol",
        activeAmount: activeAmount,
        activeUnit: "kWh/kg Methanol",
        emission: emission,
        converted: converted,
        converted2: converted2
      };

      // SOEC-EL - Methanol - Methanol Synthesis
      var referenceAmount = 1.271;
      var intermediateAmount = referenceAmount;
      var activeAmount = this.reductionElectricity.SOECEL.methanol
        .secondConversion;
      var emission = activeAmount * this.electricity + data1.activeAmount;
      var converted = -emission / data0.emission;
      var converted2 = emission / this.methanol;
      var data5 = {
        item: "Methanol Synthesis",
        referenceAmount: referenceAmount,
        referenceUnit: "kWh/kg Methanol",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kWh/kg Methanol",
        activeAmount: activeAmount,
        activeUnit: "kWh/kg Methanol",
        emission: emission,
        converted: converted,
        converted2: converted2
      };

      // SOEC-EL - Methanol - Combustion
      var referenceAmount = this.emissionFactors.fuelCycleEmissions.methanol
        .emission;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var emission = activeAmount;
      var converted = -emission / data0.emission;
      var converted2 = emission / this.methanol;
      var data6 = {
        item: "Combustion",
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

      // SOEC-EL - Methanol - Net
      var emission =
        data0.emission +
        data2.emission +
        data4.emission +
        data5.emission +
        data6.emission;
      var converted =
        data0.converted +
        data2.converted +
        data4.converted +
        data5.converted +
        data6.converted;
      var converted2 =
        data0.converted2 +
        data2.converted2 +
        data4.converted2 +
        data5.converted2 +
        data6.converted2;
      var data7 = {
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
        {},
        data5,
        {},
        data6,
        {},
        data7
      ];
    },
    getDiesel2() {
      // SOEC-EL - Diesel - CO2 Converted
      var referenceAmount = 0.07;
      var intermediateAmount = 3.11; // Combustion reference value
      var activeAmount = intermediateAmount;
      var emission = -activeAmount;
      var converted = -emission / emission;
      var converted2 = emission / this.fischerTropschDiesel;
      var data0 = {
        item: "CO2 Converted",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2/MJ Diesel",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2/kg Diesel",
        activeAmount: activeAmount,
        activeUnit: "kg CO2/kg Diesel",
        emission: emission,
        converted: converted,
        converted2: converted2
      };

      // SOEC-EL - Diesel - CO2 Unconverted
      var referenceAmount = 0.008;
      var intermediateAmount = data0.intermediateAmount / 9;
      var activeAmount = intermediateAmount;
      var data1 = {
        item: "CO2 Unconverted",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2/MJ Diesel",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2eq/kg Diesel",
        activeAmount: activeAmount,
        activeUnit: "kg CO2eq/kg Diesel"
      };

      // SOEC-EL - Diesel - CO2 Capture Process
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
        converted2: converted2
      };

      // SOEC-EL - Diesel - Electrolysis for H2
      var referenceAmount = 2;
      var intermediateAmount =
        referenceAmount *
        this.fischerTropschDiesel *
        this.energyUnitConversions.energyConversion.MJtokWh;
      var activeAmount = this.reductionElectricity.SOECEL.diesel.electrolysis;
      var emission = activeAmount * this.electricity;
      var converted = -emission / data0.emission;
      var converted2 = emission / this.fischerTropschDiesel;
      var data3 = {
        item: "Electrolysis for H2",
        referenceAmount: referenceAmount,
        referenceUnit: "MJ/MJ of Diesel",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kWh/kg Diesel",
        activeAmount: activeAmount,
        activeUnit: "kWh/kg Diesel",
        emission: emission,
        converted: converted,
        converted2: converted2
      };

      // SOEC-EL - Diesel - Fischer-Tropsch
      var referenceAmount = 0.03;
      var intermediateAmount = referenceAmount * this.fischerTropschDiesel;
      var activeAmount = intermediateAmount;
      var emission = activeAmount + data1.activeAmount;
      var converted = -emission / data0.emission;
      var converted2 = emission / this.fischerTropschDiesel;
      var data4 = {
        item: "Fischer-Tropsch",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2/MJ Diesel",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2/kg Diesel",
        activeAmount: activeAmount,
        activeUnit: "kg CO2/kg Diesel",
        emission: emission,
        converted: converted,
        converted2: converted2
      };

      // SOEC-EL - Diesel - Combustion
      var referenceAmount = this.emissionFactors.fuelCycleEmissions.diesel;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var emission = activeAmount;
      var converted = -emission / data0.emission;
      var converted2 = emission / this.fischerTropschDiesel;
      var data5 = {
        item: "Combustion",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2/kg Diesel",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2/kg Diesel",
        activeAmount: activeAmount,
        activeUnit: "kg CO2/kg Diesel",
        emission: emission,
        converted: converted,
        converted2: converted2
      };

      // SOEC-EL - Diesel - Net
      var emission =
        data0.emission +
        data2.emission +
        data3.emission +
        data4.emission +
        data5.emission;
      var converted =
        data0.converted +
        data2.converted +
        data3.converted +
        data4.converted +
        data5.converted;
      var converted2 =
        data0.converted2 +
        data2.converted2 +
        data3.converted2 +
        data4.converted2 +
        data5.converted2;
      var data6 = {
        item: "Net",
        emission: emission,
        converted: converted,
        converted2: converted2
      };

      return [data0, data1, data2, {}, data3, {}, data4, {}, data5, {}, data6];
    },
    getMethane3() {
      // PEM - Methane - CO2 Converted
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
        converted2: converted2
      };

      // PEM - Methane - CO2 Unconverted
      var referenceAmount = 0.306;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var data1 = {
        item: "CO2 Unconverted",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2/kg Methane",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2eq/kg Methane",
        activeAmount: activeAmount,
        activeUnit: "kg CO2eq/kg Methane"
      };

      // PEM - Methane - CO2 Capture Process
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
        converted2: converted2
      };

      // PEM - Methane - Hydrogen Amount
      var referenceAmount = 0.52;
      var data3 = {
        item: "Hydrogen Amount",
        referenceAmount: referenceAmount,
        referenceUnit: "kg H2/kg Methane"
      };

      // PEM - Methane - Electrolysis for H2
      var referenceAmount = 54.73;
      var intermediateAmount = referenceAmount * data3.referenceAmount;
      var activeAmount = intermediateAmount;
      var emission = activeAmount * this.electricity;
      var converted = -emission / data0.emission;
      var converted2 = emission / this.methane;
      var data4 = {
        item: "Electrolysis for H2",
        referenceAmount: referenceAmount,
        referenceUnit: "kWh/kg H2",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kWh/kg Methane",
        activeAmount: activeAmount,
        activeUnit: "kWh/kg Methane",
        emission: emission,
        converted: converted,
        converted2: converted2
      };

      // PEM - Methane - Methanation
      var referenceAmount = 0.335;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var emission = activeAmount * this.electricity + data1.activeAmount;
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
        converted2: converted2
      };

      // PEM - Methane - Combustion
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
        converted2: converted2
      };

      // SOEC-CO - Methane - Net
      var emission =
        data0.emission +
        data2.emission +
        data4.emission +
        data5.emission +
        data6.emission;
      var converted =
        data0.converted +
        data2.converted +
        data4.converted +
        data5.converted +
        data6.converted;
      var converted2 =
        data0.converted2 +
        data2.converted2 +
        data4.converted2 +
        data5.converted2 +
        data6.converted2;
      var data7 = {
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
        {},
        data5,
        {},
        data6,
        {},
        data7
      ];
    },
    getMethanol3() {
      // PEM - Methanol - CO2 Converted
      var referenceAmount = 1.374;
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

      // PEM - Methanol - CO2 Unconverted
      var referenceAmount = 0.153;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var data1 = {
        item: "CO2 Unconverted",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2/kg Methanol",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2eq/kg Methanol",
        activeAmount: activeAmount,
        activeUnit: "kg CO2eq/kg Methanol"
      };

      // PEM - Methanol - CO2 Capture Process
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

      // PEM - Methanol - Hydrogen Amount
      var referenceAmount = 0.189;
      var data3 = {
        item: "Hydrogen Amount",
        referenceAmount: referenceAmount,
        referenceUnit: "kg H2/kg Methanol"
      };

      // PEM - Methanol - Electrolysis for H2
      var referenceAmount = 54.73;
      var intermediateAmount = referenceAmount * data3.referenceAmount;
      var activeAmount = intermediateAmount;
      var emission = activeAmount * this.electricity;
      var converted = -emission / data0.emission;
      var converted2 = emission / this.methanol;
      var data4 = {
        item: "Electrolysis for H2",
        referenceAmount: referenceAmount,
        referenceUnit: "kWh/kg H2",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kWh/kg Methanol",
        activeAmount: activeAmount,
        activeUnit: "kWh/kg Methanol",
        emission: emission,
        converted: converted,
        converted2: converted2
      };

      // PEM - Methanol - Methanol Synthesis
      var referenceAmount = 1.271;
      var intermediateAmount = referenceAmount;
      var activeAmount = this.reductionElectricity.SOECEL.methanol
        .secondConversion;
      var emission = activeAmount * this.electricity + data1.activeAmount;
      var converted = -emission / data0.emission;
      var converted2 = emission / this.methanol;
      var data5 = {
        item: "Methanol Synthesis",
        referenceAmount: referenceAmount,
        referenceUnit: "kWh/kg Methanol",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kWh/kg Methanol",
        activeAmount: activeAmount,
        activeUnit: "kWh/kg Methanol",
        emission: emission,
        converted: converted,
        converted2: converted2
      };

      // PEM - Methanol - Combustion
      var referenceAmount = this.emissionFactors.fuelCycleEmissions.methanol
        .emission;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var emission = activeAmount;
      var converted = -emission / data0.emission;
      var converted2 = emission / this.methanol;
      var data6 = {
        item: "Combustion",
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

      // PEM - Methanol - Net
      var emission =
        data0.emission +
        data2.emission +
        data4.emission +
        data5.emission +
        data6.emission;
      var converted =
        data0.converted +
        data2.converted +
        data4.converted +
        data5.converted +
        data6.converted;
      var converted2 =
        data0.converted2 +
        data2.converted2 +
        data4.converted2 +
        data5.converted2 +
        data6.converted2;
      var data7 = {
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
        {},
        data5,
        {},
        data6,
        {},
        data7
      ];
    },
    getDiesel3() {
      // PEM - Diesel - CO2 Converted
      var referenceAmount = 0.07;
      var intermediateAmount = referenceAmount * this.fischerTropschDiesel;
      var activeAmount = intermediateAmount;
      var emission = -activeAmount;
      var converted = -emission / emission;
      var converted2 = emission / this.fischerTropschDiesel;
      var data0 = {
        item: "CO2 Converted",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2/MJ Diesel",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2/kg Diesel",
        activeAmount: activeAmount,
        activeUnit: "kg CO2/kg Diesel",
        emission: emission,
        converted: converted,
        converted2: converted2
      };

      // PEM - Diesel - CO2 Unconverted
      var referenceAmount = 0.008;
      var intermediateAmount = referenceAmount * this.fischerTropschDiesel;
      var activeAmount = intermediateAmount;
      var data1 = {
        item: "CO2 Unconverted",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2/MJ Diesel",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2eq/kg Diesel",
        activeAmount: activeAmount,
        activeUnit: "kg CO2eq/kg Diesel"
      };

      // PEM - Diesel - CO2 Capture Process
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
        converted2: converted2
      };

      // PEM - Diesel - Electrolysis for H2
      var referenceAmount = 2;
      var intermediateAmount =
        referenceAmount *
        this.fischerTropschDiesel *
        this.energyUnitConversions.energyConversion.MJtokWh;
      var activeAmount = intermediateAmount;
      var emission = activeAmount * this.electricity;
      var converted = -emission / data0.emission;
      var converted2 = emission / this.fischerTropschDiesel;
      var data3 = {
        item: "Electrolysis for H2",
        referenceAmount: referenceAmount,
        referenceUnit: "MJ/MJ of Diesel",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kWh/kg Diesel",
        activeAmount: activeAmount,
        activeUnit: "kWh/kg Diesel",
        emission: emission,
        converted: converted,
        converted2: converted2
      };

      // PEM - Diesel - Fischer-Tropsch
      var referenceAmount = 0.03;
      var intermediateAmount = referenceAmount * this.fischerTropschDiesel;
      var activeAmount = intermediateAmount;
      var emission = activeAmount + data1.activeAmount;
      var converted = -emission / data0.emission;
      var converted2 = emission / this.fischerTropschDiesel;
      var data4 = {
        item: "Fischer-Tropsch",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2/MJ Diesel",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2/kg Diesel",
        activeAmount: activeAmount,
        activeUnit: "kg CO2/kg Diesel",
        emission: emission,
        converted: converted,
        converted2: converted2
      };

      // PEM - Diesel - Combustion
      var referenceAmount = this.emissionFactors.fuelCycleEmissions.diesel;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var emission = activeAmount;
      var converted = -emission / data0.emission;
      var converted2 = emission / this.fischerTropschDiesel;
      var data5 = {
        item: "Combustion",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2/kg Diesel",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2/kg Diesel",
        activeAmount: activeAmount,
        activeUnit: "kg CO2/kg Diesel",
        emission: emission,
        converted: converted,
        converted2: converted2
      };

      // PEM - Diesel - Net
      var emission =
        data0.emission +
        data2.emission +
        data3.emission +
        data4.emission +
        data5.emission;
      var converted =
        data0.converted +
        data2.converted +
        data3.converted +
        data4.converted +
        data5.converted;
      var converted2 =
        data0.converted2 +
        data2.converted2 +
        data3.converted2 +
        data4.converted2 +
        data5.converted2;
      var data6 = {
        item: "Net",
        emission: emission,
        converted: converted,
        converted2: converted2
      };

      return [data0, data1, data2, {}, data3, {}, data4, {}, data5, {}, data6];
    },
    getSummary() {
      // SOEC-CO - Syngas
      var data0 = {
        category: "CO2 Reduction Involving Electricity",
        subCategory: "SOEC-CO",
        product: "Syngas",
        co2Converted: this.subPathways[0].value[0].converted,
        co2CaptureProcess: this.subPathways[0].value[2].converted,
        electrolysis: 0,
        co2ConversionProcess: this.subPathways[0].value[7].converted,
        endUse: 0,
        net: this.subPathways[0].value[9].converted,
        lit1: 0,
        lit2: 0,
        lit3: 0,
        lit4: 0,
        co2Converted2: this.subPathways[0].value[0].emission,
        co2CaptureProcess2: this.subPathways[0].value[2].emission,
        electrolysis2: this.subPathways[0].value[7].emission,
        co2ConversionProcess2: 0,
        endUse2: 0,
        net2: this.subPathways[0].value[9].emission,
        avoidedEmission2: 0,
        avoidedEmission: 0,
        globalEmissionReductionPotential: 0
      };

      // SOEC-CO - Methane
      var avoidedEmission2 =
        this.Methane[this.Methane.length - 1].converted -
        this.subPathways[1].value[14].converted2;
      var avoidedEmission =
        this.Methane[this.Methane.length - 1].emission -
        this.subPathways[1].value[14].emission;
      var gerp = avoidedEmission * this.constants.methane * 0.5;
      var data1 = {
        category: "CO2 Reduction Involving Electricity",
        subCategory: "SOEC-CO",
        product: "Methane",
        co2Converted: this.subPathways[1].value[0].converted,
        co2CaptureProcess: this.subPathways[1].value[2].converted,
        electrolysis: this.subPathways[1].value[10].converted,
        co2ConversionProcess: this.subPathways[1].value[4].converted,
        endUse: this.subPathways[1].value[12].converted,
        net: this.subPathways[1].value[14].converted,
        lit1: 0,
        lit2: 0,
        lit3: 0,
        lit4: 0,
        co2Converted2: this.subPathways[1].value[0].emission,
        co2CaptureProcess2: this.subPathways[1].value[2].emission,
        electrolysis2: this.subPathways[1].value[10].emission,
        co2ConversionProcess2: this.subPathways[1].value[4].emission,
        endUse2: this.subPathways[1].value[12].emission,
        net2: this.subPathways[1].value[14].emission,
        avoidedEmission2: avoidedEmission2,
        avoidedEmission: avoidedEmission,
        globalEmissionReductionPotential: gerp
      };

      // SOEC-CO - Methanol
      var avoidedEmission2 =
        this.Methanol[this.Methanol.length - 1].converted -
        this.subPathways[2].value[12].converted2;
      var avoidedEmission =
        this.Methanol[this.Methanol.length - 1].emission -
        this.subPathways[2].value[12].emission;
      var gerp = avoidedEmission * this.constants.methanol * 0.5;
      var data2 = {
        category: "CO2 Reduction Involving Electricity",
        subCategory: "SOEC-CO",
        product: "Methanol",
        co2Converted: this.subPathways[2].value[0].converted,
        co2CaptureProcess: this.subPathways[2].value[2].converted,
        electrolysis: 0,
        co2ConversionProcess: this.subPathways[2].value[8].converted,
        endUse: this.subPathways[2].value[10].converted,
        net: this.subPathways[2].value[12].converted,
        lit1: 0,
        lit2: 0,
        lit3: 0,
        lit4: 0,
        co2Converted2: this.subPathways[2].value[0].emission,
        co2CaptureProcess2: this.subPathways[2].value[2].emission,
        electrolysis2: this.subPathways[2].value[8].emission,
        co2ConversionProcess2: this.subPathways[2].value[4].emission,
        endUse2: this.subPathways[2].value[10].emission,
        net2: this.subPathways[2].value[12].emission,
        avoidedEmission2: avoidedEmission2,
        avoidedEmission: avoidedEmission,
        globalEmissionReductionPotential: gerp
      };

      // SOEC-CO - Diesel
      var avoidedEmission2 =
        this.Diesel[this.Diesel.length - 1].converted -
        this.subPathways[3].value[12].converted2;
      var avoidedEmission =
        this.Diesel[this.Diesel.length - 1].emission -
        this.subPathways[3].value[12].emission;
      var gerp = avoidedEmission * this.constants.diesel * 0.5;
      var data3 = {
        category: "CO2 Reduction Involving Electricity",
        subCategory: "SOEC-CO",
        product: "Diesel",
        co2Converted: this.subPathways[3].value[0].converted,
        co2CaptureProcess: this.subPathways[3].value[2].converted,
        electrolysis: 0,
        co2ConversionProcess: this.subPathways[3].value[8].converted,
        endUse: this.subPathways[3].value[10].converted,
        net: this.subPathways[3].value[12].converted,
        lit1: 0,
        lit2: 0,
        lit3: 0,
        lit4: 0,
        co2Converted2: this.subPathways[3].value[0].emission,
        co2CaptureProcess2: this.subPathways[3].value[2].emission,
        electrolysis2: this.subPathways[3].value[7].emission,
        co2ConversionProcess2: this.subPathways[3].value[8].emission,
        endUse2: this.subPathways[3].value[10].emission,
        net2: this.subPathways[3].value[12].emission,
        avoidedEmission2: avoidedEmission2,
        avoidedEmission: avoidedEmission,
        globalEmissionReductionPotential: gerp
      };

      // SOEC-CO - Ethanol
      var avoidedEmission2 =
        this.Ethanol[this.Ethanol.length - 1].converted -
        this.subPathways[4].value[10].converted2;
      var avoidedEmission =
        this.Ethanol[this.Ethanol.length - 1].emission -
        this.subPathways[4].value[10].emission;
      var gerp = avoidedEmission * this.constants.ethanol * 0.5;
      var data4 = {
        category: "CO2 Reduction Involving Electricity",
        subCategory: "SOEC-CO",
        product: "Ethanol",
        co2Converted: this.subPathways[4].value[0].converted,
        co2CaptureProcess: this.subPathways[4].value[2].converted,
        electrolysis: 0,
        co2ConversionProcess: this.subPathways[4].value[6].converted,
        endUse: this.subPathways[4].value[8].converted,
        net: this.subPathways[4].value[10].converted,
        lit1: 0,
        lit2: 0,
        lit3: 0,
        lit4: 0,
        co2Converted2: this.subPathways[4].value[0].emission,
        co2CaptureProcess2: this.subPathways[4].value[2].emission,
        electrolysis2: this.subPathways[4].value[6].emission,
        co2ConversionProcess2: 0,
        endUse2: this.subPathways[4].value[8].emission,
        net2: this.subPathways[4].value[10].emission,
        avoidedEmission2: avoidedEmission2,
        avoidedEmission: avoidedEmission,
        globalEmissionReductionPotential: gerp
      };

      // SOEC-EL - Methane
      var literatureValues = {
        lit1: 0,
        lit2: 0,
        lit3: 0,
        lit1_2: 0,
        lit2_2: 0,
        lit3_2: 0
      };
      if (this.defaultEmission.electricity.active === "Natural gas") {
        literatureValues.lit1 = this.reductionElectricityLit.SOECEL.methane.conversion.baseline[0];
        literatureValues.lit2 = this.reductionElectricityLit.SOECEL.methane.conversion.baseline[1];
        literatureValues.lit3 = this.reductionElectricityLit.SOECEL.methane.conversion.baseline[2];
        literatureValues.lit1_2 = this.reductionElectricityLit.SOECEL.methane.emission.baseline[0];
        literatureValues.lit2_2 = this.reductionElectricityLit.SOECEL.methane.emission.baseline[1];
        literatureValues.lit3_2 = this.reductionElectricityLit.SOECEL.methane.emission.baseline[2];
      } else if (this.defaultEmission.electricity.active === "Renewable") {
        literatureValues.lit1 = this.reductionElectricityLit.SOECEL.methane.conversion.low[0];
        literatureValues.lit2 = this.reductionElectricityLit.SOECEL.methane.conversion.low[1];
        literatureValues.lit3 = this.reductionElectricityLit.SOECEL.methane.conversion.low[2];
        literatureValues.lit1_2 = this.reductionElectricityLit.SOECEL.methane.emission.low[0];
        literatureValues.lit2_2 = this.reductionElectricityLit.SOECEL.methane.emission.low[1];
        literatureValues.lit3_2 = this.reductionElectricityLit.SOECEL.methane.emission.low[2];
      } else if (this.defaultEmission.electricity.active === "Coal fired") {
        literatureValues.lit1 = this.reductionElectricityLit.SOECEL.methane.conversion.high[0];
        literatureValues.lit2 = this.reductionElectricityLit.SOECEL.methane.conversion.high[1];
        literatureValues.lit3 = this.reductionElectricityLit.SOECEL.methane.conversion.high[2];
        literatureValues.lit1_2 = this.reductionElectricityLit.SOECEL.methane.emission.high[0];
        literatureValues.lit2_2 = this.reductionElectricityLit.SOECEL.methane.emission.high[1];
        literatureValues.lit3_2 = this.reductionElectricityLit.SOECEL.methane.emission.high[2];
      }
      var avoidedEmission2 =
        this.Methane[this.Methane.length - 1].converted -
        this.subPathways[5].value[11].converted2;
      var avoidedEmission =
        this.Methane[this.Methane.length - 1].emission -
        this.subPathways[5].value[11].emission;
      var gerp = avoidedEmission * this.constants.methane * 0.5;
      var data5 = {
        category: "CO2 Reduction Involving Electricity",
        subCategory: "SOEC-EL",
        product: "Methane",
        co2Converted: this.subPathways[5].value[0].converted,
        co2CaptureProcess: this.subPathways[5].value[2].converted,
        electrolysis: this.subPathways[5].value[5].converted,
        co2ConversionProcess: this.subPathways[5].value[7].converted,
        endUse: this.subPathways[5].value[9].converted,
        net: this.subPathways[5].value[11].converted,
        lit1: literatureValues.lit1,
        lit2: literatureValues.lit2,
        lit3: literatureValues.lit3,
        lit4: 0,
        co2Converted2: this.subPathways[5].value[0].emission,
        co2CaptureProcess2: this.subPathways[5].value[2].emission,
        electrolysis2: this.subPathways[5].value[5].emission,
        co2ConversionProcess2: this.subPathways[5].value[7].emission,
        endUse2: this.subPathways[5].value[9].emission,
        net2: this.subPathways[5].value[11].emission,
        lit1_2: literatureValues.lit1_2,
        lit2_2: literatureValues.lit2_2,
        lit3_2: literatureValues.lit3_2,
        avoidedEmission2: avoidedEmission2,
        avoidedEmission: avoidedEmission,
        globalEmissionReductionPotential: gerp
      };

      // SOEC-EL - Methanol
      var literatureValues = {
        lit1: 0,
        lit2: 0,
        lit3: 0,
        lit4: 0,
        lit1_2: 0,
        lit2_2: 0,
        lit3_2: 0,
        lit4_2: 0
      };
      if (this.defaultEmission.electricity.active === "Natural gas") {
        literatureValues.lit1 = this.reductionElectricityLit.SOECEL.methanol.conversion.baseline[0];
        literatureValues.lit2 = this.reductionElectricityLit.SOECEL.methanol.conversion.baseline[1];
        literatureValues.lit3 = this.reductionElectricityLit.SOECEL.methanol.conversion.baseline[2];
        literatureValues.lit4 = this.reductionElectricityLit.SOECEL.methanol.conversion.baseline[3];
        literatureValues.lit1_2 = this.reductionElectricityLit.SOECEL.methanol.emission.baseline[0];
        literatureValues.lit2_2 = this.reductionElectricityLit.SOECEL.methanol.emission.baseline[1];
        literatureValues.lit3_2 = this.reductionElectricityLit.SOECEL.methanol.emission.baseline[2];
        literatureValues.lit4_2 = this.reductionElectricityLit.SOECEL.methanol.emission.baseline[3];
      } else if (this.defaultEmission.electricity.active === "Renewable") {
        literatureValues.lit1 = this.reductionElectricityLit.SOECEL.methanol.conversion.low[0];
        literatureValues.lit2 = this.reductionElectricityLit.SOECEL.methanol.conversion.low[1];
        literatureValues.lit3 = this.reductionElectricityLit.SOECEL.methanol.conversion.low[2];
        literatureValues.lit4 = this.reductionElectricityLit.SOECEL.methanol.conversion.low[3];
        literatureValues.lit1_2 = this.reductionElectricityLit.SOECEL.methanol.emission.low[0];
        literatureValues.lit2_2 = this.reductionElectricityLit.SOECEL.methanol.emission.low[1];
        literatureValues.lit3_2 = this.reductionElectricityLit.SOECEL.methanol.emission.low[2];
        literatureValues.lit4_2 = this.reductionElectricityLit.SOECEL.methanol.emission.low[3];
      } else if (this.defaultEmission.electricity.active === "Coal fired") {
        literatureValues.lit1 = this.reductionElectricityLit.SOECEL.methanol.conversion.high[0];
        literatureValues.lit2 = this.reductionElectricityLit.SOECEL.methanol.conversion.high[1];
        literatureValues.lit3 = this.reductionElectricityLit.SOECEL.methanol.conversion.high[2];
        literatureValues.lit4 = this.reductionElectricityLit.SOECEL.methanol.conversion.high[3];
        literatureValues.lit1_2 = this.reductionElectricityLit.SOECEL.methanol.emission.high[0];
        literatureValues.lit2_2 = this.reductionElectricityLit.SOECEL.methanol.emission.high[1];
        literatureValues.lit3_2 = this.reductionElectricityLit.SOECEL.methanol.emission.high[2];
        literatureValues.lit4_2 = this.reductionElectricityLit.SOECEL.methanol.emission.high[3];
      }
      var avoidedEmission2 =
        this.Methanol[this.Methanol.length - 1].converted -
        this.subPathways[6].value[11].converted2;
      var avoidedEmission =
        this.Methanol[this.Methanol.length - 1].emission -
        this.subPathways[6].value[11].emission;
      var gerp = avoidedEmission * this.constants.methanol * 0.5;
      var data6 = {
        category: "CO2 Reduction Involving Electricity",
        subCategory: "SOEC-EL",
        product: "Methanol",
        co2Converted: this.subPathways[6].value[0].converted,
        co2CaptureProcess: this.subPathways[6].value[2].converted,
        electrolysis: this.subPathways[6].value[5].converted,
        co2ConversionProcess: this.subPathways[6].value[7].converted,
        endUse: this.subPathways[6].value[9].converted,
        net: this.subPathways[6].value[11].converted,
        lit1: literatureValues.lit1,
        lit2: literatureValues.lit2,
        lit3: literatureValues.lit3,
        lit4: literatureValues.lit4,
        co2Converted2: this.subPathways[6].value[0].emission,
        co2CaptureProcess2: this.subPathways[6].value[2].emission,
        electrolysis2: this.subPathways[6].value[5].emission,
        co2ConversionProcess2: this.subPathways[6].value[7].emission,
        endUse2: this.subPathways[6].value[9].emission,
        net2: this.subPathways[6].value[11].emission,
        lit1_2: literatureValues.lit1_2,
        lit2_2: literatureValues.lit2_2,
        lit3_2: literatureValues.lit3_2,
        lit4_2: literatureValues.lit4_2,
        avoidedEmission2: avoidedEmission2,
        avoidedEmission: avoidedEmission,
        globalEmissionReductionPotential: gerp
      };

      // SOEC-EL - Diesel
      var avoidedEmission2 =
        this.Diesel[this.Diesel.length - 1].converted -
        this.subPathways[7].value[10].converted2;
      var avoidedEmission =
        this.Diesel[this.Diesel.length - 1].emission -
        this.subPathways[7].value[10].emission;
      var gerp = avoidedEmission * this.constants.diesel * 0.5;
      var data7 = {
        category: "CO2 Reduction Involving Electricity",
        subCategory: "SOEC-EL",
        product: "Diesel",
        co2Converted: this.subPathways[7].value[0].converted,
        co2CaptureProcess: this.subPathways[7].value[2].converted,
        electrolysis: this.subPathways[7].value[4].converted,
        co2ConversionProcess: this.subPathways[7].value[6].converted,
        endUse: this.subPathways[7].value[8].converted,
        net: this.subPathways[7].value[10].converted,
        lit1: 0,
        lit2: 0,
        lit3: 0,
        lit4: 0,
        co2Converted2: this.subPathways[7].value[0].emission,
        co2CaptureProcess2: this.subPathways[7].value[2].emission,
        electrolysis2: this.subPathways[7].value[4].emission,
        co2ConversionProcess2: this.subPathways[7].value[6].emission,
        endUse2: this.subPathways[7].value[8].emission,
        net2: this.subPathways[7].value[10].emission,
        avoidedEmission2: avoidedEmission2,
        avoidedEmission: avoidedEmission,
        globalEmissionReductionPotential: gerp
      };

      // PEM - Methane
      var avoidedEmission2 =
        this.Methane[this.Methane.length - 1].converted -
        this.subPathways[8].value[11].converted2;
      var avoidedEmission =
        this.Methane[this.Methane.length - 1].emission -
        this.subPathways[8].value[11].emission;
      var gerp = avoidedEmission * this.constants.methane * 0.5;
      var data8 = {
        category: "CO2 Reduction Involving Electricity",
        subCategory: "PEM",
        product: "Methane",
        co2Converted: this.subPathways[8].value[0].converted,
        co2CaptureProcess: this.subPathways[8].value[2].converted,
        electrolysis: this.subPathways[8].value[5].converted,
        co2ConversionProcess: this.subPathways[8].value[7].converted,
        endUse: this.subPathways[8].value[9].converted,
        net: this.subPathways[8].value[11].converted,
        lit1: 0,
        lit2: 0,
        lit3: 0,
        lit4: 0,
        co2Converted2: this.subPathways[8].value[0].emission,
        co2CaptureProcess2: this.subPathways[8].value[2].emission,
        electrolysis2: this.subPathways[8].value[5].emission,
        co2ConversionProcess2: this.subPathways[8].value[7].emission,
        endUse2: this.subPathways[8].value[9].emission,
        net2: this.subPathways[8].value[11].emission,
        avoidedEmission2: avoidedEmission2,
        avoidedEmission: avoidedEmission,
        globalEmissionReductionPotential: gerp
      };

      // PEM - Methanol
      var avoidedEmission2 =
        this.Methanol[this.Methanol.length - 1].converted -
        this.subPathways[9].value[11].converted2;
      var avoidedEmission =
        this.Methanol[this.Methanol.length - 1].emission -
        this.subPathways[9].value[11].emission;
      var gerp = avoidedEmission * this.constants.methanol * 0.5;
      var data9 = {
        category: "CO2 Reduction Involving Electricity",
        subCategory: "PEM",
        product: "Methanol",
        co2Converted: this.subPathways[9].value[0].converted,
        co2CaptureProcess: this.subPathways[9].value[2].converted,
        electrolysis: this.subPathways[9].value[5].converted,
        co2ConversionProcess: this.subPathways[9].value[7].converted,
        endUse: this.subPathways[9].value[9].converted,
        net: this.subPathways[9].value[11].converted,
        lit1: 0,
        lit2: 0,
        lit3: 0,
        lit4: 0,
        co2Converted2: this.subPathways[9].value[0].emission,
        co2CaptureProcess2: this.subPathways[9].value[2].emission,
        electrolysis2: this.subPathways[9].value[5].emission,
        co2ConversionProcess2: this.subPathways[9].value[7].emission,
        endUse2: this.subPathways[9].value[9].emission,
        net2: this.subPathways[9].value[11].emission,
        avoidedEmission2: avoidedEmission2,
        avoidedEmission: avoidedEmission,
        globalEmissionReductionPotential: gerp
      };

      // PEM - Diesel
      var avoidedEmission2 =
        this.Diesel[this.Diesel.length - 1].converted -
        this.subPathways[10].value[10].converted2;
      var avoidedEmission =
        this.Diesel[this.Diesel.length - 1].emission -
        this.subPathways[10].value[10].emission;
      var gerp = avoidedEmission * this.constants.diesel * 0.5;
      var data10 = {
        category: "CO2 Reduction Involving Electricity",
        subCategory: "PEM",
        product: "Diesel",
        co2Converted: this.subPathways[10].value[0].converted,
        co2CaptureProcess: this.subPathways[10].value[2].converted,
        electrolysis: this.subPathways[10].value[4].converted,
        co2ConversionProcess: this.subPathways[10].value[6].converted,
        endUse: this.subPathways[10].value[8].converted,
        net: this.subPathways[10].value[10].converted,
        lit1: 0,
        lit2: 0,
        lit3: 0,
        lit4: 0,
        co2Converted2: this.subPathways[10].value[0].emission,
        co2CaptureProcess2: this.subPathways[10].value[2].emission,
        electrolysis2: this.subPathways[10].value[4].emission,
        co2ConversionProcess2: this.subPathways[10].value[6].emission,
        endUse2: this.subPathways[10].value[8].emission,
        net2: this.subPathways[10].value[10].emission,
        avoidedEmission2: avoidedEmission2,
        avoidedEmission: avoidedEmission,
        globalEmissionReductionPotential: gerp
      };

      return [
        data0,
        data1,
        data2,
        data3,
        data4,
        data5,
        data6,
        data7,
        data8,
        data9,
        data10
      ];
    }
  }
};
</script>
