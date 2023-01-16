import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { fetchFromAPI } from "../../utils/fetchData";

const Users = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [comments, setComments] = useState("");

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "User Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "cmnt",
      headerName: "Comment",
      flex: 1,
    },
  ];

  useEffect(() => {
    (async () => {
      let comments = await fetchFromAPI("https://dummyjson.com/comments");
      let finalComments = [];
      for (let comment of comments.comments) {
        let currentComment = {};
        currentComment.id = comment.id;
        currentComment.name = comment.user.username;
        currentComment.cmnt = comment.body;
        finalComments.push(currentComment);
      }
      console.log(finalComments);
      setComments(finalComments);
    })();
  }, []);

  return (
    <Box m="20px">
      <Header title="Comments" subtitle="List of User Comments" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={comments}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Users;
