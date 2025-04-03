import { useEffect } from "react";
import { IUser } from "../../entities/table-user/model/types";

interface ToolBarProps {
  data: IUser[];
  setFilteredData: (filtered: IUser[]) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  cityFilter: string;
  setCityFilter: (value: string) => void;
  search: string;
  setSearch: (value: string) => void;
}

const ToolBar: React.FC<ToolBarProps> = ({
  data,
  setFilteredData,
  statusFilter,
  setStatusFilter,
  cityFilter,
  setCityFilter,
  search,
  setSearch,
}) => {
  const filtered = data.filter((user) => {
    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Active" ? user.status === true : user.status === false);

    const matchesCity =
      cityFilter === "All" ||
      user.city.toLowerCase() === cityFilter.toLowerCase();

    const searching = JSON.stringify(user)
      .toLowerCase()
      .includes(search.toLowerCase().trim());

    return matchesStatus && matchesCity && searching;
  });

  useEffect(() => {
    setFilteredData(filtered);
  }, [filtered, setFilteredData]); 

  return (
    <div className="flex justify-between w-[90%] m-auto py-[30px]">
      <div className='flex gap-[20px] items-center'>

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="border p-1 text-[gray] rounded-md py-[10px] px-[20px]"
      >
        <option value="All">All status</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>

      <select
        value={cityFilter}
        onChange={(e) => setCityFilter(e.target.value)}
        className="border p-1 text-[gray] rounded-md py-[10px] px-[20px]"
      >
        <option value="All">All cities</option>
        <option value="Dushanbe">Dushanbe</option>
        <option value="Khujand">Khujand</option>
        <option value="Tashkent">Tashkent</option>
      </select>
      </div>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border py-[10px] px-[10px] rounded-md p-1"
      />
    </div>
  );
};

export default ToolBar;



// 5. Features Layer
// 	•	Contains self-contained functionality that can be reused in different parts of the app.
// 	•	Example: “Like Button,” “User Search,” “Dark Mode Toggle.”
// 	•	A feature usually includes:
// 	•	UI components (specific to the feature).
// 	•	State management (Redux, Zustand, or React state).
// 	•	API calls (if needed).
// 	•	Features use entities but don’t directly depend on widgets or pages.

// ⸻

// 6. Entities Layer
// 	•	Represents core business logic and data models.
// 	•	Example: “User,” “Product,” “Order.”
// 	•	This layer handles:
// 	•	Data structures (TypeScript types, models).
// 	•	State management related to the entity.
// 	•	API interactions for fetching/updating entities.
// 	•	Features and widgets use entities, but entities should be independent.

// ⸻

// 7. Shared Layer
// 	•	Contains generic and reusable code used across the entire app.
// 	•	Example: UI components (buttons, inputs), utility functions, constants, hooks.
// 	•	Anything here should be agnostic (not tied to specific features or business logic).

// ⸻

// Summary of Layer Dependencies

// ✅ Lower layers (Shared, Entities) can be used everywhere.
// 🚫 Higher layers (Pages, Widgets, Features) should NOT depend on Pages.

// Would you like a simple folder structure example to see how this looks in practice?