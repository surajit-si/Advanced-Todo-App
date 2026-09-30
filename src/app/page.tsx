import BottomNavbar from "./components/bottomNavbar/BottomNavbar";
import Navbar from "./components/navbar/Navbar";
import TagList from "./components/tabList/TagList";
import TodoContainer from "./components/todoContainer/TodoContainer";

export default function Home() {
  return (
    <div className="w-full h-screen border relative">
      {/* Navbar */}
      <Navbar />
      {/* Tags List */}
      <TagList className="" />
      {/* Todo Container */}
      <TodoContainer />

      {/* Bottom Navbar */}
      <BottomNavbar className="" />
    </div>
  );
}
