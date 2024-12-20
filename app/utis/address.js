// 这个文件定义了一个国家和地区的映射关系系统。主要包含以下内容：
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";

// 1. 按地区分组的国家代码数组
// 例如:
// - AMN (北美洲): 美国、加拿大等
// - ASE (东亚): 中国、日本、韩国等
// - EUW (西欧): 德国、法国等
const AMN = ["BM", "CA", "GL", "MX", "PM", "US"];
const AMC = [
  "AG",
  "AI",
  "AW",
  "BB",
  "BL",
  "BQ",
  "BS",
  "CU",
  "CW",
  "DM",
  "DO",
  "GD",
  "GP",
  "HT",
  "JM",
  "KN",
  "KY",
  "LC",
  "MF",
  "MQ",
  "MS",
  "PR",
  "SX",
  "TC",
  "TT",
  "VC",
  "VG",
  "VI",
];
const AMM = ["BZ", "CR", "GT", "HN", "NI", "PA", "SV"];
const AMS = [
  "AR",
  "BO",
  "BR",
  "CL",
  "CO",
  "EC",
  "FK",
  "GF",
  "GS",
  "GY",
  "PE",
  "PY",
  "SR",
  "UY",
  "VE",
];

const ASC = ["KG", "KZ", "TJ", "TM", "UZ"];
const ASE = ["CN", "HK", "JP", "KP", "KR", "MN", "MO", "TW"];
const ASW = [
  "AE",
  "AM",
  "AZ",
  "BH",
  "GE",
  "IL",
  "IQ",
  "JO",
  "KW",
  "LB",
  "OM",
  "PS",
  "QA",
  "SA",
  "SY",
  "YE",
];
const ASS = ["AF", "BD", "BT", "IN", "IR", "LK", "MV", "NP", "PK"];
const ASD = ["BN", "ID", "KH", "LA", "MM", "MY", "PH", "SG", "TH", "TL", "VN"];
const AFN = ["DZ", "EG", "LY", "MA", "SD", "TN"];
const AFM = ["AO", "CD", "CF", "CG", "CM", "GA", "GQ", "ST", "TD"];
const AFE = [
  "BI",
  "DJ",
  "ER",
  "ET",
  "IO",
  "KE",
  "KM",
  "MG",
  "MU",
  "MW",
  "MZ",
  "RE",
  "RW",
  "SC",
  "SO",
  "SS",
  "TF",
  "TZ",
  "UG",
  "YT",
  "ZM",
  "ZW",
];

const AFW = [
  "BF",
  "BJ",
  "CI",
  "CV",
  "GH",
  "GM",
  "GN",
  "GW",
  "LR",
  "ML",
  "MR",
  "NE",
  "NG",
  "SH",
  "SL",
  "SN",
  "TG",
];
const AFS = ["BW", "LS", "NA", "SZ", "ZA"];
const EUN = [
  "AX",
  "DK",
  "EE",
  "FI",
  "FO",
  "GB",
  "GG",
  "IE",
  "IM",
  "IS",
  "JE",
  "LT",
  "LV",
  "NO",
  "SE",
  "SJ",
];
const EUE = ["BG", "BY", "CZ", "HU", "MD", "PL", "RO", "RU", "SK", "UA"];
const EUW = ["AT", "BE", "CH", "DE", "FR", "LI", "LU", "MC", "NL"];
const EUS = [
  "AD",
  "AL",
  "BA",
  "CY",
  "ES",
  "GI",
  "GR",
  "HR",
  "IT",
  "ME",
  "MK",
  "MT",
  "PT",
  "RS",
  "SI",
  "SM",
  "TR",
  "VA",
  "XK",
];

const OCP = ["AS", "CK", "NU", "PF", "PN", "TK", "TO", "TV", "WF", "WS"];
const OCA = ["AU", "CC", "CX", "NF", "NZ"];
const OCM = ["FJ", "NC", "PG", "SB", "VU"];
const OCN = ["FM", "GU", "KI", "MH", "MP", "NR", "PW"];

// 2. 将所有地区分组整合到一个对象中
const CONTINENTS = {
  AMN,
  AMC,
  AMM,
  AMS,
  ASC,
  ASE,
  ASW,
  ASS,
  ASD,
  AFN,
  AFM,
  AFE,
  AFW,
  AFS,
  EUN,
  EUE,
  EUW,
  EUS,
  OCP,
  OCA,
  OCM,
  OCN,
};

