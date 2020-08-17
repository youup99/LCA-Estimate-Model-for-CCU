export const defaultPathways = {
  mineralization: {
    DMCW: {
      calcite: {
        electricity: 0.314006348200884,
        heat: 0.0342029798040323
      }
    },
    WMC: {
      CWM: {
        electricity: 0.0587838932985424
      }
    },
    DMCO: {
      magnesite: {
        electricity: 0.497789433333255
      }
    }
  },
  bioconversion: {
    PDE: {
      diesel: {
        electricity: 6.08777904
      }
    },
    PWE: {
      diesel: {
        electricity: 0.63,
        heat: 0.29
      }
    }
  },
  reductionLight: {
    PCAT: {
      methane: {
        electricity: 0.00690414827960455,
        naturalGas: 0.000074171177881324
      },
      methanol: {
        electricity: 0.00317063786641992,
        naturalGas: 0.133241370962251
      }
    }
  },
  reductionHydrogen: {
    DH2: {
      diesel: {
        hydrogen: 0.428375
      },
      methane: {
        electricity: 0.335,
        hydrogen: 0.52
      },
      methanol: {
        electricity: 0.169,
        heat: 0.439,
        hydrogen: 0.199
      }
    }
  },
  reductionElectricity: {
    SOECCO: {
      methane: {
        electricity: 5.125,
        heat: 0.645569620253165
      },
      methanol: {
        electricity: 6.949,
        heat: 0.322784810126582
      },
      diesel: {
        electricity: 15.9827,
        heat: 0.742405063291139
      },
      ethanol: {
        electricity: 57.3522215169787
      }
    },
    SOECEL: {
      methane: {
        electrolysis: 21.32,
        secondConversion: 0.335
      },
      methanol: {
        electrolysis: 7.749,
        secondConversion: 1.271
      },
      diesel: {
        electrolysis: 24.21832
      }
    }
  },
  reductionHydrocarbon: {
    DMRCO: {
      methanol: {
        electricity: 0.203952143533123,
        heat: 4.62890310725552,
        methane: 0.731072555205047
      }
    },
    DMRH2: {
      methanol: {
        electricity: 0.291029246054519,
        heat: 3.43137529411765,
        h2: 0.0911047345767575,
        methane: 0.332496413199426
      }
    }
  },
  pathwayTest: {
    subpathway1: {
      methanol: {
        electricity: 0.203952143533123,
        heat: 4.62890310725552,
        methane: 0.731072555205047
      }
    },
    subpathway2: {
      methanol: {
        electricity: 0.291029246054519,
        heat: 3.43137529411765,
        h2: 0.0911047345767575,
        methane: 0.332496413199426
      }
    }
  }
};
