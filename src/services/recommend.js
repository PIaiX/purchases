import { apiRoutes } from "../config/api";
import { $api } from "./index";

const getRecommends = async (data) => {
  const response = await $api.get(apiRoutes.RECOMMENDS, {
    params: data,
  });

  return response?.data;
};


export { getRecommends };

