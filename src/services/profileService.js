import api from "../http_call/HttpRequest";
import { PROFILE_URL } from "../service_url/ProfileUrlConfig";

export const profileService = {
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
  getProfile: async () => {
    const response = await api.get(`${PROFILE_URL}`);
    return response.data;
  },

  editProfile: async (editedValues) => {
    const response = await api.put(`${PROFILE_URL}`, editedValues);
    return response.data;
  },

  editAvatar: async (file) => {
    const formData = new FormData();
    formData.append("avatar", file);

    const response = await api.post(`${PROFILE_URL}/avatar`, formData, {
      headers: {
        "Content-Type": undefined,
      },
    });

    return response.data;
  },

  getCompanyEvents: async (companyId) => {
    const mockEvents = [
      {
        id: 1,
        title: "Graduation Day 2022",
        date: "8 July 2022",
        coverImage:
          "https://i.pinimg.com/736x/69/8b/c1/698bc129c63b185e1f23d6af8508e717.jpg",
        images: [
          "https://i.pinimg.com/736x/8d/16/fd/8d16fd12284280ee6d1ba27d0782e6a6.jpg",
          "https://i.pinimg.com/1200x/be/41/aa/be41aa3421010133bdcf4b0bbe56d752.jpg",
          "https://i.pinimg.com/1200x/52/83/87/5283871ef78643de6d8e6616e4f312ee.jpg",
        ],
        description:
          "Một bằng tốt nghiệp, hai bằng lòng em. Khoảnh khắc đánh dấu hành trình trưởng thành.",
      },
      {
        id: 2,
        title: "Summer Poolside Memories",
        date: "15 August 2023",
        coverImage:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        images: [
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
          "https://images.unsplash.com/photo-1493558103817-58b2924bce98",
          "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
        ],
        description:
          "Những ngày hè yên bình bên hồ bơi, ánh nắng và sự thư giãn tuyệt đối.",
      },
      {
        id: 3,
        title: "Quiet Café Afternoon",
        date: "2 March 2024",
        coverImage:
          "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
        images: [
          "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
          "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0",
        ],
        description:
          "Một buổi chiều chậm rãi trong quán cà phê quen, ánh đèn vàng và suy nghĩ rất riêng.",
      },
      {
        id: 4,
        title: "Forest Walk",
        date: "10 April 2024",
        coverImage:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        images: [
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
          "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
          "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
          "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
        ],
        description:
          "Đi bộ giữa thiên nhiên, hít thở không khí trong lành và tái tạo năng lượng.",
      },
    ];

    await new Promise((resolve) => setTimeout(resolve, 1000));
    return mockEvents;
  },
};

export default profileService;
