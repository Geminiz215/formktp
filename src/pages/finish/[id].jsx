import { useRouter } from "next/router";
import ThankYouPage from "../../../component/finish";

export default function Finish() {
  const router = useRouter();
  const { id } = router.query;
  return <ThankYouPage status={id} />;
}
