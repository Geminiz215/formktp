import { useRouter } from "next/router";
import Index from "../../component/form";
import FormFormik from "../../component/formFormik";
import Navbar from "../../component/navbar";
import { Fragment, useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the desired page after component is mounted
    router.push("/prabowogibran");
  }, []);

  return <FormFormik />;
}
