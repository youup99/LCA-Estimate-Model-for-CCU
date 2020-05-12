<template>
  <div>
    <el-form
      ref="formDMRCO"
      :model="formDMRCO"
      label-width="120px"
      label-position="left"
    >
      <div class="row">
        <div class="col-md-6">
          <span><b>Sub-Pathway: DMR-CO</b></span>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-md-6">
          <span><b>Product: Methanol</b></span>
        </div>
        <div class="col-md-6">
          <span><b>Emission Factors</b></span>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-md-6">
          <el-form-item label="Electricity" label-width="105px">
            <el-input type="number" v-model="formDMRCO.electricity">
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
          <el-form-item label="Heat" label-width="105px">
            <el-input type="number" v-model="formDMRCO.heat">
              <template slot="append">kWh/<br />kg Methanol</template>
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
        <div class="col-md-6">
          <el-form-item label="Methane Input" label-width="105px">
            <el-input type="number" v-model="formDMRCO.methaneInput">
              <template slot="append">kg CH4/<br />kg Methanol</template>
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
    <el-divider></el-divider>
    <el-form
      ref="formDMRH2"
      :model="formDMRH2"
      label-width="120px"
      label-position="left"
    >
      <div class="row">
        <div class="col-md-6">
          <span><b>Sub-Pathway: DMR-H2</b></span>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-md-6">
          <span><b>Product: Methanol</b></span>
        </div>
        <div class="col-md-6">
          <span><b>Emission Factors</b></span>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-md-6">
          <el-form-item label="Electricity" label-width="105px">
            <el-input type="number" v-model="formDMRH2.electricity">
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
          <el-form-item label="Heat" label-width="105px">
            <el-input type="number" v-model="formDMRH2.heat">
              <template slot="append">kWh/<br />kg Methanol</template>
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
        <div class="col-md-6">
          <el-form-item label="H2 Input" label-width="105px">
            <el-input type="number" v-model="formDMRH2.h2Input">
              <template slot="append">kg H2/<br />kg Methanol</template>
            </el-input>
          </el-form-item>
        </div>
        <div class="col-md-6">
          <el-form-item label="Hydrogen" label-width="85px">
            <el-select v-model="temp.hydrogen">
              <el-option
                v-for="item in hydrogenSource"
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
          <el-form-item label="Methane Input" label-width="105px">
            <el-input type="number" v-model="formDMRH2.methaneInput">
              <template slot="append">kg CH4/<br />kg Methanol</template>
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
      formDMRCO: {
        electricity: 0.0,
        heat: 0.0,
        methaneInput: 0.0,
      },
      formDMRH2: {
        electricity: 0.0,
        heat: 0.0,
        h2Input: 0.0,
        methaneInput: 0.0,
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