// 3. 创建一个从国家代码到地区代码的映射对象
// 例如: "US" -> "AMN" (美国属于北美洲)
const countryRegionMap = {
  BM: "AMN",
  CA: "AMN",
  GL: "AMN",
  MX: "AMN",
  PM: "AMN",
  US: "AMN",
  AG: "AMC",
  AI: "AMC",
  AW: "AMC",
  BB: "AMC",
  BL: "AMC",
  BQ: "AMC",
  BS: "AMC",
  CU: "AMC",
  CW: "AMC",
  DM: "AMC",
  DO: "AMC",
  GD: "AMC",
  GP: "AMC",
  HT: "AMC",
  JM: "AMC",
  KN: "AMC",
  KY: "AMC",
  LC: "AMC",
  MF: "AMC",
  MQ: "AMC",
  MS: "AMC",
  PR: "AMC",
  SX: "AMC",
  TC: "AMC",
  TT: "AMC",
  VC: "AMC",
  VG: "AMC",
  VI: "AMC",
  BZ: "AMM",
  CR: "AMM",
  GT: "AMM",
  HN: "AMM",
  NI: "AMM",
  PA: "AMM",
  SV: "AMM",
  AR: "AMS",
  BO: "AMS",
  BR: "AMS",
  CL: "AMS",
  CO: "AMS",
  EC: "AMS",
  FK: "AMS",
  GF: "AMS",
  GS: "AMS",
  GY: "AMS",
  PE: "AMS",
  PY: "AMS",
  SR: "AMS",
  UY: "AMS",
  VE: "AMS",
  KG: "ASC",
  KZ: "ASC",
  TJ: "ASC",
  TM: "ASC",
  UZ: "ASC",
  CN: "ASE",
  HK: "ASE",
  JP: "ASE",
  KP: "ASE",
  KR: "ASE",
  MN: "ASE",
  MO: "ASE",
  TW: "ASE",
  AE: "ASW",
  AM: "ASW",
  AZ: "ASW",
  BH: "ASW",
  GE: "ASW",
  IL: "ASW",
  IQ: "ASW",
  JO: "ASW",
  KW: "ASW",
  LB: "ASW",
  OM: "ASW",
  PS: "ASW",
  QA: "ASW",
  SA: "ASW",
  SY: "ASW",
  YE: "ASW",
  AF: "ASS",
  BD: "ASS",
  BT: "ASS",
  IN: "ASS",
  IR: "ASS",
  LK: "ASS",
  MV: "ASS",
  NP: "ASS",
  PK: "ASS",
  BN: "ASD",
  ID: "ASD",
  KH: "ASD",
  LA: "ASD",
  MM: "ASD",
  MY: "ASD",
  PH: "ASD",
  SG: "ASD",
  TH: "ASD",
  TL: "ASD",
  VN: "ASD",
  DZ: "AFN",
  EG: "AFN",
  LY: "AFN",
  MA: "AFN",
  SD: "AFN",
  TN: "AFN",
  AO: "AFM",
  CD: "AFM",
  CF: "AFM",
  CG: "AFM",
  CM: "AFM",
  GA: "AFM",
  GQ: "AFM",
  ST: "AFM",
  TD: "AFM",
  BI: "AFE",
  DJ: "AFE",
  ER: "AFE",
  ET: "AFE",
  IO: "AFE",
  KE: "AFE",
  KM: "AFE",
  MG: "AFE",
  MU: "AFE",
  MW: "AFE",
  MZ: "AFE",
  RE: "AFE",
  RW: "AFE",
  SC: "AFE",
  SO: "AFE",
  SS: "AFE",
  TF: "AFE",
  TZ: "AFE",
  UG: "AFE",
  YT: "AFE",
  ZM: "AFE",
  ZW: "AFE",
  BF: "AFW",
  BJ: "AFW",
  CI: "AFW",
  CV: "AFW",
  GH: "AFW",
  GM: "AFW",
  GN: "AFW",
  GW: "AFW",
  LR: "AFW",
  ML: "AFW",
  MR: "AFW",
  NE: "AFW",
  NG: "AFW",
  SH: "AFW",
  SL: "AFW",
  SN: "AFW",
  TG: "AFW",
  BW: "AFS",
  LS: "AFS",
  NA: "AFS",
  SZ: "AFS",
  ZA: "AFS",
  AX: "EUN",
  DK: "EUN",
  EE: "EUN",
  FI: "EUN",
  FO: "EUN",
  GB: "EUN",
  GG: "EUN",
  IE: "EUN",
  IM: "EUN",
  IS: "EUN",
  JE: "EUN",
  LT: "EUN",
  LV: "EUN",
  NO: "EUN",
  SE: "EUN",
  SJ: "EUN",
  BG: "EUE",
  BY: "EUE",
  CZ: "EUE",
  HU: "EUE",
  MD: "EUE",
  PL: "EUE",
  RO: "EUE",
  RU: "EUE",
  SK: "EUE",
  UA: "EUE",
  AT: "EUW",
  BE: "EUW",
  CH: "EUW",
  DE: "EUW",
  FR: "EUW",
  LI: "EUW",
  LU: "EUW",
  MC: "EUW",
  NL: "EUW",
  AD: "EUS",
  AL: "EUS",
  BA: "EUS",
  CY: "EUS",
  ES: "EUS",
  GI: "EUS",
  GR: "EUS",
  HR: "EUS",
  IT: "EUS",
  ME: "EUS",
  MK: "EUS",
  MT: "EUS",
  PT: "EUS",
  RS: "EUS",
  SI: "EUS",
  SM: "EUS",
  TR: "EUS",
  VA: "EUS",
  XK: "EUS",
  AS: "OCP",
  CK: "OCP",
  NU: "OCP",
  PF: "OCP",
  PN: "OCP",
  TK: "OCP",
  TO: "OCP",
  TV: "OCP",
  WF: "OCP",
  WS: "OCP",
  AU: "OCA",
  CC: "OCA",
  CX: "OCA",
  NF: "OCA",
  NZ: "OCA",
  FJ: "OCM",
  NC: "OCM",
  PG: "OCM",
  SB: "OCM",
  VU: "OCM",
  FM: "OCN",
  GU: "OCN",
  KI: "OCN",
  MH: "OCN",
  MP: "OCN",
  NR: "OCN",
  PW: "OCN",
};

