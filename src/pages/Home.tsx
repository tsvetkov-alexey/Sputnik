import { Filter } from '../components/Filter';
import { Header } from '../components/Header';
import { Task } from '../components/Task';
import { TaskAddition } from '../components/TaskAddition';
import { PageLoader } from '../components/UI/TaskLoader';
import { selectFilter } from '../redux/filter/slice';
import { useFetchTasksQuery } from '../services/taskService';
import { TaskData } from '../services/types';
import { ErrorPage } from './ErrorPage';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const Home = () => {
  const { allTasks, doneTasks, notDoneTasks, favouriteTasks } = useSelector(selectFilter);

  const [page, setPage] = useState(1);
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [hasMoreTasks, setHasMoreTasks] = useState(true);
  const [loading, setLoading] = useState(false);

  let status = '';
  if (allTasks && doneTasks && notDoneTasks && favouriteTasks) {
    status = '';
  } else if (!allTasks && !doneTasks && notDoneTasks && favouriteTasks) {
    status = 'not_completed';
  } else if (!allTasks && !doneTasks && notDoneTasks && !favouriteTasks) {
    status = 'not_completed';
  } else if (!allTasks && doneTasks && !notDoneTasks && favouriteTasks) {
    status = 'completed';
  } else if (!allTasks && doneTasks && !notDoneTasks && !favouriteTasks) {
    status = 'completed';
  } else if (!allTasks && doneTasks && !notDoneTasks && favouriteTasks) {
    status = '';
  } else if (!allTasks && doneTasks && notDoneTasks && favouriteTasks) {
    status = '';
  }

  const { data: info, error, refetch } = useFetchTasksQuery({ page, status });

  useEffect(() => {
    setLoading(true);
    refetch();
  }, [page, status, refetch]);

  useEffect(() => {
    if (!info) return;
    const filteredTasks = favouriteTasks
      ? info.data.filter((task) => localStorage.getItem(`task_${task.id}_liked`) === 'true')
      : info.data;
    if (page === 1) {
      setTasks(filteredTasks);
    } else {
      setTasks((prevTasks) => {
        const newTasks = filteredTasks.filter(
          (task) => !prevTasks.some((prevTask) => prevTask.id === task.id),
        );
        return [...prevTasks, ...newTasks];
      });
    }

    setHasMoreTasks(info.meta.pagination.page < info.meta.pagination.pageCount);
    setLoading(false);
  }, [info, page, favouriteTasks]);

  useEffect(() => {
    setPage(1);
  }, [allTasks, doneTasks, notDoneTasks]);

  const { tasksLoading } = useSelector(selectFilter);

  const handleUpdateTask = (id: number, newStatus: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, attributes: { ...task.attributes, status: newStatus } } : task,
      ),
    );
  };

  const handleDeleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const taskElements =
    tasks.length > 0 ? (
      tasks.map((task) => (
        <Task
          {...task.attributes}
          id={task.id}
          key={task.id}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
        />
      ))
    ) : (
      <div id="loader">
        <PageLoader />
      </div>
    );

  if (error) return <ErrorPage />;

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <Header />
      <div className="body-wrapper">
        <h2>Список ваших задач</h2>
        <TaskAddition refetch={refetch} />
        <Filter />
        {(tasksLoading || loading) && (
          <div id="loader">
            <PageLoader />
          </div>
        )}
        {taskElements}
        {tasks.length > 0 && hasMoreTasks && (
          <button onClick={handleLoadMore} className="loadMore">
            Загрузить еще задачи
          </button>
        )}
      </div>
    </>
  );
};
