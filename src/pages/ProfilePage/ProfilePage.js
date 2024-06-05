import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { decodeJWT } from "../../services/utils";
import { getUserData } from "../../services/api";
import "./ProfilePage.css";
import Loading from "../../components/Loading/Loading";

function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        navigate("/signin"); // Redirect to login if token does not exist
        return;
      }

      const user = decodeJWT(token);
      if (!user) {
        navigate("/signin"); // Redirect to login if decoding fails
        return;
      }

      try {
        const data = await getUserData(user.id);
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/sigin"); // Redirect to login on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [token, navigate]);

  if (isLoading) {
    return <div><Loading/></div>;
  }

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <div className="profile-val">
          <p>UserId : {userData._id}</p>
          <p>User : {userData.name}</p>
          <p>Email : {userData.email}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
