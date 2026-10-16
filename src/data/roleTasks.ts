export interface RoleTaskSuggestion {
  shortTitle: string;
  description: string;
  category: string;
  estimatedTime: string;
}

export interface WorkplaceTip {
  id: string;
  category: 'Marketing' | 'Sales' | 'Operations' | 'Organisation' | 'General';
  title: string;
  tip: string;
  promptToTry: string;
}

export const ROLE_TASK_SUGGESTIONS: Record<string, RoleTaskSuggestion[]> = {
  Marketing: [
    {
      shortTitle: 'Summarise campaign results',
      description: 'Help me summarise monthly campaign click rates and sales conversions into key takeaways.',
      category: 'Marketing',
      estimatedTime: '5 min walkthrough',
    },
    {
      shortTitle: 'Plan a month of social posts',
      description: 'Help me plan a structured calendar of social media posts and topics for the coming month.',
      category: 'Marketing',
      estimatedTime: '4 min prompt',
    },
    {
      shortTitle: 'Group customer comments by theme',
      description: 'Group customer feedback and reviews into praise, bug reports, and requested features.',
      category: 'Marketing',
      estimatedTime: '3 min walkthrough',
    },
    {
      shortTitle: 'Draft product launch announcement',
      description: 'Draft a friendly, compelling product launch email highlighting top 3 customer benefits without hype.',
      category: 'Marketing',
      estimatedTime: '4 min prompt',
    },
  ],
  Sales: [
    {
      shortTitle: 'Excel sales reporting & trends',
      description: 'I have an Excel file containing monthly sales. Help me calculate revenue, identify trends and create a dashboard.',
      category: 'Sales',
      estimatedTime: '5 min walkthrough',
    },
    {
      shortTitle: 'Draft personalised client proposal',
      description: 'Draft a clear, professional client follow-up email confirming our proposal scope, pricing, and next steps.',
      category: 'Sales',
      estimatedTime: '4 min prompt',
    },
    {
      shortTitle: 'Calculate commission & pipeline',
      description: 'Help me calculate team sales commissions and monthly quota progress in a spreadsheet without formula errors.',
      category: 'Sales',
      estimatedTime: '5 min walkthrough',
    },
    {
      shortTitle: 'Score inbound leads by urgency',
      description: 'Help me categorise new inbound customer leads by company size, project urgency, and estimated budget.',
      category: 'Sales',
      estimatedTime: '3 min prompt',
    },
  ],
  Operations: [
    {
      shortTitle: 'Track late deliveries',
      description: 'Help me calculate delivery delays in a spreadsheet and highlight orders exceeding our target.',
      category: 'Operations',
      estimatedTime: '5 min walkthrough',
    },
    {
      shortTitle: 'Make a weekly rota',
      description: 'Help me build a balanced weekly staff shift rota table and avoid accidental double-booking.',
      category: 'Operations',
      estimatedTime: '4 min walkthrough',
    },
    {
      shortTitle: 'Spot low stock',
      description: 'Help me write an Excel formula or rule to highlight warehouse items below minimum threshold.',
      category: 'Operations',
      estimatedTime: '3 min prompt',
    },
    {
      shortTitle: 'Daily shift handover checklist',
      description: 'Create a clear, structured template for morning-to-evening shift handovers to prevent dropped tasks.',
      category: 'Operations',
      estimatedTime: '4 min checklist',
    },
  ],
  Organisation: [
    {
      shortTitle: 'Turn meeting notes into actions',
      description: 'Turn scattered meeting bullet points into a clean action list with assigned owners and deadlines.',
      category: 'Organisation',
      estimatedTime: '3 min prompt',
    },
    {
      shortTitle: 'Tidy contact list & remove duplicates',
      description: 'Help me clean a spreadsheet of customer contacts, remove duplicates, and standardise job titles.',
      category: 'Organisation',
      estimatedTime: '4 min walkthrough',
    },
    {
      shortTitle: 'Draft weekly executive update',
      description: 'Draft a 1-page weekly executive update summarising key achievements, blockers, and next week priorities.',
      category: 'Organisation',
      estimatedTime: '4 min prompt',
    },
    {
      shortTitle: 'Standardise shared folder filing',
      description: 'Create a simple folder structure and file naming convention to keep our team Drive organised.',
      category: 'Organisation',
      estimatedTime: '3 min guide',
    },
  ],
  HR: [
    {
      shortTitle: 'Tidy a staff list',
      description: 'Help me clean and organise an Excel staff list, remove duplicates and standardise job titles.',
      category: 'HR',
      estimatedTime: '4 min walkthrough',
    },
    {
      shortTitle: 'Draft a job advert',
      description: 'Help me draft a clear, welcoming job advert for our team without corporate jargon.',
      category: 'HR',
      estimatedTime: '3 min prompt',
    },
    {
      shortTitle: 'Summarise survey feedback',
      description: 'Summarise employee survey comments into key workplace themes and actionable priorities.',
      category: 'HR',
      estimatedTime: '5 min walkthrough',
    },
  ],
  'Customer Support': [
    {
      shortTitle: 'Group common complaints',
      description: 'Categorise weekly support tickets into common root causes, billing queries, and product issues.',
      category: 'Customer Support',
      estimatedTime: '4 min walkthrough',
    },
    {
      shortTitle: 'Write reply templates',
      description: 'Draft empathetic, clear email reply templates for our team’s top 3 most common customer issues.',
      category: 'Customer Support',
      estimatedTime: '3 min prompt',
    },
    {
      shortTitle: 'Find the busiest days',
      description: 'Help me analyze which weekdays and hours receive the highest incoming support volume.',
      category: 'Customer Support',
      estimatedTime: '5 min walkthrough',
    },
  ],
  Education: [
    {
      shortTitle: 'Summarise attendance',
      description: 'Help me calculate weekly student attendance percentages and highlight students needing check-ins.',
      category: 'Education',
      estimatedTime: '4 min walkthrough',
    },
    {
      shortTitle: 'Write a short newsletter',
      description: 'Draft a friendly, accessible weekly newsletter summarizing key achievements and upcoming dates.',
      category: 'Education',
      estimatedTime: '3 min prompt',
    },
    {
      shortTitle: 'Plan a lesson checklist',
      description: 'Create an accessible, step-by-step preparation checklist for next week’s teaching unit.',
      category: 'Education',
      estimatedTime: '3 min checklist',
    },
  ],
  Other: [
    {
      shortTitle: 'Excel sales reporting & trends',
      description: 'I have an Excel file containing monthly sales. Help me calculate revenue, identify trends and create a dashboard.',
      category: 'Sales',
      estimatedTime: '5 min walkthrough',
    },
    {
      shortTitle: 'Turn meeting notes into actions',
      description: 'Turn scattered meeting bullet points into a clean action list with assigned owners and deadlines.',
      category: 'Organisation',
      estimatedTime: '3 min prompt',
    },
    {
      shortTitle: 'Summarise campaign results',
      description: 'Help me summarise monthly campaign click rates and sales conversions into key takeaways.',
      category: 'Marketing',
      estimatedTime: '5 min walkthrough',
    },
    {
      shortTitle: 'Track late deliveries',
      description: 'Help me calculate delivery delays in a spreadsheet and highlight orders exceeding our target.',
      category: 'Operations',
      estimatedTime: '5 min walkthrough',
    },
  ],
};

