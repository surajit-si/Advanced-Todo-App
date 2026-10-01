import BottomNavbar from "./components/bottomNavbar/BottomNavbar";
import DeletePopup from "./components/deleteButton/DeletePopup";
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
      {/* Delete Button */}
      <DeletePopup
        leftSideButtonName="Cancel"
        leftSideButtonClassName="text-primary"
        rightSideButtonName="Delete"
        rightSideButtonClassName="text-white bg-danger"
        className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
      >
        <h1 className="text-2xl">Are you sure?</h1>
      </DeletePopup>
    </div>
  );
}
