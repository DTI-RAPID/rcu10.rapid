import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

// shadcn/ui Badge, with the site's story labels as variants
const badgeVariants = cva(
	'inline-flex w-fit shrink-0 items-center justify-center whitespace-nowrap rounded-[4px] px-2 py-0.5 text-xs font-bold',
	{
		variants: {
			variant: {
				default: 'bg-teal-soft text-mist',
				news: 'bg-teal-soft text-mist',
				story: 'bg-leaf text-mist',
				youth: 'bg-gold text-canopy-deep',
				outline: 'border border-mist/30 text-mist',
			},
		},
		defaultVariants: { variant: 'default' },
	},
);

function Badge({ className, variant, ...props }: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
	return <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
