/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import { GoogleMap, Marker } from "@react-google-maps/api";
import clsx from "clsx";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "../../../hooks";
import FlashMessage from "../../FlashMessage";
import useStyle from "./styles";
import MarkerImage from "../../../assets/images/marker.png";
import ClearIcon from "@mui/icons-material/Clear";
import PlacesAutocomplete from "react-places-autocomplete";

function AddressModal({ toggleModal, isVisible, regionDetail, changeAddress }) {
  const classes = useStyle();
  const [region, setRegion] = useState(null);
  const [mainError, setMainError] = useState({});
  const [locationName, setLocationName] = useState("");
  const { getCurrentLocation } = useLocation();
  const { latLngToGeoString } = useLocation();
  const [loading, setLoading] = useState();
  const handleLocationSelection = (selectedLocation) => {
    setLocationName(selectedLocation);
  };

  useEffect(() => {
    if (regionDetail) {
      setRegion({
        lat: regionDetail.lat,
        lng: regionDetail.lng,
      });
      setLocationName(regionDetail.location);
    }
  }, [regionDetail]);

  const toggleSnackbar = useCallback(() => {
    setMainError({});
  }, []);

  const handleClearClick = () => {
    setLocationName("");
  };

  const changeCoordinates = async (coordinates, index) => {
    setLoading(true);
    (async () => {
      const { latLng } = coordinates;
      const regionChange = {
        lat: latLng.lat(),
        lng: latLng.lng(),
      };
      const geoCodeData = await latLngToGeoString({
        latitude: latLng.lat(),
        longitude: latLng.lng(),
      }); // pass a callback
      setLocationName(geoCodeData);
      setRegion(regionChange);
      return;
    })().finally(() => {
      setLoading(false);
    });
  };

  const submitAddress = useCallback(() => {
    if (region) {
      changeAddress((prev) => {
        return {
          ...prev,
          lat: region.lat,
          lng: region.lng,
          location: locationName,
        };
      });
    }
    toggleModal();
  }, [locationName, region]);
  const locationCallback = (error, data) => {
    setLoading(false);
    if (error) {
      setMainError({ type: "error", message: error });
      return;
    }
    setRegion({
      lat: data.latitude,
      lng: data.longitude,
    });
    setLocationName(data.deliveryAddress);
  };
  return (
    <>
      <FlashMessage
        open={Boolean(mainError.message)}
        severity={mainError.type}
        alertMessage={mainError.message}
        handleClose={toggleSnackbar}
      />
      <Dialog
        onClose={toggleModal}
        open={isVisible}
        scroll="body"
        fullWidth={true}
        maxWidth="sm"
        className={classes.root}
      >
        <Box display="flex" justifyContent="flex-end">
          <IconButton
            size="medium"
            onClick={toggleModal}
            className={classes.closeContainer}
          >
            <CloseIcon color="primary" />
          </IconButton>
        </Box>
        <DialogTitle>
          <Box component="div">
            <Typography
              variant="h5"
              color="textSecondary"
              className={clsx(classes.boldText, classes.title)}
            >
              Is this your exact location?
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <PlacesAutocomplete
            value={locationName}
            onChange={setLocationName}
            onSelect={handleLocationSelection}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div>
                <TextField
                  variant="outlined"
                  label="Enter your area"
                  fullWidth
                  {...getInputProps()}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {loading ? (
                          <CircularProgress size={24} />
                        ) : (
                          <>
                            {locationName && (
                              <IconButton onClick={handleClearClick}>
                                <ClearIcon color="primary" />
                              </IconButton>
                            )}
                            <IconButton
                              onClick={(e) => {
                                e.preventDefault();
                                if (!loading) {
                                  setLoading(true);
                                  getCurrentLocation(locationCallback);
                                }
                              }}
                              size="large"
                            >
                              <GpsFixedIcon color="primary" />
                            </IconButton>
                          </>
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
                <div>
                  {loading ? <div>Loading...</div> : null}
                  {suggestions.map((suggestion) => {
                    const style = {
                      backgroundColor: suggestion.active ? "#90EA93" : "#fff",
                      color: "black",
                      fontSize: "16px",
                      padding: "10px 16px",
                    };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, { style })}
                        key={suggestion.placeId}
                      >
                        {suggestion.description}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>

          <Box display="flex" className={classes.mapContainer}>
            <GoogleMap
              mapContainerStyle={{ height: "400px", width: "100%" }}
              zoom={16}
              options={{
                fullscreenControl: false,
                streetViewControl: false,
                MapTypeControlOptions: false,
                mapTypeControl: false,
              }}
              center={region}
            >
              <Marker
                position={region}
                draggable={true}
                onDragEnd={changeCoordinates}
                icon={MarkerImage}
              />
            </GoogleMap>
          </Box>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            className={classes.btnBase}
            onClick={(e) => {
              e.preventDefault();
              submitAddress();
            }}
          >
            {loading ? (
              <CircularProgress color="secondary" />
            ) : (
              <Typography variant="subtitle2" className={classes.boldText}>
                Submit
              </Typography>
            )}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default React.memo(AddressModal);
