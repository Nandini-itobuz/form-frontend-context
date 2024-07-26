import { IoAddCircle } from "react-icons/io5";
import { Button } from "./Button";
import SearchBar from "./SearchBar";
import { RiDeleteBinFill } from "react-icons/ri";
import FilterData from "./FilterData";
import { useContext } from "react";
import { JobApplicationContext } from "../context/JobApplicationContext";
import { JobApplicationContextType } from "../interfaces/applicationContextInterface";

export const Heading = () => {
  const { deleteAllApplications, setShowodal } = useContext(
    JobApplicationContext,
  ) as JobApplicationContextType;

  return (
    <div className=" w-[90%] max-w-[1300px]">
      <div className=" flex sm:flex-row flex-col justify-between gap-1">
        <Button
          handleClick={() => {
            setShowodal(true);
          }}
          className="bg-green-700 w-[140px] flex items-center gap-1"
        >
          <>
            <IoAddCircle opacity={0.6} size={"20px"} /> Add
          </>
        </Button>
        <SearchBar />
      </div>

      <div className="flex sm:flex-row flex-col justify-between gap-1 mt-3">
        <Button
          className=" bg-red-700 w-[140px] flex items-center gap-1"
          handleClick={deleteAllApplications}
        >
          <>
            <RiDeleteBinFill opacity={0.6} size={"20px"} />
            Delete All
          </>
        </Button>
        <FilterData />
      </div>
    </div>
  );
};
