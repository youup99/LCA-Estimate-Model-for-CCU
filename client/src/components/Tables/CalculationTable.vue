<template>
  <div class="row">
    <!-- Show summary -->
    <div class="col-md-12" v-if="activeTabLabel === 'Summary'">
      <el-table :data="summary">
        <el-table-column label="Auxiliary Table">
          <el-table-column prop="category" label="Category" :width="'auto'"></el-table-column>
          <el-table-column prop="subCategory" label="Sub-Category"></el-table-column>
          <el-table-column prop="product" label="Product"></el-table-column>
        </el-table-column>
        <el-table-column label="Metric (kg CO2eq/kg CO2 converted)">
          <el-table-column prop="co2Converted" label="CO2 Converted" :formatter="formatter"></el-table-column>
          <el-table-column
            prop="co2CaptureProcess"
            label="CO2 Capture Process"
            :formatter="formatter"
          ></el-table-column>
          <el-table-column prop="electrolysis" label="Electrolysis" :formatter="formatter"></el-table-column>
          <el-table-column
            prop="co2ConversionProcess"
            label="CO2 Conversion Process"
            :formatter="formatter"
          ></el-table-column>
          <el-table-column prop="endUse" label="End Use" :formatter="formatter"></el-table-column>
          <el-table-column prop="net" label="Net" :formatter="formatter"></el-table-column>
          <el-table-column prop="lit1" label="Lit1" :formatter="formatter"></el-table-column>
          <el-table-column prop="lit2" label="Lit2" :formatter="formatter"></el-table-column>
          <el-table-column prop="lit3" label="Lit3" :formatter="formatter"></el-table-column>
          <el-table-column prop="lit4" label="Lit4" :formatter="formatter"></el-table-column>
          <el-table-column prop="lit5" label="Lit5" :formatter="formatter"></el-table-column>
        </el-table-column>
        <el-table-column label="Metric (kg CO2eq/kg Product)">
          <el-table-column prop="co2Converted2" label="CO2 Converted" :formatter="formatter"></el-table-column>
          <el-table-column
            prop="co2CaptureProcess2"
            label="CO2 Capture Process"
            :formatter="formatter"
          ></el-table-column>
          <el-table-column prop="electrolysis2" label="Electrolysis" :formatter="formatter"></el-table-column>
          <el-table-column
            prop="co2ConversionProcess2"
            label="CO2 Conversion Process"
            :formatter="formatter"
          ></el-table-column>
          <el-table-column prop="endUse2" label="End Use" :formatter="formatter"></el-table-column>
          <el-table-column prop="net2" label="Net" :formatter="formatter"></el-table-column>
          <el-table-column prop="lit12" label="Lit1" :formatter="formatter"></el-table-column>
          <el-table-column prop="lit22" label="Lit2" :formatter="formatter"></el-table-column>
          <el-table-column prop="lit32" label="Lit3" :formatter="formatter"></el-table-column>
          <el-table-column prop="lit42" label="Lit4" :formatter="formatter"></el-table-column>
          <el-table-column prop="lit52" label="Lit5" :formatter="formatter"></el-table-column>
        </el-table-column>
        <el-table-column label="Avoided Emissions">
          <el-table-column
            prop="avoidedEmission2"
            label="kg CO2eq/MJ Product"
            :formatter="formatter"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="Avoided Emissions">
          <el-table-column
            prop="avoidedEmission"
            label="kg CO2eq/kg Product"
            :formatter="formatter"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="Global Emission Reduction Potential">
          <el-table-column
            prop="globalEmissionReductionPotential"
            label="Gt CO2eq"
            :formatter="formatter"
          ></el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <!-- Show sub-pathway -->
    <div class="col-md-12" v-else>
      <el-table
        :data="
          subPathways.find((e) => e.name === activeTabLabel) !== undefined
            ? subPathways.find((e) => e.name === activeTabLabel).value
            : []
        "
      >
        <el-table-column label>
          <el-table-column prop="item" label="Item"></el-table-column>
        </el-table-column>
        <el-table-column label="From Reference Case">
          <el-table-column prop="referenceAmount" label="Amount" :formatter="formatter"></el-table-column>
          <el-table-column prop="referenceUnit" label="Unit"></el-table-column>
        </el-table-column>
        <el-table-column label="In Intermediate Units">
          <el-table-column prop="intermediateAmount" label="Amount" :formatter="formatter"></el-table-column>
          <el-table-column prop="intermediateUnit" label="Unit"></el-table-column>
        </el-table-column>
        <el-table-column label="Active in Interface">
          <el-table-column prop="activeAmount" label="Amount" :formatter="formatter"></el-table-column>
          <el-table-column prop="activeUnit" label="Unit"></el-table-column>
        </el-table-column>
        <el-table-column label>
          <el-table-column prop="emission" label="kg CO2eq/kg Product" :formatter="formatter"></el-table-column>
          <el-table-column
            prop="converted"
            label="kg CO2eq/kg CO2 Converted"
            :formatter="formatter"
          ></el-table-column>
          <el-table-column prop="converted2" label="kg CO2eq/MJ Product" :formatter="formatter"></el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  props: ["activeTabName", "activeTabLabel", "subPathways", "summary"],
  methods: {
    formatter(row, column, cellValue, index) {
      if (cellValue) {
        return parseFloat(cellValue).toPrecision(3);
      }
    }
  }
};
</script>
