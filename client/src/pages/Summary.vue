<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <div class="header">
          <h3>Summary</h3>
        </div>
        <summary-table-card></summary-table-card>
      </div>
    </div>
  </div>
</template>

<script>
import { SummaryTableCard } from "@/components";

export default {
  components: {
    SummaryTableCard
  }
};
</script>
