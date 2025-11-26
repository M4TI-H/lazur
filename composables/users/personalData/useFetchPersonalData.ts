export function useFetchPersonalData() {
  const {
    data: personalData,
    pending: personalDataLoading,
    error: personalDataError,
    refresh: personalDataRefresh,
  } = useAsyncData("personal_data", () =>
    $fetch("/api/accounts/personal_data/fetch")
  );

  return {
    personalData,
    personalDataLoading,
    personalDataError,
    personalDataRefresh,
  };
}
