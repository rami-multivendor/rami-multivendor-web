/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { GoogleMap, Marker } from "@react-google-maps/api";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import { Header } from "../../components/Header";
import {
  DetailCard,
  StatusCard,
  AmountCard,
  ModalView,
} from "../../components/Orders";
import UserContext from "../../context/User";
import Analytics from "../../utils/analytics";
import { ORDER_STATUS } from "../../utils/constantValues";
import Background from "./Background";
import useStyles from "./styles";
import { mapStyles } from "./mapStyles";
import { useLocationContext } from "../../context/Location";
import Promotion from "../../components/Promotion/Promotion";
import { Chat } from "../../components/Chat";
import RestMarker from "../../assets/images/rest-map-2.png";
import DestMarker from "../../assets/images/dest-map-2.png";
import MarkerImage from "../../assets/images/marker.png";
import TrackingRider from "../../components/Orders/OrderDetail/TrackingRider";
import { useSubscription } from "@apollo/client";
import { subscriptionOrder } from "../../apollo/server";
import gql from "graphql-tag";
import Modal from 'react-modal'
import { reviewOrder } from '../../apollo/server'
import { useMutation } from '@apollo/client'
import FlashMessage from '../../components/FlashMessage'
import ThreeDots from '../../components/ThreeDots/ThreeDots'
import StarRatings from 'react-star-ratings';


