<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <div class="header">
          <h3>Summary</h3>
        </div>
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
      </div>
    </div>
  </div>
</template>

<script>
import { Figure1Table, Figure2Table, Figure3Table, Figure4Table } from "@/components";

export default {
  components: {
    Figure1Table,
    Figure2Table,
    Figure3Table,
    Figure4Table
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
