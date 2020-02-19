import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import axios from "axios";

export default function SPList(props) {
  console.log("SPList Props", props);
  const [data, setData] = useState([]);

  const refreshListData = () => {
    axios
      .get(
        `${props.baseUrl}/_api/web/lists/getByTitle('${props.listName}')/items`
      )
      .then(response => {
        setData(response.data.value);
      });
  };

  useEffect(() => {
    refreshListData();
    return () => {
      setData([]);
    };
  }, []);

  return <MaterialTable {...props} data={data} />;
}
