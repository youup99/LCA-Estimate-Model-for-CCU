<template>
  <div>
    <el-form
      ref="formPCAT"
      :model="formPCAT"
      label-width="120px"
      label-position="left"
    >
      <div class="row">
        <div class="col-md-6">
          <span><b>Sub-Pathway: P.CAT</b></span>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-md-6">
          <span><b>Product: Methane</b></span>
        </div>
        <div class="col-md-6">
          <span><b>Emission Factors</b></span>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-md-6">
          <el-form-item label="Electricity" label-width="85px">
            <el-input type="number" v-model="formPCAT.methane.electricity">
              <template slot="append">kWh/<br />kg Methane</template>
            </el-input>
          </el-form-item>
        </div>
        <div class="col-md-6">
          <el-form-item label="Electricity" label-width="85px">
            <el-select v-model="temp.electricity">
              <el-option
                v-for="item in electricitySource"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <el-form-item label="Natural Gas" label-width="85px">
            <el-input type="number" v-model="formPCAT.methane.naturalGas">
              <template slot="append">kg/<br />kg Methane</template>
            </el-input>
          </el-form-item>
        </div>
        <div class="col-md-6">
          <el-form-item label="CO2 Source" label-width="85px">
            <el-select v-model="temp.co2">
              <el-option
                v-for="item in co2Source"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <span><b>Product: Methanol</b></span>
        </div>
        <div class="col-md-6"></div>
      </div>
      <br />
      <div class="row">
        <div class="col-md-6">
          <el-form-item label="Electricity" label-width="85px">
            <el-input type="number" v-model="formPCAT.methanol.electricity">
              <template slot="append">kWh/<br />kg Methanol</template>
            </el-input>
          </el-form-item>
        </div>
        <div class="col-md-6">
          <el-form-item label="Electricity" label-width="85px">
            <el-select v-model="temp.electricity">
              <el-option
                v-for="item in electricitySource"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <el-form-item label="Natural Gas" label-width="85px">
            <el-input type="number" v-model="formPCAT.methanol.naturalGas">
              <template slot="append">kg/<br />kg Methanol</template>
            </el-input>
          </el-form-item>
        </div>
        <div class="col-md-6">
          <el-form-item label="CO2 Source" label-width="85px">
            <el-select v-model="temp.co2">
              <el-option
                v-for="item in co2Source"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formPCAT: {
        methane: { electricity: 0.0, naturalGas: 0.0 },
        methanol: { electricity: 0.0, naturalGas: 0.0 },
      },
      temp: {
        electricity: "Renewable",
        heat: "Electrical heater + renewable",
        steam: "Geothermal",
        hydrogen: "Electrolysis + low carbon electricity",
        co2: "Direct air capture",
        electricityCustom: [false, 0.0],
        heatCustom: [false, 0.0],
        steamCustom: [false, 0.0],
        hydrogenCustom: [false, 0.0],
        co2Custom: [false, 0.0],
        additionalValues: false,
      },
      electricitySource: ["Renewable", "Natural gas", "Coal fired"],
      heatSource: [
        "Electrical heater + renewable",
        "Natural gas industrial furnace",
        "Combined heat&power",
      ],
      steamSource: ["Geothermal", "Natural gas industrial boiler"],
      hydrogenSource: [
        "Electrolysis + low carbon electricity",
        "Steam methane reforming",
        "Coal gasification",
      ],
      co2Source: [
        "Direct air capture",
        "Natural gas power plant",
        "Coal power plant",
      ],
    };
  },
  methods: {
    resetForm() {
      this.$refs.form.resetFields();
    },
  },
};
</script>
