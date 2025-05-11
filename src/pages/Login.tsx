import Content from "@/components/login/Content";
import Header from "@/components/common/Header";
import { Colors } from "@/app/config/theme/Colors";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function LoginPage() {
  return (
    <div 
      className="min-vh-100 d-flex flex-column" 
      style={{ backgroundColor: Colors.primary }}
    >
      <Header />
      <div className="flex-grow-1 d-flex justify-content-center align-items-center p-4" >
        <Content />
      </div>
    </div>
  );
}