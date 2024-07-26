import { useContext, useEffect } from "react";
import { GiCancel } from "react-icons/gi";
import { JobApplication } from "../interfaces/jobApplication";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import applicationYupSchema from "../validator/validationFormSchmea";
import GenericInput from "./FormInputs/GenericInput";
import SelectFormInput from "./FormInputs/SelectFormInput";
import { Position } from "../enums/positions";
import { inputDetails, jobInputFields } from "../data/formInputDetails";
import { JobApplicationContext } from "../context/JobApplicationContext";
import { JobApplicationContextType } from "../interfaces/applicationContextInterface";

const FormModal = () => {
  const { setShowodal, formData, handleFormSubmit } = useContext(
    JobApplicationContext,
  ) as JobApplicationContextType;

  const method = useForm<JobApplication>({
    resolver: yupResolver(applicationYupSchema),
  });

  useEffect(() => {
    formData?._id &&
      formData?.startDate &&
      method.reset({
        ...formData,
        startDate: formData?.startDate.slice(0, 10),
      });
  }, []);

  return (
    <div className=" modal-full-bg">
      <div className=" modal-bg-white">
        <GiCancel
          className=" ms-auto hover:cursor-pointer"
          onClick={() => {
            setShowodal(false);
          }}
          size={"30px"}
        />

        <div className="overflow-y-scroll no-scrollbar w-[100%] text-white">
          <FormProvider {...method}>
            <form
              className="w-[100%] rounded-lg"
              onSubmit={method.handleSubmit((data) => {
                handleFormSubmit(data);
              })}
            >
              {inputDetails.map((ele) => (
                <div
                  key={ele.subTitle}
                  className=" bg-custom-bg bg-opacity-10 mx-auto sm:p-10 p-2 my-5 rounded-lg"
                >
                  <p className=" font-bold mb-5 ">{ele.subTitle}</p>
                  <div className="  grid grid-cols-12 gap-5  ">
                    {ele.data.map((ele) => (
                      <GenericInput key={ele?.name} inputProps={ele} />
                    ))}
                  </div>
                </div>
              ))}

              <div className=" bg-custom-bg mx-auto sm:p-10 p-2 my-5 rounded-lg">
                <p className=" font-bold mb-5 ">Job Details</p>
                <div className="  grid grid-cols-12 gap-5 ">
                  <div className=" sm:col-span-6 col-span-12">
                    <div className=" flex flex-col gap-2 ">
                      <span className=" font-medium">
                        What position are you looking for?
                      </span>
                      <SelectFormInput
                        valueOptions={Object.values(Position)}
                        name="position"
                      />
                    </div>
                  </div>
                  {jobInputFields.map((ele) => (
                    <GenericInput key={ele?.name} inputProps={ele} />
                  ))}
                </div>
              </div>

              <div className="flex justify-center mb-5">
                <input
                  type="submit"
                  className=" py-2 px-10 rounded-md bg-custom-bg font-bold hover:cursor-pointer"
                />
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
