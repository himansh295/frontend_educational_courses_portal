import { countReset } from "console";
import React, { useState, useEffect } from "react";
import "./App.css";
import * as data from "./mock.json";

const Pagination = (props) => {
  const { coursePerPage, onPageChange } = props;
  let dataLength = data.courses.length;
  let lastPage = Math.ceil(dataLength / coursePerPage);
  const [toogleState, setToogleState] = useState(false);

  const [pagenumber, setPagenumber] = useState(1);

  useEffect(() => {
    const val = coursePerPage * pagenumber;
    onPageChange(val - coursePerPage, val);
  }, [pagenumber]);

  function Page(val) {
    if (val == "Previous") {
      if (pagenumber === 1) {
        setPagenumber(1);
      } else {
        setPagenumber(pagenumber - 1);
      }
    } else {
      if (pagenumber === lastPage) setPagenumber(lastPage);
      else setPagenumber(pagenumber + 1);
    }
  }

  return (
    <div className="d-flex">
      <button className="PaginationButton" onClick={() => Page("Previous")}>
        Previous
      </button>

      <button className="PaginationButton" onClick={() => Page("Next")}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
