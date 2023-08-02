import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

function CabinTable() {
  // custom hook for getting data from query..............................
  const { isLoading, cabin } = useCabins();

  const [searchParams] = useSearchParams();
  if (isLoading) return <Spinner />;
  if (!cabin.length) return <Empty resourceName={"cabin"} />;
  // 1)Filter
  const filterValue = searchParams.get("discount") || "all";
  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabin;
  if (filterValue === "no-discount")
    filteredCabins = cabin.filter((cab) => cab.discount === 0);
  if (filterValue === "with-discount")
    filteredCabins = cabin.filter((cab) => cab.discount > 0);
  // 2)Sort
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}
// STYLED COMP// TableHeader--Table
export default CabinTable;
