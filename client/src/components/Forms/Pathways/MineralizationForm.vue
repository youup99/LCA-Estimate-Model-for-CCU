<template>
  <div>
    <el-form
      ref="DMCW"
      :model="forms.DMCW"
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
            <el-input type="number" v-model="forms.DMCW.calcite.electricity">
              <template slot="append">kWh/<br />kg Calcite</template>
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
              >
              </el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <el-form-item label="Heat" label-width="85px">
            <el-input type="number" v-model="forms.DMCW.calcite.heat">
              <template slot="append">kWh/<br />kg Calcite</template>
            </el-input>
          </el-form-item>
        </div>
        <div class="col-md-6">
          <el-form-item label="Heat" label-width="85px">
            <el-select v-model="heatSource.active" disabled>
              <el-option
                v-for="item in heatSource.list"
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
            <el-select v-model="co2Source.active" disabled>
              <el-option
                v-for="item in co2Source.list"
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
      ref="WMC"
      :model="forms.WMC"
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
            <el-input type="number" v-model="forms.WMC.CWM.electricity">
              <template slot="append">kWh/<br />kg CWM</template>
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
            <el-select v-model="co2Source.active" disabled>
              <el-option
                v-for="item in co2Source.list"
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
      ref="DMCO"
      :model="forms.DMCO"
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
            <el-input type="number" v-model="forms.DMCO.magnesite.electricity">
              <template slot="append">kWh/<br />kg Magnesite</template>
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
            <el-select v-model="co2Source.active" disabled>
              <el-option
                v-for="item in co2Source.list"
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
import { mapState } from "vuex";
import { Event } from "@/event-bus";

export default {
  computed: {
    ...mapState("pathways", ["mineralization"]),
    ...mapState("generalAssumptions", [
      "defaultEmission",
      "customEmission",
      "showAdditional",
    ]),
    electricitySource: function() {
      return this.defaultEmission.electricity;
    },
    heatSource: function() {
      return this.defaultEmission.heat;
    },
    co2Source: function() {
      return this.defaultEmission.co2;
    },
  },
  watch: {
    forms: {
      handler(val) {
        this.update(val);
      },
      deep: true,
    },
  },
  created() {
    this.forms.DMCW = this.mineralization.DMCW;
    this.forms.WMC = this.mineralization.WMC;
    this.forms.DMCO = this.mineralization.DMCO;
  },
  data() {
    return {
      forms: {
        DMCW: {},
        WMC: {},
        DMCO: {},
      },
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
      this.$store.dispatch("pathways/updateMineralization", val).then(() => {
        Event.$emit("calculate");
      });
    },
    reset() {
      this.$store.dispatch("pathways/resetMineralization").then(() => {
        this.forms.DMCW = this.mineralization.DMCW;
        this.forms.WMC = this.mineralization.WMC;
        this.forms.DMCO = this.mineralization.DMCO;
      });
    },
  },
};
</script>