export const WORKPLACE_DAY_TO_DAY_TIPS: WorkplaceTip[] = [
  {
    id: 'tip-mkt-1',
    category: 'Marketing',
    title: 'Tone Matching from Real Customers',
    tip: 'Paste 3 real quotes or reviews from your audience before asking for post copy. AI will replicate their natural vocabulary instead of generic corporate adjectives.',
    promptToTry: 'Here are 3 real customer comments about our service: "[paste quotes]". Write 3 punchy social posts that directly speak to their pain points.',
  },
  {
    id: 'tip-mkt-2',
    category: 'Marketing',
    title: 'One-Paragraph Campaign Debrief',
    tip: 'Provide 3 raw figures (impressions, clicks, conversions) and ask for "1 major win, 1 bottleneck, and 2 concrete test ideas for next week".',
    promptToTry: 'Our newsletter had 4,500 opens and 312 clicks, but only 8 bookings. Break this down into 1 key win, 1 bottleneck, and 2 quick tests to improve conversions.',
  },
  {
    id: 'tip-sales-1',
    category: 'Sales',
    title: 'Instant Post-Call Recap Email',
    tip: 'Do not spend 20 minutes drafting follow-up emails. Dictate rough bullet points and ask AI to format a polite, professional recap with next steps highlighted.',
    promptToTry: 'Turn these quick notes from a call with a prospective client into a crisp follow-up email confirming deliverables, pricing, and next Wednesday’s check-in: [paste notes].',
  },
  {
    id: 'tip-sales-2',
    category: 'Sales',
    title: 'Defuse Pricing Hesitations',
    tip: 'Ask AI to reframe cost discussions around time saved, error reduction, or team peace of mind rather than discounting your rates.',
    promptToTry: 'A prospect says our fee is slightly above their current budget. Help me draft 2 friendly responses highlighting the hours of manual work our solution eliminates.',
  },
  {
    id: 'tip-ops-1',
    category: 'Operations',
    title: 'Proactive Delivery & Deadline Flags',
    tip: 'Use simple Excel conditional rules or formulas to tag orders 48 hours before they breach delivery targets so you solve issues early.',
    promptToTry: 'Show me the exact Excel formula to mark an order as "Urgent Review" if the promised delivery date is within 2 days of today.',
  },
  {
    id: 'tip-ops-2',
    category: 'Operations',
    title: 'Turn Tribal Knowledge into SOP Checklists',
    tip: 'Describe routine operational tasks in plain English, and have AI organise them into a bulleted Standard Operating Procedure with verification checkpoints.',
    promptToTry: 'I want to document how our team receives and inspects new inventory each morning. Turn these rough steps into a clear 5-step SOP checklist.',
  },
  {
    id: 'tip-org-1',
    category: 'Organisation',
    title: 'Action Item Extraction Table',
    tip: 'Never let tasks get lost in messy meeting minutes. Ask AI to extract a 3-column table: Decision / Owner / Due Date.',
    promptToTry: 'Extract all action items from these team meeting notes into a clean table with columns: Task, Who is Responsible, and Deadline.',
  },
  {
    id: 'tip-org-2',
    category: 'Organisation',
    title: 'Chronological File Naming System',
    tip: 'Always start document filenames with YYYY-MM-DD (e.g. 2026-10-16_SalesProposal_v2). Your folders will sort chronologically automatically.',
    promptToTry: 'Suggest an easy, consistent folder hierarchy and file naming convention for our 5-person team to keep shared documents tidy.',
  },
];

export const EXCEL_SALES_DEMO_TASK: RoleTaskSuggestion = {
  shortTitle: 'Excel sales reporting demo',
  description: 'I have an Excel file containing monthly sales. Help me calculate revenue, identify trends and create a dashboard.',
  category: 'Sales',
  estimatedTime: '5 min walkthrough',
};

export function getTaskSuggestionsForRole(role?: string): RoleTaskSuggestion[] {
  if (role && ROLE_TASK_SUGGESTIONS[role]) {
    return ROLE_TASK_SUGGESTIONS[role];
  }
  return ROLE_TASK_SUGGESTIONS.Other;
}
