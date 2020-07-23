import XLSX from "xlsx";
import {
  activeNames,
  pathways,
  pathwayNames,
  calculation,
  summary,
  incumbent,
  fig1Header,
  fig2Header,
  fig3Header,
  fig4Header,
} from "./exportHeaders";

var wb;

// Loading Excel Template
var url = "template.xlsx";
var oReq = new XMLHttpRequest();
oReq.open("GET", url, true);
oReq.responseType = "arraybuffer";

oReq.onload = function(e) {
  var arraybuffer = oReq.response;

  /* convert data to array */
  var data = new Uint8Array(arraybuffer);
  /* Call XLSX */
  wb = XLSX.read(data, { type: "array", cellStyles: true });
};
oReq.send();

// Make sure these 3 are ready before downloading
var activeReady = false;
var calcReady = false;
var summaryReady = false;

export function exportActive(param) {
  var ws = wb.Sheets["Active"];
  var origin = 4;

  // Add active
  XLSX.utils.sheet_add_json(ws, param, {
    header: activeNames,
    skipHeader: true,
    origin: origin,
  });

  activeReady = true;

  // If all 3 are ready, download
  if (activeReady && calcReady && summaryReady) {
    XLSX.writeFile(wb, "test.xlsx", { cellStyles: true });
  }
}

export function exportCalculation(param) {
  // Going through each pathway
  pathways.forEach((value, index) => {
    var ws = wb.Sheets[pathwayNames[index]];
    var origin = 6;

    // Add Sub-pathways
    param[value].subPathways.forEach((subPathway) => {
      XLSX.utils.sheet_add_json(ws, subPathway.value, {
        header: calculation,
        skipHeader: true,
        origin: origin,
      });
      origin += subPathway.value.length + 7;
    });

    // Account for summary header size which is 3 less than subpathways
    origin -= 2;

    // Add summary
    XLSX.utils.sheet_add_json(ws, param[value].summary, {
      header: summary,
      skipHeader: true,
      origin: origin,
    });
  });

  // Incumbents
  var ws = wb.Sheets["Incumbents"];
  var origin = 5;
  var incumbents = param.$store.getters["incumbents/getState"];
  var incumbentList = ["Diesel", "Ethanol", "Methane", "Methanol"];
  // Add Incumbents
  incumbentList.forEach((value) => {
    XLSX.utils.sheet_add_json(ws, incumbents[value], {
      header: incumbent,
      skipHeader: true,
      origin: origin,
    });
    origin += incumbents[value].length + 6;
  });

  calcReady = true;

  // If all 3 are ready, download
  if (activeReady && calcReady && summaryReady) {
    XLSX.writeFile(wb, "test.xlsx", { cellStyles: true });
  }
}

export function exportSummary(param) {
  var list = ["Figure1", "Figure2", "Figure3", "Figure4"];
  var headers = [fig1Header, fig2Header, fig3Header, fig4Header];
  var ws = wb.Sheets["Summary"];
  var origin = 4;
  list.forEach((value, index) => {
    XLSX.utils.sheet_add_json(ws, param[value], {
      header: headers[index],
      skipHeader: true,
      origin: origin,
    });
    origin += param[value].length + 5;
  });

  summaryReady = true;

  // If all 3 are ready, download
  if (activeReady && calcReady && summaryReady) {
    XLSX.writeFile(wb, "test.xlsx", { cellStyles: true });
  }
}
