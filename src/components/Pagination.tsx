import { Button } from './Button';
import { FaBackward, FaForward } from 'react-icons/fa';
import { useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import SelectFormInput from './FormInputs/SelectFormInput';
import { PageSize } from '../enums/pageSize';
import { JobApplicationContext, JobApplicationContextType } from '../context/JobApplicationContext';

const Pagination = () => {

    const method = useForm();
    const { page,totalPages,setPage, setPageSize } = useContext(JobApplicationContext) as JobApplicationContextType;

  return (
    <div className=" flex flex-wrap justify-center gap-2 text-white mt-auto">
          <Button className=" border " handleClick={() => { Number(page) - 1 >= 1 && setPage((Number(page) - 1).toString()); }}>
            <FaBackward opacity={0.6} size={"15px"} />
          </Button>

          <p className=" rounded-md p-2 bg-[#37374B] ">
            {page} of {totalPages}
          </p>

          <Button className=" border" handleClick={() => {
            Number(page) + 1 <= Number(totalPages) &&
              setPage((Number(page) + 1).toString());
          }}>
            <FaForward opacity={0.6} size={"15px"} />
          </Button>

          <div className=" flex justify-center">
            <span className="py-2 px-5 font-bold">Page Size:</span>
            <FormProvider {...method}>
              <form
                onChange={method.handleSubmit((data) => {
                  setPage("1");
                  setPageSize(data.pageSize);
                })}
              >
                <SelectFormInput
                  valueOptions={Object.values(PageSize)}
                  name="pageSize"
                />
              </form>
            </FormProvider>
          </div>
        </div>
  );
}

export default Pagination;
