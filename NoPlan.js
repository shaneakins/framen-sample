import React from "react";
import { IconComponent, Hero } from "components/Common";
import { motion } from "framer-motion";

const animItemList = {
  hidden: { opacity: 0, y: 50, scale: 0.8 },
  hiddenContinue: { opacity: 0 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      // type:'spring',
      when: "beforeChildren",
      duration: 0.5,
      staggerChildren: 0.2
      // delayChildren: 0.5
    }
  },
  showContinue: {
    opacity: 1,
    transition: {
      delay: 3
    }
  }
};

const NoReport = ({ name, isMobile }) => {
  return (
    <Hero icon="heart" fullheight isMobile={isMobile}>
      <motion.div
        className="hero-wrapper"
        variants={animItemList}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={animItemList}>
          <IconComponent
            type="heart"
            size={isMobile ? 44 : 50}
            color="white"
          ></IconComponent>
        </motion.div>
        {/* <motion.h1 variants={animItemList}>{`Thank you, ${name}`}</motion.h1> */}
        <motion.h1
          variants={animItemList}
        >{`Your Plan isn't ready yet`}</motion.h1>
        <motion.p variants={animItemList} style={{ margin: 0 }}>
          We are hard at work putting together your personal supplements and
          it's going to be worth the wait. You will receive a confirmation email
          to revisit this page when your first test results are ready.
        </motion.p>
      </motion.div>
    </Hero>
  );
};

export default NoReport;
