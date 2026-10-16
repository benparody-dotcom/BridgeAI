import { ProjectItem } from '../types';

export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-01',
    title: 'Monthly Sales & Margin Analysis',
    category: 'Spreadsheets & Reporting',
    description: 'Calculate unit revenue, profit margins, and monthly growth trends using Excel PivotTables and charts.',
    lastUpdated: 'Today at 09:15',
    status: 'In Progress',
    guidanceLevel: 'guided',
    datasetRowsCount: 12,
  },
  {
    id: 'proj-02',
    title: 'Customer Feedback Sentiment Triage',
    category: 'AI Automation',
    description: 'Categorise incoming support emails into Priority 1 (Urgent), Billing, and General feedback with plain English summaries.',
    lastUpdated: 'Yesterday',
    status: 'Completed',
    guidanceLevel: 'flexible',
    datasetRowsCount: 45,
  },
  {
    id: 'proj-03',
    title: 'Inventory Low-Stock Alert System',
    category: 'Workflow Automation',
    description: 'Highlight warehouse items below minimum threshold and draft a supplier reorder email for manager approval.',
    lastUpdated: '3 days ago',
    status: 'Draft',
    guidanceLevel: 'guided',
    datasetRowsCount: 28,
  },
];
