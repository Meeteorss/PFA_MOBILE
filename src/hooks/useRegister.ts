import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import axios from "../utils/axios";
type RegisterCreds = {
  firstname: string;
  lastname: string;

  username: string;
  email: string;
  password: string;
  confirmedPassword: string;
};

export const useRegister = () => {
  // const [user, setUser] = useState(null);
  // const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const { loginF } = useAuthContext();
  const register = async (input: RegisterCreds) => {
    setLoading(true);
    let user: any;
    let errors: any[];

    try {
      const res = await axios.post("/auth/register", {
        // withCredentials: true,
        body: input,
      });

      setLoading(false);
      const data = res.data;
      if (data.errors.length) {
        errors = data.errors;
      } else {
        user = data.user;
      }
    } catch (err) {
      setLoading(false);
      console.log("Error: ");
      console.log(err);
    }

    return { user: user, errors: errors };
  };

  return { register: register, loading: loading };
};
