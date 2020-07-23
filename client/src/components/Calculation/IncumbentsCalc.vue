<template>
  <div>
    <el-tabs v-model="activeTabName" @tab-click="handleClick" type="card">
      <el-tab-pane label="Diesel" name="first">
        <div class="row">
          <div class="col-md-12">
            <span>
              <b>Product: Diesel</b>
            </span>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Ethanol" name="second">
        <div class="row">
          <div class="col-md-12">
            <span>
              <b>Product: Ethanol</b>
            </span>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Methane" name="third">
        <div class="row">
          <div class="col-md-12">
            <span>
              <b>Product: Methane</b>
            </span>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Methanol" name="fourth">
        <div class="row">
          <div class="col-md-12">
            <span>
              <b>Product: Methanol</b>
            </span>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <br />
    <el-table
      :data="
        products.find((e) => e.name === activeTabLabel) !== undefined
          ? products.find((e) => e.name === activeTabLabel).value
          : []
      "
    >
      <el-table-column label>
        <el-table-column prop="item" label="Item"></el-table-column>
      </el-table-column>
      <el-table-column label="Reference">
        <el-table-column prop="referenceAmount" label="Amount" :formatter="formatter"></el-table-column>
        <el-table-column prop="referenceUnit" label="Unit"></el-table-column>
      </el-table-column>
      <el-table-column label>
        <el-table-column prop="emission" label="kg CO2eq/kg Product" :formatter="formatter"></el-table-column>
        <el-table-column prop="converted" label="kg CO2eq/MJ Product" :formatter="formatter"></el-table-column>
      </el-table-column>
    </el-table>
  </div>
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
    },
    fischerTropschDiesel: function() {
      return this.energyUnitConversions.LHV.fischerTropschDiesel;
    },
    ethanol: function() {
      return this.energyUnitConversions.LHV.ethanol;
    },
    methane: function() {
      return this.energyUnitConversions.LHV.methane;
    },
    methanol: function() {
      return this.energyUnitConversions.LHV.methanol;
    }
  },
  mounted() {
    Event.$on("calculate", () => {
      this.calculate();
    });
  },
  data() {
    return {
      activeTabName: "first",
      activeTabLabel: "Diesel",
      products: [],
      summary: []
    };
  },
  methods: {
    calculate() {
      this.products = [];
      this.products.push(
        {
          name: "Diesel",
          value: this.getDiesel()
        },
        {
          name: "Ethanol",
          value: this.getEthanol()
        },
        {
          name: "Methane",
          value: this.getMethane()
        },
        {
          name: "Methanol",
          value: this.getMethanol()
        }
      );
      this.summary = this.getSummary();
      this.products.push({
        name: "Summary",
        value: this.summary
      });
      this.$store.dispatch("incumbents/update", this.products).then(() => {
        Event.$emit("incumbentReady");
      });
    },
    handleClick(tab, event) {
      this.activeTabLabel = tab.label;
    },
    formatter(row, column, cellValue, index) {
      if (cellValue) {
        return parseFloat(cellValue).toFixed(3);
      }
    },
    getDiesel() {
      var referenceAmount = 0.00014423627981517;
      var emission = referenceAmount;
      var converted = emission / this.fischerTropschDiesel;
      var data0 = {
        item: "Fixed Production Emissions",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2eq/kg Diesel",
        emission: emission,
        converted: converted
      };

      var referenceAmount = 0.038190131983605;
      var emission = referenceAmount * this.electricity;
      var converted = emission / this.fischerTropschDiesel;
      var data1 = {
        item: "Total Electricity Consumption",
        referenceAmount: referenceAmount,
        referenceUnit: "kWh/kg Diesel",
        emission: emission,
        converted: converted
      };

      var referenceAmount = 0.0235606723739015;
      var emission = referenceAmount * this.hydrogen;
      var converted = emission / this.fischerTropschDiesel;
      var data2 = {
        item: "Total Hydrogen Consumption",
        referenceAmount: referenceAmount,
        referenceUnit: "kg H₂/kg Diesel",
        emission: emission,
        converted: converted
      };

      var referenceAmount = 1.06058915492307;
      var emission = referenceAmount * this.heat;
      var converted = emission / this.fischerTropschDiesel;
      var data3 = {
        item: "Total Heat Consumption",
        referenceAmount: referenceAmount,
        referenceUnit: "kWh/kg Diesel",
        emission: emission,
        converted: converted
      };

      var referenceAmount = 0.395117312625428;
      var emission = referenceAmount * this.steam;
      var converted = emission / this.fischerTropschDiesel;
      var data4 = {
        item: "Total Steam Consumption",
        referenceAmount: referenceAmount,
        referenceUnit: "MJ/kg Diesel",
        emission: emission,
        converted: converted
      };

      var referenceAmount = this.emissionFactors.fuelCycleEmissions.diesel;
      var emission = referenceAmount;
      var converted = emission / this.fischerTropschDiesel;
      var data5 = {
        item: "Combustion",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2eq/kg Diesel",
        emission: emission,
        converted: converted
      };

      var emission =
        data0.emission +
        data1.emission +
        data2.emission +
        data3.emission +
        data4.emission +
        data5.emission;
      var converted =
        data0.converted +
        data1.converted +
        data2.converted +
        data3.converted +
        data4.converted +
        data5.converted;
      var data6 = {
        item: "Total",
        emission: emission,
        converted: converted
      };

      return [data0, data1, data2, data3, data4, {}, data5, {}, data6];
    },
    getEthanol() {
      var referenceAmount = 0.744291931400483;
      var emission = referenceAmount;
      var converted = emission / this.ethanol;
      var data0 = {
        item: "Fixed Production Emissions",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2eq/kg Ethanol",
        emission: emission,
        converted: converted
      };

      var referenceAmount = 0.0377454120591678;
      var emission = referenceAmount * this.electricity;
      var converted = emission / this.ethanol;
      var data1 = {
        item: "Total Electricity Consumption",
        referenceAmount: referenceAmount,
        referenceUnit: "kWh/kg Ethanol",
        emission: emission,
        converted: converted
      };

      var referenceAmount = this.emissionFactors.fuelCycleEmissions.ethanol;
      var emission = referenceAmount;
      var converted = emission / this.ethanol;
      var data2 = {
        item: "Combustion",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2eq/kg Ethanol",
        emission: emission,
        converted: converted
      };

      var emission = data0.emission + data1.emission + data2.emission;
      var converted = data0.converted + data1.converted + data2.converted;
      var data3 = {
        item: "Total",
        emission: emission,
        converted: converted
      };
      return [data0, data1, {}, data2, {}, data3];
    },
    getMethane() {
      var referenceAmount = 0.0373270272105074;
      var emission = referenceAmount;
      var converted = emission / this.methane;
      var data0 = {
        item: "Fixed Production Emissions",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2eq/kg Methane",
        emission: emission,
        converted: converted
      };

      var referenceAmount = 0.358157068102718;
      var emission = referenceAmount * this.electricity;
      var converted = emission / this.methane;
      var data1 = {
        item: "Total Electricity Consumption",
        referenceAmount: referenceAmount,
        referenceUnit: "kWh/kg Methane",
        emission: emission,
        converted: converted
      };

      var referenceAmount = 1.1700406030323;
      var emission = referenceAmount * this.steam;
      var converted = emission / this.methane;
      var data2 = {
        item: "Total Steam Consumption",
        referenceAmount: referenceAmount,
        referenceUnit: "MJ/kg Methane",
        emission: emission,
        converted: converted
      };

      var referenceAmount = this.emissionFactors.fuelCycleEmissions.methane;
      var emission = referenceAmount;
      var converted = emission / this.methane;
      var data3 = {
        item: "Combustion",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2eq/kg Methane",
        emission: emission,
        converted: converted
      };

      var emission =
        data0.emission + data1.emission + data2.emission + data3.emission;
      var converted =
        data0.converted + data1.converted + data2.converted + data3.converted;
      var data4 = {
        item: "Total",
        emission: emission,
        converted: converted
      };

      return [data0, data1, data2, {}, data3, {}, data4];
    },
    getMethanol() {
      var referenceAmount = 0.175294296458476;
      var emission = referenceAmount;
      var converted = emission / this.methanol;
      var data0 = {
        item: "Fixed Production Emissions",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2eq/kg Methanol",
        emission: emission,
        converted: converted
      };

      var referenceAmount = 0.220473530480705;
      var emission = referenceAmount * this.electricity;
      var converted = emission / this.methanol;
      var data1 = {
        item: "Total Electricity Consumption",
        referenceAmount: referenceAmount,
        referenceUnit: "kWh/kg Methanol",
        emission: emission,
        converted: converted
      };

      var referenceAmount = 0.261219333453926;
      var emission = referenceAmount * this.steam;
      var converted = emission / this.methanol;
      var data2 = {
        item: "Total Steam Consumption",
        referenceAmount: referenceAmount,
        referenceUnit: "MJ/kg Methanol",
        emission: emission,
        converted: converted
      };

      var referenceAmount = this.emissionFactors.fuelCycleEmissions.methanol
        .emission;
      var emission = referenceAmount;
      var converted = emission / this.methanol;
      var data3 = {
        item: "Combustion",
        referenceAmount: referenceAmount,
        referenceUnit: "kg CO2 eq/kg Methanol",
        emission: emission,
        converted: converted
      };

      var emission =
        data0.emission + data1.emission + data2.emission + data3.emission;
      var converted =
        data0.converted + data1.converted + data2.converted + data3.converted;
      var data4 = {
        item: "Total",
        emission: emission,
        converted: converted
      };

      return [data0, data1, data2, {}, data3, {}, data4];
    },
    getSummary() {
      var data0 = {
        category: "Incumbent",
        product: "Methane",
        net2: this.products[2].value[6].emission
      };
      var data1 = {
        category: "Incumbent",
        product: "Methanol",
        net2: this.products[3].value[6].emission
      };
      var data2 = {
        category: "Incumbent",
        product: "Diesel",
        net2: this.products[0].value[8].emission
      };
      var data3 = {
        category: "Incumbent",
        product: "Ethanol",
        net2: this.products[1].value[5].emission
      };
      return [data0, data1, data2, data3];
    }
  }
};
</script>
