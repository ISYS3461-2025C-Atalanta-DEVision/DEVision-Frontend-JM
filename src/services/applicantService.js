const APLICANT_URL = "https://api-gateway-production-2c3a.up.railway.app/applicants";


export const applicantService = {
  getApplicantById: async (id) => {
    const res = await fetch(`${APLICANT_URL}/${id}`, {
      method: "GET",
      headers: {
        "X-API-Key": import.meta.env.VITE_JA_X_HEADER,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch applicant");
    }

    return res.json();
  },
};
export default applicantService;
