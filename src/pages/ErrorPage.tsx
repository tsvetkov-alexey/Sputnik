import chocolate from '../assets/img/chocolate.png';
import { Header } from '../components/Header';

export const ErrorPage = () => {
  return (
    <>
      <Header />
      <div className="error">
        <img src={chocolate} alt="chocolate" />
        <h2>Технические шоколадки на сервере, попробуйте позже</h2>
      </div>
    </>
  );
};
