import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useBlogStore = defineStore('blog', () => {
  const isLoggedIn = ref(false);

  return { isLoggedIn };
})
