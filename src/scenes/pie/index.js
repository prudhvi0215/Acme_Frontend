import { Box } from "@mui/material";
import Header from "../../components/Header";
import PieChart from "../../components/PieChart";

const Piechart = () => {
  return (
    <Box m="20px">
      <Header title="PIE CHART" subtitle="Simple pie chart" />
      <Box height="75vh">
        <PieChart />
      </Box>
    </Box>
  );
};

export default Piechart;
