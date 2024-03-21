import axios from "axios";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import LoadingBox from "../../../components/LoadingBox";
import { useContext } from "react";
import { Store } from "../../../Store";

const columns = [
  { field: "id", headerName: "शाखा आई डी", width: 130 },
  { field: "name", headerName: "शाखा", width: 300 },
];

const BastiDetails = () => {
  const [user, SetUser] = useState([]);
  const [serialNumber, setSerialNumber] = useState(1);
  const [shakhanagar, setShakhanagar] = useState({});
  const [basti, setBasti] = useState([]);
  const [selectedBastiId, setSelectedBastiId] = useState(null);
  const [shakha, setShakha] = useState([]);
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const apibaseUrl = process.env.REACT_APP_API_URL;

  const handleEdit = (id) => {
    navigate(`/dashboard/make-useradmin/${id}`);
  };

  const fetchShakhaData = async (bastiId) => {
    try {
      const { data } = await axios.get(
        `${apibaseUrl}get/shaka/by-basti/${userInfo.data.admin_of}`
      );
      if (data.status === 200) {
        setShakha(data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    if (userInfo && userInfo.data && userInfo.data.admin_of) {
      const bastiId = userInfo.data.admin_of;
      fetchShakhaData(bastiId); // Fetch Shakha data based on the Basti ID stored in admin_of
    }
  }, [userInfo]);

  return (
    <>
      {loading ? (
        <LoadingBox />
      ) : (
        <>
          {/* <div className="nagar-details">
            <div className="heading1">
              <h3>बस्ती चुनें</h3>
            </div>

          </div> */}
          <div
            // style={{ width: "50%", padding: "20px", minHeight: "200px" }}
            className="data-table-vibhag"
          >
            <DataGrid
              rows={shakha.map((shakha) => ({ ...shakha, id: shakha.id }))}
              // rows={user.map((user, index) => ({
              //   ...user,
              //   id: user.user_id,
              //   "": index + 1,
              // }))}
              columns={[...columns]}
              getRowId={(row) => row.id}
              getRowHeight={(params) => 40}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
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
      )}
    </>
  );
};

export default BastiDetails;