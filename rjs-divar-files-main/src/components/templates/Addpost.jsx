import { useQuery } from "@tanstack/react-query";
import { getCategory } from "../../Services/admin";
import { useState } from "react";
import { toast } from "react-toastify";

import styles from "./Addpost.module.css";
import { getCookie } from "../../utils/cookies";
import axios from "axios";

const Addpost = () => {
  const { data } = useQuery(["get-categories"], getCategory);
  // console.log(data);
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "",
    city: "",
    amount: null,
    images: "",
  });
  const [amount, setAmount] = useState("");

  const changeHandler = (event) => {
    const name = event.target.name;
    if (name !== "images") {
      setForm({ ...form, [name]: event.target.value });
    } else {
      setForm({ ...form, [name]: event.target.files[0] });
    }
  };

  const addHandler = (event) => {
    event.preventDefault();

    const formData = new FormData();
    for (let i in form) {
      formData.append(i, form[i]);
    }
    const token = getCookie("accessToken");
    axios
      .post(`${import.meta.env.VITE_BASE_URL}post/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => toast.success(res.data.message))
      .catch((error) => toast.error("مشکلی پیش آمده"));
  };

  const valueChange = (event) => {
    const value = event.target.value.replace(/[^\d]/g, ""); // حذف کاراکترهای غیر عددی
    setAmount(value);
  };

  const formatToPersian = (number) => {
    return new Intl.NumberFormat("fa-IR").format(number); // فرمت عدد به فارسی
  };

  return (
    <div className={styles.container}>
      <form onChange={changeHandler} className={styles.form}>
        <h3>افزودن آگهی</h3>
        <label htmlFor="title">عنوان</label>
        <input type="text" id="title" name="title" />
        <label htmlFor="content">توضیحات</label>
        <textarea name="content" id="content" />
        <label htmlFor="amount">مبلغ</label>
        <input
          type="text"
          id="amount"
          name="amount"
          onChange={valueChange}
          value={amount}
        />
        <p>
          {amount ? `${formatToPersian(amount)} تومان` : "مبلغی وارد نشده است"}
        </p>
        <label htmlFor="city">شهر</label>
        <input type="text" id="city" name="city" />
        <label htmlFor="category">دسته بندی</label>
        <select name="category" id="category">
          {data?.data.map((i) => (
            <option key={i._id} value={i._id}>
              {i.name}
            </option>
          ))}
        </select>
        <label htmlFor="images">عکس</label>
        <input type="file" id="images" name="images" />
        <button onClick={addHandler}>ایجاد</button>
      </form>
    </div>
  );
};

export default Addpost;
