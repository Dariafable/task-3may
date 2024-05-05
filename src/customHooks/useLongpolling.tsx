import React from "react";
import axios from "axios";

import { TCurrenciesData, TEndpoint } from "../types";

const URL = "http://localhost:3000/api/v1";

const useLongpolling = ({ path, longpolling }: TEndpoint) => {
  const [data, setData] = React.useState<TCurrenciesData | null>(null);

  const getData = async () => {
    try {
      const response = await axios.get(`${URL}/${path}`);
      setData(response.data.rates);
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = async () => {
    try {
      const response = await axios.get(`${URL}/${longpolling}`);
      setData(response.data.rates);
      updateData();
    } catch (error) {
      console.log(error);
      setTimeout(updateData, 1000);
    }
  };

  React.useEffect(() => {
    getData();
    updateData();
  }, []);

  return data;
};

export default useLongpolling;