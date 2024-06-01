export interface TaskAttributes {
  title: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface TaskData {
  id: number;
  attributes: TaskAttributes;
}

export interface FetchTasksResponse {
  data: TaskData[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export type AddTaskRequest = {
  title: string;
  description: string;
  status: string;
};

export type AddTaskResponse = {
  data: TaskData;
};

export type UpdateTaskStatusRequest = {
  status: string;
};

export type UpdateTaskStatusResponse = {
  data: TaskData;
};

export interface DeleteTaskResponse {
  data: {
    id: number;
  };
}
