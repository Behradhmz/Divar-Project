import React from "react";
import { checkOtp } from "../../Services/auth";
import { setCookies } from "../../utils/cookies";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../Services/user";
import styles from "./ChekOtp.module.css";
import { toast } from "react-toastify";

const ChekOtp = ({ code, setCode, mobile, setStep }) => {
  const { refetch } = useQuery(["profile"], getProfile);
  const navigate = useNavigate();
  const submitHandler = async (event) => {
    event.preventDefault();

    if (code.length !== 5) return;

    const { response, error } = await checkOtp({ mobile, code });
    // console.log({ response, error });
    if (response) {
      toast.success("با موفقیت وارد شدید");
      setCookies(response.data);
      navigate("/");
      refetch();
    }
    if (error) {
      toast.error("مشکلی پیش اومده دوباره تلاش کن");
    }
  };
  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <p>تایید کد اس ام اس شده</p>
      <span>کد پیامک شده به شماره "{mobile}" را وارد کنید</span>
      <label htmlFor="input">کد تایید را وارد کنید</label>
      <input
        type="text"
        value={code}
        placeholder="کد تایید"
        onChange={(e) => setCode(e.target.value)}
      />
      <button type="submit">ورود</button>
      <button className={styles.backbutton} onClick={() => setStep(1)}>
        تغیر شماره موبایل
      </button>
    </form>
  );
};

export default ChekOtp;
