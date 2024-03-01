import axios from "axios";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

const columns = [
  { field: "user_id", headerName: "आई डी", width: 135 },
  { field: "user_name", headerName: "नाम", width: 250 },
  { field: "age", headerName: "उम्र", width: 130 },
  { field: "address", headerName: "पता", width: 200 },
  { field: "city", headerName: "शहर", width: 130 },
  { field: "nagar", headerName: "नगर", width: 130 },
  { field: "shikshan_name", headerName: "शिक्षण", width: 130 },
  { field: "accupation", headerName: "व्यवसाय", width: 130 },
  { field: "vibhag_name", headerName: "विभाग", width: 130 },
  { field: "daitva_name", headerName: "दायित्व", width: 130 },
  { field: "shaka_nagar_name", headerName: "शाखा नगर", width: 130 },
  { field: "basti_name", headerName: "बस्ती", width: 130 },
  { field: "shaka_name", headerName: "शाखा", width: 130 },
  { field: "phone_no", headerName: "मों.नंबर", width: 130 },

  // {
  //   field: "age",
  //   headerName: "Age",
  //   type: "number",
  //   width: 90,
  // },
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  // },
];

// const rows = [
//   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
//   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
//   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
//   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
//   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
//   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
//   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
//   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
//   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
// ];

function Home() {
  const [user, SetUser] = useState([]);
  const navigate = useNavigate();

  console.log("user", user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://localhost/CI/public/users");
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

    fetchData(); // Call the fetchData function
  }, []); // Ensure that the dependency array is provided and empty for a one-time effect

  return (
    <>
      <div
        style={{ height: "84vh", width: "85%", padding: "20px" }}
        className="data-table"
      >
        <DataGrid
          rows={user.map((user) => ({ ...user, id: user.user_id }))}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{
            ".MuiDataGrid-iconButtonContainer": {
              visibility: "visible",
            },
            ".MuiDataGrid-sortIcon": {
              opacity: "inherit !important",
            },
          }}
        />
      </div>
    </>
  );
}

export default Home;
