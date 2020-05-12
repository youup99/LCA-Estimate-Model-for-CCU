<template>
  <div>
    <el-form
      ref="formSOECCO"
      :model="formSOECCO"
      label-width="120px"
      label-position="left"
    >
      <div class="row">
        <div class="col-md-6">
          <span><b>Sub-Pathway: SOEC-CO</b></span>
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
            <el-input type="number" v-model="formSOECCO.methane.electricity">
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
          <el-form-item label="Heat" label-width="85px">
            <el-input type="number" v-model="formSOECCO.methane.heat">
              <template slot="append">kWh/<br />kg Methane</template>
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
      <div class="row">
        <div class="col-md-6">
          <span><b>Product: Methanol</b></span>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-md-6">
          <el-form-item label="Electricity" label-width="85px">
            <el-input type="number" v-model="formSOECCO.methanol.electricity">
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
          <el-form-item label="Heat" label-width="85px">
            <el-input type="number" v-model="formSOECCO.methanol.heat">
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
      <div class="row">
        <div class="col-md-6">
          <span><b>Product: Diesel</b></span>
        </div>
        <div class="col-md-6"></div>
      </div>
      <br />
      <div class="row">
        <div class="col-md-6">
          <el-form-item label="Electricity" label-width="85px">
            <el-input type="number" v-model="formSOECCO.diesel.electricity">
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
        <div class="col-md-6">
          <el-form-item label="Heat" label-width="85px">
            <el-input type="number" v-model="formSOECCO.diesel.heat">
              <template slot="append">kWh/<br />kg Diesel</template>
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
      <div class="row">
        <div class="col-md-6">
          <span><b>Product: Ethanol</b></span>
        </div>
        <div class="col-md-6"></div>
      </div>
      <br />
      <div class="row">
        <div class="col-md-6">
          <el-form-item label="Electricity" label-width="85px">
            <el-input type="number" v-model="formSOECCO.ethanol.electricity">
              <template slot="append">kWh/<br />kg Ethanol</template>
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
      ref="formSOECEL"
      :model="formSOECEL"
      label-width="120px"
      label-position="left"
    >
      <div class="row">
        <div class="col-md-6">
          <span><b>Sub-Pathway: SOEC-EL</b></span>
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
          <el-form-item label="Electrolysis - H2" label-width="120px">
            <el-input type="number" v-model="formSOECEL.methane.electrolysisH2">
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
          <el-form-item label="2nd Conversion" label-width="120px">
            <el-input
              type="number"
              v-model="formSOECEL.methane.secondConversion"
            >
              <template slot="append">kWh/<br />kg Methane</template>
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
          <el-form-item label="Electrolysis - H2" label-width="120px">
            <el-input
              type="number"
              v-model="formSOECEL.methanol.electrolysisH2"
            >
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
          <el-form-item label="2nd Conversion" label-width="120px">
            <el-input
              type="number"
              v-model="formSOECEL.methanol.secondConversion"
            >
              <template slot="append">kWh/<br />kg Methanol</template>
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
          <span><b>Product: Diesel</b></span>
        </div>
        <div class="col-md-6"></div>
      </div>
      <br />
      <div class="row">
        <div class="col-md-6">
          <el-form-item label="Electrolysis - H2" label-width="120px">
            <el-input type="number" v-model="formSOECEL.diesel.electrolysisH2">
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      formSOECCO: {
        methane: {
          electricity: 0.0,
          heat: 0.0,
        },
        methanol: {
          electricity: 0.0,
          heat: 0.0,
        },
        diesel: {
          electricity: 0.0,
          heat: 0.0,
        },
        ethanol: {
          electricity: 0.0,
        },
      },
      formSOECEL: {
        methane: {
          electrolysisH2: 0.0,
          secondConversion: 0.0,
        },
        methanol: {
          electrolysisH2: 0.0,
          secondConversion: 0.0,
        },
        diesel: {
          electrolysisH2: 0.0,
        },
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
