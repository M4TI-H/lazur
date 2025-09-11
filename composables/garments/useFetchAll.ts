import type Garment from "~/types/Garment";

export function useFetchAllGarments() {
  const {
    data: allGarments,
    pending: loading,
    error,
    refresh,
  } = useFetch<Garment[]>("/api/garments/fetch-all", {
    lazy: true,
    key: "garments-list",
  });

  return { allGarments, loading, error, refresh };
}
