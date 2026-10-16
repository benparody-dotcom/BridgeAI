import { LearningModule } from '../types';

export const CURRICULUM_MODULES: LearningModule[] = [
  {
    id: 'prompt-engineering',
    title: 'Writing better prompts',
    category: 'AI Skills',
    level: 'Beginner',
    estimatedMinutes: 10,
    workplaceScenario: 'You want AI to draft professional client summaries, extract invoice data, and write Excel formulas without hallucinating.',
    coreConcepts: [
      'The 4-part prompt formula: Role + Context + Task + Constraints/Format',
      'Few-shot examples: Showing the AI 1 good example yields 10x better results',
      'Tone and safety: Asking AI to flag assumptions rather than guessing',
      'Verification discipline: Always checking AI calculations with sample checks'
    ],
    stepByStepGuide: [
      {
        step: '1. Assign a clear Role',
        plainEnglish: '"Act as an experienced financial analyst and Excel specialist."',
        exampleFormulaOrAction: 'Specify who the AI should think like.'
      },
      {
        step: '2. Provide Context & Task',
        plainEnglish: '"I have a monthly sales table with columns Month, Revenue, and Cost. I need the formula for Profit Margin %."',
        exampleFormulaOrAction: 'Clear columns and goal.'
      },
      {
        step: '3. Constrain the output',
        plainEnglish: '"Give the formula in plain text, explain it in 2 simple sentences, and give a 1-line example."',
        exampleFormulaOrAction: 'Specify concise structure to avoid rambling text.'
      }
    ],
    quickCheckQuestion: {
      question: 'What is the most reliable way to prevent AI from giving vague or rambling answers in workplace tasks?',
      options: [
        'Specify the exact output format, constraints, and length upfront',
        'Write in all capital letters',
        'Ask the question 20 times in a row',
        'Never tell the AI what you want'
      ],
      correctIndex: 0,
      explanation: 'Setting constraints (such as "give 3 bullet points, under 50 words each") produces actionable, trustworthy responses.'
    },
    keyTakeaway: 'Prompting is not magic; it is clear communication with explicit instructions, constraints, and verification.'
  },
  {
    id: 'workflow-automation',
    title: 'Automating everyday tasks',
    category: 'AI Skills',
    level: 'Intermediate',
    estimatedMinutes: 14,
    workplaceScenario: 'Connect forms, Google Sheets, Slack, and email so incoming client requests are triaged and logged without manual copying.',
    coreConcepts: [
      'Triggers and Actions: When X happens (trigger), do Y (action)',
      'Tools like Zapier, Make, and Power Automate',
      'Human-in-the-loop: Requiring human approval before sending external emails',
      'Error handling and fallback alerts when a connection fails'
    ],
    stepByStepGuide: [
      {
        step: '1. Define the Trigger',
        plainEnglish: 'When a customer fills out a feedback form on your website.'
      },
      {
        step: '2. Add AI Triage Action',
        plainEnglish: 'AI categorises sentiment as "Urgent Support" or "General Inquiry" and drafts a reply.'
      },
      {
        step: '3. Require Confirmation before Sending',
        plainEnglish: 'Post draft to your team channel with an "Approve and Send" button so humans stay in control.'
      }
    ],
    quickCheckQuestion: {
      question: 'Why is a "Human-in-the-loop" approval step recommended when automating customer-facing workflows with AI?',
      options: [
        'It prevents mistakes or misinterpretations from reaching customers without human review',
        'It slows down your computer on purpose',
        'It prevents the internet from running out of electricity',
        'It deletes your database automatically'
      ],
      correctIndex: 0,
      explanation: 'Human-in-the-loop safeguards trust, ensuring accuracy and brand safety before emails or financial actions take effect.'
    },
    keyTakeaway: 'Effective workplace automation combines AI speed with human oversight and judgment.'
  },
  {
    id: 'excel-fundamentals',
    title: 'Excel (Optional) — Understand your numbers',
    category: 'Spreadsheets',
    level: 'Beginner',
    estimatedMinutes: 10,
    workplaceScenario: 'You are handed an unorganised spreadsheet of client orders and need to organise it into a clean table you can trust.',
    coreConcepts: [
      'Cells, Rows, Columns and Addresses (A1, B2)',
      'Data types: Text vs Numbers vs Dates (avoiding formatting pitfalls)',
      'Converting loose cells into an Official Excel Table (Ctrl + T)',
      'Basic sorting and filtering to find specific records quickly'
    ],
    stepByStepGuide: [
      {
        step: '1. Highlight your data range',
        plainEnglish: 'Click inside any cell with data, then press Ctrl+A (Command+A on Mac) to select the whole table.'
      },
      {
        step: '2. Convert to an Official Table',
        plainEnglish: 'Press Ctrl+T. Check "My table has headers" and press Enter. This unlocks automatic row shading and dynamic formulas.'
      },
      {
        step: '3. Filter by department or date',
        plainEnglish: 'Click the dropdown arrow in any header column to select only the rows you want to see.'
      }
    ],
    quickCheckQuestion: {
      question: 'Why is converting loose data into an Official Excel Table (Ctrl+T) so helpful in workplace tasks?',
      options: [
        'It automatically extends formulas down to new rows and gives clean filter menus',
        'It turns your spreadsheet into a video game',
        'It automatically sends emails to your manager without asking',
        'It permanently locks all cells so nobody can edit them'
      ],
      correctIndex: 0,
      explanation: 'Official Excel Tables auto-expand formulas, format alternating rows for readability, and simplify PivotTable creation.'
    },
    keyTakeaway: 'Formatting your raw data as a clean Table is the single best foundation for error-free workplace reporting.'
  },
  {
    id: 'formulas-pivots-powerquery',
    title: 'Excel Formulas & Pivots (Optional) — Summarise and connect data',
    category: 'Spreadsheets',
    level: 'Intermediate',
    estimatedMinutes: 14,
    workplaceScenario: 'You receive three monthly sales files that you must merge, clean, and summarise into total sales by region.',
    coreConcepts: [
      'Essential formulas: SUM, AVERAGE, COUNTIF, and XLOOKUP',
      'The modern lookup: Why XLOOKUP replaces older VLOOKUP',
      'PivotTables: Summarising 10,000 rows in 3 clicks without typing formulas',
      'Power Query: The secret weapon for automating data cleanup forever'
    ],
    stepByStepGuide: [
      {
        step: '1. Master XLOOKUP',
        plainEnglish: 'Find a matching price or customer name from another list without counting columns.',
        exampleFormulaOrAction: '=XLOOKUP(A2, ProductList!A:A, ProductList!B:B, "Not Found")'
      },
      {
        step: '2. Create a PivotTable',
        plainEnglish: 'Go to Insert > PivotTable. Drag "Region" to Rows, and "Revenue" to Values. Excel does the math instantly.',
        exampleFormulaOrAction: 'Values area automatically applies SUM.'
      },
      {
        step: '3. Refresh when new data arrives',
        plainEnglish: 'When next month’s data is pasted in, simply right-click the PivotTable and click Refresh.',
        exampleFormulaOrAction: 'Right click > Refresh.'
      }
    ],
    quickCheckQuestion: {
      question: 'What is the main advantage of XLOOKUP over the older VLOOKUP?',
      options: [
        'It can search left or right, does not break if columns move, and provides a default if not found',
        'It only works on Fridays',
        'It replaces every number with zero',
        'It requires you to write 50 lines of code'
      ],
      correctIndex: 0,
      explanation: 'XLOOKUP is safer, more flexible, and handles missing values gracefully without confusing error messages.'
    },
    keyTakeaway: 'PivotTables let you answer business questions in seconds without writing fragile multi-step manual calculations.'
  },
  {
    id: 'dataviz-dashboards',
    title: 'Dashboard Design (Optional) — Turn numbers into clear visuals',
    category: 'Design & Visualisation',
    level: 'Beginner',
    estimatedMinutes: 12,
    workplaceScenario: 'Your leadership team wants a 1-page executive dashboard that communicates performance at a glance without clutter.',
    coreConcepts: [
      'Visual hierarchy: Lead with top-line KPIs, follow with comparisons',
      'Color discipline: Use color to highlight significance, not decoration',
      'Chart selection: Trends over time (Line), parts of a whole (Treemap or stacked bar), comparisons (Bar)',
      'Designing for accessibility: high contrast, readable labels, no reliance on green/red alone'
    ],
    stepByStepGuide: [
      {
        step: '1. Place 3 to 4 Key Metric Cards at the Top',
        plainEnglish: 'Display the big numbers stakeholders care about: Total Sales, Active Clients, Growth %.'
      },
      {
        step: '2. Use Tabular Figures',
        plainEnglish: 'Ensure numbers line up vertically so currency and percentages are effortless to scan.'
      },
      {
        step: '3. Add an Interactive Slicer (Filter Button)',
        plainEnglish: 'Add a Slicer for Month or Territory so viewers can click and explore without breaking the sheet.'
      }
    ],
    quickCheckQuestion: {
      question: 'When designing a dashboard for a workplace audience, what is the best practice for color usage?',
      options: [
        'Use color intentionally to draw eyes to key metrics and alerts, keeping backgrounds neutral',
        'Use rainbow gradients on every chart to make it look colorful',
        'Rely entirely on red and green without any labels',
        'Make the font size 8px so everything fits on one screen'
      ],
      correctIndex: 0,
      explanation: 'Neutral canvases with purposeful accent colors prevent visual overwhelm and keep attention focused on critical trends.'
    },
    keyTakeaway: 'A great dashboard answers a business question in 5 seconds. If it requires a manual to read, simplify it.'
  },
  {
    id: 'powerbi-mastery',
    title: 'Power BI (Optional) — Build reports that update themselves',
    category: 'BI Platforms',
    level: 'Intermediate',
    estimatedMinutes: 15,
    workplaceScenario: 'Build an automated monthly report that refreshes directly from company cloud storage and publishes to Microsoft Teams.',
    coreConcepts: [
      'Power BI Desktop vs Power BI Service',
      'Star Schema data modeling: Fact tables (Transactions) vs Dimension tables (Customers, Dates)',
      'Introduction to DAX (Data Analysis Expressions): Total Sales = SUM(Sales[Amount])',
      'Sharing interactive reports securely within your organisation'
    ],
    stepByStepGuide: [
      {
        step: '1. Get Data',
        plainEnglish: 'Connect Power BI to your Excel workbook, SQL database, or SharePoint folder.'
      },
      {
        step: '2. Build a Quick Measure',
        plainEnglish: 'Right-click your Sales column, select New Quick Measure, and choose Year-over-Year Change.'
      },
      {
        step: '3. Publish to Service',
        plainEnglish: 'Click Publish on the Home tab to share with your teammates in their web browser.'
      }
    ],
    quickCheckQuestion: {
      question: 'What is the main role of DAX in Power BI?',
      options: [
        'Creating custom business calculations and metrics across related tables',
        'Drawing 3D cartoon characters',
        'Replacing your operating system',
        'Sending unsolicited calendar invites'
      ],
      correctIndex: 0,
      explanation: 'DAX (Data Analysis Expressions) is the formula language used in Power BI to calculate custom metrics like Year-to-Date or Margin %.'
    },
    keyTakeaway: 'Power BI bridges everyday spreadsheets to enterprise-grade automated reporting with scheduled cloud refreshes.'
  },
  {
    id: 'tableau-looker-comparison',
    title: 'Tableau & Looker (Optional) — Explore trends and track metrics',
    category: 'BI Platforms',
    level: 'Intermediate',
    estimatedMinutes: 12,
    workplaceScenario: 'Understand why tech companies choose Tableau for deep exploratory charts or Looker for strict single-source-of-truth metrics.',
    coreConcepts: [
      'Tableau: Shelves (Columns, Rows, Marks card, Color, Size)',
      'Looker: LookML data definitions guaranteeing everyone uses the exact same definition of "Active Customer"',
      'When to recommend Tableau vs Looker to a workplace team',
      'Translating skills between platforms with confidence'
    ],
    stepByStepGuide: [
      {
        step: '1. In Tableau: Drag Dimensions to Columns, Measures to Rows',
        plainEnglish: 'Tableau immediately generates the optimal chart type (Show Me).'
      },
      {
        step: '2. In Looker: Select Explores',
        plainEnglish: 'Pick an Explore created by your data engineering team, check the fields you want, and click Run.'
      },
      {
        step: '3. Cross-apply your skills',
        plainEnglish: 'Notice that both tools require clean columns, clear time dimensions, and distinct aggregations (SUM/AVG).'
      }
    ],
    quickCheckQuestion: {
      question: 'What is Looker’s signature feature that ensures consistent metric definitions across a whole company?',
      options: [
        'LookML, a centralized modeling language where metrics are defined once in code',
        'An automatic spellchecker for PowerPoint',
        'A mandatory daily 3-hour video conference',
        'A tool that converts all numbers into roman numerals'
      ],
      correctIndex: 0,
      explanation: 'LookML defines metrics in a single repository so marketing and finance always get the same number for Revenue or Churn.'
    },
    keyTakeaway: 'Tableau excels at creative exploratory analytics; Looker excels at centralised, governed cloud metrics.'
  },
  {
    id: 'sql-for-beginners',
    title: 'SQL (Optional) — Ask databases for answers directly',
    category: 'Databases & Code',
    level: 'Beginner',
    estimatedMinutes: 12,
    workplaceScenario: 'You need to pull all customers who purchased in the last 30 days directly from the company database instead of waiting for IT.',
    coreConcepts: [
      'What a relational database actually is (tables of rows linked by IDs)',
      'The Big 4 clauses: SELECT (what columns), FROM (which table), WHERE (what filters), ORDER BY (how to sort)',
      'Grouping data with GROUP BY and counting records with COUNT()',
      'Using AI to translate plain-English requests into safe SQL queries'
    ],
    stepByStepGuide: [
      {
        step: '1. Pick your columns',
        plainEnglish: 'SELECT customer_name, order_total',
        exampleFormulaOrAction: 'SELECT customer_name, order_total'
      },
      {
        step: '2. Identify the source table',
        plainEnglish: 'FROM customer_orders',
        exampleFormulaOrAction: 'FROM customer_orders'
      },
      {
        step: '3. Filter the rows',
        plainEnglish: 'WHERE order_status = \'Completed\' AND order_total > 100 ORDER BY order_total DESC;',
        exampleFormulaOrAction: 'WHERE order_status = \'Completed\' ORDER BY order_total DESC;'
      }
    ],
    quickCheckQuestion: {
      question: 'In SQL, which clause is used to filter rows based on specific conditions (like finding orders over $50)?',
      options: [
        'WHERE',
        'GIVE_ME',
        'SEARCH',
        'DELETE_EVERYTHING'
      ],
      correctIndex: 0,
      explanation: 'The WHERE clause specifies the exact criteria for which rows to include in your result set.'
    },
    keyTakeaway: 'SQL reads like a simple English sentence: SELECT these columns FROM that table WHERE this condition is true.'
  },
  {
    id: 'python-workplace',
    title: 'Python (Optional) — Automate repetitive data chores',
    category: 'Databases & Code',
    level: 'Beginner',
    estimatedMinutes: 15,
    workplaceScenario: 'You spend 2 hours every Monday renaming, formatting, and emailing 20 CSV files. Learn how Python automates this in 5 seconds.',
    coreConcepts: [
      'What Python is: A readable, friendly scripting language',
      'Pandas library: The superpower for manipulating spreadsheets in code',
      'Safe sandbox execution: Why production systems run code with resource limits',
      'Using AI to write the script while you verify and supervise the output'
    ],
    stepByStepGuide: [
      {
        step: '1. Load a file with Pandas',
        plainEnglish: 'import pandas as pd; df = pd.read_csv("sales.csv")',
        exampleFormulaOrAction: 'df = pd.read_csv("weekly_data.csv")'
      },
      {
        step: '2. Clean and filter with one line',
        plainEnglish: 'df_clean = df[df["Revenue"] > 0]',
        exampleFormulaOrAction: 'df_clean = df.dropna()'
      },
      {
        step: '3. Export to a polished Excel file',
        plainEnglish: 'df_clean.to_excel("summary.xlsx", index=False)',
        exampleFormulaOrAction: 'df_clean.to_excel("output.xlsx")'
      }
    ],
    quickCheckQuestion: {
      question: 'Which popular Python library is known as the standard tool for handling tabular spreadsheet data?',
      options: [
        'Pandas',
        'Koala',
        'Giraffe',
        'Photoshop'
      ],
      correctIndex: 0,
      explanation: 'Pandas is the widely-adopted Python library for data manipulation and analysis, making spreadsheet operations instant.'
    },
    keyTakeaway: 'You don’t need to become a software engineer to use Python; small 5-line scripts can reclaim hours of repetitive office work.'
  },
  {
    id: 'shared-principles',
    title: 'Data Foundations (Optional) — Master shared reporting principles',
    category: 'Foundations',
    level: 'Core Principle',
    estimatedMinutes: 8,
    workplaceScenario: 'Your manager asks for a weekly summary. Before picking any software, learn the 4 universal steps every reporting tool follows.',
    coreConcepts: [
      'Raw Data vs. Cleaned Data (No blank rows, single headers)',
      'The 4 Layers of Every Tool: Storage -> Modeling -> Metrics -> Visual Canvas',
      'Cognitive load in reporting: Show 1 key takeaway before showing 5 breakdowns',
      'The Golden Rule of Workplace Automation: Verify numbers once manually before trusting automated reports'
    ],
    toolComparison: [
      {
        toolName: 'Power BI (Microsoft)',
        bestFor: 'Deep integration with Excel, Teams, Windows, and enterprise data models (DAX).',
        learningCurve: 'Moderate (natural if you know Excel)'
      },
      {
        toolName: 'Tableau (Salesforce)',
        bestFor: 'Artistic data exploration, freeform visual design, complex custom charts.',
        learningCurve: 'Moderate to Steep (drag-and-drop shelf system)'
      },
      {
        toolName: 'Looker (Google Cloud)',
        bestFor: 'Centralised company metrics governed via code (LookML) and web browser dashboards.',
        learningCurve: 'Steep for setup; very easy for end-user consumers'
      }
    ],
    stepByStepGuide: [
      {
        step: 'Step 1: Check your columns',
        plainEnglish: 'Make sure every column has a clear name (e.g., "Sale Date", "Client Name") with no merged cells.',
        exampleFormulaOrAction: 'Unmerge cells in Excel/Sheets so data is tabular.'
      },
      {
        step: 'Step 2: Define your North Star Metric',
        plainEnglish: 'Decide what single number your team cares most about (e.g. Total Revenue or Unresolved Tickets).',
        exampleFormulaOrAction: 'KPI: "Total Q3 Revenue = £128,450"'
      },
      {
        step: 'Step 3: Choose the visual that fits the question',
        plainEnglish: 'Use a line chart for time trends, a bar chart for category comparisons, and KPI cards for single totals.',
        exampleFormulaOrAction: 'Never use 3D pie charts; stick to simple horizontal bars.'
      }
    ],
    quickCheckQuestion: {
      question: 'Which of the following describes the shared 4-layer architecture of Power BI, Tableau, and Looker?',
      options: [
        'Storage -> Modeling -> Metrics/Formulas -> Visual Canvas',
        'Drawing -> Coloring -> Emailing -> Printing',
        'Python -> Server -> Terminal -> Browser',
        'Salesforce -> Slack -> Zoom -> Google Meet'
      ],
      correctIndex: 0,
      explanation: 'All modern BI systems ingest raw storage, model relationships, compute metrics, and display them on a visual canvas.'
    },
    keyTakeaway: 'Software tools change, but clear tabular data and disciplined visual hierarchy remain constant across all workplaces.'
  }
];
