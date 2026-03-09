export interface CodeProject {
  id: string;
  name: string;
  description: string;
  techStack: "react" | "nextjs" | "vue" | "angular";
  status: "draft" | "generating" | "completed" | "error";
  pages: PageConfig[];
  createdAt: string;
  updatedAt: string;
}

export interface PageConfig {
  id: string;
  name: string;
  path: string;
  description: string;
  components: string[];
  status: "pending" | "generating" | "completed" | "error";
}

export interface CodeGeneration {
  id: string;
  projectId: string;
  pageId: string;
  filePath: string;
  content: string;
  language: string;
  createdAt: string;
}

export interface CodeIssue {
  id: string;
  projectId: string;
  title: string;
  description: string;
  type: "bug" | "improvement" | "feature" | "security";
  status: "observer" | "developer" | "validator";
  priority: "high" | "medium" | "low";
  assignedGroup: string;
  createdAt: string;
}
