<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <div class="header">
          <h3>Calculation</h3>
        </div>
        <pathway-calc></pathway-calc>
      </div>
    </div>
  </div>
</template>

<script>
import { PathwayCalc } from "@/components";

export default {
  components: {
    PathwayCalc,
  },
  data() {
    return {};
  },
};
</script>
