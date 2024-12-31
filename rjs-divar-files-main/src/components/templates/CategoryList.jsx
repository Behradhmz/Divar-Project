import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteCategory, getCategory } from "../../Services/admin";
import Loader from "../../modules/Loader";

import styles from "./CategoryList.module.css";

const CategoryList = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(["get-categories"], getCategory);
  const { mutate: deleteMutate, isLoading: isDeleting } = useMutation(
    deleteCategory,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("get-categories");
      },
    }
  );

  const deleteHandler = (id) => {
    if (window.confirm("یا از حذف این دسته‌بندی مطمئن هستید؟")) {
      deleteMutate(id);
    }
  };

  // console.log({ data, isLoading });
  return (
    <div className={styles.list}>
      {isLoading ? (
        <Loader />
      ) : (
        data.data.map((item) => (
          <div key={item._id} className={styles.category}>
            <img src={`${item.icon}.svg`} />
            <h5>{item.name}</h5>
            <div className={styles.slug}>
              <p>slug:{item.slug}</p>
              <button
                className={styles.delete}
                onClick={() => deleteHandler(item._id)}
              >
                حذف
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CategoryList;
