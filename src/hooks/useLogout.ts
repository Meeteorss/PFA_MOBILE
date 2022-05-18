import { useState } from "react";
import axios from "../utils/axios";

export const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const logout = async () => {
    setLoading(true);
    let value: boolean;
    try {
      const res = await axios.post("/auth/logout", { withCredentials: true });
      const data = res.data;

      value = data.value;
    } catch (err) {
      setLoading(true);
      console.log("Error:");
      console.log(err);
      value = false;
    }

    // axios
    //   .post("/auth/logout", { withCredentials: true })
    //   .then((res) => {
    //     const data = res.data;
    //     console.log("data", data.value);

    //     value = data.value;
    //   })
    //   .catch((err) => {
    //     setLoading(true);
    //     console.log("Error:");
    //     console.log(err);
    //     value = false;
    //   });
    console.log("value", value);

    return { value: value };
  };
  return { logout: logout, loading: loading };
};
