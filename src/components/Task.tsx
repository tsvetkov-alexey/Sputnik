import close from '../assets/img/close.png';
import like from '../assets/svg/like.svg';
import liked from '../assets/svg/liked.svg';
import { useDeleteTaskMutation, useUpdateTaskStatusMutation } from '../services/taskService';
import { MiniLoader } from './UI/MiniLoader';

export type taskInfo = {
  id: number;
  title: string;
  description: string;
  status: string;
  refetch: () => void;
};

export const Task = ({ id, title, description, status, refetch }: taskInfo) => {
  const [deleteTask, { isLoading: deleteLoading }] = useDeleteTaskMutation();
  const [updateTaskStatus, { isLoading: updateLoading }] = useUpdateTaskStatusMutation();

  const handleDeleteTask = async () => {
    try {
      await deleteTask(id).unwrap();
      console.log(`Task with ID ${id} deleted successfully`);
      refetch();
    } catch (error) {
      console.error('Failed to delete task:', error);
    } finally {
    }
  };

  const handleStatusChange = async () => {
    const newStatus = status === ('completed' || 'active') ? 'not_completed' : 'completed';
    try {
      await updateTaskStatus({ id, statusTask: { status: newStatus } }).unwrap();
      console.log(`Task with ID ${id} updated successfully`);
      refetch();
    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  };

  return (
    <div className="task">
      <div className="text">
        <div className="like">
          {/* <img src={liked} alt="like" className="fav" /> */}
          <img src={like} alt="like" className="notFav" />
        </div>
        <div className="info">
          <h4 className="title">Название: {title}</h4>
          <span>Описание: {description}</span>
        </div>
      </div>

      {status === 'completed' ? (
        <button className="completed" onClick={handleStatusChange}>
          {updateLoading ? '...' : 'Сделано'}
        </button>
      ) : (
        <button className="not_completed" onClick={handleStatusChange}>
          {updateLoading ? '...' : 'Не сделано'}
        </button>
      )}

      {deleteLoading ? (
        <MiniLoader />
      ) : (
        <img src={close} alt="close" className="close" onClick={handleDeleteTask} />
      )}
    </div>
  );
};
