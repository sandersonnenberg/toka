export const BASE_URL = '/api/projects';
export const headers = { 'Content-Type': 'application/json' };
export const API_METHOD = {
  PUT: 'PUT',
  POST: 'POST',
};

export const failedToCreateProject = 'Failed to create project';
export const failedFetchingProjets = 'Failed to fetch projects';
export const failedToUpdateProject = (id) => `Failed to update project id: ${id}`;
