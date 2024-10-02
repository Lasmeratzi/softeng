import logo from './logo.svg';
import './Footer.css';

function Footer() {
  return (
    <div className="Footer">
      <header className="Footer-header">
        <img src={logo} className="Footer-logo" alt="logo" />
        <p>
          Edit <code>src/Footer.js</code> and save to reload.
        </p>
        <a
          className="Footer-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default Footer;
