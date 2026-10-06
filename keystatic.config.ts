import { config, collection, fields } from '@keystatic/core';

// Keystatic 后台配置：把 src/content 下的产品/案例/新闻/关于映射为可视化表单。
// 遵循踩坑经验：path 带 glob（/*），slugField 必填且独立于标题。
// 图片（cover/gallery）与 blog-site 一致采用手动管理，不进后台表单。
export default config({
	storage: {
		kind: 'local',
	},
	collections: {
		products: collection({
			label: '产品/服务',
			path: 'src/content/products/*',
			slugField: 'slug',
			format: { contentField: 'content' },
			columns: ['title', 'category', 'sortOrder', 'draft'],
			schema: {
				slug: fields.slug({
					name: {
						label: 'Slug（文件名/URL）',
						description: '英文小写，例如 stainless-steel-booth。创建后不建议修改（会改变产品 URL）。',
					},
				}),
				title: fields.text({ label: '产品名称', validation: { isRequired: true } }),
				category: fields.select({
					label: '产品分类',
					options: [
						{ label: '保安岗亭', value: '保安岗亭' },
						{ label: '民宿房屋', value: '民宿房屋' },
					],
					defaultValue: '保安岗亭',
				}),
				summary: fields.text({
					label: '摘要',
					description: '列表页摘要与 SEO description',
					multiline: true,
					validation: { isRequired: true },
				}),
				specs: fields.array(
					fields.object({
						label: fields.text({ label: '参数名', description: '例如：材质' }),
						value: fields.text({ label: '参数值', description: '例如：304 不锈钢' }),
					}),
					{
						label: '规格参数',
						itemLabel: (props) => props.fields.label.value || '参数',
					},
				),
				features: fields.array(fields.text({ label: '卖点' }), {
					label: '核心卖点',
					itemLabel: (props) => props.value || '卖点',
				}),
				sortOrder: fields.number({ label: '排序（数字越小越靠前）', defaultValue: 0 }),
				draft: fields.checkbox({ label: '草稿', description: '勾选后不发布', defaultValue: false }),
				content: fields.mdx({
					label: '详情正文',
					options: {
						heading: { levels: [2, 3] },
					},
				}),
			},
		}),
		cases: collection({
			label: '案例/项目',
			path: 'src/content/cases/*',
			slugField: 'slug',
			format: { contentField: 'content' },
			columns: ['title', 'category', 'date', 'draft'],
			schema: {
				slug: fields.slug({
					name: {
						label: 'Slug（文件名/URL）',
						description: '英文小写，例如 factory-security-booth。创建后不建议修改。',
					},
				}),
				title: fields.text({ label: '项目名称', validation: { isRequired: true } }),
				category: fields.select({
					label: '项目分类',
					options: [
						{ label: '岗亭项目', value: '岗亭项目' },
						{ label: '民宿项目', value: '民宿项目' },
					],
					defaultValue: '岗亭项目',
				}),
				client: fields.text({ label: '客户（可选）' }),
				location: fields.text({ label: '项目地点（可选）' }),
				date: fields.date({ label: '完成日期', validation: { isRequired: true } }),
				summary: fields.text({
					label: '摘要',
					multiline: true,
					validation: { isRequired: true },
				}),
				draft: fields.checkbox({ label: '草稿', defaultValue: false }),
				content: fields.mdx({
					label: '项目详情',
					options: {
						heading: { levels: [2, 3] },
					},
				}),
			},
		}),
		news: collection({
			label: '新闻动态',
			path: 'src/content/news/*',
			slugField: 'slug',
			format: { contentField: 'content' },
			columns: ['title', 'pubDate', 'category', 'draft'],
			schema: {
				slug: fields.slug({
					name: {
						label: 'Slug（文件名/URL）',
						description: '英文小写，例如 company-news-202610。创建后不建议修改。',
					},
				}),
				title: fields.text({ label: '标题', validation: { isRequired: true } }),
				pubDate: fields.date({ label: '发布日期', validation: { isRequired: true } }),
				category: fields.text({ label: '分类', description: '如：公司新闻 / 行业资讯', defaultValue: '公司新闻' }),
				summary: fields.text({
					label: '摘要',
					description: '列表页摘要与 SEO description',
					multiline: true,
					validation: { isRequired: true },
				}),
				draft: fields.checkbox({ label: '草稿', defaultValue: false }),
				content: fields.mdx({
					label: '正文',
					options: {
						heading: { levels: [2, 3] },
					},
				}),
			},
		}),
		about: collection({
			label: '关于我们',
			path: 'src/content/about/*',
			slugField: 'slug',
			format: { contentField: 'content' },
			columns: ['title'],
			schema: {
				slug: fields.slug({
					name: {
						label: 'Slug（文件名/URL）',
						description: '英文小写，例如 about。',
					},
				}),
				title: fields.text({ label: '标题', validation: { isRequired: true } }),
				content: fields.mdx({
					label: '内容',
					options: {
						heading: { levels: [2, 3] },
					},
				}),
			},
		}),
	},
});
