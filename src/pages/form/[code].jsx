// pages/user/[id].js
import { useRouter } from "next/router";
import Index from "../../../component/form";

const UserProfile = () => {
  const router = useRouter();
  const { code } = router.query;
  return <Index referral={code} />;
};

export default UserProfile;
