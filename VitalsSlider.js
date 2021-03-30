import React from "react";
import styled from "styled-components";
import { IconComponent } from "components/Common";
import supplementdata from "assets/supplementdata-new";
import { motion } from "framer-motion";
import { getVitalMarker } from "components/Common/utils/SupplementUtils";

const animItemList2 = {
  hidden: { opacity: 0, scale: 0.8 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 2
    }
  },
  show2: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 2.5
    }
  }
};

const flattenArray = arr => [].concat.apply([], arr);

const HeroItem = props => {
  const { category, categoryText, isMobile } = props;
  const overrides = {
    hair: "hair/skin/ nails",
    strength: "strength"
  };

  return (
    <motion.div variants={animItemList2}>
      <IconComponent
        type={category}
        size={isMobile ? 25 : 40}
        color="white"
        {...props}
      />
      <p>{overrides[category] || categoryText}</p>
    </motion.div>
  );
};

const HeroSlider = props => {
  const { recommendations, isMobile } = props;
  const allMarkerIds = recommendations[0].prescriptions.map(
    p => supplementdata[p.relatedMarkerIds].vitals
  );
  const scriptsSet = new Set(flattenArray(allMarkerIds));
  const scripts = [...scriptsSet];

  const splitScripts =
    scripts < 6 ? [scripts, []] : [scripts.slice(0, 6), scripts.slice(6)];

  return (
    <>
      {isMobile && (
        <HeroSliderCore
          {...props}
          isMobile={isMobile}
          variants={animItemList2}
          initial="hidden"
          animate="show"
        >
          {splitScripts[0].map(s => (
            <HeroItem
              key={s}
              {...props}
              category={getVitalMarker(s)}
              categoryText={s}
              isMobile={isMobile}
            />
          ))}
        </HeroSliderCore>
      )}
      {isMobile && (
        <HeroSliderCore
          {...props}
          isMobile={isMobile}
          variants={animItemList2}
          initial="hidden"
          animate="show2"
        >
          {splitScripts[1].map(s => (
            <HeroItem
              key={s}
              {...props}
              category={getVitalMarker(s)}
              categoryText={s}
              isMobile={isMobile}
            />
          ))}
        </HeroSliderCore>
      )}
      {!isMobile && (
        <HeroSliderCore
          {...props}
          isMobile={isMobile}
          variants={animItemList2}
          initial="hidden"
          animate="show"
        >
          {scripts.map(s => (
            <HeroItem
              key={s}
              {...props}
              category={getVitalMarker(s)}
              categoryText={s}
              isMobile={isMobile}
            />
          ))}
        </HeroSliderCore>
      )}
    </>
  );
};

export default HeroSlider;

const HeroSliderCore = styled(motion.div)`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  .row {
  }

  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    margin: ${props => (props.isMobile ? "0 4px 10px" : "0 10px 20px")};
  }

  p {
    font-size: ${props => (props.isMobile ? "8px" : "12px")};
    text-transform: uppercase;
    letter-spacing: 0.9px;
    color: var(--white);
    margin-top: ${props => (props.isMobile ? "6px" : "10px")};
  }
`;
