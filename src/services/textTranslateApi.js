import axios from "axios";

// ? getting request
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

// ? post request

export const postLanguage = async (translatedData) => {
  try {
    const params = new URLSearchParams(translatedData).toString();
    const response = await axios.post(
      "https://text-translator2.p.rapidapi.com/translate",
      params, // Pass the payload directly
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-RapidApi-Key":
            "cfa5e12aa1msh59165c56a642111p1667d2jsna7e0745bef4b",
          "X-RapidApi-Host": "text-translator2.p.rapidapi.com", // Corrected header key
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};