// North America,West Europe,Middle Europe,South Africa,North Europe,East Europe,West Asia,South Asia,South-East Asia,East Asia,Oceania
// 北美洲,西欧,中欧,南非,北欧,东欧,西亚,南亚,南亚,东亚,大洋洲
// 划分出上方的区域
const REGIONS = {
  // North America
  AMN: ["CA", "US", "MX"],
  // West Europe
  EUW: ["BE", "FR", "IE", "LU", "MC", "NL", "GB"],
  // Middle Europe
  EUM: ["AT", "CH", "DE", "LI"],
  // South Africa
  AFS: ["BW", "LS", "NA", "ZA", "SZ"],
  // North Europe
  EUN: ["DK", "EE", "FI", "FO", "IS", "LT", "LV", "NO", "SE"],
  // East Europe
  EUE: ["BY", "BG", "CZ", "HU", "MD", "PL", "RO", "RU", "SK", "UA"],
  // West Asia
  ASW: [
    "AM",
    "AZ",
    "BH",
    "GE",
    "IQ",
    "IL",
    "JO",
    "KW",
    "LB",
    "OM",
    "PS",
    "QA",
    "SA",
    "SY",
    "TR",
    "YE",
    "AE",
  ],
  // South Asia
  ASS: ["AF", "BD", "BT", "IN", "IR", "LK", "MV", "NP", "PK"],
  // Oceania
  OCE: [
    "AU",
    "FJ",
    "FM",
    "KI",
    "MH",
    "NR",
    "NZ",
    "PG",
    "PW",
    "SB",
    "TO",
    "TV",
    "VU",
    "WS",
  ],
  // East Asia
  EAST_ASIA: ["CN", "HK", "JP", "KP", "KR", "MO", "MN", "TW"],
  // South-East Asia
  SOUTH_EAST_ASIA: [
    "BN",
    "KH",
    "ID",
    "LA",
    "MY",
    "MM",
    "PH",
    "SG",
    "TH",
    "TL",
    "VN",
  ],
};
// 名称
const COUNTRY_NAME_MAPPING = {
  AMN: "North America",
  EUW: "West Europe",
  EUM: "Middle Europe",
  AFS: "South Africa",
  EUN: "North Europe",
  EUE: "East Europe",
  ASW: "West Asia",
  ASS: "South Asia",
  OCE: "Oceania",
  // East Asia
  EAST_ASIA: "East Asia",
  // East Asia South-East Asia
  SOUTH_EAST_ASIA: "South-East Asia",
};

// 4. 导出工具函数和常量
module.exports = {
  // 根据国家代码获取其所属地区
  getRegionByCountry(country) {
    return countryRegionMap[country] || "";
  },
  getCountryNameByCode(countryCode) {
    // 遍历 am5geodata_worldLow.features 找到对应的国家名称
    const country = am5geodata_worldLow.features.find(
      (feature) => feature.properties.id === countryCode
    );
    return country ? country.properties.name : countryCode;
  },
  // 导出所有地区分组
  CONTINENTS,
  COUNTRY_NAME_MAPPING,
  REGIONS,
  // 导出大洲级别的分组
  GLOBAL: {
    AMER: ["AMN", "AMC", "AMM", "AMS"], // 美洲
    ASIA: ["ASC", "ASE", "ASW", "ASS", "ASD"], // 亚洲
    AFRI: ["AFN", "AFM", "AFE", "AFW", "AFS"], // 非洲
    EURO: ["EUN", "EUE", "EUW", "EUS"], // 欧洲
    OCEA: ["OCP", "OCA", "OCM", "OCN"], // 大洋洲
    EAST_ASIA: ["EAST_ASIA"], // 东亚
    SOUTH_EAST_ASIA: ["SOUTH_EAST_ASIA"], // 南亚
  },
};
