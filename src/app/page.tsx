import Navbar from "./components/navbar/Navbar";
import TagList from "./components/tabList/TagList";
import TodoContainer from "./components/todoContainer/TodoContainer";

export default function Home() {
  return (
    <div className="w-full h-screen border">
      {/* Navbar */}
      <Navbar />
      {/* Tags List */}
      <TagList className="py-2" />
      {/* Todo Container */}
      <TodoContainer />
    </div>
  );
}
