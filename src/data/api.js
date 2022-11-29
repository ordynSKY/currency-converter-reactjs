import axios from "axios";

const apiUrl = "https://api.apilayer.com/fixer";
const myAxios = axios.create({
  baseURL: apiUrl
});

const runFetch = async (url, dataToSend = {}) => {
  const respdata = await myAxios.get(url, {
    params: {
      ...dataToSend
    },
    headers: {
      apikey: "J37x0N6kggSzK78IBEG5u0vYLkYWfteK"
    }
  });
  return respdata.data;
};
export default runFetch;
