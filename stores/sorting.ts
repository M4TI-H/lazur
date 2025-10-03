import { defineStore } from "pinia";

export const useSortStore = defineStore("sort", {
  state: () => ({
    option: "price" as string,
    ascending: false as boolean,
  }),

  actions: {
    setOption(data: string) {
      this.option = data;
      this.saveToStorage();
    },
    setDirection(data: boolean) {
      this.ascending = data;
      this.saveToStorage();
    },
    saveToStorage() {
      localStorage.setItem(
        "sort",
        JSON.stringify({
          option: this.option,
          ascending: this.ascending,
        })
      );
    },
    loadFromStorage() {
      const data = localStorage.getItem("sort");
      if (data) {
        try {
          const parsed = JSON.parse(data);
          this.option = parsed.option ?? "price";
          this.ascending = parsed.ascending ?? false;
        } catch (e) {
          console.error("Invalid sort data in storage:", e);
        }
      }
    },
    clearStorage() {
      localStorage.removeItem("sort");
      localStorage.clear();
    },
  },
  getters: {
    sorting: (state) => {
      return (a: any, b: any) => {
        if (state.option === "price") {
          return state.ascending ? a.price - b.price : b.price - a.price;
        }
        return 0;
      };
    },
  },
});
