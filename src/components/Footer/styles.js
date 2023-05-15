import makeStyles from "@mui/styles/makeStyles";

const useStyle = makeStyles((theme) => ({
  left: {
    backgroundColor: "#000",
    padding: "3rem",
    borderRadius: 80,
    [theme.breakpoints.down("md")]: {
      padding: "3rem",
    },
  },
  iconContainer: {
    backgroundColor: "#000",
    width: 40,
    height: 40,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
}));

export default useStyle;
