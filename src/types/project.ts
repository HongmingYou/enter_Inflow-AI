export type ProjectType = 'note' | 'deck' | 'mindmap';
export type ProjectStatus = 'draft' | 'published';

export interface ProjectData {
  id: string;
  name: string;
  type: ProjectType;
  sourcesCount: number;
  lastModified: Date;
  status: ProjectStatus;
  thumbnail?: string;
  description?: string;
}

