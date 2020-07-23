import XLSX from "xlsx";

// General Assumptions
import { generalAssumption, generalAssumptionNames } from "./importHeaders";

export function exportGeneralAssumptions(evt) {
  var file;
  var files = evt.target.files;
  var output = {};

  if (!files || files.length == 0) return;

  file = files[0];

  var reader = new FileReader();
  reader.onload = function(e) {
    // pre-process data
    var binary = "";
    var bytes = new Uint8Array(e.target.result);
    var length = bytes.byteLength;
    for (var i = 0; i < length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }

    /* read workbook */
    var wb = XLSX.read(binary, { type: "binary" });

    /* grab first sheet */
    var wsname = wb.SheetNames[0];
    var ws = wb.Sheets[wsname];

    /* parse sheet row by row */
    var result = XLSX.utils.sheet_to_json(ws, {
      header: generalAssumption,
      range: "R2:T7",
    });

    result.forEach((value, index) => {
      output[generalAssumptionNames[index]] = value;
    });
  };
  reader.readAsArrayBuffer(file);
  return output;
}

// Pathways
import { names, headers, headerNames, excelRanges } from "./importHeaders";

export function exportPathways(evt) {
  var file;
  var files = evt.target.files;
  var output = {};

  if (!files || files.length == 0) return;

  file = files[0];

  var reader = new FileReader();
  reader.onload = function(e) {
    // pre-process data
    var binary = "";
    var bytes = new Uint8Array(e.target.result);
    var length = bytes.byteLength;
    for (var i = 0; i < length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }

    /* read workbook */
    var wb = XLSX.read(binary, { type: "binary" });

    wb.SheetNames.forEach((value, index) => {
      if (index != 0) {
        var temp = {};
        var wsname = value;
        var ws = wb.Sheets[wsname];

        /* parse sheet row by row */
        var result = XLSX.utils.sheet_to_json(ws, {
          header: headers[index - 1],
          range: excelRanges[index - 1],
        });

        result.forEach((value, index1) => {
          var label = headerNames[index - 1][index1].split(" - ");
          if (temp[label[0]] === undefined) {
            temp[label[0]] = {};
          }
          temp[label[0]][label[1]] = value;
        });
        output[names[index - 1]] = temp;
      }
    });
  };
  reader.readAsArrayBuffer(file);
  return output;
}
