// All content is taken from dtirapid.ph (landing page and article pages).
// Figures are project-wide across all 7 regions, as published on the source site.

// Photos for the News and events cards (Region 10 / RCU X items)
import img158 from '../assets/news/158.jpg';
import img153 from '../assets/news/153.jpg';
import img156 from '../assets/news/156.jpg';
import img157 from '../assets/news/157.jpg';
import img152 from '../assets/news/152.jpg';
import img155 from '../assets/news/155.jpg';
import img150 from '../assets/news/150.jpg';
import img148 from '../assets/news/148.jpg';
import img141 from '../assets/news/141.jpg';
import img134 from '../assets/news/134.jpg';
import img131 from '../assets/news/131.jpg';
import img82 from '../assets/news/82.jpg';
import img149 from '../assets/news/149.jpg';

export const SOURCE = 'https://dtirapid.ph';
export const link = (path: string) => `${SOURCE}${path}`;

export const about = {
	name: 'Rural Agro-enterprise Partnership for Inclusive Development and Growth',
	paragraphs: [
		'The Rural Agro-enterprise Partnership for Inclusive Development and Growth (RAPID Growth) Project is a flagship initiative of the Department of Trade and Industry (DTI) funded by the International Fund for Agricultural Development (IFAD) that aims to strengthen agro-enterprise development in rural communities across the Philippines.',
		'Through strategic investments, capacity building, and inclusive partnerships, the project supports sustainable enterprise growth and increased economic opportunities in rural communities.',
	],
	learnMore: link('/webrep_v2/whoweare'),
};

export const stats = {
	asOf: '30 September 2026',
	farmers: 84711,
	farmerOrgs: 876,
	msmes: 1049,
	regions: 7,
	provinces: 21,
	investments: 431491398,
	roads: 19,
	roadKm: 36.87,
	women: 41684,
	youth: 15138,
	ip: 15208,
	dashboard: link('/webrep_v2/dashboard'),
};

export const components = [
	{
		name: 'RAPID Growth Network',
		body: 'Links farmer organizations and agri-based MSMEs so they can grow as enterprises together.',
		figure: `${stats.farmerOrgs.toLocaleString('en-US')} farmer organizations and ${stats.msmes.toLocaleString('en-US')} MSMEs`,
		href: link('/webrep_v2/what_we_do#network'),
	},
	{
		name: 'Value Chain Development',
		body: 'Builds up the commodities rural communities depend on, from planting to market.',
		figure: 'Coffee, cacao and coconut in Northern Mindanao',
		href: link('/webrep_v2/what_we_do#network'),
	},
	{
		name: 'Rural Infrastructure',
		body: 'Farm-to-market roads that connect producers to buyers.',
		figure: `${stats.roads} roads covering ${stats.roadKm} km`,
		href: link('/webrep_v2/what_we_do#network'),
	},
];

// Map coordinates are approximate town centres, used only to place pins.
export const places = [
	{
		name: 'Naawan',
		province: 'Misamis Oriental',
		lat: 8.43,
		lon: 124.29,
		focus: 'Cacao tree planting and stakeholders’ meeting',
		article: 142,
	},
	{
		name: 'Lantapan',
		province: 'Bukidnon',
		lat: 8.0,
		lon: 124.98,
		focus: 'IFAD project demonstration visit',
		article: 147,
	},
	{
		name: 'Kadingilan',
		province: 'Bukidnon',
		lat: 7.6,
		lon: 124.91,
		focus: 'Coconut shell charcoal enterprise',
		article: 146,
	},
];

export const commodities = ['Coffee', 'Cacao', 'Coconut'];

// The featured stories (museum wall) live in src/content/stories/ as Markdown files.

