const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://dev-api.skapa.design";

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function getProjects() {
  return fetchAPI("/api/projects");
}

export async function getProject(id: string) {
  return fetchAPI(`/api/projects/${id}`);
}

export async function createProject(data: {
  name: string;
  description: string;
  techStack: string;
  pages: Array<{ name: string; path: string; description: string; components: string[] }>;
}) {
  return fetchAPI("/api/projects", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function generateCode(projectId: string, pageId: string) {
  return fetchAPI(`/api/projects/${projectId}/pages/${pageId}/generate`, {
    method: "POST",
  });
}

export async function getGeneratedCode(projectId: string, pageId: string) {
  return fetchAPI(`/api/projects/${projectId}/pages/${pageId}/code`);
}

export async function getIssues(projectId: string) {
  return fetchAPI(`/api/projects/${projectId}/issues`);
}
