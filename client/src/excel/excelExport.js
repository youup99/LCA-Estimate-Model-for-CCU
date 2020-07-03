import XLSX from "xlsx";

var wb = XLSX.utils.book_new();

var calcReady = false;
var summaryReady = false;

export function exportCalculation(param) {
  var pathways = [
    "bioconversion",
    "mineralization",
    "reductionElectricity",
    "reductionHydrocarbon",
    "reductionHydrogen",
    "reductionLight",
  ];
  var header = [
    "item",
    "referenceAmount",
    "referenceUnit",
    "intermediateAmount",
    "intermediateUnit",
    "activeAmount",
    "activeUnit",
    "emission",
    "converted",
    "converted2",
  ];
  var summaryHeader = [
    "category",
    "subCategory",
    "product",
    "co2Converted",
    "co2CaptureProcess",
    "electrolysis",
    "co2ConversionProcess",
    "endUse",
    "net",
    "lit1",
    "lit2",
    "lit3",
    "lit4",
    "co2Converted2",
    "co2CaptureProcess2",
    "electrolysis2",
    "co2ConversionProcess2",
    "endUse2",
    "net2",
    "lit1_2",
    "lit2_2",
    "lit3_2",
    "lit4_2",
    "avoidedEmission",
    "avoidedEmission2",
    "globalEmissionReductionPotential",
  ];

  // Going through each pathway
  pathways.forEach((value) => {
    var ws;
    var origin = 0;

    // Sub-pathway
    param[value].subPathways.forEach((subPathway, index) => {
      if (index == 0) {
        ws = XLSX.utils.json_to_sheet([{ name: subPathway.name }], {
          skipHeader: true,
          origin: origin,
        });
        XLSX.utils.sheet_add_json(ws, subPathway.value, {
          header: header,
          origin: origin + 1,
        });
      } else {
        XLSX.utils.sheet_add_json(ws, [{ name: subPathway.name }], {
          skipHeader: true,
          origin: origin,
        });
        XLSX.utils.sheet_add_json(ws, subPathway.value, {
          header: header,
          origin: origin + 1,
        });
      }
      origin += subPathway.value.length + 3;
    });

    // Summary
    XLSX.utils.sheet_add_json(ws, [{ name: "Summary" }], {
      skipHeader: true,
      origin: origin,
    });
    XLSX.utils.sheet_add_json(ws, param[value].summary, {
      header: summaryHeader,
      origin: origin + 1,
    });

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, value);
  });

  // Incumbents
  var ws;
  var origin = 0;
  var incumbents = param.$store.getters["incumbents/getState"];
  var incumbentList = ["Diesel", "Ethanol", "Methane", "Methanol"];
  var incumbentHeader = [
    "item",
    "referenceAmount",
    "referenceUnit",
    "emission",
    "converted",
  ];
  incumbentList.forEach((value, index) => {
    if (index == 0) {
      ws = XLSX.utils.json_to_sheet([{ name: value }], {
        skipHeader: true,
        origin: origin,
      });
      XLSX.utils.sheet_add_json(ws, incumbents[value], {
        header: incumbentHeader,
        origin: origin + 1,
      });
    } else {
      XLSX.utils.sheet_add_json(ws, [{ name: value }], {
        skipHeader: true,
        origin: origin,
      });
      XLSX.utils.sheet_add_json(ws, incumbents[value], {
        header: incumbentHeader,
        origin: origin + 1,
      });
    }
    origin += incumbents[value].length + 3;
  });
  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, "Incumbents");

  calcReady = true;
  if (calcReady && summaryReady) {
    XLSX.writeFile(wb, "test.xlsx");
  }
}

export function exportSummary(param) {
  var list = ["Figure1", "Figure2", "Figure3", "Figure4"];
  var fig1Header = [
    "category",
    "subCategory",
    "product",
    "co2Converted",
    "co2CaptureProcess",
    "co2ConversionProcess",
    "endUse",
    "net",
    "lit1",
    "lit2",
    "lit3",
    "lit4",
  ];
  var fig2Header = [
    "category",
    "subCategory",
    "product",
    "co2Converted2",
    "co2CaptureProcess2",
    "electrolysis2",
    "co2ConversionProcess2",
    "endUse2",
    "net2",
  ];
  var fig3Header = ["category", "subCategory", "product", "avoidedEmission"];
  var fig4Header = [
    "category",
    "subCategory",
    "product",
    "globalEmissionReductionPotential",
    "globalReductionPotential",
  ];
  var headers = [fig1Header, fig2Header, fig3Header, fig4Header];
  var ws;
  var origin = 0;
  list.forEach((value, index) => {
    if (index == 0) {
      ws = XLSX.utils.json_to_sheet([{ name: value }], {
        skipHeader: true,
        origin: origin,
      });
      XLSX.utils.sheet_add_json(ws, param[value], {
        header: headers[0],
        origin: origin + 1,
      });
    } else {
      XLSX.utils.sheet_add_json(ws, [{ name: value }], {
        skipHeader: true,
        origin: origin,
      });
      XLSX.utils.sheet_add_json(ws, param[value], {
        header: headers[index],
        origin: origin + 1,
      });
    }
    origin += param[value].length + 3;
  });
  XLSX.utils.book_append_sheet(wb, ws, "Summary");
  summaryReady = true;

  if (calcReady && summaryReady) {
    XLSX.writeFile(wb, "test.xlsx");
  }
}
