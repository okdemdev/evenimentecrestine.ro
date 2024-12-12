import { getEvents } from './actions/events';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const events = await getEvents();
  const baseUrl = 'https://evenimentecrestine.ro';

  const eventUrls = events.map((event) => ({
    url: `${baseUrl}/events/${event._id}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...eventUrls,
  ];
}
