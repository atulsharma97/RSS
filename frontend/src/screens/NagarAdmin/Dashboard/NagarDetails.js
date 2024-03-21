import axios from "axios";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import LoadingBox from "../../../components/LoadingBox";
import { useContext } from "react";
import { Store } from "../../../Store";

const columns = [
  { field: "id", headerName: "आई डी", width: 130 },
  { field: "name", headerName: "शाखा", width: 300 },
];

const NagarDetails = () => {
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${apibaseUrl}get/shaka-nagar/${userInfo.data.admin_of}`
        );
        if (data.status === 200) {
          setShakhanagar(data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchBastiData = async () => {
      try {
        if (shakhanagar.id) {
          const { data } = await axios.get(
            `${apibaseUrl}get/basti/by-shaka-nagar/${shakhanagar.id}`
          );
          if (data.status === 200) {
            setBasti(data.data);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchBastiData();
  }, [shakhanagar]);

  const fetchShakhaData = async (id) => {
    try {
      const { data } = await axios.get(`${apibaseUrl}get/shaka/by-basti/${id}`);
      if (data.status === 200) {
        setShakha(data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (id) => {
    if (selectedBastiId === id) {
      setSelectedBastiId(null);
    } else {
      setSelectedBastiId(id);
      fetchShakhaData(id);
    }
  };
  return (
    <>
      {loading ? (
        <LoadingBox />
      ) : (
        <>
          <div className="nagar-details">
            <div className="heading1">
              <h3>बस्ती चुनें</h3>
            </div>

            <select
              name="basti"
              id="basti"
              className="dropdown form-g1 form-input"
              required
              value={user.basti}
              onChange={(e) => handleChange(e.target.value)}
            >
              <option value="" disabled selected hidden>
                बस्ती चुनें
              </option>
              {basti.length > 0 ? (
                basti.map((basti) => (
                  <option key={basti.id} value={basti.id}>
                    {basti.name}
                  </option>
                ))
              ) : (
                <option value="">कोई बस्ती नहीं</option>
              )}
            </select>
          </div>
          <div
            // style={{ width: "50%", padding: "20px", minHeight: "200px" }}
            className="data-table-vibhag"
          >
            <DataGrid
              rows={shakha.map((shakha) => ({ ...shakha, id: shakha.id }))}
              columns={[...columns]}
              getRowId={(row) => row.id}
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

export default NagarDetails;
