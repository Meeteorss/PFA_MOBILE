import React, { useState } from "react";
import axios from "../utils/axios";

const useDeleteCoordinates = () => {
  const [loading, setLoading] = useState(false);
  const deleteCoordinates = async (id: string) => {
    setLoading(true);
    let data = "";
    try {
      const res = await axios.delete(`/coordinates/${id}`, {
        // withCredentials: true,
      });
      setLoading(false);
      data = res.data;
    } catch (err) {
      setLoading(false);
      console.log("Error: ");
      console.log(err);
    }

    return { message: data };
  };

  return { deleteCoordinates: deleteCoordinates, loading: loading };
};

export default useDeleteCoordinates;
