import BottomNavbar from "./_components/bottomNavbar/BottomNavbar";
import Navbar from "./_components/navbar/Navbar";
import TagList from "./_components/tabList/TagList";
import TodoContainer from "./_components/todoContainer/TodoContainer";
import TodoCreationTab from "./_components/TodoCreationTab/TodoCreationTab";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ isCreating: string; isDeleting: string }>;
}) {
  const { isCreating, isDeleting } = await searchParams;
  const showCreationTab = isCreating === "true";
  // const showDeletingTab = isDeleting === "true";

  return (
    <div className="w-full h-screen border relative bg-white">
      {/* Navbar */}
      <Navbar />
      {/* Tags List */}
      <TagList className="" />
      {/* Todo Container */}
      <TodoContainer />

      {/* Bottom Navbar */}
      <BottomNavbar className="" />
      {/* Delete Button */}

      {/* {showDeletingTab && (
        <DeletePopup
          leftSideButtonName="Cancel"
          leftSideButtonClassName="text-primary"
          rightSideButtonName="Delete"
          rightSideButtonClassName="text-white bg-danger"
          className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
        >
          <h1 className="text-2xl">Are you sure?</h1>
        </DeletePopup>
      )} */}

      {showCreationTab && (
        <TodoCreationTab className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" />
      )}
    </div>
  );
}
