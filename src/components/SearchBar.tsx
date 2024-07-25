import { FormProvider, useForm } from 'react-hook-form';
import { FaSearch } from 'react-icons/fa';
import GenericInput from './FormInputs/GenericInput';
import { useContext } from 'react';
import { JobApplicationContext, JobApplicationContextType } from '../context/JobApplicationContext';

const SearchBar = () => {
  const method = useForm();
  const { searchItems } = useContext(JobApplicationContext) as JobApplicationContextType;

  return (
    <div className="flex items-center px-4 rounded-md bg-[#37374B] font-bold w-[260px]">
      <FaSearch opacity={0.6} color="#fff" size={"20px"} />
      <FormProvider {...method}>
        <form
          onChange={method.handleSubmit((data) => searchItems(data))}
          className="w-[100%]"
        >
          <GenericInput
            inputProps={{ name: "searchBar", className: "p-0 gap-0" }}
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default SearchBar;
