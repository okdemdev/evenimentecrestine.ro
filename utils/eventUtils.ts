import { evenimente } from '@/app/(root)/page';

export async function getEventById(id: string) {
  // Simulate an API call with a delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  return evenimente.find((event) => event._id === id) || null;
}
