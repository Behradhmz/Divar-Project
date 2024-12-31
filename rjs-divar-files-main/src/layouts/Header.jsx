import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { deleteCookies, getCookie } from "../utils/cookies";
import { getProfile } from "../Services/user";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const Header = () => {
  const { refetch } = useQuery(["profile"], getProfile);
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const cookie = getCookie("accessToken");
    setIsLoggedIn(!!cookie);
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const exitHandler = () => {
    deleteCookies();
    navigate("/");
    closeDropdown();
    setIsLoggedIn(false);
    refetch();
    toast.success("خروج با موفقیت انجام شد");
  };

  const logginHandler = () => {
    navigate("/auth");
    closeDropdown();
    setIsLoggedIn(true);
    refetch();
  };

  const adminHandler = () => {
    navigate("/admin");
    closeDropdown();
  };

  const dashboardHandler = () => {
    navigate("/dashboard");
    closeDropdown();
  };

  return (
    <header className={styles.header}>
      <div>
        <Link to="/">
          <img src="./public/divar.svg" className={styles.logo} />
        </Link>
        <span>
          <img src="./public/location.svg" />
          <p>تهران</p>
        </span>
      </div>
      <div>
        <div className={styles.profileMenu}>
          <span onClick={toggleDropdown} className={styles.profileToggle}>
            <img src="/profile.svg" alt="Profile Icon" />
            <p>دیوار من</p>
          </span>
          {isDropdownOpen && (
            <div className={styles.dropdownMenu}>
              {isLoggedIn ? (
                <>
                  <button onClick={exitHandler} className={styles.dropdownItem}>
                    خروج از حساب کاربری
                  </button>
                  <button
                    onClick={dashboardHandler}
                    className={styles.dropdownItem}
                  >
                    داشبورد
                  </button>
                  <button
                    onClick={adminHandler}
                    className={styles.dropdownItem}
                  >
                    پنل ادمین
                  </button>
                </>
              ) : (
                <button onClick={logginHandler} className={styles.dropdownItem}>
                  ورود
                </button>
              )}
            </div>
          )}
        </div>
        <Link className={styles.button} to="/dashboard">
          ثبت آکهی
        </Link>
      </div>
    </header>
  );
};

export default Header;
