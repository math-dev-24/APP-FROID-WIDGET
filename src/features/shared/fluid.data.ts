import type { FLUIDS } from "@/types/fluid"

export const DATA_FLUIDS: FLUIDS = [
    {
        name: "R22",
        ref_name: "R22",
        gwp: 1760,
        group: 2,
        odp: 0.05,
        classification: "A1",
        critical_pres: 49.9,
        critical_temp: 96.15,
        triple_temp: -157.42,
        triple_pres: 0,
        can_simulate: true,
        is_mix: false,
        links: [],
        regulation: {
            affected: true,
            limit_year: "2000",
            about: "Protocol de Montréal"
        }
    },
    {
        name: "R23",
        ref_name: "R23",
        gwp: 14800,
        group: 2,
        odp: 0.05,
        classification: "A1",
        critical_pres: 48.32,
        critical_temp: 26.14,
        triple_temp: -155.13,
        triple_pres: 0.0,
        can_simulate: true,
        is_mix: false,
        links: [],
        regulation: {
            affected: true,
            limit_year: "2000",
            about: "Protocol de Montréal"
        }
    },
    {
        name: "R32",
        ref_name: "R32",
        gwp: 677,
        group: 1,
        odp: 0,
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
        description: "Difluorométhane - Frigorigène légèrement inflammable",
        is_mix: false,
        links: [],
        regulation: {
            affected: true,
            limit_year: "2030",
            about: "F-Gaz"
        }
    },
    {
        name: "R134a",
        ref_name: "R134a",
        gwp: 1300,
        odp: 0,
        group: 2,
        classification: "A1",
        critical_pres: 40.59,
        critical_temp: 101.06,
        triple_temp: -103.3,
        triple_pres: 0.0,
        can_simulate: true,
        is_mix: false,
        links: [
            {
                label: "Framacold - Substitut R134a",
                url: "https://www.framacold.com/framacold-produit/191-substitut-du-r134a-au-plus-faible-gwp"
            }
        ],
        regulation: {
            affected: true,
            limit_year: "2032",
            about: `F-Gaz restrictions. Solution de remplacement : <a target="_blank" class="text-cyan-400 dark:text-cyan-400 hover:underline" href="https://www.framacold.com/framacold-produit/191-substitut-du-r134a-au-plus-faible-gwp">R470B (RS51)</a> sans date limite avec un GWP de -50%.`
        }
    },
    {
        name: "R1234yf",
        ref_name: "R1234YF",
        gwp: 4,
        odp: 0,
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
        description: "2,3,3,3-Tétrafluoroprop-1-ène - Frigorigène légèrement inflammable",
        is_mix: false,
        links: [],
        regulation: {
            affected: false
        }
    },
    {
        name: "R1234ze",
        ref_name: "R1234ZEE",
        gwp: 7,
        odp: 0,
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
        description: "Trans-1,3,3,3-Tétrafluoroprop-1-ène - Frigorigène légèrement inflammable",
        is_mix: false,
        links: [],
        regulation: {
            affected: false
        }
    },
    {
        name: "R1233zd",
        ref_name: "R1233ZDE",
        gwp: 4,
        odp: 0,
        group: 2,
        classification: "A1",
        critical_temp: 166,
        critical_pres: 36,
        triple_temp: 0,
        triple_pres: 0,
        can_simulate: true,
        is_mix: false,
        links: [],
        regulation: {
            affected: false
        }
    },
    {
        name: "R1270",
        ref_name: "PROPYLEN",
        gwp: 2,
        odp: 0,
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
        description: "Propylène - Frigorigène naturel hautement inflammable",
        is_mix: false,
        links: [],
        regulation: {
            affected: false
        }
    },
    {
        name: "R141b",
        ref_name: "R141b",
        gwp: 782,
        odp: 0,
        group: 2,
        classification: "A1",
        critical_pres: 42.12,
        critical_temp: 204.35,
        triple_temp: -103.47,
        triple_pres: 0.0,
        can_simulate: true,
        is_mix: false,
        links: [],
        regulation: {
            affected: false
        }
    },
    {
        name: "R142b",
        ref_name: "R142b",
        gwp: 1980,
        odp: 0,
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
        },
        description: "",
        links: [],
        regulation: {
            affected: false
        }
    },
    {
        name: "R143a",
        ref_name: "R143a",
        gwp: 4800,
        odp: 0,
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
        description: "1,1,1-Trifluoroéthane - Frigorigène légèrement inflammable",
        is_mix: false,
        links: [],
        regulation: {
            affected: false
        }
    },
    {
        name: "R152a",
        ref_name: "R152a",
        gwp: 138,
        odp: 0,
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
        description: "1,1-Difluoroéthane - Frigorigène modérément inflammable",
        is_mix: false,
        links: [],
        regulation: {
            affected: false
        }
    },
    {
        name: "R170",
        ref_name: "Ethane",
        gwp: 6,
        odp: 0,
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
        description: "Éthane - Frigorigène naturel hautement inflammable",
        is_mix: false,
        links: [],
        regulation: {
            affected: false
        }
    },
    {
        name: "R227EA",
        ref_name: "R227EA",
        gwp: 3350,
        odp: 0,
        group: 2,
        classification: "A1",
        critical_pres: 29.25,
        critical_temp: 101.75,
        triple_temp: -126.8,
        triple_pres: 0.0,
        can_simulate: true,
        is_mix: false,
        links: [],
        regulation: {
            affected: false
        }
    },
    {
        name: "R236FA",
        ref_name: "R236FA",
        gwp: 8060,
        odp: 0,
        group: 2,
        classification: "A1",
        critical_pres: 32.0,
        critical_temp: 124.92,
        triple_temp: -93.55,
        triple_pres: 0.0,
        can_simulate: true,
        is_mix: false,
        links: [],
        regulation: {
            affected: false
        }
    },
    {
        name: "R290",
        ref_name: "PROPANE",
        gwp: 3,
        odp: 0,
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
        description: "Isobutane - Frigorigène naturel hautement inflammable",
        is_mix: false,
        links: [],
        regulation: {
            affected: false
        }
    },
    {
        name: "R404A",
        ref_name: "R125[0.357816784026318]&R134A[0.0382639950410712]&R143A[0.603919220932611]",
        gwp: 3922,
        odp: 0,
        group: 2,
        classification: "A1",
        critical_pres: 37.35,
        critical_temp: 72.12,
        triple_temp: -73.15,
        triple_pres: 0.23,
        can_simulate: true,
        is_mix: true,
        links: [],
        regulation: {
            affected: true,
            limit_year: "2030",
            about: "F-Gaz interdiction en 2030. Solution de remplacement : R470B (-80% GWP), en lieu et place."
        }
    },
    {
        name: "R407A",
        ref_name: "R32[0.346419854360797]&R125[0.300315552114308]&R134A[0.353264593524896]",
        group: 2,
        gwp: 2107,
        odp: 0,
        classification: "A1",
        critical_temp: 82.3,
        critical_pres: 45.15,
        triple_pres: 0,
        triple_temp: 0,
        is_mix: true,
        can_simulate: true,
        links: [],
        regulation: {
            affected: true,
            limit_year: "",
            about: "F-Gaz"
        }
    },
    {
        name: "R407C",
        ref_name: "R32[0.381109419953993]&R125[0.179558888662016]&R134A[0.439331691383991]",
        gwp: 1774,
        odp: 0,
        group: 2,
        classification: "A1",
        critical_pres: 46.32,
        critical_temp: 86.2,
        triple_temp: -73.15,
        triple_pres: 0.19,
        can_simulate: true,
        is_mix: true,
        links: [],
        regulation: {
            affected: false
        }
    },
    {
        name: "R410A",
        ref_name: "R32[0.697614699375863]&R125[0.302385300624138]",
        gwp: 1920,
        odp: 0,
        group: 2,
        classification: "A1",
        critical_pres: 49.01,
        critical_temp: 71.34,
        triple_temp: -73.15,
        triple_pres: 0.29,
        can_simulate: true,
        is_mix: true,
        links: [
            {
                label: "Framacold - Retrofit du R410A PAC -> RS53",
                url: "https://www.framacold.com/framacold-produit/83-retrofit-climatisation-et-pac-du-r410a"
            }
        ],
        regulation: {
            affected: true,
            limit_year: "baisse du quota",
            about: "Restriction de quotas. Solution de remplacement sans date limite : <a target='_blank' href='https://www.framacold.com/framacold-produit/83-retrofit-climatisation-et-pac-du-r410a'>R470A (-53% GWP)</a>, en lieu et place."
        }
    },
    {
        name: "R448A",
        ref_name: "R32[0.26]&R125[0.26]&R1234YF[0.20]&R134a[0.21]&R1234ZEE[0.07]",
        gwp: 1387,
        odp: 0,
        group: 2,
        classification: "A1",
        critical_pres: 46.6,
        critical_temp: 83.7,
        triple_temp: 0,
        triple_pres: 0,
        can_simulate: true,
        is_mix: true,
        links: [],
        regulation: {
            affected: true,
            limit_year: "2032",
            about: "F-Gaz interdiction. Solution de remplacement : R470B / RS51 (-50% GWP), en lieu et place."
        }
    },
    {
        name: "R449A",
        ref_name: "R32[0.407364566995509]&R125[0.179481207732065]&R1234YF[0.193480840388364]&R134a[0.219673384884062]",
        gwp: 1397,
        odp: 0,
        group: 2,
        classification: "A1",
        critical_temp: 83.9,
        critical_pres: 46.62,
        triple_pres: 0,
        triple_temp: 0,
        can_simulate: true,
        is_mix: true,
        links: [],
        regulation: {
            affected: true,
            limit_year: "2032",
            about: "F-Gaz interdiction. Solution de remplacement : R470B / RS51 (-50% GWP), en lieu et place."
        }
    },
    {
        name: "R450A",
        ref_name: "R134a[0.447322067369848]&R1234yf[0.552677932630152]",
        gwp: 547,
        odp: 0,
        group: 2,
        classification: "A1",
        critical_temp: 104.4,
        critical_pres: 38.2,
        triple_temp: 0,
        triple_pres: 0,
        can_simulate: true,
        is_mix: true,
        links: [],
        regulation: {
            affected: false
        }
    },
    {
        name: "R452A",
        ref_name: "R32[0.218864360337465]&R125[0.508837870465814]&R1234YF[0.272297769196721]",
        gwp: 2139,
        odp: 0,
        group: 2,
        classification: "A1",
        critical_pres: 40.6,
        critical_temp: 75.5,
        triple_temp: 0,
        triple_pres: 0,
        can_simulate: true,
        is_mix: true,
        links: [],
        regulation: {
            affected: false
        }
    },
    {
        name: "R452B",
        ref_name: "R32[0.67]&R125[0.07]&R1234YF[0.26]",
        gwp: 697,
        odp: 0,
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
        description: "Mélange de R32 (67%), R125 (7%) et R1234yf (26%) - Frigorigène légèrement inflammable",
        is_mix: true,
        links: [],
        regulation: {
            affected: false
        }
    },
    {
        name: "R454A",
        ref_name: "R32[0.541359992223361]&R1234YF[0.458640007776639]",
        gwp: 239,
        group: 1,
        odp: 0,
        classification: "A2L",
        is_mix: true,
        can_simulate: true,
        critical_pres: 36.8,
        critical_temp: 78.9,
        triple_temp: 0,
        triple_pres: 0,
        lfl: {
            lower: 0.125,
            upper: 0.278
        },
        links: [],
        regulation: {
            affected: true,
            limit_year: "",
            about: "Remplacement du R404A / R449A / R449A"
        },
        description: ""
    },
    {
        name: "R454B",
        ref_name: "R32[0.829247912869081]&R1234YF[0.170752087130919]",
        gwp: 465,
        odp: 0,
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
        description: "Mélange de R32 (68,9%) et R1234yf (31,1%) - Frigorigène légèrement inflammable",
        is_mix: true,
        links: [],
        regulation: {
            affected: false
        }
    },
    {
        name: "R454C",
        ref_name: "R32[0.375149546574766]&R1234YF[0.624850453425234]",
        gwp: 148,
        odp: 0,
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
        description: "Mélange de R32 (21,5%) et R1234yf (78,5%) - Frigorigène légèrement inflammable",
        is_mix: true,
        links: [],
        regulation: {
            affected: false
        }
    },
    {
        name: "R455A",
        ref_name: "CO2[0.0596134946235332]&R32[0.361416054623376]&R1234YF[0.578970450753091]",
        gwp: 146,
        odp: 0,
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
        description: "Mélange de R32, R1234yf et CO2 - Frigorigène légèrement inflammable",
        is_mix: true,
        links: [],
        regulation: {
            affected: false
        }
    },
    {
        name: "R456A",
        ref_name:"R1234ZEE[0.435752062428029]&R1234a[0.447283406909688]&R32[0.116964530662282]",
        gwp: 685,
        odp: 0,
        group: 2,
        classification: "A1",
        critical_pres: 41.7,
        critical_temp: 102.3,
        triple_temp: 0,
        triple_pres: 0,
        can_simulate: true,
        is_mix: true,
        links: [],
        regulation: {
            affected: false
        }
    },
    {
        name: "R470A (RS53)",
        ref_name: "CO2[0.19185003818268534]&R32[0.2759030270202404]&R125[0.13366145903800036]&R134a[0.057925918018745505]&R1234ZEE[0.32576217771246907]&R227EA[0.014897380027859406]",
        gwp: 909,
        odp: 0,
        group: 2,
        classification: "A1",
        critical_temp: 0,
        critical_pres: 0,
        triple_pres: 0,
        triple_temp: 0,
        can_simulate: true,
        is_mix: true,
        links: [
            {
                label: "Framacold - Fluide de substitut du R410A",
                url: 'https://www.framacold.com/framacold-produit/83-retrofit-climatisation-et-pac-du-r410a'
            },
            {
                label: "Framacold - Fiche technique du R470A",
                url: "https://www.framacold.com/upload/news/2993-Le-RS53-R470A-unique-fluide-de.pdf"
            }
        ],
        regulation: {
            affected: true,
            limit_year: "",
            about: "Remplaçant en lieu est place du R410A avec une réduction du GWP de -53%."
        }
    },
    {
        name: "R470B (RS51)",
        ref_name: "CO2[0.20388177046683723]&R32[0.1983452893505906]&R125[0.08597396241982784]&R134a[0.02638229949983754]&R1234ZEE[0.44847614264251856]&R227EA[0.03694053562038815]",
        gwp: 746,
        odp: 0,
        group: 2,
        classification: "A1",
        critical_pres: 0,
        critical_temp: 0,
        triple_pres: 0,
        triple_temp: 0,
        can_simulate: true,
        is_mix: true,
        links: [
            {
                label: "Framacold - Fluide de substitut du R404A",
                url: "https://www.framacold.com/actualite/1454-le-fluide-r470b-rs-51-nouvelle-generation-de-substitut-du-r404a"
            },
            {
                label: "Framacold - Fiche technique du R470B",
                url: "https://www.framacold.com/site_online/fichesT/FT-RS-51-R470B.pdf"
            }
        ],
        regulation: {
            affected: true,
            limit_year: "",
            about: "Remplaçant en lieu est place du R404A, R449A et R448A. Avec une réduction du GWP de -80%, -50% et -50%."
        }
    },
    {
        name: "R471A",
        ref_name: "R12345ZEE[0.787]&R227EA[0.043]&R1336MZZZ[0.17]",
        gwp: 147,
        odp: 0,
        group: 2,
        classification: "A1",
        critical_pres: 35.3,
        critical_temp: 112.3,
        triple_temp: 0,
        triple_pres: 0,
        can_simulate: true,
        is_mix: true,
        links: [],
        regulation: {
            affected: false
        }
    },
    {
        name: "R472A",
        ref_name: "R32[0.12]&R134a[0.19]&CO2[0.69]",
        gwp: 526,
        odp: 0,
        group: 2,
        classification: "A1",
        critical_pres: 73.2,
        critical_temp: 58,
        triple_temp: 0,
        triple_pres: 0,
        can_simulate: true,
        is_mix: true,
        links: [],
        regulation: {
            affected: false
        }
    },
    {
        name: "R480A (RS20)",
        ref_name: "CO2[0.123402554704783]&R1234ZEE[0.819103328392452]&R227EA[0.0574941169027646]",
        gwp: 291,
        odp: 0,
        group: 2,
        classification: "A1",
        critical_pres: 42.95,
        critical_temp: 83.14,
        triple_temp: 0,
        triple_pres: 0,
        can_simulate: true,
        is_mix: true,
        links: [
            {
                label: "Framacold - Retrofit du R134a",
                url: "https://www.framacold.com/framacold-produit/191-substitut-du-r134a-au-plus-faible-gwp"
            }
        ],
        regulation: {
            affected: false
        }
    },
    {
        name: "R507A",
        ref_name: "R125[0.411839711774438]&R143A[0.588160288225562]",
        gwp: 3990,
        odp: 0,
        group: 2,
        classification: "A1",
        critical_pres: 37.05,
        critical_temp: 70.62,
        triple_temp: -73.15,
        triple_pres: 0.23,
        can_simulate: true,
        is_mix: true,
        links: [],
        regulation: {
            affected: false
        }
    },
    {
        name: "R513A",
        ref_name: "R1234yf[0.532425755929735]&R134a[0.467574244070265]",
        gwp: 572,
        odp: 0,
        group: 2,
        classification: "A1",
        critical_pres: 37.67,
        critical_temp: 96.5,
        triple_temp: 0,
        triple_pres: 0,
        can_simulate: true,
        is_mix: true,
        links: [],
        regulation: {
            affected: false
        }
    },
    {
        name: "R515B",
        ref_name: "R1234ZEE[0.911]&R227EA[0.089]",
        gwp: 288,
        odp: 0,
        group: 2,
        classification: "A1",
        critical_pres: 35.8,
        critical_temp: 108.8,
        triple_temp: 0,
        triple_pres: 0,
        can_simulate: true,
        is_mix: true,
        links: [],
        regulation: {
            affected: false
        }
    },
    {
        name: "R600",
        ref_name: "BUTANE",
        gwp: 4,
        odp: 0,
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
        description: "Isobutane - Frigorigène naturel hautement inflammable",
        is_mix: false,
        links: [],
        regulation: {
            affected: false
        }
    },
    {
        name: "R600A",
        ref_name: "ISOBUTANE",
        gwp: 4,
        odp: 0,
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
        description: "",
        is_mix: false,
        links: [],
        regulation: {
            affected: false
        }
    },
    {
        name: "R601a",
        ref_name: "IPENTANE",
        gwp: 5,
        odp: 0,
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
        },
        description: "",
        links: [],
        regulation: {
            affected: false
        }
    },
    {
        name: "R744",
        ref_name: "CO2",
        gwp: 1,
        odp: 0,
        group: 2,
        classification: "A1",
        critical_pres: 73.77,
        critical_temp: 30.98,
        triple_temp: -56.56,
        triple_pres: 5.18,
        can_simulate: true,
        is_mix: false,
        links: [],
        regulation: {
            affected: false
        }
    },
    {
        name: "R717",
        ref_name: "AMMONIA",
        gwp: 0,
        odp: 0,
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
        description: "",
        is_mix: false,
        links: [],
        regulation: {
            affected: false
        }
    }
];