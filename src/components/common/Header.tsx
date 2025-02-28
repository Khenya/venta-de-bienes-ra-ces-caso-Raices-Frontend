import Image from 'next/image';
import logo from '../../assetes/Logo.png';

const Header = () => {
  return (
    <header className="relative w-full h-32 bg-[#F9FAE8] flex items-center px-6 ">
      <div className="absolute top-8 left-8 w-64 h-64"> 
        <Image 
          src={logo} 
          alt="Logo" 
          width={194} 
          height={194}
          className="object-contain"
        />
      </div>
    </header>
  );
};

export default Header;