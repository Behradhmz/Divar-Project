import React, { useState } from "react";
import styles from "./Categotyfrom.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCategory } from "../../Services/admin";

const Categoryfrom = () => {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    icon: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const queryClient = useQueryClient();
  const { mutate, isLoading, error, data } = useMutation(addCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-categories");
      setForm({ name: "", slug: "", icon: "" });
      setSuccessMessage("دسته‌بندی با موفقیت اضافه شد");
      setTimeout(() => setSuccessMessage(""), 2000);
    },
  });
  // console.log({ isLoading, error, data });

  const onChangeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!form.name || !form.slug || !form.icon) return;
    mutate(form);
  };

  // if (data) {
  //   // پاک کردن فرم بعد از ارسال موفقیت‌آمیز
  //   setForm({ name: "", slug: "", icon: "" });
  // }

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <h3>دسته بندی جدید</h3>
      {!!error && <p>مشکلی پیش آمده</p>}
      {successMessage && <p>{successMessage}</p>}
      <label htmlFor="name">نام دسته بندی</label>
      <input
        type="text"
        name="name"
        id="name"
        onChange={onChangeHandler}
        value={form.name}
      />
      <label htmlFor="slug">اسلاگ</label>
      <input
        type="text"
        name="slug"
        id="slug"
        onChange={onChangeHandler}
        value={form.slug}
      />
      <label htmlFor="icon"> ایکون</label>
      <input
        type="text"
        name="icon"
        id="icon"
        onChange={onChangeHandler}
        value={form.icon}
      />
      <button type="submit" disabled={isLoading}>
        ایجاد
      </button>
    </form>
  );
};

export default Categoryfrom;
