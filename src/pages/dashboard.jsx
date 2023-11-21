import { Fragment } from "react";
import BarPendukung from "../../component/statDashboard/pie";
import Statistic from "../../component/statistic";
import Navbar from "../../component/navbar";
import NewLandingLayout from "../../component/landinglayout";

export default function Dashboard() {
  return (
    <Fragment>
      <Navbar />
      <NewLandingLayout className={"py-24 pb-24 mx-auto"}>
        <Statistic />
      </NewLandingLayout>
    </Fragment>
  );
}
