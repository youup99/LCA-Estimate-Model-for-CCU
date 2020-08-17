<template>
  <div>
    <el-form ref="subpathway1" :model="forms.subpathway1" label-width="120px" label-position="left">
      <div class="row">
        <div class="col-md-6">
          <span>
            <b>Sub-Pathway: Sub-pathway 1</b>
          </span>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-md-6">
          <span>
            <b>Product: Methanol</b>
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
          <el-form-item label="Electricity" label-width="105px">
            <el-input type="number" v-model="forms.subpathway1.methanol.electricity">
              <template slot="append">
                kWh/
                <br />kg Methanol
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
          <el-form-item label="Heat" label-width="105px">
            <el-input type="number" v-model="forms.subpathway1.methanol.heat">
              <template slot="append">
                kWh/
                <br />kg Methanol
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
        <div class="col-md-6">
          <el-form-item label="Methane Input" label-width="105px">
            <el-input type="number" v-model="forms.subpathway1.methanol.methane">
              <template slot="append">
                kg Methane/
                <br />kg Methanol
              </template>
            </el-input>
          </el-form-item>
        </div>
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
    <el-form ref="subpathway2" :model="forms.subpathway2" label-width="120px" label-position="left">
      <div class="row">
        <div class="col-md-6">
          <span>
            <b>Sub-Pathway: Sub-Pathway 2</b>
          </span>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-md-6">
          <span>
            <b>Product: Methanol</b>
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
          <el-form-item label="Electricity" label-width="105px">
            <el-input type="number" v-model="forms.subpathway2.methanol.electricity">
              <template slot="append">
                kWh/
                <br />kg Methanol
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
          <el-form-item label="Heat" label-width="105px">
            <el-input type="number" v-model="forms.subpathway2.methanol.heat">
              <template slot="append">
                kWh/
                <br />kg Methanol
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
        <div class="col-md-6">
          <el-form-item label="H2 Input" label-width="105px">
            <el-input type="number" v-model="forms.subpathway2.methanol.h2">
              <template slot="append">
                kg Hydrogen/
                <br />kg Methanol
              </template>
            </el-input>
          </el-form-item>
        </div>
        <div class="col-md-6">
          <el-form-item label="Hydrogen" label-width="85px">
            <el-select v-model="hydrogenSource.active" disabled>
              <el-option
                v-for="item in hydrogenSource.list"
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
          <el-form-item label="Methane Input" label-width="105px">
            <el-input type="number" v-model="forms.subpathway2.methanol.methane">
              <template slot="append">
                kg Methane/
                <br />kg Methanol
              </template>
            </el-input>
          </el-form-item>
        </div>
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
    ...mapState("pathways", ["pathwayTest"]),
    ...mapState("generalAssumptions", [
      "defaultEmission",
      "customEmission",
      "showAdditional"
    ]),
    electricitySource: function() {
      return this.defaultEmission.electricity;
    },
    hydrogenSource: function() {
      return this.defaultEmission.hydrogen;
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
    this.forms.subpathway1 = this.pathwayTest.subpathway1;
    this.forms.subpathway2 = this.pathwayTest.subpathway2;
  },
  data() {
    return {
      forms: {
        subpathway1: {},
        subpathway2: {}
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
      this.$store.dispatch("pathways/updatePathwayTest", val).then(() => {
        Event.$emit("calculate");
      });
    },
    reset() {
      this.$store.dispatch("pathways/resetPathwayTest").then(() => {
        this.forms.subpathway1 = this.pathwayTest.subpathway1;
        this.forms.subpathway2 = this.pathwayTest.subpathway2;
      });
    },
    import() {
      this.forms.subpathway1 = this.pathwayTest.subpathway1;
      this.forms.subpathway2 = this.pathwayTest.subpathway2;
    }
  }
};
</script>
