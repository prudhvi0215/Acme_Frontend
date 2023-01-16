import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard/index";
import Team from "./scenes/team/index";
import Contacts from "./scenes/contacts/index";
import Invoices from "./scenes/invoices/invoices";
import Form from "./scenes/form/index";
import Calendar from "./scenes/calendar/index";
import Users from "./scenes/users/index";
import Comments from "./scenes/comments/index";
import FAQ from "./scenes/faq";
import Bar from "./scenes/bar/index";
import Pie from "./scenes/pie/index";
import Line from "./scenes/line/index";
import Geography from "./scenes/geo/index";
import UnAuthorized from "./scenes/401/index";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            <Routes>
              <Route
                path="/"
                element={
                  localStorage.getItem("accessToken") != null ? (
                    <Dashboard />
                  ) : (
                    <UnAuthorized />
                  )
                }
              />
              <Route
                path="/team"
                element={
                  localStorage.getItem("accessToken") != null ? (
                    <Team />
                  ) : (
                    <UnAuthorized />
                  )
                }
              />
              <Route
                path="/contacts"
                element={
                  localStorage.getItem("accessToken") != null ? (
                    <Contacts />
                  ) : (
                    <UnAuthorized />
                  )
                }
              />
              <Route
                path="/invoices"
                element={
                  localStorage.getItem("accessToken") != null ? (
                    <Invoices />
                  ) : (
                    <UnAuthorized />
                  )
                }
              />
              <Route
                path="/form"
                element={
                  localStorage.getItem("accessToken") != null ? (
                    <Form />
                  ) : (
                    <UnAuthorized />
                  )
                }
              />
              <Route
                path="/calendar"
                element={
                  localStorage.getItem("accessToken") != null ? (
                    <Calendar />
                  ) : (
                    <UnAuthorized />
                  )
                }
              />
              <Route
                path="/users"
                element={
                  localStorage.getItem("accessToken") != null ? (
                    <Users />
                  ) : (
                    <UnAuthorized />
                  )
                }
              />
              <Route
                path="/comments"
                element={
                  localStorage.getItem("accessToken") != null ? (
                    <Comments />
                  ) : (
                    <UnAuthorized />
                  )
                }
              />
              <Route
                path="/faq"
                element={
                  localStorage.getItem("accessToken") != null ? (
                    <FAQ />
                  ) : (
                    <UnAuthorized />
                  )
                }
              />
              <Route
                path="/bar"
                element={
                  localStorage.getItem("accessToken") != null ? (
                    <Bar />
                  ) : (
                    <UnAuthorized />
                  )
                }
              />
              <Route
                path="/pie"
                element={
                  localStorage.getItem("accessToken") != null ? (
                    <Pie />
                  ) : (
                    <UnAuthorized />
                  )
                }
              />
              <Route
                path="/line"
                element={
                  localStorage.getItem("accessToken") != null ? (
                    <Line />
                  ) : (
                    <UnAuthorized />
                  )
                }
              />
              <Route
                path="/geography"
                element={
                  localStorage.getItem("accessToken") != null ? (
                    <Geography />
                  ) : (
                    <UnAuthorized />
                  )
                }
              />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
