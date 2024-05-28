import { createFileRoute, redirect } from '@tanstack/react-router';
import { useAuthStore } from '../store/auth';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ location }) => {
    if (useAuthStore.getState().status === 'unauthorized') {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href
        }
      });
    }
  }
});
