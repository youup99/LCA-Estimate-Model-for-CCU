<template>
  <div>
    <el-form ref="SOECCO" :model="forms.SOECCO" label-width="120px" label-position="left">
      <div class="row">
        <div class="col-md-6">
          <span>
            <b>Sub-Pathway: SOEC-CO</b>
          </span>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-md-6">
          <span>
            <b>Product: Methane</b>
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
            <el-input type="number" v-model="forms.SOECCO.methane.electricity">
              <template slot="append">
                kWh/
                <br />kg Methane
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
            <el-input type="number" v-model="forms.SOECCO.methane.heat">
              <template slot="append">
                kWh/
                <br />kg Methane
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
      <div class="row">
        <div class="col-md-6">
          <span>
            <b>Product: Methanol</b>
          </span>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-md-6">
          <el-form-item label="Electricity" label-width="85px">
            <el-input type="number" v-model="forms.SOECCO.methanol.electricity">
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
          <el-form-item label="Heat" label-width="85px">
            <el-input type="number" v-model="forms.SOECCO.methanol.heat">
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
        <div class="col-md-6"></div>
        <div class="col-md-6">
          <el-form-item label="CO2 Source" label-width="85px">
            <el-select v-model="co2Source.active" disabled>
              <el-option v-for="item in co2Source.list" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <span>
            <b>Product: Diesel</b>
          </span>
        </div>
        <div class="col-md-6"></div>
      </div>
      <br />
      <div class="row">
        <div class="col-md-6">
          <el-form-item label="Electricity" label-width="85px">
            <el-input type="number" v-model="forms.SOECCO.diesel.electricity">
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
            <el-input type="number" v-model="forms.SOECCO.diesel.heat">
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
      <div class="row">
        <div class="col-md-6">
          <span>
            <b>Product: Ethanol</b>
          </span>
        </div>
        <div class="col-md-6"></div>
      </div>
      <br />
      <div class="row">
        <div class="col-md-6">
          <el-form-item label="Electricity" label-width="85px">
            <el-input type="number" v-model="forms.SOECCO.ethanol.electricity">
              <template slot="append">
                kWh/
                <br />kg Ethanol
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
    <el-form ref="SOECEL" :model="forms.SOECEL" label-width="120px" label-position="left">
      <div class="row">
        <div class="col-md-6">
          <span>
            <b>Sub-Pathway: SOEC-EL</b>
          </span>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-md-6">
          <span>
            <b>Product: Methane</b>
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
          <el-form-item label="Electrolysis - H2" label-width="120px">
            <el-input type="number" v-model="forms.SOECEL.methane.electrolysis">
              <template slot="append">
                kWh/
                <br />kg Methane
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
          <el-form-item label="2nd Conversion" label-width="120px">
            <el-input type="number" v-model="forms.SOECEL.methane.secondConversion">
              <template slot="append">
                kWh/
                <br />kg Methane
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
          <el-form-item label="Electrolysis - H2" label-width="120px">
            <el-input type="number" v-model="forms.SOECEL.methanol.electrolysis">
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
          <el-form-item label="2nd Conversion" label-width="120px">
            <el-input type="number" v-model="forms.SOECEL.methanol.secondConversion">
              <template slot="append">
                kWh/
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
      <div class="row">
        <div class="col-md-6">
          <span>
            <b>Product: Diesel</b>
          </span>
        </div>
        <div class="col-md-6"></div>
      </div>
      <br />
      <div class="row">
        <div class="col-md-6">
          <el-form-item label="Electrolysis - H2" label-width="120px">
            <el-input type="number" v-model="forms.SOECEL.diesel.electrolysis">
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
  </div>
</template>
<script>
import { mapState } from "vuex";
import { Event } from "@/event-bus";

export default {
  computed: {
    ...mapState("pathways", ["reductionElectricity"]),
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
    this.forms.SOECCO = this.reductionElectricity.SOECCO;
    this.forms.SOECEL = this.reductionElectricity.SOECEL;
  },
  data() {
    return {
      forms: {
        SOECCO: {},
        SOECEL: {}
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
      this.$store
        .dispatch("pathways/updateReductionElectricity", val)
        .then(() => {
          Event.$emit("calculate");
        });
    },
    reset() {
      this.$store.dispatch("pathways/resetReductionElectricity").then(() => {
        this.forms.SOECCO = this.reductionElectricity.SOECCO;
        this.forms.SOECEL = this.reductionElectricity.SOECEL;
      });
    }
  }
};
</script>
