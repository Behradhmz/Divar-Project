import api from "../configs/api";
import { getCookie } from "../utils/cookies";

const getNewToken = async () => {
  const refreshToken = getCookie("refreshToken");
  console.log(refreshToken);
  if (!refreshToken) return;
  try {
    const response = await api.post("auth/check-refresh-token", {
      refreshToken,
    });
    return { response };
  } catch (error) {
    return { error };
  }
};

export { getNewToken };
