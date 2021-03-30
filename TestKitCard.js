import React from "react";
import styled from "styled-components";
import Box from "assets/standalone.png";
import { Card } from "components/Common";
import SupplementTag from "./SupplementTag";

const TestKitCard = ({ desc = "", tagtext = "" }) => {
  return (
    <TestKitCardCore layout layoutId="underline">
      <Card rounded shadow bgColor="white">
        <img src={Box} draggable="false" alt="box" />
        <div className="card-slider-info">
          <h3>Nutrient Retest</h3>
          <p>{desc}</p>
          {tagtext && <SupplementTag text={tagtext} />}
        </div>
      </Card>
    </TestKitCardCore>
  );
};

export default TestKitCard;

const TestKitCardCore = styled.div`
  position: relative;
  display: flex;
  width: 230px;
  height: 330px;
  margin-left: 15px;

  @media (min-width: 768px) {
    margin-left: 0px;
  }

  img {
    display: block;
    width: 190px;
    height: 179px;
    position: relative;
    /* left: 10%; */
    user-select: none;
  }

  .card-slider-info {
    font-size: 14px;

    h3 {
      margin: 10px 0 6px 0;
    }
  }
`;
