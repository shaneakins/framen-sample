import React from "react";
// import { useState } from 'react'
import styled from "styled-components";
// import { Image } from "semantic-ui-react";
import { Card, IconComponent } from "components/Common";
import SupplementTag from "./SupplementTag";
import Vit from "assets/vitamin.png";
import Box from "assets/standalone.png";
import { getVitalMarker } from "components/Common/utils/SupplementUtils";
import { motion, AnimateSharedLayout } from "framer-motion";
import IconVegan from "./IconVegan";

const SliderCard = ({
  name = "",
  desc = "",
  image = "",
  vitals = null,
  tagtext = "",
  totalDosage = "",
  dosage = "",
  nocapstags,
  vegan,
  active,
  supplement,
  onOpen,
  empty
}) => {
  const renderNoSpecialities = () => (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px"
        }}
      >
        <IconComponent
          type="pill"
          size={110}
          color="bazeblue10"
          style={{ transform: "rotate(45deg)" }}
        />
      </div>
      <p>You aren't subscribed to any specialty supplements at the moment</p>
    </>
  );

  return (
    <AnimateSharedLayout type="crossfade">
      <SliderCardCore layout layoutId="underline">
        <Card
          // layout
          rounded
          shadow
          bgColor="white"
          empty={empty}
        >
          {!active && <div className="optedout">Opted-out</div>}
          <div className="infobar">
            <p className="dose">{totalDosage}</p>
          </div>
          {!tagtext && !empty && (
            <img src={image || Vit} draggable="false" alt="pill" />
          )}
          {tagtext && <img src={Box} draggable="false" alt="box" />}
          <div className="card-slider-info">
            <h3>
              {name}
              {vegan && <IconVegan />}
            </h3>
            <p>{desc}</p>
            {empty && renderNoSpecialities()}
            <div className="tags">
              {vitals &&
                vitals.map(vital => (
                  <SupplementTag
                    key={vital}
                    category={getVitalMarker(vital)}
                    categoryText={vital}
                  />
                ))}
            </div>
          </div>
          {!empty && !tagtext && (
            <p className="learn-more" onClick={() => onOpen()}>
              Learn More
            </p>
          )}
        </Card>
      </SliderCardCore>
    </AnimateSharedLayout>
  );
};

export default SliderCard;

const SliderCardCore = styled(motion.div)`
  position: relative;
  display: flex;
  width: 100%;

  h3 {
    margin-bottom: 6px;

    svg {
      margin: 2px 0 0 5px;
    }
  }

  img {
    display: block;
    width: 156px;
    height: 125px;
    position: relative;
    left: 10%;
    user-select: none;
  }

  .infobar {
    display: flex;
    height: 34px;
    align-items: center;
  }

  .learn-more {
    margin-top: auto;
    color: var(--bazeblue30);
    text-decoration: underline;
    cursor: pointer;
    /* transition: all 0.2 linear; */

    @media (hover: hover) {
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .card-slider-info {
    font-size: 14px;
  }

  .dose {
    font-size: 12px;
    text-align: right;
    margin-bottom: 0;
    margin-left: auto;
    color: var(--bazeblue10);
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
  }

  .optedout {
    position: absolute;
    width: 113px;
    height: 49px;
    text-align: center;
    line-height: 49px;
    background-color: var(--rose);
    border-radius: 25px;
    top: 15px;
    left: 15px;
    font-size: 16px;
    font-weight: bold;
    color: var(--scarlet);
  }

  p.vegan {
    font-size: 12px;
    color: var(--pine);
    margin: 0;
    display: flex;
    align-items: center;

    & > img {
      width: 10px;
      height: 10px;
      display: inline;
      position: static;
    }

    svg {
      margin: 2px 3px 0 0;
    }
  }
`;
