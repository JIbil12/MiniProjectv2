import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./FHome.module.css";
import profileImage from "../static/profile-1.jpg";
import { Link } from "react-router-dom";
import Calendar from "../materials/Calendar";
import { Button, Menu, MenuItem } from "@mui/material";
import Swal from "sweetalert2";

function Doubts() {
  const [userData, setUserData] = useState(null);
  const [labsData, setLabsData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/fac/fac_data_get/"
        );
        setUserData(response.data);
        const labsResponse = await axios.get(
          "http://127.0.0.1:8000/fac/get_lab_details/"
        );
        setLabsData(labsResponse.data.lab_names);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Function to handle the selected date

  // ***********Show Alert *************
  const showAlert = () => {
    Swal.fire({
      title: "Success!",
      text: "Attendance Taken Successfully",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  // *************NEw attendanceData**********************

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.logo} title="University Management System">
          <h2>
            F<span className={styles.danger}>A</span>CULTY D
            <span className={styles.danger}>A</span>SHBOARD
          </h2>
        </div>
        <div className={styles.navbar}>
          <Link to="/faculty_home">
            <a href="index.html">
              <span className="material-icons-sharp">home</span>
              <h3>Home</h3>
            </a>
          </Link>
          <Link to="/course_diary">
            <a href="marks.html ">
              <span className="material-icons-sharp">today</span>
              <h3>Course Diary</h3>
            </a>
          </Link>

          <a className={styles.active}>
            <span className="material-icons-sharp">grid_view</span>
            <h3>Doubts</h3>
          </a>
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
                <small className={styles.textMuted}>
                  {userData ? userData.id : "Loading..."}
                </small>
              </div>
            </div>
            <div className={styles.about}>
              <h5>Department</h5>
              <p>{userData ? userData.department : "Loading..."}</p>

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
          <h1 style={{ fontWeight: 800, fontSize: "1.8rem" }}>
            Doubts Session
          </h1>

          <div>
            <div className={styles.subjects}>
              <div>
                {/* chat system here */}
                <h2>Hello</h2>
              </div>
            </div>
          </div>

          <div className={styles.timetable} id="timetable">
            {/* Add your timetable component here */}
          </div>
        </main>

        <div className={styles.right}></div>
      </div>
    </div>
  );
}

export default Doubts;
