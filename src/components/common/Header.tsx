import Image from 'next/image';
import logo from '../../assets/Logo_extendido.png';

const Header = () => {
  return (
    <div className="absolute top-8 left-8 w-96 h-96"> 
      <Image 
        src={logo} 
        alt="Logo" 
        width={226} 
      />
    </div>
  );
};

export default Header;