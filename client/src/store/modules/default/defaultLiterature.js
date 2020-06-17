export const defaultLiterature = {
  mineralizationLit: {
    DMCW: {
      calcite: {
        conversion: {
          baseline: -0.588,
          low: -0.981,
          high: 0.199,
        },
        emission: {
          baseline: -0.413,
          low: -0.665,
          high: 0.111,
        },
      },
    },
    WMC: {
      CWM: {
        conversion: {
          baseline: [-0.578, -0.684, -0.708, -0.625],
          low: [-0.978, -0.984, -0.986, -0.98],
          high: [0.213, 0.0408, 0.0024, 0.136],
        },
        emission: {
          baseline: [-0.0724, -0.131, -0.17, -0.0834],
          low: [-0.122, -0.189, -0.236, -0.131],
          high: [0.0267, 0.00783, 0.000572, 0.0181],
        },
      },
    },
    DMCO: {
      magnesite: {
        conversion: {
          baseline: [-0.477, -0.466, -0.213],
          low: [-0.975, -0.975, -0.962],
          high: [0.379, 0.397, 0.811],
        },
        emission: {
          baseline: [-0.26, -0.255, -0.076],
          low: [-0.499, -0.499, -0.345],
          high: [0.167, 0.175, 0.29],
        },
      },
    },
  },
  bioconversionLit: {
    PDE: {
      diesel: {
        conversion: {
          baseline: [1.926900585, 0, 0.643274854],
        },
      },
    },
    PWE: {
      diesel: {
        conversion: {
          baseline: [2.510526316, 0.078947368, 0.494736842],
        },
      },
    },
  },
  reductionLightLit: {
    PCAT: {
      methanol: {
        conversion: {
          baseline: 0.385135135135135,
        },
      },
      methane: {
        conversion: {
          baseline: 0.0968858131487889,
        },
      },
    },
  },
  reductionHydrogenLit: {
    DH2: {
      methane: {
        conversion: {
          baseline: [4.697, 4.93, 5.199],
        },
      },
      methanol: {
        conversion: {
          baseline: [3.331, 3.847, 4.182, 4.941],
        },
      },
    },
  },
  reductionElectricityLit: {
    SOECEL: {
      methane: {
        conversion: {
          baseline: [5.393, 4.3, 4.06],
          low: [0.262, 0.2, 0.26],
          high: [9.331, 7.5, 7.11],
        },
        conversion2: {
          baseline: [0.297, 0.221, 0.209],
          low: [0.014, 0.012, 0.017],
          high: [0.513, 0.388, 0.364],
        },
        emission: {
          baseline: [14.83, 11.07, 10.47],
          low: [0.721, 0.62, 0.85],
          high: [25.66, 19.38, 18.2],
        },
      },
      methanol: {
        conversion: {
          baseline: [4.04, 3.85, 3.85, 3.43],
          low: [0.41, 0.43, 0.42, 0.13],
          high: [6.46, 6.13, 6.13, 6.15],
        },
        conversion2: {
          baseline: [0.289, 0.28, 0.26, 0.244],
          low: [0.029, 0.03, 0.03, 0.009],
          high: [0.461, 0.45, 0.42, 0.437],
        },
        emission: {
          baseline: [5.8, 5.72, 5.3, 4.89],
          low: [0.59, 0.64, 0.58, 0.19],
          high: [9.27, 9.09, 8.43, 8.77],
        },
      },
    },
  },
};
