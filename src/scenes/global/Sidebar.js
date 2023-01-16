import React, { useState } from "react";
import { ProSidebarProvider, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
// import "react-pro-sidebar/dist/css/styles.css";
// import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
      <MenuItem
        active={selected === title}
        style={{
          color: colors.grey[100],
        }}
        onClick={() => setSelected(title)}
        icon={icon}
      >
        <Link
          to={to}
          sx={{
            "& .ps-menuitem-root": {
              // textDecoration: "none",
              // border: "5px solid black",
              fontSize: "30px",
            },
          }}
        >
          <Typography>{title}</Typography>
        </Link>
      </MenuItem>
    );
  };

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
        width: !isCollapsed ? "30%" : "20%",
      }}
    >
      <ProSidebarProvider collapsed={isCollapsed}>
        <Menu>
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  Acme Inc
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`data:image/jpeg;base64,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`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  ACME
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  Let's get insights
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>
            <Item
              title="Manage Team"
              to="/team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Contacts Information"
              to="/contacts"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Invoices Balances"
              to="/invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Pages
            </Typography>
            <Item
              title="Profile Form"
              to="/form"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Users"
              to="/users"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Comments"
              to="/comments"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ Page"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Charts
            </Typography>
            <Item
              title="Bar Chart"
              to="/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Pie Chart"
              to="/pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Line Chart"
              to="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Geography Chart"
              to="/geography"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebarProvider>
    </Box>
  );
};

export default Sidebar;
