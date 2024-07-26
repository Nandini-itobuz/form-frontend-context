import { createContext, FC, ReactNode, useState, useEffect } from "react";
import { Position } from "../enums/positions";
import { PageSize } from "../enums/pageSize";
import { JobApplication } from "../interfaces/jobApplication";
import { ApplicationClient } from "../config/axiosInstance";
import { handleSwalFire, successSwalFire } from "../helper/swal";
import { JobApplicationContextType } from "../interfaces/applicationContextInterface";

export const JobApplicationContext =
  createContext<JobApplicationContextType | null>(null);

const JobApplicationProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [page, setPage] = useState<string>("1");
  const [totalPages, setTotalPages] = useState<string>("1");
  const [allForms, setAllForms] = useState<JobApplication[] | null>([]);
  const [showModal, setShowodal] = useState<boolean>(false);
  const [showFilteredPosition, setShowFilteredPosition] = useState<string>(
    Position.ALL,
  );
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
    setShowPagination(false);
  };

  const getAllUser = async (): Promise<void> => {
    const response = await ApplicationClient.get(
      `/view-applications/${showFilteredPosition}/${page}/${pageSize}`,
    );
    setTotalPages(response.data.totalPages);
    setAllForms(response.data.applicationData);
  };

  const deleteApplications = async (): Promise<void> => {
    const response = await ApplicationClient.post(`/delete-application`, {
      id: null,
    });
    response.data.success && setAllForms(null);
    getAllUser();
  };

  const deleteAllApplications = async (): Promise<void> =>
    handleSwalFire(
      "Delete All Items?",
      "Delete",
      "Cancel",
      deleteApplications,
      "Deleted Successfully!",
    );

  const handleFormSubmit = async (data: JobApplication) => {
    try {
      const response = await ApplicationClient.post(
        `/create-application/${data._id}`,
        data,
      );
      response.data && setShowodal(false);
      setFormData(null);
      response.data &&
        successSwalFire("Your application is submitted successfully");
      getAllUser();
    } catch (err: unknown) {
      console.log(err);
    }
  };

  const handleDeleteData = async (id: string | undefined) => {
    await ApplicationClient.post(`/delete-application`, { id });
    getAllUser();
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
        setAllForms,
        getAllUser,
        formData,
        setFormData,
        handleDeleteData,
        setShowDetailModal,
        showDetailModal,
      }}
    >
      {children}
    </JobApplicationContext.Provider>
  );
};

export default JobApplicationProvider;
