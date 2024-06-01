import logo from '../assets/img/checklist.png';

export const Header = () => {
  return (
    <header>
      <div className="wrapper">
        <div className="logo">
          <img src={logo} alt="logo" />
          <h1>TD list</h1>
        </div>
      </div>
    </header>
  );
};
