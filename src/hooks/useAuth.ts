import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Initialize user from local storage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const signIn = async (username: string) => {
    try {
      const response = await axios.get(
        `https://its.kdns.ooo:5001/users/check`,
        {
          params: { username },
        }
      );

      if (response.data.status === "OK") {
        const userData = response.data.user;
        console.log("User data recieved:", userData);
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        if (userData.type === "admin") {
          console.log("Admin logged in");
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      }
    } catch (error) {
      console.error("Sign in failed:", error);
    }
  };

  const signOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return { user, signIn, signOut };
};

export default useAuth;
