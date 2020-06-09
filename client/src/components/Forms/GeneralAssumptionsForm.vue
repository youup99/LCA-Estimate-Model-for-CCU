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
              <el-select
                v-model="form._defaultEmission.electricity.active"
                filterable
              >
                <el-option
                  v-for="item in form._defaultEmission.electricity.list"
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
              <el-checkbox v-model="form._customEmission.electricity.use"
                >Use Custom</el-checkbox
              >
            </el-form-item>
          </div>
          <div class="col-md-6">
            <el-form-item>
              <el-input
                type="number"
                v-model="form._customEmission.electricity.value"
              >
                <template slot="append">kgCO2eq/<br />kWh</template></el-input
              >
            </el-form-item>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <el-form-item label="Heat" label-width="85px">
              <el-select v-model="form._defaultEmission.heat.active" filterable>
                <el-option
                  v-for="item in form._defaultEmission.heat.list"
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
              <el-checkbox v-model="form._customEmission.heat.use"
                >Use Custom</el-checkbox
              >
            </el-form-item>
          </div>
          <div class="col-md-6">
            <el-form-item>
              <el-input type="number" v-model="form._customEmission.heat.value">
                <template slot="append">kgCO2eq/<br />kWh</template>
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <el-form-item label="Steam" label-width="85px">
              <el-select
                v-model="form._defaultEmission.steam.active"
                filterable
              >
                <el-option
                  v-for="item in form._defaultEmission.steam.list"
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
              <el-checkbox v-model="form._customEmission.steam.use"
                >Use Custom</el-checkbox
              >
            </el-form-item>
          </div>
          <div class="col-md-6">
            <el-form-item>
              <el-input
                type="number"
                v-model="form._customEmission.steam.value"
              >
                <template slot="append">kgCO2eq/<br />MJ</template>
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <el-form-item label="Hydrogen" label-width="85px">
              <el-select
                v-model="form._defaultEmission.hydrogen.active"
                filterable
              >
                <el-option
                  v-for="item in form._defaultEmission.hydrogen.list"
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
              <el-checkbox v-model="form._customEmission.hydrogen.use"
                >Use Custom</el-checkbox
              >
            </el-form-item>
          </div>
          <div class="col-md-6">
            <el-form-item>
              <el-input
                type="number"
                v-model="form._customEmission.hydrogen.value"
              >
                <template slot="append">kgCO2eq/<br />kg H2</template>
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <el-form-item label="CO2 Source" label-width="85px">
              <el-select v-model="form._defaultEmission.co2.active" filterable>
                <el-option
                  v-for="item in form._defaultEmission.co2.list"
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
              <el-checkbox v-model="form._customEmission.co2.use"
                >Use Custom</el-checkbox
              >
            </el-form-item>
          </div>
          <div class="col-md-6">
            <el-form-item>
              <el-input type="number" v-model="form._customEmission.co2.value">
                <template slot="append">kgCO2eq/<br />kgCO2Captured</template>
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
            <el-checkbox v-model="form._showAdditional"
              >Show additional literature values in Figure 1</el-checkbox
            ></el-tooltip
          ></el-form-item
        >
      </el-form>
    </div>
  </el-card>
</template>
<script>
import { mapState } from "vuex";
import { Event } from "@/event-bus";

export default {
  computed: {
    ...mapState("generalAssumptions", [
      "defaultEmission",
      "customEmission",
      "showAdditional",
    ]),
  },
  watch: {
    form: {
      handler(val) {
        this.update(val);
      },
      deep: true,
    },
  },
  created() {
    this.form._defaultEmission = this.defaultEmission;
    this.form._customEmission = this.customEmission;
    this.form._showAdditional = this.showAdditional;
  },
  data() {
    return {
      form: {
        _defaultEmission: {},
        _customEmission: {},
        _showAdditional: false,
      },
    };
  },
  methods: {
    update(val) {
      // Convert all numbers to float type as HTML does not have float data type
      var keys = Object.keys(val["_customEmission"]);
      keys.forEach((key) => {
        val["_customEmission"][key].value = parseFloat(
          val["_customEmission"][key].value
        );
      });
      var newValue = {
        defaultEmission: val._defaultEmission,
        customEmission: val._customEmission,
        showAdditional: val._showAdditional
      };
      this.$store.dispatch("generalAssumptions/update", newValue).then(() => {
        Event.$emit("calculate");
      });
    },
    resetForm() {
      this.$store.dispatch("generalAssumptions/reset").then(() => {
        this.form._defaultEmission = this.defaultEmission;
        this.form._customEmission = this.customEmission;
        this.form._showAdditional = this.showAdditional;
      });
    },
  },
};
</script>
