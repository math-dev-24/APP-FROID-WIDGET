import {FLUIDS} from "../types/fluidType.tsx";


export const DATA_FLUIDS: FLUIDS  = [
    {
        name: "R22",
        ref_name: "R22",
        gwp: 1760,
        group: 2,
        classification: "A1",
        critical_pres: 49.9,
        critical_temp: 96.15,
        triple_temp: -157.42,
        triple_pres: 0,
        can_simulate: true,
        is_mix: false,
    },
    {
        name: "R23",
        ref_name: "R23",
        gwp: 14800,
        group: 2,
        classification: "A1",
        critical_pres: 48.32,
        critical_temp: 26.14,
        triple_temp: -155.13,
        triple_pres: 0.0,
        can_simulate: true,
        is_mix: false
    },
    {
        name: "R32",
        ref_name: "R32",
        gwp: 677,
        group: 1,
        classification: "A2L",
        critical_pres: 57.82,
        critical_temp: 78.11,
        triple_temp: -136.81,
        triple_pres: 0.0,
        can_simulate: true,
        lfl: {
            lower: 13.5,
            upper: 24
        },
        is_mix: false
    },
    {
        name: "R134a",
        ref_name: "R134a",
        gwp: 1300,
        group: 2,
        classification: "A1",
        critical_pres: 40.59,
        critical_temp: 101.06,
        triple_temp: -103.3,
        triple_pres: 0.0,
        can_simulate: true,
        is_mix: false
    },
    {
        name: "R1234yf",
        ref_name: "R1234YF",
        gwp: 4,
        group: 1,
        classification: "A2L",
        critical_pres: 33.82,
        critical_temp: 94.7,
        triple_temp: -53.15,
        triple_pres: 0.32,
        can_simulate: true,
        lfl: {
            lower: 6.2,
            upper: 12.3
        },
        is_mix: false
    },
    {
        name: "R1234ze",
        ref_name: "R1234ZEE",
        gwp: 7,
        group: 2,
        classification: "A2L",
        critical_pres: 36.35,
        critical_temp: 109.37,
        triple_temp: -104.53,
        triple_pres: 0.0,
        can_simulate: true,
        lfl: {
            lower: 7.0,
            upper: 9.5
        },
        is_mix: false
    },
    {
        name: "R1233zd",
        ref_name: "R1233ZDE",
        gwp: 4,
        group: 2,
        classification: "A1",
        critical_temp: 166,
        critical_pres: 36,
        triple_temp: 0,
        triple_pres: 0,
        can_simulate: true,
        is_mix: false
    },
    {
        name: "R1270",
        ref_name: "PROPYLEN",
        gwp: 2,
        group: 1,
        classification: "A3",
        critical_pres: 45,
        critical_temp: 91,
        triple_temp: 0,
        triple_pres: 0,
        can_simulate: true,
        lfl: {
            lower: 2.0,
            upper: 11.1
        },
        is_mix: false
    },
    {
        name: "R141b",
        ref_name: "R141b",
        gwp: 782,
        group: 2,
        classification: "A1",
        critical_pres: 42.12,
        critical_temp: 204.35,
        triple_temp: -103.47,
        triple_pres: 0.0,
        can_simulate: true,
        is_mix: false
    },
    {
        name: "R142b",
        ref_name: "R142b",
        gwp: 1980,
        group: 1,
        classification: "A2",
        critical_pres: 41.2,
        critical_temp: 131,
        triple_temp: 0,
        triple_pres: 0.0,
        can_simulate: true,
        is_mix: false,
        lfl: {
            lower: 32,
            upper: 40
        }
    },
    {
        name: "R143a",
        ref_name: "R143a",
        gwp: 4800,
        group: 1,
        classification: "A2L",
        critical_pres: 37.61,
        critical_temp: 72.71,
        triple_temp: -111.81,
        triple_pres: 0.01,
        can_simulate: true,
        lfl: {
            lower: 7.1,
            upper: 16.1
        },
        is_mix: false
    },
    {
        name: "R152a",
        ref_name: "R152a",
        gwp: 138,
        group: 1,
        classification: "A2",
        critical_pres: 45.2,
        critical_temp: 113.26,
        triple_temp: -118.59,
        triple_pres: 0.0,
        can_simulate: true,
        lfl: {
            lower: 4.8,
            upper: 17.0
        },
        is_mix: false
    },
    {
        name: "R170",
        ref_name: "Ethane",
        gwp: 6,
        group: 1,
        classification: "A3",
        critical_pres: 48.72,
        critical_temp: 32.17,
        triple_temp: -182.78,
        triple_pres: 0.0,
        can_simulate: true,
        lfl: {
            lower: 3.0,
            upper: 12.5
        },
        is_mix: false
    },
    {
        name: "R227EA",
        ref_name: "R227EA",
        gwp: 3350,
        group: 2,
        classification: "A1",
        critical_pres: 29.25,
        critical_temp: 101.75,
        triple_temp: -126.8,
        triple_pres: 0.0,
        can_simulate: true,
        is_mix: false
    },
    {
        name: "R236FA",
        ref_name: "R236FA",
        gwp: 8060,
        group: 2,
        classification: "A1",
        critical_pres: 32.0,
        critical_temp: 124.92,
        triple_temp: -93.55,
        triple_pres: 0.0,
        can_simulate: true,
        is_mix: false
    },
    {
        name: "R290",
        ref_name: "PROPANE",
        gwp: 3,
        group: 1,
        classification: "A3",
        critical_pres: 42.51,
        critical_temp: 96.74,
        triple_temp: -187.62,
        triple_pres: 0.0,
        can_simulate: true,
        lfl: {
            lower: 2.1,
            upper: 9.5
        },
        is_mix: false
    },
    {
        name: "R404A",
        ref_name: "R404A",
        gwp: 3922,
        group: 2,
        classification: "A1",
        critical_pres: 37.35,
        critical_temp: 72.12,
        triple_temp: -73.15,
        triple_pres: 0.23,
        can_simulate: true,
        is_mix: true
    },
    {
        name: "R407C",
        ref_name: "R407C",
        gwp: 1774,
        group: 2,
        classification: "A1",
        critical_pres: 46.32,
        critical_temp: 86.2,
        triple_temp: -73.15,
        triple_pres: 0.19,
        can_simulate: true,
        is_mix: true
    },
    {
        name: "R410A",
        ref_name: "R410A",
        gwp: 1920,
        group: 2,
        classification: "A1",
        critical_pres: 49.01,
        critical_temp: 71.34,
        triple_temp: -73.15,
        triple_pres: 0.29,
        can_simulate: true,
        is_mix: true
    },
    {
        name: "R448A",
        ref_name: "R32[0.26]&R125[0.26]&R1234YF[0.20]&R134a[0.21]&R1234ZEE[0.07]",
        gwp: 1387,
        group: 2,
        classification: "A1",
        critical_pres: 46.6,
        critical_temp: 83.7,
        triple_temp: 0,
        triple_pres: 0,
        can_simulate: true,
        is_mix: true
    },
    {
        name: "R449A",
        ref_name: "R32[0.243]&R125[0.247]&R1234YF[0.253]&R134a[0.257]",
        gwp: 1397,
        group: 2,
        classification: "A1",
        critical_temp: 83.9,
        critical_pres: 46.62,
        triple_pres: 0,
        triple_temp: 0,
        can_simulate: true,
        is_mix: true
    },
    {
        name: "R450A",
        ref_name: "R134a[0.42]&R1234yf[0.58]",
        gwp: 547,
        group: 2,
        classification: "A1",
        critical_temp: 104.4,
        critical_pres: 38.2,
        triple_temp: 0,
        triple_pres: 0,
        can_simulate: true,
        is_mix: true
    },
    {
        name: "R452A",
        ref_name: "R32[0.11]&R125[0.59]&R1234YF[0.30]",
        gwp: 2139,
        group: 2,
        classification: "A1",
        critical_pres: 40.6,
        critical_temp: 75.5,
        triple_temp: 0,
        triple_pres: 0,
        can_simulate: true,
        is_mix: true
    },
    {
        name: "R452B",
        ref_name: "R32[0.67]&R125[0.07]&R1234YF[0.26]",
        gwp: 697,
        group: 1,
        classification: "A2L",
        critical_pres: 54.90,
        critical_temp: 79.5,
        triple_temp: 0,
        triple_pres: 0,
        can_simulate: true,
        lfl: {
            lower: 11.9,
            upper: 22.0
        },
        is_mix: true
    },
    {
        name: "R454B",
        ref_name: "R32[0.689]&R1234YF[0.311]",
        gwp: 465,
        group: 1,
        critical_pres: 52.5,
        critical_temp: 78,
        triple_temp: 0,
        triple_pres: 0,
        can_simulate: true,
        classification: "A2L",
        lfl: {
            lower: 11.8,
            upper: 21.5
        },
        is_mix: true
    },
    {
        name: "R454C",
        ref_name: "R32[0.215]&R1234YF[0.785]",
        gwp: 148,
        group: 1,
        classification: "A2L",
        critical_temp: 85.64,
        critical_pres: 43.19,
        triple_temp: 0,
        triple_pres: 0,
        can_simulate: true,
        lfl: {
            lower: 8.1,
            upper: 15.0
        },
        is_mix: true
    },
    {
        name: "R455A",
        ref_name: "CO2[0.03]&R32[0.215]&R1234YF[0.755]",
        gwp: 146,
        group: 1,
        classification: "A2L",
        critical_temp: 87.5,
        critical_pres: 48,
        triple_temp: 0,
        triple_pres: 0,
        can_simulate: true,
        lfl: {
            lower: 11.8,
            upper: 20.0
        },
        is_mix: true
    },
    {
        name: "R456A",
        ref_name:"R1234ZEE[0.49]&R1234a[0.45]&R32[0.06]",
        gwp: 685,
        group: 2,
        classification: "A1",
        critical_pres: 41.7,
        critical_temp: 102.3,
        triple_temp: 0,
        triple_pres: 0,
        can_simulate: true,
        is_mix: true
    },
    {
        name: "R471A",
        ref_name: "R12345ZEE[0.787]&R227EA[0.043]&R1336MZZZ[0.17]",
        gwp: 147,
        group: 2,
        classification: "A1",
        critical_pres: 35.3,
        critical_temp: 112.3,
        triple_temp: 0,
        triple_pres: 0,
        can_simulate: true,
        is_mix: true
    },
    {
        name: "R472A",
        ref_name: "R32[0.12]&R134a[0.19]&CO2[0.69]",
        gwp: 526,
        group: 2,
        classification: "A1",
        critical_pres: 73.2,
        critical_temp: 58,
        triple_temp: 0,
        triple_pres: 0,
        can_simulate: true,
        is_mix: true
    },
    {
        name: "R507A",
        ref_name: "R507A",
        gwp: 3990,
        group: 2,
        classification: "A1",
        critical_pres: 37.05,
        critical_temp: 70.62,
        triple_temp: -73.15,
        triple_pres: 0.23,
        can_simulate: true,
        is_mix: true
    },
    {
        name: "R513A",
        ref_name: "R1234yf[0.56]&R134a[0.44]",
        gwp: 572,
        group: 2,
        classification: "A1",
        critical_pres: 37.67,
        critical_temp: 96.5,
        triple_temp: 0,
        triple_pres: 0,
        can_simulate: true,
        is_mix: true
    },
    {
        name: "R515B",
        ref_name: "R1234ZEE[0.911]&R227EA[0.089]",
        gwp: 288,
        group: 2,
        classification: "A1",
        critical_pres: 35.8,
        critical_temp: 108.8,
        triple_temp: 0,
        triple_pres: 0,
        can_simulate: true,
        is_mix: true
    },
    {
        name: "R600",
        ref_name: "BUTANE",
        gwp: 4,
        group: 1,
        classification: "A3",
        critical_pres: 37.96,
        critical_temp: 151.98,
        triple_temp: -138.25,
        triple_pres: 0.0,
        can_simulate: true,
        lfl: {
            lower: 1.6,
            upper: 8.4
        },
        is_mix: false
    },
    {
        name: "R600A",
        ref_name: "ISOBUTANE",
        gwp: 4,
        group: 1,
        classification: "A3",
        critical_pres: 36.29,
        critical_temp: 134.67,
        triple_temp: -159.42,
        triple_pres: 0.0,
        can_simulate: true,
        lfl: {
            lower: 1.5,
            upper: 8.5
        },
        is_mix: false
    },
    {
        name: "R601a",
        ref_name: "IPENTANE",
        gwp: 5,
        group: 1,
        classification: "A3",
        critical_pres: 33.3,
        critical_temp: 187.8,
        triple_pres: 0,
        triple_temp: 0,
        can_simulate: true,
        is_mix: false,
        lfl: {
            lower: 3.8,
            upper: 10
        }
    },
    {
        name: "R744",
        ref_name: "CO2",
        gwp: 1,
        group: 2,
        classification: "A1",
        critical_pres: 73.77,
        critical_temp: 30.98,
        triple_temp: -56.56,
        triple_pres: 5.18,
        can_simulate: true,
        is_mix: false
    },
    {
        name: "R717",
        ref_name: "AMMONIA",
        gwp: 0,
        group: 1,
        classification: "B2L",
        critical_temp: 132,
        critical_pres: 113,
        triple_pres: 0,
        triple_temp: 0,
        can_simulate: true,
        lfl: {
            lower: 16,
            upper: 25
        },
        is_mix: false
    }
];

