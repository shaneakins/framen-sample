import React from "react";
import { Link } from "react-router-dom";
import { Header, Segment, Image } from "semantic-ui-react";

import PillPackNavigation from "components/Plan/PillPackNavigation";
import DoctorRecommendationText from "components/Plan/DoctorRecommendationText";
import UpgradeNowBanner from "containers/UpgradeNowBanner";

import VitalsSlider from "./VitalsSlider";
import Recommendation from "./Recommendation";
import NoPlan from "./NoPlan";

import {
  MulticolorButton,
  IconComponent,
  IconHeader,
  IconAnimated,
  Hero
} from "components/Common";
import { motion } from "framer-motion";

import i18n from "i18n";

import "./index.css";

const Plan = props => {
  const isPrescriptionPresent = () => {
    const { pillPack } = props;
    return (
      pillPack && pillPack.prescriptions && pillPack.prescriptions.length > 0
    );
  };

  const renderSelectedPillPack = () => {
    const {
      pillPack,
      // testingFrequency,
      ignoredRecommendations,
      responsive,
      testKitPrice,
      recommendations
      // isSubscribed
    } = props;

    if (pillPack.showUpgrade) {
      return <UpgradeNowBanner />;
    } else if (isPrescriptionPresent()) {
      return (
        <Recommendation
          pillPack={pillPack}
          responsive={responsive}
          ignoredRecommendations={ignoredRecommendations}
          testKitPrice={testKitPrice}
          currentRecommendation={recommendations[recommendations.length - 2]}
        />
      );
    } else {
      return (
        <Segment basic padded className="PillPacksOverview__no-pillpack">
          <Header as="h2" color="teal" textAlign="center">
            {i18n.t("PillPacks.noPillPacks.description")}
          </Header>
        </Segment>
      );
    }
  };

  const renderPillPackNav = () => {
    const {
      recommendations,
      pillPackIndex,
      delivery,
      onPillPackIndexChange,
      navOption,
      handleNavOptionChange
    } = props;

    return (
      <PillPackNavigation
        cb={onPillPackIndexChange}
        selectedPillPackIndex={pillPackIndex}
        recommendations={recommendations}
        delivery={delivery}
        navOption={navOption}
        handleNavOptionChange={handleNavOptionChange}
      />
    );
  };

  const renderPillPack = (pillPack, pillPackIndex) => {
    const { isSubscribed } = props;
    const pillPackNavComp = renderPillPackNav();
    const pillPackComp = renderSelectedPillPack();

    const animItemList = {
      hidden: { opacity: 0, y: 50, scale: 0.8 },
      hiddenContinue: { opacity: 0 },
      show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          type: "spring",
          // when: "beforeChildren",
          duration: 0.5,
          staggerChildren: 0.2,
          delayChildren: 1
        }
      },
      showContinue: {
        opacity: 1,
        transition: {
          delay: 3
        }
      },
      showArrow: {
        opacity: 1,
        y: [10, 0],
        transition: {
          opacity: 0.5,
          y: { yoyo: 10 },
          delay: 5
        }
      }
    };

    return (
      <div>
        <Hero icon="plan" isMobile={props.responsive.isMobile}>
          <motion.div
            className="hero-wrapper"
            variants={animItemList}
            initial="hidden"
            animate="show"
          >
            <IconAnimated type="plan" size={50} />
            <motion.h1 variants={animItemList}>Your Plan</motion.h1>
            <motion.p variants={animItemList} style={{ margin: "0 0 30px 0" }}>
              Your journey to better health is multi-dimensional: nutrition,
              movement, stress and sleep support, a supportive community, and
              more. Nutrition interacts across these dimensions in complex ways
              - that’s why we created a recommendation as unique as you.
            </motion.p>
            <motion.div
              variants={animItemList}
              initial="hiddenContinue"
              animate="showContinue"
            >
              <Link to="/plan/checkout">
                <MulticolorButton
                  content={
                    isSubscribed ? "Modify your Plan" : "Continue to Checkout"
                  }
                  color="white"
                  style={{ margin: "20px 0" }}
                  rounded
                  width={250}
                />
              </Link>
            </motion.div>
          </motion.div>
          <motion.div
            variants={animItemList}
            initial="hidden"
            animate="showArrow"
          >
            <IconComponent
              type="chevronleft"
              size={40}
              color="white"
              style={{ transform: "rotate(-90deg)" }}
            />
          </motion.div>
        </Hero>
        <IconHeader
          size={40}
          fontSize={40}
          type="box"
          title="Supplement Box"
          horizontal
          className="subheader"
        />
        {pillPackNavComp}
        {pillPackComp}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Link to="/plan/checkout">
            <MulticolorButton
              content={
                isSubscribed ? "Modify your Plan" : "Continue to Checkout"
              }
              color="green"
              style={{ marginTop: "20px" }}
              rounded
              width={250}
            />
          </Link>
        </div>
        <DoctorRecommendationText />
      </div>
    );
  };

  if (isPrescriptionPresent()) {
    return renderPillPack();
  } else {
    return <NoPlan />;
  }
};

export default Plan;
