export const defaultConstants = {
  emissionFactors: {
    activeFactors: {
      electricity: {
        renewable: 0.024,
        naturalGas: 0.49,
        coalFired: 0.8
      },
      steam: {
        geothermal: 0.002,
        naturalGas: 0.052
      },
      heat: {
        electrical: 0.024,
        naturalGas: 0.25,
        combined: 0.55
      },
      hydrogen: {
        electrolysis: 0.984,
        steam: 10.62,
        coal: 24.2
      },
      co2Capture: {
        directAir: 0.007,
        naturalGas: 0.18,
        coal: 0.82
      }
    },
    gwp: {
      n2o: 298,
      ch4: 25
    },
    fuelCycleEmissions: {
      methane: 2.75,
      diesel: 3.11,
      ethanol: 88 / 46,
      co: 1.75,
      hexane: 0.000000000000758101,
      methanol: {
        emission: 1.36755726371863,
        heat: 30.3
      },
      biodiesel: 2.94
    },
    upstreamEmissions: {
      cooling: 0.14588,
      methane: {
        volume: 2.06294,
        mass: 2.06294 / 0.656
      },
      naturalGas: {
        volume: 0.38434,
        mass: 0.38434 / 1.4
      },
      hardCoal: {
        mass: 0.11907,
        energy: 0.11907 / 17.3
      },
      oil: {
        mass: 0.69024,
        energy: 0.69024 / 39
      }
    },
    incumbent: {
      cement: 0.82
    }
  },
  energyUnitConversions: {
    LHV: {
      h2: 120.21,
      methane: 50,
      naturalGas: 47.141,
      conventionalGas: 43.448,
      conventionalDiesel: 42.791,
      fischerTropschDiesel: 43.247,
      methanol: 20.094,
      DME: 28.4,
      syngas: 24.558,
      ethanol: 26.96
    },
    HHV: {
      h2: 142.18,
      methane: 55.55,
      naturalGas: 52.225,
      conventionalGas: 46.536,
      conventionalDiesel: 45.766,
      fischerTropschDiesel: 45.471,
      methanol: 22.884,
      sygas: 27.508
    },
    energyConversion: {
      MJtokWh: 0.28,
      BTUtoMJ: 0.001055,
      galtom3: 0.003785
    }
  },
  constants: {
    carbonates: 4.4,
    ethanol: (2.5774 * (10 ^ 10) * 0.79 * 0.003785) / (10 ^ 12),
    diesel: 1.15,
    methane: 2.72,
    methanol: 0.07
  },
  processCorrelations: {
    SOECCOMethane: {
      value: 2,
      extra: 0.125
    },
    SOECCOMethanol: 1,
    SOECCODiesel: 2.3,
    PEMDiesel: {
      fischerTropschDiesel: 43.247,
      parameter: 0.28,
      electricity: 3.6
    }
  }
};
