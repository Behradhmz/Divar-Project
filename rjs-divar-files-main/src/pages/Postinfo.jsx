import Postinformation from "../components/templates/Postinformation";

import { useParams } from "react-router-dom";

const Postinfo = () => {
  const { id } = useParams();
  console.log(id);

  return (
    <div>
      <Postinformation id={id} />
    </div>
  );
};

export default Postinfo;
