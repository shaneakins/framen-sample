import React from "react";
import { useEffect } from "react";
import PillPackSliderCard from "./PillPackSliderCard";
import styled from "styled-components";
import { Draggable } from "gsap/all";

const PillPackSlider = ({ vitals, vitalsinfo }) => {

  const plugins = [ Draggable ];

  useEffect(() => {
    Draggable.create(".draggable", {
      type: "x",
      bounds: '.dragParent',
      onPress: function() {
        console.log("clicked");
      }
    });
    // return () => {
    //   cleanup
    // };
  }, []);

  return (
    <PillPackSliderWrapper className="dragParent">
      <div className="draggable">
        {vitals &&
          vitals.map((vital, index) => (
            <PillPackSliderCard key={vital} vital={vital} vitalinfo={vitalsinfo[index]} />
          ))}
      </div>
    </PillPackSliderWrapper>
  );
};

export default PillPackSlider;

const PillPackSliderWrapper = styled.div`
  overflow: hidden;
  margin: 2rem 0 0;

  .draggable {
    display: inline-flex;
    align-items: stretch;
    /* overflow-x: scroll; */
    /* white-space: nowrap; */
  }
`;
