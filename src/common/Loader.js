import { Fragment } from "react";
import { CircularProgress, Grid2 } from "@mui/material";
import { useSelector } from "react-redux";

const Loader = () => {
  const userDetails = useSelector((state) => state.userDetails);
  const { isLoading } = userDetails;
  return (
    <Fragment>
      {isLoading && (
        <Grid2 sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>
        <CircularProgress
          size="3rem"
          sx={{
            zIndex: 1001
          }}
        />
        </Grid2>
      )}
    </Fragment>
  );
};
export default Loader;
