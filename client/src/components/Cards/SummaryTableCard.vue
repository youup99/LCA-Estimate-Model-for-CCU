<template>
  <el-card class="box-card">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="Figure 1" name="first">
        <figure1-table></figure1-table>
      </el-tab-pane>
      <el-tab-pane label="Figure 2" name="second">
        <figure2-table></figure2-table>
      </el-tab-pane>
      <el-tab-pane label="Figure 3" name="third">
        <figure3-table></figure3-table>
      </el-tab-pane>
      <el-tab-pane label="Figure 4" name="fourth">
        <figure4-table></figure4-table>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import Figure1Table from "@/components/Tables/Figure1Table.vue";
import Figure2Table from "@/components/Tables/Figure2Table.vue";
import Figure3Table from "@/components/Tables/Figure3Table.vue";
import Figure4Table from "@/components/Tables/Figure4Table.vue";
import { Event } from "@/event-bus";
import { mapState } from "vuex";
import { exportSummary } from "@/excel/excelExport";
export default {
  components: {
    Figure1Table,
    Figure2Table,
    Figure3Table,
    Figure4Table
  },
  computed: {
    ...mapState("summary", ["Figure1", "Figure2", "Figure3", "Figure4"])
  },
  mounted() {
    Event.$on("export", () => {
      exportSummary(this);
    });
  },
  data() {
    return {
      activeName: "first",
      activeLabel: "Figure 1"
    };
  },
  methods: {
    handleClick(tab, event) {
      this.activeLabel = tab.label;
    }
  }
};
</script>