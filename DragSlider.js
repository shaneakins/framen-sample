import React from "react";
import { useRef, useState, useEffect, useLayoutEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useScroll } from "react-use-gesture";
import { IconComponent } from "components/Common";
import { useWindowSize } from "components/Common/hooks/useWindowSize";

const DragSlider = ({
  type,
  arrows,
  height,
  isMobile,
  controls,
  itemWidth = 260,
  children
}) => {
  const visibleRef = useRef(null);
  const sliderRef = useRef(null);

  const [sliderW, setSliderW] = useState(0);

  const [allowScroll, setAllowScroll] = useState(false);
  const [sliderState, setSliderState] = useState(0);
  const [sliderX, setSliderX] = useState(0);

  const bind = useScroll(event => {
    controls.start({
      transform: `perspective(500px) rotateY(${
        event.scrolling ? clamp(event.delta[0]) : 0
      }deg)`
    });
  });

  const clamp = (value, clampAt = 40) => {
    if (value > 0) {
      return value > clampAt ? clampAt : value;
    } else {
      return value < -clampAt ? -clampAt : value;
    }
  };

  useEffect(() => {
    if (!visibleRef.current) return;
    let childWidth;
    if (type === "essentials") {
      childWidth = document
        .querySelector(".slider-essentials")
        .getBoundingClientRect().width;
    } else if (type === "specialties") {
      childWidth = document
        .querySelector(".slider-specialties")
        .getBoundingClientRect().width;
    } else {
      childWidth = document.querySelector(".sliderbase").getBoundingClientRect()
        .width;
    }
    const parentWidth = visibleRef.current.getBoundingClientRect().width;
    // visibleRef.current.addEventListener('scroll', (e)=> console.log(e.target.offsetHeight, e.target.offsetLeft, e.target.offsetTop, e.target.offsetWidth))
    if (childWidth <= parentWidth) {
      setSliderState(-1);
    }

    const scrollHandler = e => {
      if (e.target.scrollLeft < 5 && childWidth + 20 > parentWidth) {
        setSliderState(0);
      } else if (e.target.scrollLeft - 7 >= childWidth - parentWidth) {
        setSliderState(2);
      } else {
        setSliderState(1);
      }
      // console.log(e.target.scrollLeft - 7, childWidth <= parentWidth, childWidth, parentWidth)
    };

    visibleRef.current.addEventListener("scroll", scrollHandler);

    return () => {
      visibleRef.current.removeEventListener("scroll", scrollHandler);
    };
  }, []);

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

    // console.log(scrollYProgress)

    const rectS = sliderRef.current.getBoundingClientRect();
    const rectC = visibleRef.current.getBoundingClientRect();

    setSliderW(rectS.width - rectC.width);

    // console.log(rectC)
  }, []);

  const RenderArrowRight = style => (
    <div
      className="slider-nav-arrow-left"
      style={
        sliderState !== 2 && sliderState !== -1
          ? null
          : { opacity: 0.3, cursor: "auto" }
      }
      onClick={moveLeft}
    >
      <IconComponent type="circlechevronright" size={36} color="bazeblue30" />
    </div>
  );

  const RenderArrowLeft = style => (
    <div
      className="slider-nav-arrow-right"
      style={
        sliderState !== 0 && sliderState !== -1
          ? null
          : { opacity: 0.3, cursor: "auto" }
      }
      onClick={moveRight}
    >
      <IconComponent type="circlechevronleft" size={36} color="bazeblue30" />
    </div>
  );

  const calcSliderState = x => {
    const width = sliderRef.current.getBoundingClientRect().width;
    if (x >= -5) setSliderState(0);
    if (x < 5 && x > -width + 5) setSliderState(1);
    if (x <= -sliderW + 5) setSliderState(2);
    setSliderX(x);
    // console.log(x, -width, -sliderW, sliderState)
  };

  const moveLeft = () => {
    const width = visibleRef.current.getBoundingClientRect().width;
    // const next = 260
    // const x = visibleRef.current.scrollLeft += next
    const extra = (width - visibleRef.current.scrollLeft) % itemWidth;

    console.log(
      width,
      visibleRef.current.scrollLeft,
      itemWidth,
      extra,
      sliderState
    );

    // console.log(extra)
    const x =
      Math.abs(extra) > 0
        ? visibleRef.current.scrollLeft + itemWidth
        : visibleRef.current.scrollLeft + extra;
    visibleRef.current.scrollTo(x, 0);
  };

  const moveRight = () => {
    const width = visibleRef.current.getBoundingClientRect().width;
    const extra = width % itemWidth;

    console.log(
      width,
      visibleRef.current.scrollLeft,
      itemWidth,
      extra,
      sliderState
    );

    const x =
      sliderState === 2
        ? visibleRef.current.scrollLeft - (itemWidth - extra - 5)
        : visibleRef.current.scrollLeft - itemWidth;
    visibleRef.current.scrollTo(x, 0);
  };

  return (
    <DragSliderCore height={height} isMobile={isMobile}>
      {arrows && !isMobile && <RenderArrowLeft />}
      <motion.div className="visible-area" ref={visibleRef} {...bind()}>
        {children}
        {/* {React.Children.map(children, (child, i) => {
          return React.cloneElement(child, {
            //this properties are available as a props in child components
            newcontrols: controls,
            index: i,
          })
        })} */}
      </motion.div>
      {arrows && !isMobile && <RenderArrowRight />}
    </DragSliderCore>
  );
};

export default DragSlider;

const DragSliderCore = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  scroll-behavior: smooth;
  min-width: 0;

  .slider-nav-arrow-right {
    display: flex;
    padding: ${props =>
      props.isMobile ? "15px 0 15px 15px" : "15px 0 15px 0"};
    flex: 0 0 ${props => (props.isMobile ? "60px" : "36px")};
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .slider-nav-arrow-left {
    display: flex;
    padding: 15px 15px 15px 15px;
    flex: 0 0 60px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .visible-area {
    display: flex;
    flex: 1;

    overflow-x: auto;
    /* scroll-snap-type: x proximity; */
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scroll-padding-left: 12px;
    padding: 0 12px;
    /* margin-right: 12px; */
    -ms-overflow-style: none; /* Hide scrollbars in IE and Edge */
    scrollbar-width: none; /* Hide scrollbars in Firefox */
    scroll-behavior: smooth;

    /* Hide scrollbars in Chrome */
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .slidercards {
    /* padding: 12px 0; */
    /* margin: 0 12px; */
  }

  .slider-motion {
    /* display: inline-block; */
    position: absolute;
  }
`;
