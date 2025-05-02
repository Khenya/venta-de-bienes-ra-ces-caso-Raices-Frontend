import Image from 'next/image';
import logo from '../../assets/Logo_extendido.png';

const Header = () => {
  return (
    <header className="relative w-full h-32 flex items-center px-6 ">
      <div className="absolute top-8 left-8 w-96 h-96"> 
        <Image 
          src={logo} 
          alt="Logo" 
          width={226} 
          height={226}
          className="object-contain"
        />
      </div>
    </header>
  );
};

export default Header;