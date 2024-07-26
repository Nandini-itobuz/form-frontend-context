import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FaFilter } from "react-icons/fa";
import SelectFormInput from "./FormInputs/SelectFormInput";
import { Position } from "../enums/positions";
import { JobApplicationContext } from "../context/JobApplicationContext";
import { JobApplicationContextType } from "../interfaces/applicationContextInterface";

const FilterData = () => {
  const method = useForm();
  const { setPage, setShowFilteredPosition } = useContext(
    JobApplicationContext,
  ) as JobApplicationContextType;

  return (
    <div className="flex items-center px-4 rounded-md bg-[#37374B] w-[260px]">
      <FaFilter color="#fff" opacity={0.6} size={"20px"} />
      <FormProvider {...method}>
        <form
          onChange={method.handleSubmit((data) => {
            setPage("1");
            setShowFilteredPosition(data.position);
          })}
          className="flex justify-center items-center"
        >
          <SelectFormInput
            name="position"
            valueOptions={Object.values(Position)}
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default FilterData;
