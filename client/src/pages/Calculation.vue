<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <div class="header">
          <h3>Calculation</h3>
        </div>
        <pathway-table-card></pathway-table-card>
      </div>
    </div>
  </div>
</template>

<script>
import { PathwayTableCard } from "@/components";

export default {
  components: {
    PathwayTableCard
  }
};
</script>
