import { Filter } from '../components/Filter';
import { Header } from '../components/Header';
import { Task } from '../components/Task';
import { TaskAddition } from '../components/TaskAddition';
import { PageLoader } from '../components/UI/TaskLoader';
import { selectFilter } from '../redux/filter/slice';
import { useAddTaskMutation, useFetchTasksQuery } from '../services/taskService';
import { TaskData } from '../services/types';
import { ErrorPage } from './ErrorPage';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

export const Home = () => {
  const { allTasks, doneTasks, notDoneTasks } = useSelector(selectFilter);

  const [page, setPage] = useState(1);
  const [tasks, setTasks] = useState<TaskData[]>([]);

  console.log(tasks);
  let status = '';
  if (doneTasks && !notDoneTasks) status = 'completed';
  if (!doneTasks && notDoneTasks) status = 'not_completed';

  const { data: info, error, refetch } = useFetchTasksQuery({ page, status });

  useEffect(() => {
    if (info && info.data.length > 0) {
      setTasks(info.data);
    }
  }, [info]);

  useEffect(() => {
    refetch();
  }, [allTasks, doneTasks, notDoneTasks, refetch]);

  const { tasksLoading } = useSelector(selectFilter);

  const taskElements =
    tasks.length > 0 ? (
      tasks.map((obj: TaskData) => (
        <Task {...obj.attributes} id={obj.id} key={obj.id} refetch={refetch} />
      ))
    ) : (
      <div id="loader">
        <PageLoader />
      </div>
    );

  if (error) return <ErrorPage />;

  return (
    <>
      <Header />
      <div className="body-wrapper">
        <h2>Список ваших задач</h2>
        <TaskAddition refetch={refetch} />
        <Filter />
        {tasksLoading ? (
          <div id="loader">
            <PageLoader />
          </div>
        ) : (
          taskElements
        )}
      </div>
    </>
  );
};
