import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Home.module.css"; // Update the import statement
import profileImage from "../static/profile-1.jpg";
import { Link } from "react-router-dom";
import { type } from "@testing-library/user-event/dist/type";
import Chatapp from "./Chatapp";
import { useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

function S_Doubts() {
  const location = useLocation();
  const username1 = location.state?.username1;

  const [userData, setUserData] = useState(null);
  const [labsData, setLabsData] = useState([]);
  const [username, setUsername] = useState(null); // State for username

  useEffect(() => {
    // Fetch user data from the backend
    const fetchUserData = async () => {
      try {
        const loginData = {
          /* Your login data */
        };

        //Fixing the error part

        const response1 = await axios.post(
          "http://127.0.0.1:8000/myapi/set_stud/",
          { username1 }
        );
        console.log(response1.data);

        await axios
          .post("http://127.0.0.1:8000/myapi/login/", loginData)
          .then((response) => {
            setUsername(response.data.username);
          });
        //Prev
        const response = await axios.get(
          "http://127.0.0.1:8000/myapi/user-data/"
        );
        setUserData(response.data);
        const labsResponse = await axios.get(
          "http://127.0.0.1:8000/myapi/lab-details/"
        );
        setLabsData(labsResponse.data.lab_names);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.logo} title="University Management System">
          <h2>
            S<span className={styles.danger}>T</span>UDENT D
            <span className={styles.danger}>A</span>SHBOARD
          </h2>
        </div>
        <div className={styles.navbar}>
          <Link to="/home" state={{ username1: username1 }}>
            <a href="index.html">
              <span className="material-icons-sharp">home</span>
              <h3>Home</h3>
            </a>
          </Link>
          <Link to="/s_marks" state={{ username1: username1 }}>
            <a href="marks.html ">
              <span className="material-icons-sharp">today</span>
              <h3>Marks</h3>
            </a>
          </Link>
          <Link to="/s_doubts" state={{ username1: username1 }}>
            <a href="doubts.html" className={styles.active}>
              <span className="material-icons-sharp">grid_view</span>
              <h3>Doubts</h3>
            </a>
          </Link>
          <a href="password.html">
            <span className="material-icons-sharp">password</span>
            <h3>Change Password</h3>
          </a>
          <a href="#">
            <Link to="/login">
              <span className="material-icons-sharp">logout</span>
              <h3>Logout</h3>
            </Link>
          </a>
        </div>
        <div id="profile-btn" className={styles.profileBtn}>
          <span className="material-icons-sharp">person</span>
        </div>
        <div className={styles.themeToggler}>
          <span className="material-icons-sharp active">light_mode</span>
          <span className="material-icons-sharp">dark_mode</span>
        </div>
      </header>
      <div className={styles.container}>
        <aside>
          <div className={styles.profile}>
            <div className={styles.top}>
              <div className={styles.profile_photo}>
                <img src={profileImage} alt="Profile" />
              </div>
              <div className={styles.info}>
                <p>
                  Hey, <b>{userData ? userData.name : "Loading..."}</b>
                </p>
                <small className={styles.textMuted}>12102030</small>
              </div>
            </div>
            <div className={styles.about}>
              <h5>Course</h5>
              <p>
                {userData ? userData.department : "Loading..."},S
                {userData ? userData.sem : "Loading..."}
              </p>

              <h5>DOB</h5>
              <p>{userData ? userData.dob : "Loading..."}</p>
              <h5>Phone Number</h5>
              <p>{userData ? userData.phone : "Loading..."}</p>
              <h5>Email</h5>
              <p>{userData ? userData.email : "Loading..."}</p>
              <h5>Address</h5>
              <p>Ghost town Road, New York, America</p>
            </div>
          </div>
        </aside>

        <main>
          <h1 style={{ fontWeight: 800, fontSize: "1.8rem" }}>Doubt Session</h1>

          <div>
            <div className={styles.subjects}>
              <div>
                {/* chat system here */}

                <Chatapp labsData={labsData} username1={username1} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default S_Doubts;
