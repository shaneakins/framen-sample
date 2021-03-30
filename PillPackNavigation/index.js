import React from "react";
import styled from "styled-components";
import { Header } from "semantic-ui-react";
import { Card, MulticolorButton } from "components/Common";
import moment from "moment";
import { Link } from "react-router-dom";

import i18n from "i18n";

const PillPackNavigation = props => {
  const downCaret = () => (
    <svg width={9} height={6} fill="none">
      <path
        d="M1 1l3.25 3.25L7.5 1"
        stroke="#142841"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
  const renderReportedDate = () => {
    const { selectedPillPackIndex, recommendations, delivery } = props;

    if (selectedPillPackIndex === recommendations.length - 1) {
      return (
        <p className="title">
          Est. ship date:
          <Link to="plan/reschedule">
            <span className="reportdate">
              {`${moment(delivery.from.date).format("MMM D, YYYY")} — ${moment(
                delivery.to.date
              ).format("MMM D, YYYY")}`}
            </span>
          </Link>
        </p>
      );
      // return <span>Upcoming box<button className="btn-more-info"><span>?</span></button></span>
    } else {
      return (
        <p className="title">
          {i18n.t("PillPacks.PillPackNavigation.reportDateTitle")}
          <span className="reportdate">
            {moment(recommendations[selectedPillPackIndex].date).format(
              "MMM D, YYYY"
            )}
          </span>
        </p>
      );
    }
  };

  const renderReportedDateSelect = () => {
    const {
      selectedPillPackIndex,
      recommendations,
      cb,
      navOption,
      handleNavOptionChange
    } = props;

    const historicalRecs = [...recommendations];
    // strip current and upcoming boxes from recommendations

    historicalRecs.length = historicalRecs.length - 2;

    return (
      <div className="date-selector-wrapper">
        {/* <div className="date-selector-base">History</div> */}
        <MulticolorButton
          color="blue"
          fontSize="12px"
          rounded
          stayclear
          width={200}
          height={48}
          active={historicalRecs.length > 0 && navOption === 0}
          disabled={historicalRecs.length === 0}
        >
          <p>
            History <span>{downCaret()}</span>
          </p>
          {/* <p>History <span>{`\u2304`}</span></p> */}
          <select
            className="date-selector"
            value={selectedPillPackIndex}
            onChange={e => {
              cb(e.target.value);
              navOption !== 0 && handleNavOptionChange(0);
            }}
          >
            {historicalRecs.map((r, i) => (
              <option key={i} value={i}>
                {moment(r.date).format("MMMM D, YYYY")}
              </option>
            ))}
          </select>
        </MulticolorButton>
      </div>
    );
  };

  const renderCurrentBox = () => {
    const { recommendations, cb, navOption, handleNavOptionChange } = props;
    return (
      <MulticolorButton
        color="blue"
        content="Current box"
        fontSize="12px"
        width={200}
        height={48}
        rounded
        stayclear
        onClick={() => {
          cb(recommendations.length - 2);
          handleNavOptionChange(1);
        }}
        active={navOption === 1}
      />
    );
  };

  const renderUpcomingBox = () => {
    const { recommendations, cb, navOption, handleNavOptionChange } = props;
    return (
      <MulticolorButton
        color="blue"
        content="Upcoming box"
        fontSize="12px"
        width={200}
        height={48}
        rounded
        stayclear
        onClick={() => {
          cb(recommendations.length - 1);
          handleNavOptionChange(2);
        }}
        active={navOption === 2}
      />
    );
  };

  const renderSelectedPillPack = () => {
    return (
      <PPNavCore className="PillPackNavigation" compact horizontal nopaddingy>
        {renderReportedDate()}
        <div className="pillpack-nav-buttons">
          {renderReportedDateSelect()}
          {renderCurrentBox()}
          {renderUpcomingBox()}
        </div>
      </PPNavCore>
    );
  };

  const renderNoPillPackAvail = () => {
    return (
      <PPNavCore>
        <Header as="h1" textAlign="center">
          <Header.Content>
            {i18n.t("PillPacks.noPillPacks.description")}
          </Header.Content>
        </Header>
      </PPNavCore>
    );
  };

  const { recommendations } = props;

  return recommendations && recommendations.length > 0
    ? renderSelectedPillPack()
    : renderNoPillPackAvail();
};

export default PillPackNavigation;

const PPNavCore = styled(Card)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    margin-bottom: 60px;
  }

  .title {
    flex: 0 0 100%;

    a {
      color: var(--bazeblue);
      text-decoration: underline;
    }
  }

  .pillpack-nav-buttons {
    display: flex;
    flex-direction: row;
    width: 100%;

    & button {
      width: 100%;
      margin-bottom: 20px;
      flex: 1;
      padding: 15px 0;
      &:not(:first-child) {
        margin-left: 10px;
      }
    }

    @media (min-width: 768px) {
      /* flex-direction: row; */

      & button {
        width: 200px;
        margin-bottom: 0;
        padding: 0;
        flex: none;
        &:not(:first-child) {
          margin-left: 20px;
        }
        font-size: 16px;
      }

      p {
        margin: 0;
      }
    }
  }

  .date-selector-wrapper {
    display: inline-block;
    position: relative;
    flex: 1;

    & select {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }

    @media (min-width: 768px) {
      flex: none;
    }
  }

  .date-selector {
    opacity: 0;
    cursor: pointer;
  }

  .date-selector-base {
    line-height: 48px;
    font-size: 12px;
    text-align: center;
    background: var(--bazeblue);
    border-radius: 30px;
    color: white;
    border: none;
  }

  .reportdate {
    width: 170px;
    font-weight: bold;
    text-align: center;
    margin-left: 10px;
  }

  .btn-more-info {
    padding: 0;
    box-shadow: none;
    border: none;
    position: relative;
    top: -3px;
    margin-left: 6px;

    span {
      display: block;
      font-size: 12px;
      font-weight: 300;
      color: var(--bazeblue);
      background-color: var(--bazeblue10);
      width: 18px;
      height: 18px;
      border-radius: 10px;
      line-height: 18px;
    }
  }

  .circle {
    background-repeat: no-repeat;
    background-size: cover;
    width: 1em;
    height: 1em;
    cursor: pointer;

    &--left {
      background-image: url("/pillpack-nav-arrow-left-new.svg");
      margin-right: 0.5em;
      margin-left: 0;
    }
    &--right {
      background-image: url("/pillpack-nav-arrow-right-new.svg");
      margin-left: 0.5em;
      margin-right: 0;
    }

    &--disabled {
      opacity: 0.25;
      cursor: default;
    }
  }
`;
