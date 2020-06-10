<template>
  <div>
    <el-form ref="PDE" :model="forms.PDE" label-width="120px" label-position="left">
      <div class="row">
        <div class="col-md-6">
          <span>
            <b>Sub-Pathway: P-DE</b>
          </span>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-md-6">
          <span>
            <b>Product: Diesel</b>
          </span>
        </div>
        <div class="col-md-6">
          <span>
            <b>Emission Factors</b>
          </span>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-md-6">
          <el-form-item label="Electricity" label-width="85px">
            <el-input type="number" v-model="forms.PDE.diesel.electricity">
              <template slot="append">
                kWh/
                <br />kg Diesel
              </template>
            </el-input>
          </el-form-item>
        </div>
        <div class="col-md-6">
          <el-form-item label="Electricity" label-width="85px">
            <el-select v-model="electricitySource.active" disabled>
              <el-option
                v-for="item in electricitySource.list"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6"></div>
        <div class="col-md-6">
          <el-form-item label="CO2 Source" label-width="85px">
            <el-select v-model="co2Source.active" disabled>
              <el-option v-for="item in co2Source.list" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <el-divider></el-divider>
    <el-form ref="PWE" :model="forms.PWE" label-width="120px" label-position="left">
      <div class="row">
        <div class="col-md-6">
          <span>
            <b>Sub-Pathway: P-WE</b>
          </span>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-md-6">
          <span>
            <b>Product: Diesel</b>
          </span>
        </div>
        <div class="col-md-6">
          <span>
            <b>Emission Factors</b>
          </span>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-md-6">
          <el-form-item label="Electricity" label-width="85px">
            <el-input type="number" v-model="forms.PWE.diesel.electricity">
              <template slot="append">
                kWh/
                <br />kg Diesel
              </template>
            </el-input>
          </el-form-item>
        </div>
        <div class="col-md-6">
          <el-form-item label="Electricity" label-width="85px">
            <el-select v-model="electricitySource.active" disabled>
              <el-option
                v-for="item in electricitySource.list"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <el-form-item label="Heat" label-width="85px">
            <el-input type="number" v-model="forms.PWE.diesel.heat">
              <template slot="append">
                kWh/
                <br />kg Diesel
              </template>
            </el-input>
          </el-form-item>
        </div>
        <div class="col-md-6">
          <el-form-item label="Heat" label-width="85px">
            <el-select v-model="heatSource.active" disabled>
              <el-option v-for="item in heatSource.list" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6"></div>
        <div class="col-md-6">
          <el-form-item label="CO2 Source" label-width="85px">
            <el-select v-model="co2Source.active" disabled>
              <el-option v-for="item in co2Source.list" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { Event } from "@/event-bus";

export default {
  computed: {
    ...mapState("pathways", ["bioconversion"]),
    ...mapState("generalAssumptions", [
      "defaultEmission",
      "customEmission",
      "showAdditional"
    ]),
    electricitySource: function() {
      return this.defaultEmission.electricity;
    },
    heatSource: function() {
      return this.defaultEmission.heat;
    },
    co2Source: function() {
      return this.defaultEmission.co2;
    }
  },
  watch: {
    forms: {
      handler(val) {
        this.update(val);
      },
      deep: true
    }
  },
  created() {
    this.forms.PDE = this.bioconversion.PDE;
    this.forms.PWE = this.bioconversion.PWE;
  },
  data() {
    return {
      forms: {
        PDE: {},
        PWE: {}
      }
    };
  },
  methods: {
    update(val) {
      // Convert all numbers to float type as HTML does not have float data type
      for (let [key, value] of Object.entries(val)) {
        for (let [key1, value1] of Object.entries(value)) {
          for (let [key2, value2] of Object.entries(value1)) {
            val[key][key1][key2] = parseFloat(value2);
          }
        }
      }
      this.$store.dispatch("pathways/updateBioconversion", val).then(() => {
        Event.$emit("calculate");
      });
    },
    reset() {
      this.$store.dispatch("pathways/resetBioconversion").then(() => {
        this.forms.PDE = this.bioconversion.PDE;
        this.forms.PWE = this.bioconversion.PWE;
      });
    }
  }
};
</script>