// News and events from Region 10 (RCU X on dtirapid.ph), newest first.
// Items already on the museum wall are left out so nothing repeats.
export const updates: {
	id: number;
	type: 'News' | 'Event';
	date: string; // ISO yyyy-mm-dd, as published on dtirapid.ph
	title: string;
	summary: string;
	image: ImageMetadata;
	href: string;
}[] = [
	{
		id: 158,
		type: 'Event',
		date: '2026-09-30',
		title: 'Joint Pre-Final Inspection for Farm-to-Market Infrastructure in Pangantucan, Bukidnon',
		summary: 'DTI-RAPID Growth, LGU Pangantucan and DILG-10 inspected the road project to validate progress and address implementation issues.',
		image: img158,
	},
	{
		id: 153,
		type: 'News',
		date: '2026-09-23',
		title: 'From Harvest to High-Quality Beans: Empowering Bukidnon’s Cacao Farmers!',
		summary: 'Batches 3 and 4 of the cacao harvesting, post-harvest processing and fermentation training in Malaybalay City.',
		image: img153,
	},
	{
		id: 156,
		type: 'News',
		date: '2026-09-20',
		title: 'DTI-RAPID Growth and CFIDP Partner in ASEAN Innovation Summit & Davao Agri Trade Expo 2026',
		summary: 'Assisted farmer organizations and MSMEs showcased their products and built market linkages.',
		image: img156,
	},
	{
		id: 157,
		type: 'Event',
		date: '2026-09-04',
		title: 'IFAD Data-Gathering Mission Highlights BMMPC’s Coffee Value Chain Success',
		summary: 'IFAD documented experiences and replicable practices in the coffee value chain at Bayanihan Millennium Multipurpose Cooperative.',
		image: img157,
	},
	{
		id: 152,
		type: 'Event',
		date: '2026-09-03',
		title: 'DTI Bukidnon’s RAPID Project equips 78 Coconut Farmers with Regenerative Farming Tools and Skills',
		summary: 'Training on regenerative agriculture and GAP, with 78 tool sets distributed to coconut farmers.',
		image: img152,
	},
	{
		id: 155,
		type: 'News',
		date: '2026-08-31',
		title: 'DTI-RAPID Growth Bukidnon Joins Kahimunan Regional Trade Fair 2026',
		summary: 'Assisted farmer organizations showcased local products, generated sales and strengthened market linkages.',
		image: img155,
	},
	{
		id: 150,
		type: 'News',
		date: '2026-08-24',
		title: 'Cacao Post-Planting Validation – PHIMFACO',
		summary: 'Farmer interviews and geotagging of 6 hectares under the cacao expansion initiative.',
		image: img150,
	},
	{
		id: 148,
		type: 'News',
		date: '2026-08-18',
		title: 'Strengthening Cooperatives, Building Stronger Value Chains',
		summary: 'A three-day RAPID Growth–CDA training for 11 cooperatives and 25 cooperative leaders across coffee, cacao and coconut.',
		image: img148,
	},
	{
		id: 141,
		type: 'Event',
		date: '2026-07-27',
		title: 'RAPID Growth Project Conducts SECAP Hands-on Training for Farmers in Claveria, Misamis Oriental',
		summary: 'Hands-on training on sustainable practices that restore soil health, held 7–23 July 2026.',
		image: img141,
	},
	{
		id: 134,
		type: 'News',
		date: '2026-07-09',
		title: 'DTI-CMU Strengthen Partnership to Sustain Gains of RAPID Growth Project',
		summary: 'DTI Bukidnon and CMU-CBM partner to strengthen the capacity and sustainability of farmer organizations.',
		image: img134,
	},
	{
		id: 131,
		type: 'Event',
		date: '2026-07-09',
		title: 'Claveria Coffee Farmers Strengthened Through SECAP Training on Farm Innovation',
		summary: 'Organic coffee farmers learned soil regeneration, bio-composting and climate-resilient farm practices.',
		image: img131,
	},
	{
		id: 82,
		type: 'Event',
		date: '2026-02-23',
		title: 'IFAD Associate Vice President Visits DTI RAPID Growth Project in Bukidnon to Strengthen Agro-Enterprise Partnerships',
		summary: 'IFAD Associate Vice President Donal Brown visited project sites in the Province of Bukidnon.',
		image: img82,
	},
	{
		id: 149,
		type: 'News',
		date: '2025-08-28',
		title: 'Boosting Bukidnon’s Cacao Industry through Quality Post-Harvest Practices!',
		summary: '60 cacao farmers from Kibawe and San Fernando trained on harvesting, fermentation and drying.',
		image: img149,
	},
].map((n) => ({ ...n, href: link(`/webrep_v2/article/${n.id}`) }));

export const regionNews = link('/webrep_v2/news_and_updates?search=&region=rcu%20x&year=');

export const contact = {
	address: '2/F, Mintrade Bldg., Monteverde St. corner Sales St., Davao City, Philippines 8000',
	links: [
		{ label: 'About the project', href: link('/webrep_v2/whoweare') },
		{ label: 'Where we work', href: link('/webrep_v2/whoweare#wherewework') },
		{ label: 'News and updates', href: link('/webrep_v2/news_and_updates') },
		{ label: 'Stories', href: link('/webrep_v2/stories') },
		{ label: 'Project updates and reports', href: link('/webrep_v2/knowledge_and_data') },
		{ label: 'Transparency and good governance', href: link('/webrep_v2/whoweare#transparency') },
	],
	dti: 'https://www.dti.gov.ph/',
	ifad: 'https://www.ifad.org/en/',
};
