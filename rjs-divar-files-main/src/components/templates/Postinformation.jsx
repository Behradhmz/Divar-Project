import { useQuery } from "@tanstack/react-query";
import { getPostinfo } from "../../Services/user";
import Loader from "../../modules/Loader";
import { sp } from "../../utils/numbers";

import styles from "./Postinformation.module.css";
import { getCategory } from "../../Services/admin";

const Postinformation = ({ id }) => {
  const { data, isLoading, error } = useQuery(["posts-info", id], () =>
    getPostinfo(id)
  );
  console.log({ data, isLoading, error });

  const { data: category, isLoading: categoryloading } = useQuery(
    ["get-categories"],
    getCategory
  );
  console.log({ category, categoryloading });

  const post = data?.data.post;

  const selectedCategory = category?.data.find(
    (data) => String(data._id) === String(post?.category)
  );

  console.log(selectedCategory);
  console.log("post?.category:", post?.category);
  console.log("category data:", category?.data);

  return (
    <div className={styles.container}>
      {data ? (
        <>
          <div className={styles.img}>
            <img
              src={`${import.meta.env.VITE_BASE_URL}${post?.images}`}
              alt="image"
            />
          </div>
          <div className={styles.options}>
            <h3> عنوان : {post?.options.title}</h3>
            <p>شهر : {post?.options.city}</p>
            <p>قیمت : {sp(post?.amount)} تومان </p>
            <p>دسته‌بندی: {selectedCategory?.name || "نامشخص"}</p>
          </div>
          <div className={styles.content}>
            مشخصات:
            <p>{post?.options.content}</p>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Postinformation;
