export interface Product {
  slug: string
  name: string
  summary: string
  /** GitHub "owner/name". Omit while no repository exists. */
  repo?: string
  features: string[]
  stack: string[]
  platforms: string[]
  install: string[]
  limitations: string[]
  screenshots: { src: string; alt: string }[]
}

export const OWNER = 'gbogdev'

export const products: Product[] = [
  {
    slug: 'taskflow',
    name: 'TaskFlow',
    summary: 'Desktop task and project manager. Tasks live in a local SQLite database; nothing is sent anywhere.',
    repo: 'gbogdev/TaskFlow',
    features: [
      'Projects: create, edit, archive and delete (deleting a project removes its tasks).',
      'Tasks with title, description, priority, deadline, tags and status (To do / In progress / Done).',
      'Kanban board with drag-and-drop between and within columns, plus list and dashboard views.',
      'Search, sorting and filtering by project, priority, status and tag, with a hide-completed option.',
      'JSON and CSV import/export, and database backup and restore.',
      'Dark, Graphite and Light themes, rebindable keyboard shortcuts, and settings that persist between sessions.',
      'Import, export and backup run on a background thread; failures are shown as readable messages.',
    ],
    stack: ['Python 3.10+', 'PySide6 6.6+', 'SQLite'],
    platforms: ['Windows (documented and packaged with PyInstaller). Other platforms have not been tested.'],
    install: [
      'python -m venv .venv',
      '.venv\\Scripts\\activate',
      'pip install -e ".[dev]"',
      'python -m taskflow',
    ],
    limitations: [
      'Single user, no sync.',
      'Drag-and-drop ordering is global per status column and is applied relative to the visible (filtered) cards.',
      'No undo; deletes ask for confirmation instead.',
      'CSV export has one row per task, so projects without tasks are not exported.',
      'Importing the same file twice creates duplicate tasks.',
    ],
    screenshots: [
      { src: '/screenshots/taskflow/board.png', alt: 'TaskFlow Kanban board view' },
      { src: '/screenshots/taskflow/list.png', alt: 'TaskFlow list view' },
      { src: '/screenshots/taskflow/dashboard.png', alt: 'TaskFlow dashboard view' },
    ],
  },
  {
    slug: 'devscope',
    name: 'DevScope',
    summary:
      'Desktop utility for inspecting local system resource usage and investigating application logs. Everything stays on your machine; nothing is uploaded.',
    repo: 'gbogdev/DevScope',
    features: [
      'Monitoring: CPU, memory, disk, network throughput and top processes, with a configurable refresh interval and line charts over bounded in-memory history. Unreadable metrics show as n/a.',
      'Logs: import text logs (parsed incrementally in a background thread), search (plain or regex), filter by severity, time range and source, group recurring errors, view surrounding entries, and export filtered results as CSV, JSON or text.',
      'Diagnostics: configurable threshold rules for sustained high CPU, memory or disk usage and recurring log errors. An alert means a rule matched; it is not a confirmed fault.',
      'Reports: export a text or JSON report of measured aggregates, alerts and log summary.',
    ],
    stack: ['Python 3.10+', 'PySide6', 'psutil'],
    platforms: ['Windows (smoke-launched headlessly on one machine). Other platforms have not been tested.'],
    install: [
      'python -m venv .venv',
      '.venv\\Scripts\\activate',
      'pip install -r requirements.txt',
      'python -m devscope',
    ],
    limitations: [
      'The GUI has not been systematically tested.',
      'The packaged PyInstaller build has not been tested.',
      'Log parsing rules are regexes in the config file (%APPDATA%\\DevScope\\config.json).',
    ],
    screenshots: [],
  },
  {
    slug: 'fileforge',
    name: 'FileForge',
    summary: 'Details are not available yet. No source or documentation has been written for this project.',
    features: [],
    stack: [],
    platforms: [],
    install: [],
    limitations: ['Not available. Do not expect a download.'],
    screenshots: [],
  },
]

export const findProduct = (slug: string) => products.find((p) => p.slug === slug)
