<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-40"
      >
        <div class="header">
          <h3>Main Input</h3>
        </div>
        <general-assumptions-form> </general-assumptions-form>
      </div>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-60"
      >
        <div class="header">
          <h3>Results Dashboard</h3>
        </div>
        <figure-1-chart></figure-1-chart>
      </div>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-40"
      >
        <pathway-form></pathway-form>
      </div>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-60"
      >
        <figure-2-chart></figure-2-chart>
      </div>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <figure-3-chart></figure-3-chart>
      </div>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <figure-4-chart></figure-4-chart>
      </div>
    </div>
  </div>
</template>

<script>
import {
  GeneralAssumptionsForm,
  PathwayForm,
  Figure1Chart,
  Figure2Chart,
  Figure3Chart,
  Figure4Chart,
} from "@/components";

export default {
  components: {
    GeneralAssumptionsForm,
    PathwayForm,
    Figure1Chart,
    Figure2Chart,
    Figure3Chart,
    Figure4Chart,
  },
  data() {
    return {};
  },
};
</script>
