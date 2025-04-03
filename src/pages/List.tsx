import Header2 from "@/components/common/Header_2";
import Table from "@/components/list/Table";

const List = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-6">
      <Header2 />
      <div className="w-full max-w-6xl mx-auto mt-6">
        <Table />
      </div>
    </div>
  );
};

export default List;