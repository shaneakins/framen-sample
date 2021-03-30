import React from "react";
import { Card, Image } from "semantic-ui-react";
import "./index.css";

/* vitals icons */
import iconBones from "../icons/icon-vitals-bones.svg";
import iconEnergy from "../icons/icon-vitals-energy.svg";
import iconHair from "../icons/icon-vitals-hair.svg";
import iconLibido from "../icons/icon-vitals-libido.svg";
import iconCognitive from "../icons/icon-vitals-cognitive.svg";
import iconLongevity from "../icons/icon-vitals-longevity.svg";
import iconSleep from "../icons/icon-vitals-sleep.svg";
import iconStrength from "../icons/icon-vitals-strength.svg";
import iconImmunity from "../icons/icon-vitals-immunity.svg";
import iconStress from "../icons/icon-vitals-stress.svg";
import iconJoints from "../icons/icon-vitals-joints.svg";

/* images */
import imgBones from "../images/img-vitals-bones.png";
import imgEnergy from "../images/img-vitals-energy.png";
import imgHair from "../images/img-vitals-hair.png";
import imgLibido from "../images/img-vitals-libido.png";
import imgCognitive from "../images/img-vitals-cognitive.png";
import imgLongevity from "../images/img-vitals-longevity.png";
import imgSleep from "../images/img-vitals-sleep.png";
import imgStrength from "../images/img-vitals-strength.png";
import imgImmunity from "../images/img-vitals-immunity.png";
import imgStress from "../images/img-vitals-stress.png";
import imgJoints from "../images/img-vitals-joints.png";

const PillPackSliderCard = ({ vital }) => {
  const iconDictionary = {
    bones: [
      iconBones,
      imgBones,
      "Bones",
      "Strong bones. Happy body. Can’t lose."
    ],
    cognitive: [
      iconCognitive,
      imgCognitive,
      "Cognitive",
      "Forget no more! This may give your brain the boost you didn’t remember you needed. "
    ],
    energy: [
      iconEnergy,
      imgEnergy,
      "Energy",
      "It can give you the get-up-and-go to fuel you through the afternoon energy slump."
    ],
    immunity: [
      iconImmunity,
      imgImmunity,
      "Immunity",
      "Boost your immunity, recover faster, and reduce the days spent being sick."
    ],
    hair: [
      iconHair,
      imgHair,
      "Hair, Skin & Nails",
      "Shining, shining, shining! That’s your hair, skin, and nails."
    ],
    joints: [
      iconJoints,
      imgJoints,
      "Joints",
      "It can help cut down on activity-impacting joint inflammation."
    ],
    libido: [
      iconLibido,
      imgLibido,
      "Libido and Fertility",
      "This supplement is linked to better fertility and healthy pregnancies. "
    ],
    longevity: [
      iconLongevity,
      imgLongevity,
      "Longevity",
      "Age gracefully (and healthfully)"
    ],
    sleep: [
      iconSleep,
      imgSleep,
      "Sleep",
      "Fall asleep and stay asleep so you can wake up feeling refreshed and recovered."
    ],
    strength: [
      iconStrength,
      imgStrength,
      "Strength",
      "If they say life is a marathon, not a sprint, then this supplement is on your relay team."
    ],
    stress: [
      iconStress,
      imgStress,
      "Stress",
      "Take a deep breath and feel the weight lift from your shoulders."
    ]
  };

  const currentIcon = iconDictionary[vital][0];
  const currentImage = iconDictionary[vital][1];
  const currentVital = iconDictionary[vital][2];
  const currentDesc = iconDictionary[vital][3];

  return (
    <div className="PillPackSliderCard">
      <Card>
        <Image src={currentImage} fluid />
        <Card.Content>
          <Image className="vital-icon" src={currentIcon} />
          <Card.Header>{currentVital}</Card.Header>
          <Card.Description>{currentDesc}</Card.Description>
        </Card.Content>
      </Card>
    </div>
  );
};

export default PillPackSliderCard;
