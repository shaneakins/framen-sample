import React, { useState } from "react";
import styled from "styled-components";
import SliderCard from "./SliderCard";
import TestKitCard from "./TestKitCard";
import CategoryCard from "./CategoryCard";
import DragSlider from "./DragSlider";
import CorePanel from "./CorePanel";

import { IconHeader } from "components/Common";
import Modal from "components/Common/Modal";
import { useModal } from "components/Common/Modal/useModal";
import SupplementOverviewModal from "components/SupplementOverviewModalNew";

import supplementData from "assets/supplementdata-new";
import { stripVegan } from "components/Common/utils/SupplementUtils";
import { motion, useAnimation } from "framer-motion";

const categoryInfo = {
  essential: {
    title: "The foundation for your body",
    text:
      "These are essential nutrients that your body can only aqcuire through food or supplementation. We source the highest quality supplements that give you what you need."
  },
  specialty: {
    title: "Natural remedies to elevate your well-being",
    text:
      "Specialities use the rich resources of our planet to immediately impact your health, both in body and in mind. Feel the benefits within weeks with these natural marvels."
  },
  core: {
    title: "A revolutionary supplement regimen",
    text:
      "Rather than a standard day-to-day program, CORE (Cyclically-Optimized Recommendation Engine) Dosing is a unique regimen designed to optimize efficacy, savings and convenience."
  },
  testkit: {
    title: "Better health is a journey",
    text:
      "Just like mapping a trail, checking in with your health helps you understand what to do next. Choose the testing cadence that works best for you."
  }
};

