<template>
  <div>
    <el-form
      ref="formDMCW"
      :model="formDMCW"
      label-width="120px"
      label-position="left"
    >
      <div class="row">
        <div class="col-md-6">
          <span><b>Sub-Pathway: DMC-W</b></span>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-md-6">
          <span><b>Product: Calcite</b></span>
        </div>
        <div class="col-md-6">
          <span><b>Emission Factors</b></span>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-md-6">
          <el-form-item label="Electricity" label-width="85px">
            <el-input type="number" v-model="formDMCW.electricity">
              <template slot="append">kWh/<br />kg Calcite</template>
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
            <el-input type="number" v-model="formDMCW.heat">
              <template slot="append">kWh/<br />kg Calcite</template>
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
    <el-divider></el-divider>
    <el-form
      ref="formWMC"
      :model="formWMC"
      label-width="120px"
      label-position="left"
    >
      <div class="row">
        <div class="col-md-6">
          <span><b>Sub-Pathway: WMC</b></span>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-md-6">
          <span><b>Product: CWM</b></span>
        </div>
        <div class="col-md-6">
          <span><b>Emission Factors</b></span>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-md-6">
          <el-form-item label="Electricity" label-width="85px">
            <el-input type="number" v-model="formWMC.electricity">
              <template slot="append">kWh/<br />kg CWM</template>
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
      ref="formDMCO"
      :model="formDMCO"
      label-width="120px"
      label-position="left"
    >
      <div class="row">
        <div class="col-md-6">
          <span><b>Sub-Pathway: DMC-O</b></span>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-md-6">
          <span><b>Product: Magnesite</b></span>
        </div>
        <div class="col-md-6">
          <span><b>Emission Factors</b></span>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-md-6">
          <el-form-item label="Electricity" label-width="85px">
            <el-input type="number" v-model="formDMCO.electricity">
              <template slot="append">kWh/<br />kg Magnesite</template>
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      formDMCW: {
        electricity: 0.0,
        heat: 0.0,
      },
      formWMC: {
        electricity: 0.0,
      },
      formDMCO: {
        electricity: 0.0,
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
