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
  failedToDeleteProject,
  failedToDeleteTask,
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

export const deleteProjectById = async (id) => {
  const response = await fetch(`${BASE_PROJECT_URL}/${id}`, {
    method: API_METHOD.DELETE,
    headers,
  });
  if (!response.ok) throw new Error(failedToDeleteProject(id));
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
  const dataWithProjectId = { ...taskData, projectId };
  const response = await fetch('/api/tasks', {
    method: 'POST',
    headers,
    body: JSON.stringify(dataWithProjectId),
  });
  if (!response.ok) throw new Error(failedToCreateTask(projectId));
  return response.json();
};

export const updateTaskById = async (taskId, taskData) => {
  const response = await fetch(`${BASE_TASKS_URL}/${taskId}`, {
    method: API_METHOD.PUT,
    headers,
    body: JSON.stringify(taskData),
  });
  if (!response.ok) throw new Error(failedToUpdateTaskId(taskId));
  return response.json();
};

export const getTaskById = async (taskId) => {
  const response = await fetch(`${BASE_TASKS_URL}/${taskId}`);
  if (!response.ok) throw new Error(failedToGetTaskId(taskId));
  return response.json();
};

export const deleteTaskById = async (taskId) => {
  const response = await fetch(`${BASE_TASKS_URL}/${taskId}`, {
    method: API_METHOD.DELETE,
    headers,
  });
  if (!response.ok) throw new Error(failedToDeleteTask(taskId));
  return response.json();
};
