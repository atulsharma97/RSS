import axios from "axios";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import LoadingBox from "../../../components/LoadingBox";

const columns = [
  { field: "basti_id", headerName: "आई डी", width: 130 },
  { field: "basti_name", headerName: "बस्ती", width: 130 },
  { field: "shaka_nagar_name", headerName: "शाखा नगर", width: 150 },
  {
    field: "city",
    headerName: "शहर",
    width: 130,
    renderCell: (params) => {
      return <>उज्जैन</>;
    },
  },
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

const BastiScreen = () => {
  const [user, SetUser] = useState([]);
  const [serialNumber, setSerialNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const apibaseUrl = process.env.REACT_APP_API_URL;

  // const handleEdit = (id) => {
  //   navigate(`/dashboard/make-useradmin/${id}`);
  // };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${apibaseUrl}/get/basti`);

        if (data.status === 200) {
          SetUser(data.data);
          setLoading(false);
          // Redirect to another page upon success
          // navigate('/')
        }
      } catch (error) {
        // Handle errors
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData(); // Call the fetchData function
  }, []); // Ensure that the dependency array is provided and empty for a one-time effect

  return (
    <>
      {loading ? (
        <LoadingBox />
      ) : (
        <>
          <ul className="nav-style1">
            <li>
              <Link to="/basti">
                <a className="active">बस्ती</a>
              </Link>
            </li>
            <li>
              <Link to="/create-bastis">
                <a>बस्ती जोड़ें</a>
              </Link>
            </li>
          </ul>
          <div
            style={{ width: "50%", padding: "20px" }}
            className="data-table-basti"
          >
            <DataGrid
              rows={user.map((user, index) => ({ ...user, id: user.basti_id }))}
              // rows={user.map((user, index) => ({
              //   ...user,
              //   id: user.user_id,
              //   "": index + 1,
              // }))}
              columns={[...columns]}
              getRowHeight={(params) => 40}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
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
      )}
    </>
  );
};

export default BastiScreen;
