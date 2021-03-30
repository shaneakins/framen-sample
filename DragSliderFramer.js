import React from "react";
import { useRef, useState, useEffect, useLayoutEffect } from "react";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";
import { Card, IconComponent } from "components/Common";
import { useWindowSize } from "components/Common/hooks/useWindowSize";

const DragSlider = ({ arrows, height, children }) => {
  const size = useWindowSize();

  const visibleRef = useRef(null);
  const sliderRef = useRef(null);

  const [sliderW, setSliderW] = useState(0);

  const [allowScroll, setAllowScroll] = useState(false);
  const [sliderState, setSliderState] = useState(0);
  const [sliderX, setSliderX] = useState(0);
  useEffect(() => {
    if (allowScroll) {
      const handleTouch = event => {
        event.stopPropagation();
      };
      document.documentElement.addEventListener("touchmove", handleTouch);
      return () => {
        document.documentElement.removeEventListener("touchmove", handleTouch);
      };
    }
  }, [allowScroll]);

  useLayoutEffect(() => {
    // do side effects
    if (!sliderRef.current || !visibleRef.current) return;

    const rectS = sliderRef.current.getBoundingClientRect();
    const rectC = visibleRef.current.getBoundingClientRect();

    setSliderW(rectS.width - rectC.width);

    // console.log(rectS, rectC)
  }, [sliderRef, visibleRef, sliderW, size]);

  const RenderArrowRight = style => (
    <Card
      compact
      className="slider-nav-arrow"
      style={sliderState !== 2 ? "" : { opacity: 0.3 }}
      onClick={moveLeft}
    >
      <IconComponent type="circlechevronright" size={36} color="bazeblue30" />
    </Card>
  );

  const RenderArrowLeft = style => (
    <Card
      compact
      className="slider-nav-arrow"
      style={sliderState !== 0 ? "" : { opacity: 0.3 }}
      onClick={moveRight}
    >
      <IconComponent type="circlechevronleft" size={36} color="bazeblue30" />
    </Card>
  );

  const controls = useAnimation();

  const calcSliderState = x => {
    console.log("x: " + x);
    console.log(x >= -5);
    const width = sliderRef.current.getBoundingClientRect().width;
    if (x >= -5) setSliderState(0);
    if (x < 5 && x > -width + 5) setSliderState(1);
    if (x <= -sliderW + 5) setSliderState(2);
    setSliderX(x);
    // console.log(x, -width, -sliderW, sliderState)
  };

  const moveLeft = () => {
    const width = sliderRef.current.getBoundingClientRect().width;
    const next = 280;
    // console.log(-sliderX + next)
    if (-sliderX + next < width) {
      controls.start({
        x: sliderX - 280,
        transition: { ease: "easeOut" }
        // transition: {duration: 1}
      });
      calcSliderState(sliderX - 280);
      // setSliderX(prev => prev - 280)
    }
  };
  const moveRight = () => {
    const width = sliderRef.current.getBoundingClientRect().width;
    const next = 280;
    // console.log(-sliderX - next)
    if (-sliderX - next >= 0) {
      controls.start({
        x: sliderX + 280,
        transition: { ease: "easeOut" }
        // transition: {duration: 1}
      });
      calcSliderState(sliderX + 280);

      // setSliderX(prev => prev + 280)
    }
  };

  const onDrag = (event, info) => {
    const rectS = sliderRef.current.getBoundingClientRect();
    calcSliderState(info.point.x);
  };

  const onDragStart = (event, info) => {
    const rectS = sliderRef.current.getBoundingClientRect();
    calcSliderState(info.point.x);
    setAllowScroll(Math.abs(info.delta.y) > Math.abs(info.delta.x));
  };

  const onDragEnd = (event, info) => {
    const width = 280;
    const index = Math.ceil(info.point.x / width);
    const midpoint = index * width - width / 2;
    const rectS = sliderRef.current.getBoundingClientRect();
    const rectC = visibleRef.current.getBoundingClientRect();

    let delta = 0;

    // Move slider to show entire next card
    delta = info.point.x < midpoint ? (index - 1) * width : index * width;

    // Account for rightmost end of slider if slider is moving left
    delta =
      Math.sign(info.delta.x) === -1 && rectS.right - width <= rectC.right
        ? -sliderW
        : delta;

    controls.start({
      x: delta,
      transition: { ease: "easeOut" }
      // transition: {duration: 1}
    });

    calcSliderState(info.point.x);
  };

  return (
    <DragSliderCore height={height}>
      {arrows && <RenderArrowLeft />}
      <motion.div className="visible-area" ref={visibleRef}>
        <motion.div
          className="slider-motion"
          ref={sliderRef}
          drag={Math.sign(sliderW) === 1 ? "x" : false}
          dragDirectionLock
          dragElastic={0.1}
          dragConstraints={{ top: 0, right: 0, bottom: 0, left: -sliderW }}
          onDrag={onDrag}
          onDragEnd={onDragEnd}
          onDragStart={onDragStart}
          animate={controls}
        >
          {children}
        </motion.div>
        {/* <motion.div drag={'x'} dragElastic={0.01} dragConstraints={visibleRef} /> */}
      </motion.div>
      {arrows && (
        <RenderArrowRight style={sliderState !== 0 ? "" : { opacity: 0.5 }} />
      )}
    </DragSliderCore>
  );
};

export default DragSlider;

const DragSliderCore = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;

  .slider-nav-arrow {
    flex: 0 0 60px;
    justify-content: center;
    cursor: pointer;
  }

  .visible-area {
    opacity: 1;
    padding: 5px;
    overflow: hidden;
    position: relative;
    flex: 1;
    height: ${props => props.height || "345px"};
  }

  .slider-motion {
    position: absolute;
  }
`;
