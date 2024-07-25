import { useContext } from "react";
import TableContent from "../components/TableContent";
import FormModal from "../components/FormModal";
import { Button } from "../components/Button";
import { RiDeleteBinFill } from "react-icons/ri";
import { IoAddCircle } from "react-icons/io5";
import FilterData from "../components/FilterData";
import SearchBar from "../components/SearchBar";
import NodataModal from "../components/NodataModal";
import { JobApplicationContext, JobApplicationContextType } from "../context/JobApplicationContext";
import Pagination from "../components/Pagination";

const Home = () => {

  const {  showModal, setShowodal, allForms, deleteAllApplications, showPagination, getAllUser } = useContext(JobApplicationContext) as JobApplicationContextType
  return (
    <div className="home-bg ">
      <div className=" w-[90%] max-w-[1300px]">
        <div className=" flex sm:flex-row flex-col justify-between gap-1">
          <Button
            handleClick={() => {
              setShowodal(true);
            }}
            className="bg-green-700 w-[140px] flex items-center gap-1"
          >
            <><IoAddCircle opacity={0.6} size={"20px"} /> Add</>
          </Button>
          <SearchBar />
        </div>

        <div className="flex sm:flex-row flex-col justify-between gap-1 mt-3">
          <Button
            className=" bg-red-700 w-[140px] flex items-center gap-1"
            handleClick={deleteAllApplications}
          >
            <><RiDeleteBinFill opacity={0.6} size={"20px"} />
              Delete All</>
          </Button>

          <FilterData />
        </div>
      </div>

      <div className=" max-h-[65vh] overflow-x-scroll no-scrollbar w-[90%] max-w-[1300px] ">
        {allForms && allForms?.length ? (
          allForms.map((ele) => (
            <TableContent key={ele._id} inputProps={ele} getAllUser={getAllUser} />
          ))
        ) : (
          <NodataModal />
        )}
      </div>

      {showPagination && <Pagination />}

      {showModal && (
        <FormModal
          setShowModal={setShowodal}
        />
      )}
    </div>
  );
};

export default Home;
