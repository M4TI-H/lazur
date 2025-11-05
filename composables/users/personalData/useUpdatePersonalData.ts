import type PersonalData from "~/types/PersonalData";

export function useUpdatePersonalData() {
  const personalDataLoading = ref<boolean>(false);
  const personalDataError = ref<Error | null>(null);

  const updatePersonalData = async (
    name: string,
    phone: string,
    newsletter: boolean
  ) => {
    personalDataLoading.value = true;

    const { error: personalDataError } = await fetchData<PersonalData>(
      "/api/accounts/personal_data/modify",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          phone: phone,
          newsletter: newsletter,
        }),
      }
    );

    personalDataLoading.value = false;

    if (personalDataError) {
      console.error(personalDataError);
      return "error";
    }
  };

  return {
    personalDataLoading,
    personalDataError,
    updatePersonalData,
  };
}
