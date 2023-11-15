import makeStyles from "@mui/styles/makeStyles";
import Web from "../../assets/images/web.png";
import Blog from "../../assets/images/blog-bg.png";
import Contact from "../../assets/images/contact-pg.png";
import Categories from "../../assets/images/categories-bg.png";
import Price from "../../assets/images/price-bg.png";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiInputBase-root": {
      color: theme.palette.text.secondary,
    },
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: theme.palette.common.black,
      },
    },
    overflowX: "hidden",
  },
  cardContainer: {
    background: "linear-gradient(180deg, #E5EDEF 0%, #FFFFFF 100%)",
    borderRadius: "0px",
    // padding: "40px",
  },
  RightWrapper: {
    backgroundColor: theme.palette.primary.main,
    width: "90%",
    minHeight: "90vh",
    display: "flex",
    marginLeft: "auto",
    // padding: "10rem 0rem 10rem 0rem",
    borderTopLeftRadius: "5rem",
    borderBottomLeftRadius: "5rem",
  },
  cardWrapper: {
    backgroundColor: theme.palette.primary.main,
    width: "90%",
    minHeight: "90vh",
    display: "flex",
    marginLeft: "auto",
    borderTopLeftRadius: "5rem",
    borderBottomLeftRadius: "5rem",
    backgroundImage: `url(${Categories})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "relative",
  },
  blogWrapper: {
    backgroundColor: theme.palette.primary.main,
    width: "90%",
    minHeight: "90vh",
    display: "flex",
    marginLeft: "auto",
    borderTopLeftRadius: "5rem",
    borderBottomLeftRadius: "5rem",
    backgroundImage: `url(${Blog})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",

    [theme.breakpoints.down("md")]: {
      backgroundImage: "none",
    },
  },
  appContainer: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: "0px",
    width: "100%",
    height: "auto",
  },
  contactContainer: {
    background: "linear-gradient(180deg, #2d6734 0%, #94e469 100%)",
    borderRadius: "0px",
    width: "100%",
    [theme.breakpoints.down("md")]: {
      background: theme.palette.primary.main,
    },
  },
  leftWrapper: {
    background: "linear-gradient(180deg, #E5EDEF 0%, #FFFFFF 100%)",
    width: "80%",
    minHeight: "80vh",
    borderTopRightRadius: "5rem",
    borderBottomRightRadius: "5rem",
    position: "relative",
  },
  appWrapper: {
    background: "linear-gradient(180deg, #FFFFFF 0%, #E5EDEF 100%)",
    width: "80%",
    minHeight: "110vh",
    borderTopRightRadius: "5rem",
    borderBottomRightRadius: "5rem",
    position: "relative",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    [theme.breakpoints.down("md")]: {
      width: "90%",
    },
  },
  priceContainer: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: "0px",
    width: "100%",
    clear: "both",
  },
  priceWrapper: {
    background: "white",
    width: "90%",
    minHeight: "90vh",
    borderTopRightRadius: "5rem",
    borderBottomRightRadius: "5rem",
    display: "flex",
    alignItems: "center",
    position: "relative",
    backgroundImage: `url(${Price})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  bgText: {
    position: "absolute",
    bottom: 100,
    right: 200,
    fontSize: 80,
    fontWeight: 500,
    color: "#000000",
    mixBlendMode: "normal",
    opacity: 0.24,
  },
  bgTextSmall: {
    position: "absolute",
    bottom: 10,
    right: 10,
    fontSize: 50,
    fontWeight: 500,
    color: "#000000",
    mixBlendMode: "normal",
    opacity: 0.24,
  },
  caseContainer: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: "0px",
    width: "100%",
    clear: "both",
  },
  caseWrapper: {
    background:
      "linear-gradient(180.27deg, #CED8DA 0.09%, #E1E5E8 36.76%, #E6EBEE 72.67%, #f1f1f1  99.63%)",
    width: "90%",
    minHeight: "95vh",
    borderTopRightRadius: "5rem",
    borderBottomRightRadius: "5rem",
    display: "flex",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  techContainer: {
    background: "linear-gradient(180.62deg, #FCFCFD 0.54%, #CDD7D8 100.36%)",
  },
  techWrapper: {
    backgroundColor: theme.palette.primary.main,
    width: "90%",
    minHeight: "90vh",
    display: "flex",
    marginLeft: "auto",
    borderTopLeftRadius: "5rem",
    borderBottomLeftRadius: "5rem",
    backgroundImage: `url(${Web})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  blogContainer: {
    background: "linear-gradient(180deg, #EDF1F2 0%, #F1F3F3 100%)",
  },
  contactWrapper: {
    background: "linear-gradient(180deg, #f0f0fd 0%, #FFFFFF 100%)",
    width: "95%",
    minHeight: "80vh",
    borderTopRightRadius: "5rem",
    borderBottomRightRadius: "5rem",
    display: "flex",
    backgroundImage: `url(${Contact})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  footerContainer: {
    background: "white",
    width: "100%",
    marginTop: "60px",
  },
  footerWrapper: {
    backgroundColor: theme.palette.primary.main,
    width: "90%",
    display: "flex",
    marginLeft: "auto",
    borderTopLeftRadius: "5rem",
    borderBottomLeftRadius: "5rem",
  },
  searchWrapper: {
    width: "100%",
    marginTop: -28,
  },
  upperFruits: {
    position: "absolute",
    left: 0,
    top: 0,
    height: "100%",
  },
  bannerContainer: {
    position: "absolute",
    right: "2%",
    top: "2.5%",
    zIndex: 1000,
    [theme.breakpoints.down("md")]: {
      position: "relative",
    },
  },
  bannerTwo: {
    maxWidth: "40vw",
    width: "40%",
    height: "40%",
    marginTop: "15%",
  },
  bannerOne: {
    width: "40%",
    height: "40%",
    maxWidth: "60vw",
    marginTop: "30%",
  },
  topBottomMargin: {
    marginTop: "10rem",
    marginBottom: "10rem",
  },
  lowerFruits: { position: "absolute", left: 0, top: 0, height: "100%" },
}));

export default useStyles;
