import axios from "axios";

export const fetcher = async <T>(url: string): Promise<T> => {
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
  });

  return response.data;
};
