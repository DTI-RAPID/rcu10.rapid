import { getCollection, type CollectionEntry } from 'astro:content';

export type Story = CollectionEntry<'stories'>;

/** Featured stories in wall order: youth stories first, then newest first. */
export async function getStories(): Promise<Story[]> {
	const all = await getCollection('stories');
	return all.sort(
		(a, b) => Number(b.data.youth) - Number(a.data.youth) || b.data.date.getTime() - a.data.date.getTime(),
	);
}

export const storyHref = (story: Story) => `/stories/${story.id}/`;

/** "18 August 2026" — dates are calendar days, so format in UTC to avoid shifting by timezone. */
export const formatDate = (date: Date) =>
	date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
