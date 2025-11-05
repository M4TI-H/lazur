import type PersonalData from "~/types/PersonalData";

export function useFetchPersonalData() {
  const {
    data: personalData,
    pending: personalDataLoading,
    error: personalDataError,
    refresh: personalDataRefresh,
  } = useAsyncData<PersonalData>("personal_data", () =>
    $fetch("/api/accounts/personal_data/fetch")
  );

  return {
    personalData,
    personalDataLoading,
    personalDataError,
    personalDataRefresh,
  };
}
