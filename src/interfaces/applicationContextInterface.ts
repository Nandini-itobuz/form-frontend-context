import { Dispatch, SetStateAction } from "react";
import { JobApplication } from "./jobApplication";

export interface JobApplicationContextType {
  searchItems: (data: { [key: string]: string }) => Promise<void>;
  deleteAllApplications: () => Promise<void>;
  deleteApplications: () => Promise<void>;
  handleFormSubmit: (data: JobApplication) => Promise<void>;
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
  setAllForms: Dispatch<SetStateAction<JobApplication[] | null>>;
  getAllUser: () => Promise<void>;
  formData: JobApplication | null;
  setFormData: Dispatch<SetStateAction<JobApplication | null>>;
  handleDeleteData: (id: string | undefined) => Promise<void>;
  setShowDetailModal: Dispatch<SetStateAction<boolean>>;
  showDetailModal: boolean;
}
