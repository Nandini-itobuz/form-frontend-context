import { createContext, FC, ReactNode, useState, useEffect, Dispatch, SetStateAction } from "react";
import { Position } from "../enums/positions";
import { PageSize } from "../enums/pageSize";
import { JobApplication } from "../interfaces/jobApplication";
import { ApplicationClient } from "../config/axiosInstance";
import { handleSwalFire, successSwalFire } from "../helper/swal";

export interface JobApplicationContextType {
  searchItems: (data: { [key: string]: string }) => Promise<void>;
  deleteAllApplications: () => Promise<void>;
  deleteApplications: () => Promise<void>;
  handleFormEdit: (editableId :string) => Promise<void>;
  handleFormSubmit: (data: JobApplication, editableId: string) => Promise<void>;
  showModal: boolean;
  setShowodal: Dispatch<SetStateAction<boolean>>;
  setPage: Dispatch<SetStateAction<string>>;
  allForms: JobApplication[] | null;
  showPagination: boolean;
  setShowPagination: Dispatch<SetStateAction<boolean>>;
  page: string;
  pageSize: string;
  setPageSize: Dispatch<SetStateAction<string>>;
  setShowFilteredPosition: Dispatch<SetStateAction<string>>;
  showFilteredPosition: string;
  totalPages: string;
  setTotalPages: Dispatch<SetStateAction<string>>;
  setAllForms: Dispatch<SetStateAction<JobApplication[]>>
  getAllUser : () => Promise<void>
}

export const JobApplicationContext = createContext<JobApplicationContextType | null>(null);

const JobApplicationProvider: FC<{ children: ReactNode }> = ({ children }) => {

  const [page, setPage] = useState<string>("1");
  const [totalPages, setTotalPages] = useState<string>("1");
  const [allForms, setAllForms] = useState<JobApplication[] | null>([]);

  const [showModal, setShowodal] = useState<boolean>(false);
  const [showFilteredPosition, setShowFilteredPosition] = useState<string>(Position.ALL);
  const [showPagination, setShowPagination] = useState<boolean>(true);
  const [pageSize, setPageSize] = useState<string>(PageSize.TEN);

  const [formData, setFormData] = useState<JobApplication | null>(null);
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);


  const searchItems = async (data: { [key: string]: string }) => {
    const name = data.searchBar.trim();
    if (!name.length) {
      setShowPagination(true);
      getAllUser();
      return;
    }
    const response = await ApplicationClient.post(
      `/search-applications/${showFilteredPosition}`,
      { name },
    );
    setAllForms(response.data.applications);
  };
  
  const handleFormEdit = async (editableId: string): Promise<void> => {
    try {
      if (!editableId) {
        return;
      }
      const response = await ApplicationClient.get(`/view-application/${editableId}`);
      response.data.application.startDate = response.data.application.startDate.slice(0, 10);
      // method.reset(response.data.application);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllUser = async (): Promise<void> => {
    const response = await ApplicationClient.get(`/view-applications/${showFilteredPosition}/${page}/${pageSize}`);
    setTotalPages(response.data.totalPages);
    setAllForms(response.data.applicationData);
  };

  const deleteApplications = async (): Promise<void> => {
    const response = await ApplicationClient.post(`/delete-application`, { id: null });
    response.data.success && setAllForms(null);
    getAllUser();
  };

  const deleteAllApplications = async (): Promise<void> =>
    handleSwalFire("Delete All Items?", "Delete", "Cancel", deleteApplications, "Deleted Successfully!");

  const handleFormSubmit = async (data: JobApplication, editableId: string) => {
    try {
      const response = await ApplicationClient.post(`/create-application/${editableId}`, data);
      response.data.success && setShowodal(false);
      response.data.success && successSwalFire("Your application is submitted successfully");
      setFormData(response.data.data);
    } catch (err: unknown) {
      // toast(err.response.data.message);
    }
  };

  const handleDeleteData = async (inputProps: JobApplication) => {
    await ApplicationClient.post(`/delete-application`, { id: inputProps?._id });
    getAllUser();
  };

  const setTableContentData = (data: JobApplication) => {
    setFormData(data);
  };

  useEffect(() => {
    getAllUser();
  }, [page, pageSize, showFilteredPosition]);

  return (
    <JobApplicationContext.Provider 
      value={{
        searchItems,
        deleteAllApplications,
        deleteApplications,
        handleFormEdit,
        handleFormSubmit,
        showModal,
        setShowodal,
        setPage,
        allForms,
        showPagination,
        setShowPagination,
        page,
        pageSize,
        setPageSize,
        setShowFilteredPosition,
        showFilteredPosition,
        totalPages,
        setTotalPages,
      }}
    >
      {children}
    </JobApplicationContext.Provider>
  );
};

export default JobApplicationProvider;
