import { useQuery } from "@tanstack/react-query";
import Main from "../components/templates/Main";
import Sidebar from "../components/templates/Sidebar";
import { getAllPosts } from "../Services/user";
import { getCategory } from "../Services/admin";
import Loader from "../modules/Loader";

const style = { display: "flex" };

const HomePage = () => {
  const { data: category, isLoading: categoryLoading } = useQuery(
    ["get-categories"],
    getCategory
  );
  const { data: posts, isLoading: postLoading } = useQuery(
    ["posts-list"],
    getAllPosts
  );
  console.log({ posts });
  return (
    <>
      {categoryLoading || postLoading ? (
        <Loader />
      ) : (
        <div style={style}>
          <Sidebar category={category} />
          <Main posts={posts} />
        </div>
      )}
    </>
  );
};

export default HomePage;
