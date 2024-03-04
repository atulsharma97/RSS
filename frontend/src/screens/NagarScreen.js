import axios from "axios";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

const columns = [
  { field: "city", headerName: "शहर", width: 130 },
  { field: "nagar", headerName: "नगर", width: 130 },
  {
    field: "button",
    headerName: "Action",
    width: 130,
    renderCell: (params) => (
      <button onClick={() => console.log("Button clicked!")}>Click me</button>
    ),
  },
];
const rows = [
  { id: 1, city: "Snow", शहर: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];
export default function NagarScreen() {
  const [user, SetUser] = useState([]);
  const apibaseUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  console.log("user", user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${apibaseUrl}users`);
        console.log("response", data);
        if (data.status === 200) {
          SetUser(data.data);
          // Redirect to another page upon success
          // navigate('/')
        }
      } catch (error) {
        // Handle errors
        console.error("Error fetching data:", error);
      }
    };

    // fetchData(); // Call the fetchData function
  }, []);
  return (
    <>
      <div
        style={{ height: "84vh", width: "100%", padding: "20px" }}
        className="data-table"
      >
        <DataGrid
          //   rows={user.map((user) => ({ ...user, id: user.user_id }))}
          rows={rows}
          columns={columns}
          getRowHeight={(params) => 40}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
          // checkboxSelection
          sx={{
            ".MuiDataGrid-iconButtonContainer": {
              visibility: "visible",
            },
            ".MuiDataGrid-sortIcon": {
              opacity: "inherit !important",
            },
            ".MuiDataGrid-virtualScroller": {
              "&::-webkit-scrollbar": {
                width: "5px",
                height: "5px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#ff9933", // Customize the color of the scrollbar thumb
                borderRadius: "6px", // Customize the border radius of the scrollbar thumb
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "#ff9933", // Customize the color of the scrollbar thumb on hover
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "#e5e5e5", // Customize the color of the scrollbar track
              },
            },
          }}
        />
      </div>
    </>
  );
}
