import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "./../../ui/TableOperations";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No discount" },
          { value: "with-discount", label: "With discount" },
        ]}
      />
      <SortBy
        options={[
          { value: "name-asc", label: "sort by name (A-Z)" },
          { value: "name-desc", label: "sort by name (Z-A)" },
          { value: "regularPrice-asc", label: "sort by price (low to high)" },
          { value: "regularPrice-desc", label: "sort by price (high to low)" },
          { value: "maxCapacity-asc", label: "sort by capacity (low to high)" },
          {
            value: "maxCapacity-desc",
            label: "sort by capacity (high to low)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
