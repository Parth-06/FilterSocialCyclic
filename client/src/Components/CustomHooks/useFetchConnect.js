import { useEffect, useState } from "react";

const useFetchConnect = () => {
  const [userdata, setUserdata] = useState([]);
  useEffect(() => {
    const Fetchtweet = async () => {
      const res = await fetch("/connect", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      setUserdata(data);
    };
    Fetchtweet();
  }, []);

  return [userdata];
};

export default useFetchConnect;
