import {
  AddTaskRequest,
  AddTaskResponse,
  DeleteTaskResponse,
  FetchTasksResponse,
  UpdateTaskStatusRequest,
  UpdateTaskStatusResponse,
} from './types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const taskApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://cms.dev-land.host/api/' }),
  endpoints: (build) => ({
    fetchTasks: build.query<FetchTasksResponse, { page: number; status?: string }>({
      query: ({ page, status }) => {
        const filters = status ? `filters[status]=${status}` : '';
        return {
          url: `tasks?pagination[page]=${page}&sort=createdAt:desc&${filters}`,
          headers: {
            Authorization: `Bearer a56017bfd8f1a9d1c8d012e881ef7df90ddc4e3d74e61a27b82fa975cfe37571fcb0e7617258e871291c4315b68c1c410274fb19269becf5dae7b5372d611d66c605c701817bd70f8fcd39aa44973e95fb1dff1b36e3271ba4bf890e074e52d9b9feddcee0947e588d7b5f6eef4bd4ead3993c6ee7b35ffddf22012c2b5589ed`,
          },
        };
      },
    }),
    addTask: build.mutation<AddTaskResponse, AddTaskRequest>({
      query: (newTask) => ({
        url: 'tasks',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer a56017bfd8f1a9d1c8d012e881ef7df90ddc4e3d74e61a27b82fa975cfe37571fcb0e7617258e871291c4315b68c1c410274fb19269becf5dae7b5372d611d66c605c701817bd70f8fcd39aa44973e95fb1dff1b36e3271ba4bf890e074e52d9b9feddcee0947e588d7b5f6eef4bd4ead3993c6ee7b35ffddf22012c2b5589ed`,
        },
        body: JSON.stringify({ data: newTask }),
      }),
    }),
    updateTaskStatus: build.mutation<
      UpdateTaskStatusResponse,
      { id: number; statusTask: UpdateTaskStatusRequest }
    >({
      query: ({ id, statusTask }) => ({
        url: `tasks/${id}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer a56017bfd8f1a9d1c8d012e881ef7df90ddc4e3d74e61a27b82fa975cfe37571fcb0e7617258e871291c4315b68c1c410274fb19269becf5dae7b5372d611d66c605c701817bd70f8fcd39aa44973e95fb1dff1b36e3271ba4bf890e074e52d9b9feddcee0947e588d7b5f6eef4bd4ead3993c6ee7b35ffddf22012c2b5589ed`,
        },
        body: JSON.stringify({ data: statusTask }),
      }),
    }),
    deleteTask: build.mutation<DeleteTaskResponse, number>({
      query: (id) => ({
        url: `tasks/${id}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer a56017bfd8f1a9d1c8d012e881ef7df90ddc4e3d74e61a27b82fa975cfe37571fcb0e7617258e871291c4315b68c1c410274fb19269becf5dae7b5372d611d66c605c701817bd70f8fcd39aa44973e95fb1dff1b36e3271ba4bf890e074e52d9b9feddcee0947e588d7b5f6eef4bd4ead3993c6ee7b35ffddf22012c2b5589ed`,
        },
      }),
    }),
  }),
});

export const {
  useFetchTasksQuery,
  useAddTaskMutation,
  useUpdateTaskStatusMutation,
  useDeleteTaskMutation,
} = taskApi;
