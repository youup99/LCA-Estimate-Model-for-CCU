<template>
  <div>
    <el-form
      ref="formPDE"
      :model="formPDE"
      label-width="120px"
      label-position="left"
    >
      <div class="row">
        <div class="col-md-6">
          <span><b>Sub-Pathway: P-DE</b></span>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-md-6">
          <span><b>Product: Diesel</b></span>
        </div>
        <div class="col-md-6">
          <span><b>Emission Factors</b></span>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-md-6">
          <el-form-item label="Electricity" label-width="85px">
            <el-input type="number" v-model="formPDE.electricity">
              <template slot="append">kWh/<br />kg Diesel</template>
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
        <div class="col-md-6"></div>
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
    <el-divider></el-divider>
    <el-form
      ref="formPWE"
      :model="formPWE"
      label-width="120px"
      label-position="left"
    >
      <div class="row">
        <div class="col-md-6">
          <span><b>Sub-Pathway: P-WE</b></span>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-md-6">
          <span><b>Product: Diesel</b></span>
        </div>
        <div class="col-md-6">
          <span><b>Emission Factors</b></span>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-md-6">
          <el-form-item label="Electricity" label-width="85px">
            <el-input type="number" v-model="formPWE.electricity">
              <template slot="append">kWh/<br/>kg Diesel</template>
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
          <el-form-item label="Heat" label-width="85px">
            <el-input type="number" v-model="formPWE.heat">
              <template slot="append">kWh/<br/>kg Diesel</template>
            </el-input>
          </el-form-item>
        </div>
        <div class="col-md-6">
          <el-form-item label="Heat" label-width="85px">
            <el-select v-model="temp.heat">
              <el-option
                v-for="item in heatSource"
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
        <div class="col-md-6"></div>
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
      formPDE: {
        electricity: 0.0,
      },
      formPWE: {
        electricity: 0.0,
        heat: 0.0,
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
