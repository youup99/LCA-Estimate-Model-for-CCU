// General Assumptions
export const generalAssumption = ["Default", "Use Custom", "Custom Value"];
export const generalAssumptionNames = [
  "electricity",
  "heat",
  "steam",
  "hydrogen",
  "co2",
];

// Pathway Names
export const names = [
  "mineralization",
  "bioconversion",
  "reductionElectricity",
  "reductionHydrocarbon",
  "reductionLight",
  "reductionHydrogen",
];

// CO2 Mineralization
export const mineralization = ["electricity", "heat"];
export const mineralizationNames = [
  "DMCW - calcite",
  "WMC - CWM",
  "DMCO - magnesite",
];

// CO2 Bioconversion
export const bioconversion = ["electricity", "heat"];
export const bioconversionNames = ["PDE - diesel", "PWE - diesel"];

// CO2 Reduction Involving Electricity
export const reductionElectricity = [
  "electricity",
  "heat",
  "electrolysis",
  "secondConversion",
];
export const reductionElectricityNames = [
  "SOECCO - methane",
  "SOECCO - methanol",
  "SOECCO - diesel",
  "SOECCO - ethanol",
  "SOECEL - methane",
  "SOECEL - methanol",
  "SOECEL - diesel",
];

// CO2 Reduction by Hydrocarbon
export const reductionHydrocarbon = ["electricity", "heat", "h2", "methane"];
export const reductionHydrocarbonNames = [
  "DMRCO - methanol",
  "DMRH2 - methanol",
];

// CO2 Reduction Involving Light
export const reductionLight = ["electricity", "naturalGas"];
export const reductionLightNames = ["PCAT - methane", "PCAT - methanol"];

// CO2 Reduction by Hydrogen
export const reductionHydrogen = ["electricity", "heat", "hydrogen"];
export const reductionHydrogenNames = [
  "DH2 - diesel",
  "DH2 - methane",
  "DH2 - methanol",
];

// Combined
export const headers = [
  mineralization,
  bioconversion,
  reductionElectricity,
  reductionHydrocarbon,
  reductionLight,
  reductionHydrogen,
];
export const headerNames = [
  mineralizationNames,
  bioconversionNames,
  reductionElectricityNames,
  reductionHydrocarbonNames,
  reductionLightNames,
  reductionHydrogenNames,
];
export const excelRanges = [
  "K2:L4",
  "K2:L3",
  "K2:N8",
  "K2:N3",
  "K2:L3",
  "K2:M4",
];
