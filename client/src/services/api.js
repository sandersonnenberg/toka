import { 
    BASE_URL,
    API_METHOD,
    headers,
    failedFetchingProjets,
    failedToCreateProject,
    failedToUpdateProject,
} from "./constants";

export const getProjects = async () => {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error(failedFetchingProjets);
  return response.json();
}

export const createProject = async (projectData) => {
  const response = await fetch(BASE_URL, {
    method: API_METHOD.POST,
    headers,
    body: JSON.stringify(projectData),
  });
  if (!response.ok) throw new Error(failedToCreateProject);
  return response.json();
}

export const updateProjectById = async (id, projectData) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: API_METHOD.PUT,
        headers,
        body: JSON.stringify(projectData),

    });
    if (!response.ok) throw new Error(failedToUpdateProject(id));
    return response.json();
}