// constants
const REVIEWORDER = gql`
  ${reviewOrder}
`

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function OrderDetail() {
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();
  let { id } = useParams();
  const navigate = useNavigate();
  let destCoordinates = null;
  let restCoordinates = {};
  const queryParams = useQuery();
  const [toggleChat, setToggleChat] = useState(false);
  const { location } = useLocationContext();
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0)
  const [description, setDescription] = useState('')
  const mobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mutate, { loading: loadingMutation }] = useMutation(REVIEWORDER, {
    onError,
    onCompleted,
  })

  useEffect(() => {
    async function Track() {
      await Analytics.track(Analytics.events.NAVIGATE_TO_RATEANDREVIEW)
    }
    Track()
  }, [])

  function onFinishRating(rating) {
    setRating(rating)
  }

  function onChangeText(description) {
    setDescription(description)
  }

  function onSubmit() {
    console.log('submitted')
    mutate({
      variables: {
        order: id,
        rating: rating,
        description: description,
      },
    })
  }

  function onCompleted(data) {
    closeModal()

  }

  function onError(error) {
    console.log(JSON.stringify(error))
    FlashMessage({
      message: error.networkError.result.errors[0].message,
    })
  }

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  }

  useSubscription(
    gql`
      ${subscriptionOrder}
    `,
    { variables: { id } }
  );

  const onLoad = useCallback(
    (map) => {
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(restCoordinates);
      bounds.extend(destCoordinates);
      map.fitBounds(bounds);
      map.panToBounds(bounds);
    },
    [restCoordinates, destCoordinates]
  );

  const { loadingOrders, errorOrders, orders, clearCart } =
    useContext(UserContext);

  useEffect(async () => {
    await Analytics.track(Analytics.events.NAVIGATE_TO_ORDER_DETAIL, {
      orderId: id,
    });
  }, []);
  useEffect(() => {
    if (!id) {
      navigate("/orders");
    }
    if (queryParams.get("clearCart")) {
      clearCart();
    }
  }, [id]);

  if (errorOrders) {
    return (
      <Grid container className={classes.spinnerContainer}>
        <Header />
        <Typography>{errorOrders.message}</Typography>
      </Grid>
    );
  }
  const order = orders.find((o) => o._id === id);
  if (loadingOrders || !order) {
    return (
      <Grid container className={classes.spinnerContainer}>
        <Header />
        <CircularProgress color="primary" size={48} />
      </Grid>
    );
  }
  restCoordinates = {
    lat: parseFloat(order.restaurant.location.coordinates[1]),
    lng: parseFloat(order.restaurant.location.coordinates[0]),
  };
  if (!ORDER_STATUS.includes(order.orderStatus)) {
    restCoordinates = {
      lat: parseFloat(order.restaurant.location.coordinates[1]),
      lng: parseFloat(order.restaurant.location.coordinates[0]),
    };
    destCoordinates = {
      lat: parseFloat(order.deliveryAddress.location.coordinates[1]),
      lng: parseFloat(order.deliveryAddress.location.coordinates[0]),
    };
  }
  return (
    <>
      <Background>
        <Grid container>
          <Header />
          {loadingOrders || !order ? (
            <CircularProgress color="primary" size={48} />
          ) : errorOrders ? (
            <Typography>Unable to load data </Typography>
          ) : order?.orderStatus !== "CANCELLED" ? (
            <Grid container item>
              {!["CANCELLED", "DELIVERED"].includes(order.orderStatus) && (
                <Grid item xs={12} className={classes.topContainer}>
                  <GoogleMap
                    mapContainerStyle={{
                      height: small ? "450px" : "500px",
                      width: "100%",
                    }}
                    zoom={14}
                    center={restCoordinates}
                    onLoad={destCoordinates && onLoad}
                    options={{
                      styles: mapStyles,
                      zoomControl: true,
                      zoomControlOptions: {
                        position: window.google.maps.ControlPosition.RIGHT_TOP,
                      },
                    }}
                  >
                    {location && (
                      <Marker
                        position={{
                          lat: location?.latitude,
                          lng: location?.longitude,
                        }}
                        icon={MarkerImage}
                      />
                    )}
                    <Marker position={restCoordinates} icon={RestMarker} />
                    <Marker position={destCoordinates} icon={DestMarker} />
                    {order.rider && <TrackingRider id={order.rider._id} />}
                  </GoogleMap>

                  <Container
                    disableGutters
                    maxWidth={small ? "100%" : "md"}
                    className={classes.orderStatus}
                  >
                    <StatusCard {...order} />
                  </Container>
                </Grid>
              )}
              {order?.rider && (
                <Box
                  className={classes.chat}
                  onClick={() => {
                    setToggleChat(true);
                  }}
                >
                  <Typography
                    variant="body2"
                    color="common"
                    className={(classes.textBold, classes.smallText)}
                  >
                    Chat with rider
                  </Typography>
                </Box>
              )}

              <Box
                className={classes.chat}
                onClick={() => {
                  openModal()
                }}
              >
                <Typography
                  variant="body2"
                  color="common"
                  className={(classes.textBold, classes.smallText)}
                >
                  Review
                </Typography>
              </Box>

              {toggleChat && (
                <Chat setToggleChat={setToggleChat} id={order?._id} />
              )}

              <Grid container style={{ marginTop: theme.spacing(20) }}>
                <DetailCard {...order} />
              </Grid>
              <Grid
                container
                style={{
                  marginTop: theme.spacing(8),
                  marginBottom: theme.spacing(8),
                }}
              >
                <AmountCard {...order} />
              </Grid>
            </Grid>
          ) : (
            <ModalView />
          )}
        </Grid>
      </Background>
      <Promotion />
      <Footer />
      <Modal
      isOpen={isOpen} // pass the isOpen prop to control the modal visibility
      onRequestClose={closeModal} // pass the onClose prop to handle closing the modal
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          transform: 'translate(-50%, -50%)',
          width: mobile ? "80%" : "50%", // Add the desired width here
          height: mobile ? "40%" : "35%", // Add the desired height here
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      <div style={{ flex: 1, textAlign: '-webkit-center', padding: mobile ? 0 :'30px' }}>
        <div style={{ width: '100%', height: '100%' }}>
          <h2>Write a Review</h2>
        </div>
        <div style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ width: '70%', height: '60%' }}>
          <StarRatings
            emptyStarColor="#90EA93" // Set the empty star color to #90EA93
            fullStarColor="#90EA93" // Set the full star color to #90EA93
            disabled={false}
            maxStars={5}
            rating={rating}
            changeRating={onFinishRating}
            starDimension= {mobile ? "20px" : "50px"}
          />
          </div>
        </div>
        <div style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <input
            style={{
              marginTop: '30px',
              height: '100%',
              color: '#212121',
              width: mobile ?  '100%' : '40%',
              border: 'none',
              borderBottom: '1px solid #7F7F7F',
              outline: 'none',
            }}
            placeholderTextColor='#7F7F7F'
            onChange={(e) => onChangeText(e.target.value)}
            placeholder='More detailed reviews get more visibility...'
          />
        </div>
        <div style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ width: '80%', height: '10%' }}>
            {loadingMutation && <ThreeDots />}
            {!loadingMutation && (
              <button
                onClick={onSubmit}
                style={{ width: '40%', color: 'white', backgroundColor: '#90EA93', marginTop: '20px',  border: 'none', padding: '10px' }}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: '#000' }} />
    </Modal>
    </>
  );
}

export default OrderDetail;
