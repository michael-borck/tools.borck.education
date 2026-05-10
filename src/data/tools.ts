import toolsData from './tools.data.json';

export interface ToolFeature {
  title: string;
  desc: string;
}

export interface Tool {
  id: string;
  name: string;
  type: string;
  tags: string[];
  shortDesc: string;
  page?: string;
  github?: string;
  pypi?: string;
  web?: string;
  download?: { win?: boolean; mac?: boolean; linux?: boolean };
  pip?: string;
  brand?: string;
  features?: ToolFeature[];
}

export const tools: Tool[] = toolsData as Tool[];

export const goals = [
  { value: 'all', label: 'All' },
  { value: 'analyze', label: 'Analyse' },
  { value: 'feedback', label: 'Get feedback' },
  { value: 'create', label: 'Create' },
  { value: 'practice', label: 'Practise & learn' },
  { value: 'grade', label: 'Grade & assess' },
  { value: 'research', label: 'Research' },
  { value: 'engage', label: 'Engage a class' },
  { value: 'career', label: 'Career & writing' },
];
