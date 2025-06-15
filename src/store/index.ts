import { defineStore } from 'pinia';

export const useCupStore = defineStore('cup', {
  state: () => ({
    usageCount: 0,
    carbonReduced: 0,
  }),
  actions: {
    increment() {
      this.usageCount++;
      this.carbonReduced += 10;
    },
  },
});