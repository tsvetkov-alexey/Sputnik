import close from '../assets/img/close.png';
import like from '../assets/svg/like.svg';
import liked from '../assets/svg/liked.svg';
import { useDeleteTaskMutation, useUpdateTaskStatusMutation } from '../services/taskService';
import { MiniLoader } from './UI/MiniLoader';
import { useEffect, useState } from 'react';

export type taskInfo = {
  id: number;
  title: string;
  description: string;
  status: string;
  onUpdateTask: (id: number, status: string) => void;
  onDeleteTask: (id: number) => void;
};

export const Task = ({ id, title, description, status, onUpdateTask, onDeleteTask }: taskInfo) => {
  const [deleteTask, { isLoading: deleteLoading }] = useDeleteTaskMutation();
  const [updateTaskStatus, { isLoading: updateLoading }] = useUpdateTaskStatusMutation();

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const likedState = localStorage.getItem(`task_${id}_liked`);
    setIsLiked(likedState === 'true');
  }, [id]);

  const handleDeleteTask = async () => {
    try {
      await deleteTask(id).unwrap();
      onDeleteTask(id);
    } catch (error) {}
  };

  const handleStatusChange = async () => {
    const newStatus = status === 'completed' ? 'not_completed' : 'completed';
    try {
      await updateTaskStatus({ id, statusTask: { status: newStatus } }).unwrap();
      onUpdateTask(id, newStatus);
    } catch (error) {}
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    localStorage.setItem(`task_${id}_liked`, (!isLiked).toString());
  };

  return (
    <div className="task">
      <div className="text">
        <div className="like" onClick={handleLike}>
          {isLiked ? (
            <img src={liked} alt="like" className="fav" />
          ) : (
            <img src={like} alt="like" className="notFav" />
          )}
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
