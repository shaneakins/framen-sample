import React from "react";
import { useEffect } from "react";
import PillPackSliderCard from "./PillPackSliderCard";
import { Draggable } from "gsap/all";

const PillPackSlider = ({ vitals }) => {

  // eslint-disable-next-line
  const plugins = [ Draggable ];

  useEffect(() => {
    Draggable.create(".draggable", {
      type: "x",
      bounds: '.dragParent',
      lockAxis: true
      // onPress: function() {
      //   console.log("clicked");
      // }
    });
  }, []);

  const styles = {
    main: {
      overflow: 'hidden'
    },
    holder: {
      width: "16rem",
      marginRight: "1.25rem",
      paddingBottom: "2rem",
      display: "flex",
      alignItems: 'stretch'
    },
    draggable: {
      display: 'inline-flex',
      // alignItems: 'stretch',
      marginRight: "-1.25rem",
      paddingLeft: "1px"
    }
  }

  const uniqueId = () => Math.floor(Math.random()*10000000000);

  return (
    <div style={styles.main} className="dragParent">
      <div style={styles.draggable} className="draggable">
        {vitals &&
          vitals.map((vital, index) => (
            <div style={styles.holder} key={`${vital}_${uniqueId()}`}>
              <PillPackSliderCard vital={vital} />
            </div>
        ))}
        {/* {supplement &&
          supplement.vitals.map((vital, index) => (
            <div style={styles.holder}>
              <PillPackSliderCard key={`${supplement.name}${vital}`} vital={vital} />
            </div>
        ))} */}
      </div>
    </div>
  );
};

export default PillPackSlider;