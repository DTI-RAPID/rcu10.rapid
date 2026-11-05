import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Featured stories: the museum wall on the home page and one page each at /stories/<file name>.
// Text is copied from the original article on dtirapid.ph; `source` links back to it.
const stories = defineCollection({
	loader: glob({ pattern: '*.md', base: './src/content/stories' }),
	schema: ({ image }) =>
		z.object({
			order: z.number().optional(), // legacy; the wall now orders itself (youth first, then newest)
			articleId: z.number().optional(), // the article number on dtirapid.ph, for copied stories
			title: z.string(),
			tag: z.enum(['News', 'Story']),
			youth: z.boolean().default(false),
			date: z.coerce.date(),
			place: z.string(),
			summary: z.string(),
			image: image(),
			alt: z.string().optional(), // photo description for screen readers; the title is used when empty
			image2: image().optional(), // second photo, shown on the left inside the story
			alt2: z.string().optional(),
			caption: z.string().optional(),
			author: z.string(),
			unit: z.string(),
			source: z.string().optional(), // link to the original article; shows the credit block
		}),
});

export const collections = { stories };
