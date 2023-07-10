import axios from "axios";

const SearchCity = async (city) => {
  const response = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      params: {
        q: city,
        appid: "2707103ca2913539516b41c30055fe66",
        mode: "json",
        units: "metric",
      },
    }
  );
  // .then(response => {
  //     return response.data;
  //   })
  //   .catch(error => {
  //     return error.message;
  //   });
  return response.data;
  // console.log(response.data.name);
};

export default SearchCity;
