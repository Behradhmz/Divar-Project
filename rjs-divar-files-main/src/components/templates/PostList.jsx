import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../Services/user";
import Loader from "../../modules/Loader";
import { sp } from "../../utils/numbers";

import styles from "./PostList.module.css";

const PostList = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const { data, isLoading } = useQuery(["my-post-list"], getPosts);
  console.log({ data, isLoading });
  return (
    <div className={styles.list}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {data.data.posts.map((post) => (
            <div key={post._id} className={styles.post}>
              <img src={`${baseUrl}${post.images}`} alt="Post" />
              <div>
                <p>{post.options.title}</p>
                <span>{post.options.content}</span>
              </div>
              <div className={styles.price}>
                <p>{new Date(post.createdAt).toLocaleDateString("fa-IR")}</p>
                <span>{sp(post.amount)} تومان</span>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default PostList;
