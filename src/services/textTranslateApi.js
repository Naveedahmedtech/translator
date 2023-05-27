import axios from "axios";

const options = {
  method: "Get",
  url: "https://text-translator2.p.rapidapi.com/getLanguages",
  headers: {
    "X-RapidApi-Key": "cfa5e12aa1msh59165c56a642111p1667d2jsna7e0745bef4b",
    "X-RepidApi-Host": "text-translator2.p.rapidapi.com",
  },
};

export const fetchLanguages = async () => {
  try {
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
