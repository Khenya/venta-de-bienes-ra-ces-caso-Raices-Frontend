import Image from 'next/image';
import logo from '../../assets/Logo_extendido.png';

const Header = () => {
  return (
    <header className="d-flex align-items-center px-4 py-3" style={{ height: "96px" }}>
      <Image src={logo} alt="Logo" width={226} />
    </header>
  );
};

export default Header;