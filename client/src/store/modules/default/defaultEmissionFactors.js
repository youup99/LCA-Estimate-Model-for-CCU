export const defaultEmissionFactors = {
  mineralization: {
    DMCW: {
      calcite: {
        electricity: "Renewable",
        heat: "Electrical heater + renewable",
        co2: "Direct air capture",
      },
    },
    WMC: {
      CWM: {
        electricity: "Renewable",
        co2: "Direct air capture",
      },
    },
    DMCO: {
      magnesite: {
        electricity: "Renewable",
        co2: "Direct air capture",
      },
    },
  },
  bioconversion: {
    PDE: {
      diesel: {
        electricity: "Renewable",
        co2: "Direct air capture",
      },
    },
    PWE: {
      diesel: {
        electricity: "Renewable",
        heat: "Electrical heater + renewable",
        co2: "Direct air capture",
      },
    },
  },
  reductionLight: {
    PCAT: {
      methane: {
        electricity: "Renewable",
        co2: "Direct air capture",
      },
      methanol: {
        electricity: "Renewable",
        co2: "Direct air capture",
      },
    },
  },
  reductionHydrogen: {
    DH2: {
      diesel: {
        hydrogen: "Electrolysis + low carbon electricity",
        co2: "Direct air capture",
      },
      methane: {
        electricity: "Renewable",
        hydrogen: "Electrolysis + low carbon electricity",
        co2: "Direct air capture",
      },
      methanol: {
        electricity: "Renewable",
        heat: "Electrical heater + renewable",
        hydrogen: "Electrolysis + low carbon electricity",
        co2: "Direct air capture",
      },
    },
  },
  reductionElectricity: {
    SOECCO: {
      methane: {
        electricity: "Renewable",
        heat: "Electrical heater + renewable",
        co2: "Direct air capture",
      },
      methanol: {
        electricity: "Renewable",
        heat: "Electrical heater + renewable",
        co2: "Direct air capture",
      },
      diesel: {
        electricity: "Renewable",
        heat: "Electrical heater + renewable",
        co2: "Direct air capture",
      },
      ethanol: {
        electricity: "Renewable",
        co2: "Direct air capture",
      },
    },
    SOECEL: {
      methane: {
        electricity: "Renewable",
        co2: "Direct air capture",
      },
      methanol: {
        electricity: "Renewable",
        co2: "Direct air capture",
      },
      diesel: {
        electricity: "Renewable",
        co2: "Direct air capture",
      },
    },
  },
  reductionHydrocarbon: {
    DMRCO: {
      methanol: {
        electricity: "Renewable",
        heat: "Electrical heater + renewable",
        co2: "Direct air capture",
      },
    },
    DMRH2: {
      methanol: {
        electricity: "Renewable",
        heat: "Electrical heater + renewable",
        hydrogen: "Electrolysis + low carbon electricity",
        co2: "Direct air capture",
      },
    },
  },
};
