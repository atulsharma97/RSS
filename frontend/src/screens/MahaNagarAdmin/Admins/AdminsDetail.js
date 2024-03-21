import axios from "axios";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import LoadingBox from "../../../components/LoadingBox";

const columns = [
  { field: "user_id", headerName: "आई डी", width: 135 },
  { field: "user_name", headerName: "नाम", width: 200 },
  {
    field: "admin_info",
    headerName: "एडमिन",
    width: 200,
    renderCell: (params) => {
      const adminInfo = params.value;

      const adminName = adminInfo ? adminInfo.name : "";
      return <span>{`${adminName} (${adminInfo.role})`}</span>;
    },
  },

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

const AdminsDetail = () => {
  const [user, SetUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const apibaseUrl = process.env.REACT_APP_API_URL;

  const handleEdit = (id) => {
    navigate(`/dashboard/make-useradmin/${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${apibaseUrl}admins`);
        if (data.status === 200) {
          SetUser(data.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <LoadingBox />
      ) : (
        <>
          <div
            style={{ height: "84vh", width: "100%", padding: "20px" }}
            className="data-table"
          >
            <DataGrid
              rows={user.map((user) => ({ ...user, id: user.user_id }))}
              columns={[...columns]}
              getRowHeight={(params) => 40}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
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

export default AdminsDetail;
