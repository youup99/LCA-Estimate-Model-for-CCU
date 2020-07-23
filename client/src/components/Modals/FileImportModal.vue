<template>
  <el-dialog title="Import from Excel" :visible.sync="modalVisible" width="20%">
    <input type="file" class="file" @change="previewFiles" accept=".xlsm" />
    <span slot="footer" class="dialog-footer">
      <el-button @click="modalVisible = false">Cancel</el-button>
      <el-button type="primary" @click="submitUpload">Import</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { Event } from "@/event-bus";
import {
  // exportGeneralAssumptions,
  // exportMineralization,
  // exportBioconversion,
  // exportReductionElectricity,
  // exportReductionHydrocarbon,
  // exportReductionLight,
  // exportReductionHydrogen
  exportPathways
} from "@/excel/excelImport";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("pathways", [
      "mineralization",
      "bioconversion",
      "reductionElectricity",
      "reductionHydrocarbon",
      "reductionLight",
      "reductionHydrogen"
    ]),
    ...mapState("generalAssumptions", [
      "defaultEmission",
      "customEmission",
      "showAdditional"
    ])
  },
  data() {
    return {
      modalVisible: false,
      importedPathways: {},
      importedGeneralAssumptions: {},
      importedMineralization: {},
      importedBioconversion: {},
      importedReductionElectricity: {},
      importedReductionHydrocarbon: {},
      importedReductionLight: {},
      importedReductionHydrogen: {}
    };
  },
  mounted() {
    Event.$on("import", () => {
      this.modalVisible = true;
    });
  },
  methods: {
    previewFiles(evt) {
      this.importedPathways = exportPathways(evt);
    },
    submitUpload() {
      this.updateGeneralAssumptions();
      this.$store
        .dispatch("pathways/update", this.importedPathways)
        .then(() => {
          Event.$emit("importReady");
          this.modalVisible = false;
          const file = document.querySelector(".file");
          file.value = "";
        });
    },
    updateGeneralAssumptions() {
      var keys = Object.keys(this.importedGeneralAssumptions);

      var _defaultEmission = this.defaultEmission;
      var _customEmission = this.customEmission;

      // Update values
      keys.forEach(value => {
        _defaultEmission[value].active = this.importedGeneralAssumptions[value][
          "Default"
        ];
        _customEmission[value].use = this.importedGeneralAssumptions[value][
          "Use Custom"
        ];
        _customEmission[value].value = this.importedGeneralAssumptions[value][
          "Custom Value"
        ];
      });

      var _generalAssumptions = {
        defaultEmission: _defaultEmission,
        customEmission: _customEmission,
        showAdditional: this.showAdditional
      };

      // Save data into store
      this.$store.commit("generalAssumptions/update", _generalAssumptions);
    }
  }
};
</script>