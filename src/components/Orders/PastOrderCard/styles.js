import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  disabledText: {
    color: "black",
  },
  textBold: {
    fontWeight: 600,
  },
  smallText: {
    fontSize: "0.875rem",
  },
  line: {
    margin: theme.spacing(2, 0),
  },
  card: {
    background: theme.palette.primary.dark,
    boxShadow: " 0px 0px 8px rgba(0, 0, 0, 0.18)",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(4),
    borderRadius: theme.spacing(2),
  },
  img: {
    borderRadius: theme.spacing(2),
    width: 100,
    height: 100,
    [theme.breakpoints.down("md")]: {
      width: 60,
      height: 60,
    },
  },
  divider: {
    background: theme.palette.common.black,
    marginTop: 10,
  },
  status: {
    borderRadius: 10,
    backgroundColor: theme.palette.primary.dark,
    padding: 13,
    width: 100,
    marginTop: theme.spacing(2),
    border: "1px solid",
  },
}));

export default useStyles;
