// src/UserInfo.js
import React, { useEffect, useState } from "react";
import { getAccessToken } from "./teamsSSO";

const UserInfo = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await getAccessToken();
        const response = await fetch("https://graph.microsoft.com/v1.0/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user info: ", error);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.displayName}</h1>
    </div>
  );
};

export default UserInfo;
