import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../../../Store";

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
];

const BastiUser = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [user, SetUser] = useState([]);
  const navigate = useNavigate();
  const apibaseUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.post(
          `${apibaseUrl}users/by-nagar-basti/${userInfo.data.admin_of}`,
          {
            admin_of: userInfo.data.role,
          }
        );

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
          checkboxSelection
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
};

export default BastiUser;