const Recommendation = props => {
  const { pillPack, responsive, testKitPrice } = props;
  const { hideModal, showModal, isVisible } = useModal();
  const [activeSupplement, setActiveSupplement] = useState({});

  const controls = useAnimation();
  const controls2 = useAnimation();

  const onOpen = vitamin => {
    setActiveSupplement(vitamin);
    showModal();
  };

  // const prescriptions = pillPack && pillPack.prescriptions

  const sortedPrescriptions = () => {
    if (pillPack) {
      const scripts = [...pillPack.prescriptions];
      const scriptsNoVegan = scripts.map(p => ({
        ...p,
        name: stripVegan(p.name)
      }));
      const sortedScripts = scriptsNoVegan.sort((a, b) =>
        a.name > b.name ? 1 : -1
      );
      return sortedScripts;
    }
  };

  const isMobile = responsive && responsive.isMobile;

  const suppsSpecialty = [
    "rhodiola rosea",
    "ashwagandha",
    "l-theanine",
    "elderberry",
    "turmeric"
  ];

  const computeTotalDosage = p => {
    if (p.relevantIngredients && p.pouches) {
      return `${p.relevantIngredients[0].dosage * p.pouches[0].pills} ${
        p.relevantIngredients[0].unit
      }`;
    }
    return "";
  };

  const filteredEssentials = () =>
    sortedPrescriptions().filter(
      p => !suppsSpecialty.includes(stripVegan(p.name.toLowerCase()))
    );

  const filteredSpecialties = () =>
    sortedPrescriptions().filter(p =>
      suppsSpecialty.includes(stripVegan(p.name.toLowerCase()))
    );

  const renderCategoryEssentials = () => (
    <CategoryCard
      type="essential"
      heading={categoryInfo.essential.title}
      text={categoryInfo.essential.text}
    />
  );

  const renderEssentials = () => (
    <div className="row">
      {!isMobile && renderCategoryEssentials()}
      {/* {renderArrowLeft()} */}
      <DragSlider
        arrows
        type="essentials"
        isMobile={isMobile}
        controls={controls}
      >
        <div className="slidercards slider-essentials">
          {filteredEssentials().map((p, i) => (
            <motion.div
              className="card-slider"
              key={`${p.id}${i}`}
              animate={controls}
            >
              <SliderCard
                name={p.name}
                image={p.assets[0].url || ""}
                desc={supplementData[p.relatedMarkerIds[0]].heading || ""}
                vitals={supplementData[p.relatedMarkerIds[0]].vitals || []}
                totalDosage={computeTotalDosage(p)}
                dosage={p.shortDescription}
                // link={<p onClick={()=> onOpen(p)}>Learn More</p>}
                active={p.active}
                vegan={p.vegan}
                onOpen={() => onOpen(p)}
                supplement={p}
              />
            </motion.div>
          ))}
        </div>
      </DragSlider>
      {/* {renderArrowRight()} */}
    </div>
  );

  const renderCategorySpecialties = () => (
    <CategoryCard
      type="specialty"
      heading={categoryInfo.specialty.title}
      text={categoryInfo.specialty.text}
    />
  );

  const renderSpecialties = () => (
    <div className="row">
      {!isMobile && renderCategorySpecialties()}
      {/* {renderArrowLeft()} */}
      <DragSlider
        arrows
        type="specialties"
        isMobile={isMobile}
        controls={controls2}
      >
        <div className="slidercards slider-specialties">
          {filteredSpecialties().length > 0 ? (
            filteredSpecialties().map(p => (
              <motion.div
                className="card-slider"
                key={p.id}
                animate={controls2}
              >
                <SliderCard
                  name={p.name}
                  image={p.assets[0].url}
                  desc={supplementData[p.relatedMarkerIds[0]].heading}
                  vitals={supplementData[p.relatedMarkerIds[0]].vitals}
                  totalDosage={computeTotalDosage(p)}
                  dosage={p.shortDescription}
                  vegan={p.vegan}
                  // link={<p onClick={()=> onOpen(p)}>Learn More</p>}
                  active={p.active}
                  onOpen={() => onOpen(p)}
                  supplement={p}
                />
              </motion.div>
            ))
          ) : (
            <div className="card-slider">
              <SliderCard
                key={"a1b2c3d6e5f4g"}
                // link={<a href="#">Learn More</a>}
                empty
                active={true}
              />
            </div>
          )}
        </div>
      </DragSlider>
    </div>
  );

  const renderCorePanel = () => {
    const { currentRecommendation } = props;
    return (
      <div className="row">
        <CategoryCard
          type="core"
          heading={categoryInfo.core.title}
          text={categoryInfo.core.text}
          large
          noicon
        ></CategoryCard>
        <CorePanel
          isMobile={isMobile}
          prescriptions={currentRecommendation.prescriptions}
        />
      </div>
    );
  };

  const renderTestKit = () => (
    <>
      <div style={{ margin: "30px 0 20px" }}>
        <IconHeader
          size={40}
          fontSize={40}
          type="tap"
          title="Nutrient Test Kit"
          horizontal
          className="subheader"
          // centered={props.responsive.isMobile ? true : false}
        />
      </div>
      <div className="row">
        <CategoryCard
          heading={categoryInfo.testkit.title}
          text={categoryInfo.testkit.text}
          large
        ></CategoryCard>
        <TestKitCard desc={`$${testKitPrice}`} />
      </div>
    </>
  );

  return (
    <RecCore>
      {isMobile && renderCategoryEssentials()}
      {renderEssentials()}
      {isMobile && renderCategorySpecialties()}
      {renderSpecialties()}
      {renderCorePanel()}
      {renderTestKit()}
      <Modal
        isVisible={isVisible}
        closeModal={hideModal}
        className=""
        height="83vh"
      >
        <SupplementOverviewModal
          supplement={activeSupplement}
          groupId={activeSupplement.relatedMarkerIds}
        />
      </Modal>
    </RecCore>
  );
};

export default Recommendation;

const RecCore = styled.div`
  .row {
    display: flex;
    margin-bottom: 40px;
    flex-direction: column;
  }

  .slidercards {
    display: flex;
    padding: 12px 0;

    & > .card-slider {
      margin-right: 30px;
      /* scroll-snap-align: start; */
      display: flex;
      width: 230px;
      flex: none;
      position: relative;
      height: ${props => (props.empty ? "345px" : "")};
      min-height: 313px;
    }
    & > .card-slider:last-child {
      margin-right: 13px;
    }
    & > .card-slider:only-child {
      margin-right: 30px;
    }
  }

  .spacer {
    flex: none;
    width: 30px;
  }

  .slider-nav-arrow {
    flex: 0 0 60px;
    justify-content: center;
  }

  @media (min-width: 768px) {
    .row {
      flex-direction: row;
    }

    .slidercards {
      margin-left: 0;
    }

    & > .card-slider:only-child {
      margin-right: 30px;
    }
  }
`;
