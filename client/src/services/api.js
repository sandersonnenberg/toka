import {
  BASE_PROJECT_URL,
  BASE_TASKS_URL,
  API_METHOD,
  headers,
  failedFetchingProjets,
  failedToCreateProject,
  failedToUpdateProject,
  failedToGetProjectById,
  failedToLoadProjectTasks,
  failedToUpdateTaskId,
  failedToGetTaskId,
  failedToCreateTask,
} from './constants';

export const getProjects = async () => {
  const response = await fetch(BASE_PROJECT_URL);
  if (!response.ok) throw new Error(failedFetchingProjets);
  return response.json();
};

export const createProject = async (projectData) => {
  const response = await fetch(BASE_PROJECT_URL, {
    method: API_METHOD.POST,
    headers,
    body: JSON.stringify(projectData),
  });
  if (!response.ok) throw new Error(failedToCreateProject);
  return response.json();
};

export const updateProjectById = async (id, projectData) => {
  const response = await fetch(`${BASE_PROJECT_URL}/${id}`, {
    method: API_METHOD.PUT,
    headers,
    body: JSON.stringify(projectData),
  });
  if (!response.ok) throw new Error(failedToUpdateProject(id));
  return response.json();
};

export const getProjectById = async (id) => {
  const response = await fetch(`${BASE_PROJECT_URL}/${id}`);
  if (!response.ok) throw new Error(failedToGetProjectById(id));
  return response.json();
};

export const getTasksByProjectId = async (projectId) => {
  const response = await fetch(`${BASE_TASKS_URL}/search`, {
    method: API_METHOD.POST,
    headers,
    body: JSON.stringify({ projectId }),
  });

  if (!response.ok) throw new Error(failedToLoadProjectTasks(projectId));
  return response.json();
};

export const createTask = async (projectId, taskData) => {
  const dataWithProjectId = { ...taskData, projectId }; // Include projectId in the body
  const response = await fetch('/api/tasks', {
    method: 'POST',
    headers,
    body: JSON.stringify(dataWithProjectId),
  });
  if (!response.ok) throw new Error(failedToCreateTask(projectId));
  return response.json();
};

export const updateTaskById = async (projectId, taskId, taskData) => {
  const response = await fetch(`${BASE_TASKS_URL}/${projectId}/tasks/${taskId}`, {
    method: API_METHOD.PUT,
    headers,
    body: JSON.stringify(taskData),
  });
  if (!response.ok) throw new Error(failedToUpdateTaskId(taskId, projectId));
  return response.json();
};

export const getTaskById = async (projectId, taskId) => {
  const response = await fetch(`${BASE_TASKS_URL}/${projectId}/tasks/${taskId}`);
  if (!response.ok) throw new Error(failedToGetTaskId(taskId, projectId));
  return response.json();
};
