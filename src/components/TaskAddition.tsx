import { setTasksLoading } from '../redux/filter/slice';
import { useAppDispatch } from '../redux/store';
import { useAddTaskMutation } from '../services/taskService';
import { ChangeEvent, useRef, useState } from 'react';

type AddTask = {
  refetch: () => void;
};

export const TaskAddition = ({ refetch }: AddTask) => {
  const [taskValue, setTaskValue] = useState('');
  const [titleValue, setTitleValue] = useState('');

  const dispatch = useAppDispatch();

  const [addTask, { isLoading }] = useAddTaskMutation();

  const inputTaskRef = useRef<HTMLInputElement>(null);
  const inputTitleRef = useRef<HTMLInputElement>(null);

  const onChangeTaskInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskValue(e.target.value);
  };

  const onChangeTitleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setTasksLoading(true));

    try {
      await addTask({
        title: titleValue,
        description: taskValue,
        status: 'not_completed',
      }).unwrap();

      setTaskValue('');
      setTitleValue('');
      refetch();
    } catch (error) {
      console.error('Failed to add task:', error);
    } finally {
      dispatch(setTasksLoading(false));
    }
  };

  return (
    <form className="main-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Название задачи..."
        ref={inputTitleRef}
        value={titleValue}
        onChange={onChangeTitleInput}
      />
      <input
        type="text"
        placeholder="Впишите текст задачи..."
        ref={inputTaskRef}
        value={taskValue}
        onChange={onChangeTaskInput}
        className="taskInput"
      />
      <button type="submit" disabled={isLoading}>
        Добавить
      </button>
    </form>
  );
};
