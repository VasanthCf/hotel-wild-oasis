import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import styled from "styled-components";
import { PAGE_SIZE } from "../utils/constants";
import { useSearchParams } from "react-router-dom";

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();

  // *****get the CURRENT PAGE from params or Set to 1*****
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  // count = maximum items / how much you want to show in your page=== PAGE COUNT// ****count =24/5=5****
  const pageCount = Math.ceil(count / PAGE_SIZE);
  // MOVE TO NEXT PAGE........................................................................
  function nextPage() {
    //****currentPage===5?5:4+1****
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set("page", next);
    setSearchParams(searchParams);
  }

  // MOVE TO PREVIOUS PAGE.......................................................................
  function previousPage() {
    // ****prev=1?1:5-1****
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set("page", prev);
    setSearchParams(searchParams);
  }
  // NO PAGE COUNT // the maximum item is 4......................................................
  if (pageCount <= 1) return null;

  return (
    <StyledPagination>
      <P>
        Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> &mdash;{" "}
        <span>
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
        </span>{" "}
        of <span>{count}</span> results
      </P>
      <Buttons>
        {currentPage !== 1 && (
          <PaginationButton onClick={previousPage} disabled={currentPage === 1}>
            <HiChevronLeft /> <span>Previous</span>
          </PaginationButton>
        )}

        {currentPage < pageCount && (
          <PaginationButton
            onClick={nextPage}
            disabled={currentPage === pageCount}
          >
            <span>Next</span>
            <HiChevronRight />
          </PaginationButton>
        )}
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;

//STYLE COMP // StyledPagination--P--Buttons--PaginationButton........................
const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;
