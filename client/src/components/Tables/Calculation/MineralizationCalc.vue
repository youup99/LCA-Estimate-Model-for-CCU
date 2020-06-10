<template>
  <div>
    <el-tabs v-model="activeTabName" @tab-click="handleClick" type="card">
      <el-tab-pane label="DMC-W" name="first"
        ><div class="row">
          <div class="col-md-12">
            <span><b>Sub-Pathway: DMC-W</b></span>
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col-md-12">
            <span><b>Product: Calcite</b></span>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="WMC" name="second">
        <div class="row">
          <div class="col-md-12">
            <span><b>Sub-Pathway: WMC</b></span>
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col-md-12">
            <span><b>Product: CWM</b></span>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="DMC-O" name="third">
        <div class="row">
          <div class="col-md-12">
            <span><b>Sub-Pathway: DMC-O</b></span>
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col-md-12">
            <span><b>Product: Magnesite</b></span>
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
    ...mapState("pathways", ["mineralization"]),
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
  },
  mounted() {
    Event.$on("incumbentReady", () => {
      this.calculate();
    });
  },
  data() {
    return {
      activeTabName: "first",
      activeTabLabel: "DMC-W",
      subPathways: [],
      summary: [],
    };
  },
  methods: {
    calculate() {
      this.subPathways = [];
      this.subPathways.push(
        {
          name: "DMC-W",
          value: this.getDMCW(),
        },
        {
          name: "WMC",
          value: this.getWMC(),
        },
        {
          name: "DMC-O",
          value: this.getDMCO(),
        }
      );
      this.summary = this.getSummary();
      this.$store
        .dispatch("pathwayCalc/updateMineralization", {
          subPathways: this.subPathways,
          summary: this.summary,
        })
        .then(() => {
          Event.$emit("summary", "mineralization");
        });
    },
    handleClick(tab, event) {
      this.activeTabLabel = tab.label;
      this.$emit("tabChange", this.activeTabName, this.activeTabLabel);
    },
    getDMCW() {
      // DMC-W - CO2 Captured
      var referenceAmount = parseFloat((0.651857778015147).toFixed(3));
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var emission = -activeAmount;
      var converted = -emission / emission;
      var data0 = {
        item: "CO2 Converted",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2 conv/kg Calcite",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2 conv/kg Calcite",
        activeAmount: activeAmount,
        activeUnit: "kg CO2 conv/kg Calcite",
        emission: emission,
        converted: converted,
      };

      // DMC-W - CO2 Capture Process
      var referenceAmount = parseFloat(this.co2.toFixed(3));
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var emission = activeAmount * data0.activeAmount;
      var converted = -emission / data0.emission;
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
      };

      // DMC-W - Total Electricty
      var referenceAmount = 437;
      var intermediateAmount =
        (referenceAmount / 907.185) * Math.abs(data0.referenceAmount);
      var activeAmount = this.mineralization.DMCW.calcite.electricity;
      var emission = activeAmount * this.electricity;
      var data2 = {
        item: "Total Electricity",
        referenceAmount: referenceAmount,
        referenceUnit: "kWh/ton CO2 captured",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kWh/kg Calcite",
        activeAmount: activeAmount,
        activeUnit: "kWh/kg Calcite",
        emission: emission,
      };

      // DMC-W - Total Heat
      var referenceAmount = 170;
      var intermediateAmount =
        (referenceAmount / 907.185) *
        this.energyUnitConversions.energyConversion.MJtokWh *
        Math.abs(data0.referenceAmount);
      var activeAmount = this.mineralization.DMCW.calcite.heat;
      var emission = activeAmount * this.heat;
      var data3 = {
        item: "Total Heat",
        referenceAmount: referenceAmount,
        referenceUnit: "MJ/ton CO2 captured",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kWh/kg Calcite",
        activeAmount: activeAmount,
        activeUnit: "kWh/kg Calcite",
        emission: emission,
      };

      // DMC-W - Total
      var emission = data2.emission + data3.emission;
      var converted = -emission / data0.emission;
      var data4 = {
        item: "Total",
        emission: emission,
        converted: converted,
      };

      // DMC-W - End Use
      var active = () => {
        if (this.defaultEmission.electricity.active === "Renewable") {
          // Low carbon end use
          return 0.00042;
        } else if (this.defaultEmission.electricity.active === "Natural gas") {
          // NG end use
          return 0.00043;
        } else {
          // High carbon end use
          return 0.00046;
        }
      };
      var emission = active();
      var converted = -emission / data0.emission;
      var data5 = {
        item: "End Use",
        activeAmount: active(),
        emission: emission,
        converted: converted,
      };

      // DMC-W - Net
      var emission =
        data0.emission + data1.emission + data4.emission + data5.emission;
      var converted =
        data0.converted + data1.converted + data4.converted + data5.converted;
      var data6 = {
        item: "Net",
        emission: emission,
        converted: converted,
      };

      return [data0, data1, data2, data3, {}, data4, data5, data6];
    },
    getWMC() {
      // WMC - CO2 Captured
      var referenceAmount = 0.254 / 1.256;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var emission = -activeAmount;
      var converted = -emission / emission;
      var data0 = {
        item: "CO2 Converted",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2 conv/kg CWM",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2 conv/kg CWM",
        activeAmount: activeAmount,
        activeUnit: "kg CO2 conv/kg CWM",
        emission: emission,
        converted: converted,
      };

      // WMC - CO2 Captured Process
      var referenceAmount = this.co2;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var emission = activeAmount * data0.activeAmount;
      var converted = -emission / data0.emission;
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
      };

      // WMC - Total Electricty
      var referenceAmount = 263.7;
      var intermediateAmount =
        (referenceAmount / 907.185) * Math.abs(data0.referenceAmount);
      var activeAmount = this.mineralization.WMC.CWM.electricity;
      var emission = activeAmount * this.electricity;
      var converted = -emission / data0.emission;
      var data2 = {
        item: "Total Electricity",
        referenceAmount: referenceAmount,
        referenceUnit: "kWh/ton CO2 captured",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kWh/kg CWM",
        activeAmount: activeAmount,
        activeUnit: "kWh/kg CWM",
        emission: emission,
        converted: converted,
      };

      // WMC - End Use
      var active = () => {
        if (this.defaultEmission.electricity.active === "Renewable") {
          // Low carbon end use
          return 0.000439;
        } else {
          if (this.defaultEmission.electricity.activeAmount === "Natural gas") {
            // NG end use
            return 0.000442;
          }
          // High carbon end use
          return 0.000449;
        }
      };
      var emission = active();
      var converted = -emission / data0.emission;
      var data3 = {
        item: "End Use",
        activeAmount: active(),
        emission: emission,
        converted: converted,
      };

      // WMC - Net
      var emission =
        data0.emission + data1.emission + data2.emission + data3.emission;
      var converted =
        data0.converted + data1.converted + data2.converted + data3.converted;
      var data4 = {
        item: "Net",
        emission: emission,
        converted: converted,
      };

      return [data0, data1, data2, {}, data3, data4];
    },
    getDMCO() {
      // DMC-O - CO2 Captured
      var referenceAmount = 0.521463172145992;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var emission = -activeAmount;
      var converted = -emission / emission;
      var data0 = {
        item: "CO2 Converted",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2 conv/kg Magnesite",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kg CO2 conv/kg Magnesite",
        activeAmount: activeAmount,
        activeUnit: "kg CO2 conv/kg Magnesite",
        emission: emission,
        converted: converted,
      };

      // DMC-O - CO2 Captured Process
      var referenceAmount = this.co2;
      var intermediateAmount = referenceAmount;
      var activeAmount = intermediateAmount;
      var emission = activeAmount * data0.activeAmount;
      var converted = -emission / data0.emission;
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
      };

      // DMC-O - Total Electricty
      var referenceAmount = 866;
      var intermediateAmount =
        (referenceAmount / 907.185) * Math.abs(data0.referenceAmount);
      var activeAmount = this.mineralization.DMCO.magnesite.electricity;
      var emission = activeAmount * this.electricity;
      var converted = -emission / data0.emission;
      var data2 = {
        item: "Total Electricity",
        referenceAmount: referenceAmount,
        referenceUnit: "kWh/ton CO2 captured",
        intermediateAmount: intermediateAmount,
        intermediateUnit: "kWh/kg Magnesite",
        activeAmount: activeAmount,
        activeUnit: "kWh/kg Magnesite",
        emission: emission,
        converted: converted,
      };

      // DMC-O - End Use
      var active = () => {
        if (this.defaultEmission.electricity.active === "Renewable") {
          // Low carbon end use
          return 0.000424;
        } else {
          if (this.defaultEmission.electricity.activeAmount === "Natural gas") {
            // NG end use
            return 0.00044;
          }
          // High carbon end use
          return 0.000464;
        }
      };
      var emission = active();
      var converted = -emission / data0.emission;
      var data3 = {
        item: "End Use",
        activeAmount: active(),
        emission: emission,
        converted: converted,
      };

      // DMC-O - Net
      var emission =
        data0.emission + data1.emission + data2.emission + data3.emission;
      var converted =
        data0.converted + data1.converted + data2.converted + data3.converted;
      var data4 = {
        item: "Net",
        emission: emission,
        converted: converted,
      };

      return [data0, data1, data2, {}, data3, data4];
    },
    getSummary() {
      // WMC
      var avoidedEmission =
        this.emissionFactors.incumbent.cement -
        this.subPathways[1].value[5].emission;
      var gerp = avoidedEmission * this.constants.carbonates * 0.5;
      var data0 = {
        category: "CO2 Mineralization",
        subCategory: "WMC",
        product: "CWM",
        co2Converted: this.subPathways[1].value[0].converted,
        co2CaptureProcess: this.subPathways[1].value[1].converted,
        electrolysis: 0,
        co2ConversionProcess: this.subPathways[1].value[2].converted,
        endUse: this.subPathways[1].value[4].converted,
        net: this.subPathways[1].value[5].converted,
        // TODO: Literature Values
        co2Converted2: this.subPathways[1].value[0].emission,
        co2CaptureProcess2: this.subPathways[1].value[1].emission,
        electrolysis2: 0,
        co2ConversionProcess2: this.subPathways[1].value[2].emission,
        endUse2: this.subPathways[1].value[4].emission,
        net2: this.subPathways[1].value[5].emission,
        // TODO: Literature Values
        avoidedEmission: avoidedEmission,
        globalEmissionReductionPotential: gerp,
      };

      // DMC-W
      var avoidedEmission =
        this.emissionFactors.incumbent.cement -
        this.subPathways[0].value[7].emission;
      var gerp = avoidedEmission * this.constants.carbonates * 0.5;
      var data1 = {
        category: "CO2 Mineralization",
        subCategory: "DMC-W",
        product: "Calcite",
        co2Converted: this.subPathways[0].value[0].converted,
        co2CaptureProcess: this.subPathways[0].value[1].converted,
        electrolysis: 0,
        co2ConversionProcess: this.subPathways[0].value[5].converted,
        endUse: this.subPathways[0].value[6].converted,
        net: this.subPathways[0].value[7].converted,
        // TODO: Literature Values
        co2Converted2: this.subPathways[0].value[0].emission,
        co2CaptureProcess2: this.subPathways[0].value[1].emission,
        electrolysis2: 0,
        co2ConversionProcess2: this.subPathways[0].value[5].emission,
        endUse2: this.subPathways[0].value[6].emission,
        net2: this.subPathways[0].value[7].emission,
        // TODO: Literature Values
        avoidedEmission: avoidedEmission,
        globalEmissionReductionPotential: gerp,
      };

      // DMC-O
      var avoidedEmission =
        this.emissionFactors.incumbent.cement -
        this.subPathways[2].value[5].emission;
      var gerp = avoidedEmission * this.constants.carbonates * 0.5;
      var data2 = {
        category: "CO2 Mineralization",
        subCategory: "DMC-O",
        product: "Magnesite",
        co2Converted: this.subPathways[2].value[0].converted,
        co2CaptureProcess: this.subPathways[2].value[1].converted,
        electrolysis: 0,
        co2ConversionProcess: this.subPathways[2].value[2].converted,
        endUse: this.subPathways[2].value[4].converted,
        net: this.subPathways[2].value[5].converted,
        // TODO: Literature Values
        co2Converted2: this.subPathways[2].value[0].emission,
        co2CaptureProcess2: this.subPathways[2].value[1].emission,
        electrolysis2: 0,
        co2ConversionProcess2: this.subPathways[2].value[2].emission,
        endUse2: this.subPathways[2].value[4].emission,
        net2: this.subPathways[2].value[5].emission,
        // TODO: Literature Values
        avoidedEmission: avoidedEmission,
        globalEmissionReductionPotential: gerp,
      };

      return [data0, data1, data2];
    },
  },
};
</script>
