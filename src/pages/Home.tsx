import { useContext } from "react";
import TableContent from "../components/TableContent";
import FormModal from "../components/FormModal";
import NodataModal from "../components/NodataModal";
import { JobApplicationContext } from "../context/JobApplicationContext";
import Pagination from "../components/Pagination";
import { JobApplication } from "../interfaces/jobApplication";
import { JobApplicationContextType } from "../interfaces/applicationContextInterface";
import { Heading } from "../components/Heading";

const Home = () => {
  const { showModal, allForms, showPagination } = useContext(
    JobApplicationContext,
  ) as JobApplicationContextType;

  return (
    <div className="home-bg ">
      <Heading />

      <div className=" max-h-[65vh] overflow-x-scroll no-scrollbar w-[90%] max-w-[1300px] ">
        {allForms && allForms?.length ? (
          allForms.map((ele: JobApplication) => (
            <TableContent key={ele._id} inputProps={ele} />
          ))
        ) : (
          <NodataModal />
        )}
      </div>

      {showPagination && <Pagination />}

      {showModal && <FormModal />}
    </div>
  );
};

export default Home;
