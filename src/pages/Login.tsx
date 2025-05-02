import Content from "@/components/login/Content";
import Header from "@/components/common/Header";
import { Colors } from "@/app/config/theme/Colors";
import "@/app/globals.css";

export default function LoginPage() {
  return (
    <div 
      className="min-h-screen flex flex-col" 
      style={{ backgroundColor: Colors.primary }}
    >
      <Header />
      <div className="flex-grow flex items-center justify-center p-4">
        <Content />
      </div>
    </div>
  );
}