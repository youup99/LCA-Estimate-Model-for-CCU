<template>
  <el-card class="box-card" style="height: 610px; overflow: auto">
    <div slot="header" class="row">
      <div class="col-md-11">
        <h4><b>General Assumptions</b></h4>
      </div>
      <div class="col-md-1">
        <el-button
          style="float: right"
          type="primary"
          icon="el-icon-refresh-right"
          @click="resetForm"
          >Reset</el-button
        >
      </div>
    </div>
    <div>
      <div class="row">
        <div class="col-md-6">
          <span>Default emission factors</span>
        </div>
        <div class="col-md-6">
          <span>Custom emission factors</span>
        </div>
      </div>
      <br />
      <el-form
        ref="form"
        :model="form"
        label-width="120px"
        label-position="left"
      >
        <div class="row">
          <div class="col-md-4">
            <el-form-item label="Electricity" label-width="85px">
              <el-select v-model="form.electricity" filterable>
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
          <div class="col-md-2">
            <el-form-item>
              <el-checkbox v-model="form.electricityCustom[0]"
                >Use Custom</el-checkbox
              >
            </el-form-item>
          </div>
          <div class="col-md-6">
            <el-form-item>
              <el-input type="number" v-model="form.electricityCustom[1]">
                <template slot="append">kgCO2eq/<br>kWh</template></el-input
              >
            </el-form-item>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <el-form-item label="Heat" label-width="85px">
              <el-select v-model="form.heat" filterable>
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
          <div class="col-md-2">
            <el-form-item>
              <el-checkbox v-model="form.heatCustom[0]">Use Custom</el-checkbox>
            </el-form-item>
          </div>
          <div class="col-md-6">
            <el-form-item>
              <el-input type="number" v-model="form.heatCustom[1]">
                <template slot="append">kgCO2eq/<br>kWh</template>
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <el-form-item label="Steam" label-width="85px">
              <el-select v-model="form.steam" filterable>
                <el-option
                  v-for="item in steamSource"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="col-md-2">
            <el-form-item>
              <el-checkbox v-model="form.steamCustom[0]"
                >Use Custom</el-checkbox
              >
            </el-form-item>
          </div>
          <div class="col-md-6">
            <el-form-item>
              <el-input type="number" v-model="form.steamCustom[1]">
                <template slot="append">kgCO2eq/<br>MJ</template>
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <el-form-item label="Hydrogen" label-width="85px">
              <el-select v-model="form.hydrogen" filterable>
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
          <div class="col-md-2">
            <el-form-item>
              <el-checkbox v-model="form.hydrogenCustom[0]"
                >Use Custom</el-checkbox
              >
            </el-form-item>
          </div>
          <div class="col-md-6">
            <el-form-item>
              <el-input type="number" v-model="form.hydrogenCustom[1]">
                <template slot="append">kgCO2eq/<br>kg H2</template>
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <el-form-item label="CO2 Source" label-width="85px">
              <el-select v-model="form.co2" filterable>
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
          <div class="col-md-2">
            <el-form-item>
              <el-checkbox v-model="form.co2Custom[0]">Use Custom</el-checkbox>
            </el-form-item>
          </div>
          <div class="col-md-6">
            <el-form-item>
              <el-input type="number" v-model="form.co2Custom[1]">
                <template slot="append">kgCO2eq/<br>kgCO2Captured</template>
              </el-input>
            </el-form-item>
          </div>
        </div>
        <br />
        <el-form-item>
          <el-tooltip class="item" effect="dark" placement="top">
            <div slot="content">
              The additional literature values presented in Figure 1<br />
              are not related to uncertainty. They are point estimates<br />
              based on different studies to demonstrate some of the<br />
              variability associated with these pathways.
            </div>
            <el-checkbox v-model="form.additionalValues"
              >Show additional literature values in Figure 1</el-checkbox
            ></el-tooltip
          ></el-form-item
        >
      </el-form>
    </div>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      form: {
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
      this.$nextTick(() => {
        this.$refs.form.resetFields();
      });
    },
  },
};
</script>
