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
			summary: z.string().optional(), // legacy; the summary is now the story's first paragraph
			image: image(),
			alt: z.string().optional(), // photo description for screen readers; the title is used when empty
			// Extra photos inside the story text (up to 4; with the main photo that makes 5).
			// They alternate left and right. Size: small, medium, large or full (full width, no text beside it).
			photos: z
				.array(
					z.object({
						image: image(),
						size: z.enum(['small', 'medium', 'large', 'full']).default('medium'),
						side: z.enum(['auto', 'left', 'right']).default('auto'),
						// place after this paragraph number (0 = top); empty = automatic
						after: z.number().int().min(0).nullish(),
						// optional line under the photo, e.g. "Photo by ..."
						caption: z.string().optional(), // optional line under the main photo
					}),
				)
				.max(4)
				.optional(),
			// legacy single extra photo, used when `photos` is empty
			image2: image().optional(),
			alt2: z.string().optional(),
			caption: z.string().optional(), // optional line under the main photo
			author: z.string(),
			unit: z.string(),
			source: z.string().optional(), // link to the original article; shows the credit block
		}),
});

export const collections = { stories };
