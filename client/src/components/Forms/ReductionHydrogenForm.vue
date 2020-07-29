<template>
  <div>
    <el-form ref="DH2" :model="forms.DH2" label-width="120px" label-position="left">
      <div class="row">
        <div class="col-md-6">
          <span>
            <b>Sub-Pathway: D-H2</b>
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
          <el-form-item label="Hydrogen Input" label-width="110px">
            <el-input type="number" v-model="forms.DH2.diesel.hydrogen">
              <template slot="append">
                kg Hydrogen/
                <br />kg Diesel
              </template>
            </el-input>
          </el-form-item>
        </div>
        <div class="col-md-6">
          <el-form-item label="Hydrogen" label-width="85px">
            <el-select v-model="emission.DH2.diesel.hydrogen">
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
        <div class="col-md-6"></div>
        <div class="col-md-6">
          <el-form-item label="CO2 Source" label-width="85px">
            <el-select v-model="emission.DH2.diesel.co2">
              <el-option v-for="item in co2Source.list" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <span>
            <b>Product: Methane</b>
          </span>
        </div>
        <div class="col-md-6"></div>
      </div>
      <br />
      <div class="row">
        <div class="col-md-6">
          <el-form-item label="Electricity" label-width="110px">
            <el-input type="number" v-model="forms.DH2.methane.electricity">
              <template slot="append">
                kWh/
                <br />kg Methane
              </template>
            </el-input>
          </el-form-item>
        </div>
        <div class="col-md-6">
          <el-form-item label="Electricity" label-width="85px">
            <el-select v-model="emission.DH2.methane.electricity">
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
          <el-form-item label="Hydrogen Input" label-width="110px">
            <el-input type="number" v-model="forms.DH2.methane.hydrogen">
              <template slot="append">
                kg Hydrogen/
                <br />kg Methane
              </template>
            </el-input>
          </el-form-item>
        </div>
        <div class="col-md-6">
          <el-form-item label="Hydrogen" label-width="85px">
            <el-select v-model="emission.DH2.methane.hydrogen">
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
        <div class="col-md-6"></div>
        <div class="col-md-6">
          <el-form-item label="CO2 Source" label-width="85px">
            <el-select v-model="emission.DH2.methane.co2">
              <el-option v-for="item in co2Source.list" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <span>
            <b>Product: Methanol</b>
          </span>
        </div>
        <div class="col-md-6"></div>
      </div>
      <br />
      <div class="row">
        <div class="col-md-6">
          <el-form-item label="Electricity" label-width="110px">
            <el-input type="number" v-model="forms.DH2.methanol.electricity">
              <template slot="append">
                kWh/
                <br />kg Methanol
              </template>
            </el-input>
          </el-form-item>
        </div>
        <div class="col-md-6">
          <el-form-item label="Electricity" label-width="85px">
            <el-select v-model="emission.DH2.methanol.electricity">
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
          <el-form-item label="Heat" label-width="110px">
            <el-input type="number" v-model="forms.DH2.methanol.heat">
              <template slot="append">
                kg/
                <br />kg Methanol
              </template>
            </el-input>
          </el-form-item>
        </div>
        <div class="col-md-6">
          <el-form-item label="Heat" label-width="85px">
            <el-select v-model="emission.DH2.methanol.heat">
              <el-option v-for="item in heatSource.list" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <el-form-item label="Hydrogen Input" label-width="110px">
            <el-input type="number" v-model="forms.DH2.methanol.hydrogen">
              <template slot="append">
                kg Hydrogen/
                <br />kg Methanol
              </template>
            </el-input>
          </el-form-item>
        </div>
        <div class="col-md-6">
          <el-form-item label="Hydrogen" label-width="85px">
            <el-select v-model="emission.DH2.methanol.hydrogen">
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
        <div class="col-md-6"></div>
        <div class="col-md-6">
          <el-form-item label="CO2 Source" label-width="85px">
            <el-select v-model="emission.DH2.methanol.co2">
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
    ...mapState(["pathways"]),
    ...mapState(["emissionFactors"]),
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
    },
    emission: {
      handler(val) {
        this.$store
          .dispatch("emissionFactors/updateReductionHydrogen", val)
          .then(() => {
            Event.$emit("calculcate");
          });
      },
      deep: true
    }
  },
  created() {
    this.forms.DH2 = this.pathways.reductionHydrogen.DH2;
    this.emission.DH2 = this.emissionFactors.reductionHydrogen.DH2;
    this.defaultEmissionFactors();
  },
  data() {
    return {
      forms: {
        DH2: {}
      },
      emission: {
        DH2: {}
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
      this.$store.dispatch("pathways/updateReductionHydrogen", val).then(() => {
        Event.$emit("calculate");
      });
    },
    reset() {
      this.$store.dispatch("pathways/resetReductionHydrogen").then(() => {
        this.forms.DH2 = this.pathways.reductionHydrogen.DH2;
      });
      this.defaultEmissionFactors();
    },
    import() {
      this.forms.DH2 = this.pathways.reductionHydrogen.DH2;
      this.emission.DH2 = this.emissionFactors.reductionHydrogen.DH2;
    },
    defaultEmissionFactors() {
      for (let [key, value] of Object.entries(this.emission)) {
        for (let [key1, value1] of Object.entries(value)) {
          for (let [key2, value2] of Object.entries(value1)) {
            if (key2 === "electricity")
              this.emission[key][key1][key2] = this.electricitySource.active;
            else if (key2 === "heat")
              this.emission[key][key1][key2] = this.heatSource.active;
            else if (key2 === "hydrogen")
              this.emission[key][key1][key2] = this.hydrogenSource.active;
            else if (key2 === "co2")
              this.emission[key][key1][key2] = this.co2Source.active;
          }
        }
      }
    }
  }
};
</script>
