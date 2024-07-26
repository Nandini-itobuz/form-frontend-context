import { GiCancel } from "react-icons/gi";
import { useContext } from "react";
import { JobApplicationContext } from "../context/JobApplicationContext";
import { JobApplicationContextType } from "../interfaces/applicationContextInterface";

interface DetailValueInterface {
  name: string;
  value: string | number | undefined;
}

const DetailContentModal = () => {
  const { setShowDetailModal, formData, setFormData } = useContext(
    JobApplicationContext,
  ) as JobApplicationContextType;

  const detailValues: DetailValueInterface[] = [
    {
      name: "First Name",
      value: formData?.firstName,
    },
    {
      name: "Middle Name",
      value: formData?.middleName,
    },
    {
      name: "Last Name",
      value: formData?.lastName,
    },
    {
      name: "Age",
      value: formData?.age,
    },
    {
      name: "Email Id",
      value: formData?.email,
    },
    {
      name: "Phone",
      value: formData?.phone,
    },
    {
      name: "Position",
      value: formData?.position,
    },
    {
      name: "Institution",
      value: formData?.institution,
    },
    {
      name: "Degree",
      value: formData?.degree,
    },
    {
      name: "Start Date",
      value: formData?.startDate?.slice(0, 10),
    },
    {
      name: "Years of Experience",
      value: formData?.yearsOfExperience,
    },
  ];

  return (
    <div className=" modal-full-bg z-10">
      <div className=" modal-bg-white">
        <GiCancel
          className=" ms-auto hover:cursor-pointer"
          onClick={() => {
            setFormData(null);
            setShowDetailModal(false);
          }}
          size={"30px"}
        />

        <div className=" bg-custom-bg w-[100%] sm:p-10 p-2 mt-5 rounded-lg overflow-y-scroll no-scrollbar">
          {detailValues.map(
            (ele) =>
              ele.value && (
                <div
                  key={ele.value}
                  className=" flex flex-col sm:flex-row justify-between my-3 text-white font-medium"
                >
                  <span>{ele.name}</span>
                  <div className=" p-2 sm:w-[50%] w-[100%] bg-[#37374B] ">
                    {ele.value}
                  </div>
                </div>
              ),
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailContentModal;
