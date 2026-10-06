import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// 企业展示站内容集合：产品/服务、案例/项目、新闻动态、关于我们。
// 字段带 Zod 校验，漏填或类型不符会在构建时报错。

const products = defineCollection({
	loader: glob({ base: './src/content/products', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			slug: z.string(),
			title: z.string(),
			category: z.enum(['保安岗亭', '民宿房屋']),
			cover: z.optional(image()),
			gallery: z.array(image()).default([]),
			summary: z.string(),
			specs: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
			features: z.array(z.string()).default([]),
			sortOrder: z.number().default(0),
			draft: z.boolean().default(false),
		}),
});

const cases = defineCollection({
	loader: glob({ base: './src/content/cases', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			slug: z.string(),
			title: z.string(),
			category: z.enum(['岗亭项目', '民宿项目']).default('岗亭项目'),
			client: z.string().optional(),
			location: z.string().optional(),
			date: z.coerce.date(),
			cover: z.optional(image()),
			summary: z.string(),
			draft: z.boolean().default(false),
		}),
});

const news = defineCollection({
	loader: glob({ base: './src/content/news', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			slug: z.string(),
			title: z.string(),
			pubDate: z.coerce.date(),
			category: z.string().default('公司新闻'),
			summary: z.string(),
			cover: z.optional(image()),
			draft: z.boolean().default(false),
		}),
});

const about = defineCollection({
	loader: glob({ base: './src/content/about', pattern: '**/*.{md,mdx}' }),
	schema: () =>
		z.object({
			title: z.string(),
		}),
});

export const collections = { products, cases, news, about };
