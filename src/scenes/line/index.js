import { Box } from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";

const Linechart = () => {
  return (
    <Box m="20px">
      <Header title="Line CHART" subtitle="Simple line chart" />
      <Box height="75vh">
        <LineChart />
      </Box>
    </Box>
  );
};

export default Linechart;
