/**
 * Parse salaryDisplay string back into individual salary fields
 *
 * Examples:
 * - "1000 - 1500 USD" -> { salaryType: "RANGE", salaryMin: 1000, salaryMax: 1500, salaryCurrency: "USD" }
 * - "About 1000 USD" -> { salaryType: "ESTIMATION", salaryAmount: 1000, salaryEstimationType: "ABOUT", salaryCurrency: "USD" }
 * - "Up to 2000 AUD" -> { salaryType: "ESTIMATION", salaryAmount: 2000, salaryEstimationType: "UP_TO", salaryCurrency: "AUD" }
 * - "From 3000 VND" -> { salaryType: "ESTIMATION", salaryAmount: 3000, salaryEstimationType: "FROM", salaryCurrency: "VND" }
 * - "Negotiable" -> { salaryType: "NEGOTIABLE" }
 */
export function parseSalaryDisplay(salaryDisplay) {
  if (!salaryDisplay || salaryDisplay.trim() === "") {
    return {
      salaryType: "",
      salaryMin: "",
      salaryMax: "",
      salaryCurrency: "AUD",
      salaryAmount: "",
      salaryEstimationType: "",
    };
  }

  const trimmed = salaryDisplay.trim();

  // Case 1: NEGOTIABLE
  if (trimmed.toLowerCase() === "negotiable") {
    return {
      salaryType: "NEGOTIABLE",
      salaryMin: "",
      salaryMax: "",
      salaryCurrency: "AUD",
      salaryAmount: "",
      salaryEstimationType: "",
    };
  }

  // Case 2: RANGE (e.g., "1000 - 1500 USD")
  const rangeMatch = trimmed.match(/^(\d+)\s*-\s*(\d+)\s+([A-Z]{3})$/i);
  if (rangeMatch) {
    return {
      salaryType: "RANGE",
      salaryMin: rangeMatch[1],
      salaryMax: rangeMatch[2],
      salaryCurrency: rangeMatch[3].toUpperCase(),
      salaryAmount: "",
      salaryEstimationType: "",
    };
  }

  // Case 3: ESTIMATION with "About" (e.g., "About 1000 USD")
  const aboutMatch = trimmed.match(/^About\s+(\d+)\s+([A-Z]{3})$/i);
  if (aboutMatch) {
    return {
      salaryType: "ESTIMATION",
      salaryMin: "",
      salaryMax: "",
      salaryCurrency: aboutMatch[2].toUpperCase(),
      salaryAmount: aboutMatch[1],
      salaryEstimationType: "ABOUT",
    };
  }

  // Case 4: ESTIMATION with "Up to" (e.g., "Up to 2000 USD")
  const upToMatch = trimmed.match(/^Up to\s+(\d+)\s+([A-Z]{3})$/i);
  if (upToMatch) {
    return {
      salaryType: "ESTIMATION",
      salaryMin: "",
      salaryMax: "",
      salaryCurrency: upToMatch[2].toUpperCase(),
      salaryAmount: upToMatch[1],
      salaryEstimationType: "UP_TO",
    };
  }

  // Case 5: ESTIMATION with "From" (e.g., "From 3000 USD")
  const fromMatch = trimmed.match(/^From\s+(\d+)\s+([A-Z]{3})$/i);
  if (fromMatch) {
    return {
      salaryType: "ESTIMATION",
      salaryMin: "",
      salaryMax: "",
      salaryCurrency: fromMatch[2].toUpperCase(),
      salaryAmount: fromMatch[1],
      salaryEstimationType: "FROM",
    };
  }

  // Default: return empty values if parsing fails
  console.warn("Could not parse salaryDisplay:", salaryDisplay);
  return {
    salaryType: "",
    salaryMin: "",
    salaryMax: "",
    salaryCurrency: "AUD",
    salaryAmount: "",
    salaryEstimationType: "",
  };
}
