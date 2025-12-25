export const salaryTypes = [
  { value: "RANGE", label: "Range" },
  { value: "ESTIMATION", label: "Estimation" },
  { value: "NEGOTIABLE", label: "Negotiable" },
];

export const salaryEstimationTypes = [
  { value: "ABOUT", label: "About" },
  { value: "UP_TO", label: "Up to" },
  { value: "FROM", label: "From" },
];

export const salaryCurrency = [
  { value: "AUD", label: "AUD - Australian Dollar" },
  { value: "USD", label: "USD - United States Dollar" },
  { value: "VND", label: "VND - Vietnamese Dong" },
]

export default { salaryTypes, salaryEstimationTypes, salaryCurrency };
