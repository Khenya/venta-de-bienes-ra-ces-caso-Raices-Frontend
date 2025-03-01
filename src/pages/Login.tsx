import Content from "../components/login/Content";
import Header from "@/components/common/Header";
import { Colors } from "../app/config/theme/Colors"

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: Colors.primary }}>
      <Header/>
      <Content/>
    </div>
  );
}
