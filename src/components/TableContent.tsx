import { MdEdit } from "react-icons/md";
import { MdDeleteSweep } from "react-icons/md";
import { useContext } from "react";
import { JobApplication } from "../interfaces/jobApplication";
import { handleSwalFire } from "../helper/swal";
import { JobApplicationContext } from "../context/JobApplicationContext";
import { JobApplicationContextType } from "../interfaces/applicationContextInterface";
import DetailContentModal from "./DetailContentModal";

const TableContent = ({ inputProps }: { inputProps: JobApplication }) => {
  const {
    handleDeleteData,
    setShowodal,
    setFormData,
    setShowDetailModal,
    showDetailModal,
  } = useContext(JobApplicationContext) as JobApplicationContextType;

  return (
    <>
      <div
        className="w-[100%] my-2 grid grid-cols-12 bg-[#f5f5f5] bg-opacity-[0.2] text-white justify-between  items-center px-3 py-1  rounded-lg"
        onClick={() => {
          setFormData(inputProps);
          setShowDetailModal(true);
        }}
      >
        <div className="grid grid-cols-12 justify-center lg:gap-5 col-span-10">
          <div className=" md:col-span-4 lg:col-span-3 col-span-12">
            {inputProps?.firstName} {inputProps?.lastName}
          </div>
          <div className=" md:col-span-5 lg:col-span-3 col-span-12">
            {inputProps?.email}
          </div>
          <div className=" md:col-span-1 lg:col-span-2 col-span-12">
            {inputProps?.age}
          </div>
          <div className=" md:col-span-2 lg:col-span-4 col-span-12">
            {inputProps?.position}
          </div>
        </div>
        <div className=" md:col-span-2 col-span-12 my-3 flex justify-end gap-4">
          <div
            className=" hover:cursor-pointer bg-green-700 rounded-[50%] p-[5px]"
            onClick={(e) => {
              e.stopPropagation();
              setShowodal(true);
              setFormData({ ...inputProps });
            }}
          >
            <MdEdit size={"20px"} />
          </div>
          <div
            className=" hover:cursor-pointer bg-red-700 rounded-[50%] p-[5px]"
            onClick={(e) => {
              e.stopPropagation();
              handleSwalFire(
                "Delete Item?",
                "Delete",
                "cancel",
                () => {
                  handleDeleteData(inputProps?._id);
                },
                "Deleted successfully!",
              );
            }}
          >
            <MdDeleteSweep size={"20px"} />
          </div>
        </div>
      </div>

      {showDetailModal && <DetailContentModal />}
    </>
  );
};

export default TableContent;
