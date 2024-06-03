import filter from '../assets/svg/filter.svg';
import {
  selectFilter,
  setAllTasks,
  setDoneTasks,
  setFavouriteTasks,
  setNotDoneTasks,
} from '../redux/filter/slice';
import { useAppDispatch } from '../redux/store';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

export const Filter = () => {
  const [open, setOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const { allTasks, doneTasks, notDoneTasks, favouriteTasks } = useSelector(selectFilter);

  type PopupClick = MouseEvent & {
    composedPath(): Node[];
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const _e = e as PopupClick;
      if (filterRef.current && !_e.composedPath().includes(filterRef.current)) {
        setOpen(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  const checkAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked === false) {
      dispatch(setAllTasks(false));
    } else {
      dispatch(setAllTasks(true));
      dispatch(setDoneTasks(true));
      dispatch(setNotDoneTasks(true));
    }
  };

  const checkDoneTasks = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked === false) {
      dispatch(setDoneTasks(false));
      dispatch(setAllTasks(false));
    } else {
      dispatch(setDoneTasks(true));
    }
  };

  const checkNotDoneTasks = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked === false) {
      dispatch(setNotDoneTasks(false));
      dispatch(setAllTasks(false));
    } else {
      dispatch(setNotDoneTasks(true));
    }
  };

  const checkFavouriteTasks = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked === false) {
      dispatch(setFavouriteTasks(false));
    } else {
      dispatch(setFavouriteTasks(true));
    }
  };
  return (
    <div className="filter" ref={filterRef}>
      <img src={filter} alt="filter" />
      <span onClick={() => setOpen(!open)}>Фильтровать по</span>
      {open && (
        <form className="filter-block">
          <input
            type="checkbox"
            id="option1"
            name="all"
            value="all"
            onChange={checkAll}
            checked={allTasks}
          />
          <label htmlFor="option1">Все</label>
          <br />
          <input
            type="checkbox"
            id="option2"
            name="done"
            value="done"
            onChange={checkDoneTasks}
            checked={doneTasks}
          />
          <label htmlFor="option2">Выполненные</label>
          <br />
          <input
            type="checkbox"
            id="option3"
            name="notDone"
            value="notDone"
            onChange={checkNotDoneTasks}
            checked={notDoneTasks}
          />
          <label htmlFor="option3">Невыполненные</label>
          <br />
          <input
            type="checkbox"
            id="option4"
            name="favourites"
            value="favourites"
            onChange={checkFavouriteTasks}
            checked={favouriteTasks}
          />
          <label htmlFor="option4">Избранные</label>
        </form>
      )}
    </div>
  );
};
