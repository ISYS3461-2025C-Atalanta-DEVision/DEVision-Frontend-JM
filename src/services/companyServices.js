export const companyServices = {
  getQuickActionStats: async (companyId) => {
    const quickStats = [
      { key: "jobPostsCount", value: 12 },
      { key: "eventPostCount", value: 5 },
      { key: "applicationsCount", value: 45 },
      { key: "searchCount", value: 8 },
    ];
    await new Promise((resolve) => setTimeout(resolve, 800));
    // throw new Error("Failed to load quick stats");

    return quickStats;
  },

  getCompanyProfile: async (companyId) => {
    const profile = {
      company_auth_id: "c92f18a4b7124d33aa99ef01",
      name: "RMIT University Vietnam",
      contactEmail: "info@rmit.edu.vn",
      phoneNumber: "+84 28 3776 1300",
      address: "702 Nguyễn Văn Linh, Tân Hưng, Quận 7",
      city: "TP. Hồ Chí Minh",
      country: "Việt Nam",
      website: "https://www.rmit.edu.vn",
      avatarURL: "https://images.seeklogo.com/logo-png/11/1/rmit-university-logo-png_seeklogo-118966.png", 
      subscriptionType: "PREMIUM", 
    };
    await new Promise((resolve) => setTimeout(resolve, 800));
    // throw new Error("Failed to  company profile");
    return profile;
  },
};

export default companyServices;
