export const defaultGeneralAssumptions = {
  defaultEmission: {
    electricity: {
      list: ["Renewable", "Natural gas", "Coal fired"],
      active: "Renewable",
      Renewable: 0.024,
      "Natural gas": 0.49,
      "Coal fired": 0.8
    },
    heat: {
      list: [
        "Electrical heater + renewable",
        "Natural gas industrial furnace",
        "Combined heat & power"
      ],
      active: "Electrical heater + renewable",
      "Electrical heater + renewable": 0.024,
      "Natural gas industrial furnace": 0.25,
      "Combined heat & power": 0.55
    },
    steam: {
      list: ["Geothermal", "Natural gas industrial boiler"],
      active: "Geothermal",
      Geothermal: 0.002,
      "Natural gas industrial boiler": 0.052
    },
    hydrogen: {
      list: [
        "Electrolysis + low carbon electricity",
        "Steam methane reforming",
        "Coal gasification"
      ],
      active: "Electrolysis + low carbon electricity",
      "Electrolysis + low carbon electricity": 0.984,
      "Steam methane reforming": 10.62,
      "Coal gasification": 24.2
    },
    co2: {
      list: [
        "Direct air capture",
        "Natural gas power plant",
        "Coal power plant"
      ],
      active: "Direct air capture",
      "Direct air capture": 0.007,
      "Natural gas power plant": 0.18,
      "Coal power plant": 0.82
    }
  },
  customEmission: {
    electricity: {
      use: false,
      value: 0
    },
    heat: {
      use: false,
      value: 0
    },
    steam: {
      use: false,
      value: 0
    },
    hydrogen: {
      use: false,
      value: 0
    },
    co2: {
      use: false,
      value: 0
    }
  },
  showAdditional: false
};
