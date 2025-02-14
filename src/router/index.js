/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL)
});

router.beforeEach((to) => {
  if (to.matched.length === 0) {
    return { path: '/' };
  }
});

export default router;
