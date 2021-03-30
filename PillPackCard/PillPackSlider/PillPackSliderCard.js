import React from "react";
import { Card, Image } from "semantic-ui-react";
import styled from "styled-components";

/* vitals icons */
import iconBones from "./icons/icon-vitals-bones.svg";
import iconEnergy from "./icons/icon-vitals-energy.svg";
import iconHair from "./icons/icon-vitals-hair.svg";
import iconLibido from "./icons/icon-vitals-libido.svg";
import iconBrain from "./icons/icon-vitals-brain.svg";
import iconLongevity from "./icons/icon-vitals-longevity.svg";
import iconSleep from "./icons/icon-vitals-sleep.svg";
import iconStrength from "./icons/icon-vitals-strength.svg";
import iconImmunity from "./icons/icon-vitals-immunity.svg";

const PillPackSliderCard = ({ vital, vitalinfo }) => {
  const iconDictionary = {
    energy: [iconEnergy, "Energy"],
    hair: [iconHair, "Hair and Skin"],
    sleep: [iconSleep, "Sleep"],
    longevity: [iconLongevity, "Longevity"],
    libido: [iconLibido, "Libido and Fertility"],
    strength: [iconStrength, "Strength and Endurance"],
    brain: [iconBrain, "Brain"],
    bones: [iconBones, "Bones"],
    immunity: [iconImmunity, "Immunity"]
  };

  const currentIcon = iconDictionary[vital][0];
  const currentVital = iconDictionary[vital][1];

  return (
    <PillPackSliderCardWrapper>
      <Card>
        <Image src="https://placeimg.com/640/480/any" fluid />
        <Card.Content>
          <Image className="vital-icon" src={currentIcon} />
          <Card.Header>{currentVital}</Card.Header>
          <Card.Description>{vitalinfo}</Card.Description>
        </Card.Content>
      </Card>
    </PillPackSliderCardWrapper>
  );
};

export default PillPackSliderCard;

const PillPackSliderCardWrapper = styled.div`
  width: 16rem;
  margin-right: 1.25rem;
  padding-bottom: 2rem;
  &:last-child {
    margin-right: 0;
  }

  /* margin-top: 1rem; */
  .header {
    font-family: "Averta";
    font-weight: 700;
    font-size: 1rem;
    line-height: 1.56;
    color: var(--bazeblue)
  }

  .content {
    padding: 1.25rem;
    /* height: 12.5rem; */
    font-family: "Averta";
    font-weight: 300;
    font-size: 0.875rem;
  }

  .vital-icon {
    display: inline-block;
    height: 2rem;
    width: auto;
    margin-left: 0;
    margin-bottom: 1.25rem;
  }
`;
