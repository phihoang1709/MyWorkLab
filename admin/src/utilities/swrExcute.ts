import axios from "axios";

export const fetcher = async (url: string, id?: string) => {
  try {
    if (id) {
      const { data } = await axios.get(url + `/${id}`);
      return data;
    }
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const excute = async (
  url: string,
  id?: string | undefined,
  formValue?: any,
  mutate: (str: string) => void,
  atribute: string
) => {
  try {
    if (id && formValue && id !== "") {
      await axios.put(`${url}/${id}`, formValue);
      mutate(`/${atribute}`);
    } else if (id && id !== "") {
      await axios.delete(`${url}/${id}`);
      mutate(`/${atribute}`);
    } else {
      await axios.post(`${url}`, formValue);
      mutate(`/${atribute}`);
    }
  } catch (error) {
    console.error(error);
  }
};
