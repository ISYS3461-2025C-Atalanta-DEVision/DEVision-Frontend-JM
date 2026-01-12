import applicantService from "../../services/applicantService";
import { useEffect, useState } from "react";

const useTalentList = (list) => {
  const [talents, setTalents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    if (list === null) {
      return;
    }
    fetchTalents();
  }, [list]);

  const fetchTalents = async () => {
    if (list === null) {
      return;
    }

    try {
      setLoading(true);

      const payload = list.map((notification) => notification.fromId);

      const res = await applicantService.getApplicantsByIds(payload);
      setTalents(res);
    } catch (error) {
      setMsg({ type: "err", msg: error });
    } finally {
      setLoading(false);
    }
  };

  return { talents, loading, msg, fetchTalents };
};
export default useTalentList;
