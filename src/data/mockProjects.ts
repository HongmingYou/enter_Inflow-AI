import { ProjectData } from '@/types/project';

export const MOCK_PROJECTS: ProjectData[] = [
  {
    id: 'proj-001',
    name: 'Q3 Competitor Analysis',
    type: 'deck',
    sourcesCount: 8,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    status: 'published',
    description: 'Comprehensive analysis of top 3 competitors in Q3 2024',
  },
  {
    id: 'proj-002',
    name: 'Pricing Strategy Review',
    type: 'deck',
    sourcesCount: 5,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    status: 'draft',
    description: 'Strategic pricing recommendations based on market research',
  },
  {
    id: 'proj-003',
    name: 'Technical Architecture Notes',
    type: 'note',
    sourcesCount: 12,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    status: 'draft',
    description: 'System architecture decisions and trade-offs',
  },
  {
    id: 'proj-004',
    name: 'Customer Feedback Summary',
    type: 'note',
    sourcesCount: 24,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    status: 'published',
    description: 'Key insights from Q3 customer interviews',
  },
  {
    id: 'proj-005',
    name: 'Product Roadmap 2025',
    type: 'mindmap',
    sourcesCount: 6,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
    status: 'draft',
    description: 'Strategic product planning for next year',
  },
  {
    id: 'proj-006',
    name: 'Sales Deck - Enterprise',
    type: 'deck',
    sourcesCount: 4,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 1 week ago
    status: 'published',
    description: 'Enterprise sales pitch presentation',
  },
];

