export const BASE_PROJECT_URL = '/api/projects';
export const BASE_TASKS_URL = '/api/tasks';
export const headers = { 'Content-Type': 'application/json' };
export const API_METHOD = {
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export const failedToCreateProject = 'Failed to create project';
export const failedFetchingProjets = 'Failed to fetch projects';
export const failedToUpdateProject = (id) => `Failed to update project id: ${id}`;
export const failedToGetProjectById = (id) => `Failed getting project id: ${id}`;
export const failedToLoadProjectTasks = (projectId) =>
  `Failed to fetch tasks for project ${projectId}`;
export const failedToUpdateTaskId = (taskId, projectId) =>
  `Failed to update task ${taskId} for project ${projectId}`;
export const failedToGetTaskId = (taskId, projectId) =>
  `Failed to fetch task ${taskId} for project ${projectId}`;
export const failedToCreateTask = (projectId) => `Failed to create task for project ${projectId}`;
export const failedToDeleteProject = (id) => `Failed to delete project with ID: ${id}`;
