import React, { useState, useContext, useEffect } from "react";
import gql from "graphql-tag";
import Spinner from "../../components/Spinner/Spinner";
import styles from "./styles";
import { reviewOrder } from "../../apollo/mutations";
import i18n from "../../../i18n";
import StarRating from "react-star-rating"; // replace 'react-native-star-rating' with an equivalent web library
import { useMutation } from "@apollo/client";
import ThemeContext from "../../ui/ThemeContext/ThemeContext";
import { theme } from "../../utils/themeColors";
import { FlashMessage } from "../../ui/FlashMessage/FlashMessage";
import TextDefault from "../../components/Text/TextDefault/TextDefault";
import { EvilIcons } from "@expo/vector-icons"; // replace with equivalent web library or use Font Awesome, etc.
import Analytics from "../../utils/analytics";

// constants
const REVIEWORDER = gql`
  ${reviewOrder}
`;

function RateAndReview(props) {
  const [id] = useState(props.id ?? null);
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const themeContext = useContext(ThemeContext);
  const currentTheme = theme[themeContext.ThemeValue];

  const [mutate, { loading: loadingMutation }] = useMutation(REVIEWORDER, {
    onError,
    onCompleted,
  });
  useEffect(() => {
    async function Track() {
      await Analytics.track(Analytics.events.NAVIGATE_TO_RATEANDREVIEW);
    }
    Track();
  }, []);
  function onFinishRating(rating) {
    setRating(rating);
  }

  function onChangeText(description) {
    setDescription(description);
  }

  function onSubmit() {
    mutate({
      variables: {
        order: id,
        rating: rating,
        description: description,
      },
    });
  }

  function onCompleted(data) {
    props.goBack(); // Assuming this prop is passed
  }

  function onError(error) {
    console.log(JSON.stringify(error));
    FlashMessage({
      message: error.networkError.result.errors[0].message,
    });
  }

  return (
    <>
      <div
        style={{
          ...styles().flex,
          backgroundColor: currentTheme.themeBackground,
        }}
      >
        <div style={styles().reviewTextContainer}>
          <div style={styles().reviewTextSubContainer}>
            <div style={styles().reviewTextContainerText}>
              <TextDefault textColor={currentTheme.fontMainColor} H4 bold>
                {i18n.t("writeAReview")}
              </TextDefault>
            </div>
            <div style={styles().reviewTextContainerImage}>
              <EvilIcons
                name="pencil"
                size={35}
                color={currentTheme.iconColorPink}
              />
            </div>
          </div>
        </div>
        <div style={styles().ratingContainer}>
          <div style={styles().ratingSubContainer}>
            <StarRating
              emptyStarColor={currentTheme.startColor}
              fullStarColor={currentTheme.startOutlineColor}
              disabled={false}
              maxStars={5}
              rating={rating}
              onRatingChange={onFinishRating}
            />
          </div>
        </div>
        <div style={styles().inputContainer}>
          <div style={styles(currentTheme).inputSubContainer}>
            <input
              style={{
                ...styles().textinput,
                color: currentTheme.fontMainColor,
              }}
              placeholderTextColor={currentTheme.fontSecondColor}
              onChange={(e) => onChangeText(e.target.value)}
              placeholder={i18n.t("reviewPlaceholder")}
            />
          </div>
        </div>
        <div style={styles().btnContainer}>
          <div style={styles().btnSubContainer}>
            {loadingMutation && <Spinner />}
            {!loadingMutation && (
              <button onClick={onSubmit} style={styles(currentTheme).btnTouch}>
                <TextDefault textColor={currentTheme.buttonText} H3 bold>
                  {i18n.t("submit")}
                </TextDefault>
              </button>
            )}
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: currentTheme.themeBackground }} />
    </>
  );
}
export default RateAndReview;
