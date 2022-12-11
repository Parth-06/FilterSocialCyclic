import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { TweetVal } from "../../Context/FetchContext";
const useFetch = () => {
  const { newuserData } = TweetVal();
  const [userDetails, setUserDetails] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const Callmainpage = async () => {
      try {
        const res = await fetch("/home", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
        });
        const user = await res.json();
        setUserDetails(user);
        if (!res.status === 200) {
          const error = new Error(res.error);
          throw error;
        }
      } catch (err) {
        console.log(err);
        toast.error(`Please Login For Better Experience `);
        navigate("/loginRegi");
      }
    };
    Callmainpage();
  }, [newuserData]);
  return [userDetails];
};

export default useFetch;
