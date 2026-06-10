import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


import cloud from "../components/vectors/cloud.svg";
import stavo_logo from "../components/vectors/stavo_logo.svg";
import stavo_image from "../components/vectors/stavo_image.svg";
import instagram_cloud from "../components/vectors/Instagram.svg";
import tiktok_cloud from "../components/vectors/Tiktok.svg";
import telegram_cloud from "../components/vectors/Telegram.svg";
import FlipCard from "../components/vectors/ui/FlipCard";
import img1 from "../components/vectors/img1.webp";
import img2 from "../components/vectors/img2.webp";
import img3 from "../components/vectors/img3.webp";
import img4 from "../components/vectors/img4.webp";
import img5 from "../components/vectors/img5.webp";
import img6 from "../components/vectors/img6.webp";
import img7 from "../components/vectors/img7.webp";

/* ================= TEXT ================= */

const text =
  "STAVO îmbină stilul sportswear și streetwear într-o identitate creată pentru cei care gândesc și se mișcă diferit.";

const words = text.split(" ");

/* ================= ANIMATIONS ================= */

const cloudAnim = {
  hidden: { opacity: 0, y: 220 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.4, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: 120, // 👈 goes DOWN on exit
    transition: { duration: 0.8, ease: "easeIn" },
  },
};

const titleAnim = {
  hidden: { opacity: 0, scale: 1.2, filter: "blur(18px)" },
  show: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.2, ease: "easeOut" },
  },
};

const imageAnim = {
  hidden: { opacity: 0, y: -60 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, delay: 0.3 },
  },
};

const wordAnim = {
  hidden: {
    opacity: 0,
    y: 18,
    filter: "blur(10px)",
  },

  show: (i) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.03,
      duration: 0.35,
    },
  }),

  exit: (i) => ({
    opacity: 0,
    y: -18,
    filter: "blur(10px)",
    transition: {
      delay: (words.length - i) * 0.015,
      duration: 0.25,
    },
  }),
};

const navAnim = {
  hidden: { opacity: 0, y: -30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

export default function Intro() {
  const [scene, setScene] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [flippedCard, setFlippedCard] = useState(null);

 useEffect(() => {
  let startY = 0;

  const handleWheel = (e) => {
    if (isScrolling) return;

    const direction = e.deltaY;

    if (direction > 30) {
      setIsScrolling(true);
      setScene((s) => Math.min(s + 1, 2));
    }

    if (direction < -30) {
      setIsScrolling(true);

      setScene((s) => {
        if (s === 2) return 2;
        return Math.max(s - 1, 0);
      });
    }

    setTimeout(() => setIsScrolling(false), 900);
  };

  // ✅ MOBILE TOUCH START
  const handleTouchStart = (e) => {
    startY = e.touches[0].clientY;
  };

  // ✅ MOBILE TOUCH MOVE (swipe detection)
  const handleTouchEnd = (e) => {
    if (isScrolling) return;

    const endY = e.changedTouches[0].clientY;
    const diff = startY - endY;

    // swipe up → next scene
    if (diff > 50) {
      setIsScrolling(true);
      setScene((s) => Math.min(s + 1, 2));
    }

    // swipe down → previous scene
    if (diff < -50) {
      setIsScrolling(true);

      setScene((s) => {
        if (s === 2) return 2;
        return Math.max(s - 1, 0);
      });
    }

    setTimeout(() => setIsScrolling(false), 900);
  };

  window.addEventListener("wheel", handleWheel, { passive: true });

  window.addEventListener("touchstart", handleTouchStart, { passive: true });
  window.addEventListener("touchend", handleTouchEnd, { passive: true });

  return () => {
    window.removeEventListener("wheel", handleWheel);
    window.removeEventListener("touchstart", handleTouchStart);
    window.removeEventListener("touchend", handleTouchEnd);
  };
}, [isScrolling]);


  return (
    <section
  className="w-full bg-[#141720] relative overflow-hidden select-none"
  style={{
    height: "100svh",
  }}
>

     {/* ================= NAVBAR ================= */}
<motion.div
  variants={navAnim}
  initial="hidden"
  animate="show"
  className="absolute top-5 md:top-7 w-full flex justify-center z-50 px-4 md:px-8 lg:px-12"
>
  <div className="
    w-full
    max-w-[1280px]
    h-[72px]
    md:h-[84px]
    lg:h-[92px]
    bg-white/10
    backdrop-blur-xl
    rounded-[28px]
    md:rounded-[36px]
    flex
    items-center
    px-3
    md:px-5
    lg:px-6
  ">

    {/* LOGO */}
    <img
      src={stavo_logo}
      alt="STAVO logo"
      className="
        w-12 h-12
        md:w-14 md:h-14
        lg:w-16 lg:h-16
        cursor-pointer
        flex-shrink-0
      "
      onClick={() => setScene(0)}
    />

    <div
      className="
        flex
        justify-between
        items-center
        flex-1
        ml-4
        md:ml-6
        lg:ml-8
        bg-white
        rounded-full
        px-5
        md:px-8
        lg:px-12
        py-3
        md:py-4
      "
    >

      {/* NAV */}
      <div
        className="
          flex
          items-center
          gap-6
          md:gap-10
          lg:gap-16
          text-[15px]
          md:text-[17px]
          lg:text-[19px]
          font-semibold
          tracking-wide
        "
      >
        <button
          onClick={() => setScene(1)}
          className={`
            transition-all duration-300
            hover:text-red-500
            ${
              scene === 1
                ? "text-red-600"
                : "text-black"
            }
          `}
        >
          Brand
        </button>

        <button
          onClick={() => setScene(2)}
          className={`
            transition-all duration-300
            hover:text-red-500
            ${
              scene === 2
                ? "text-red-600"
                : "text-black"
            }
          `}
        >
          Shop
        </button>
      </div>

      {/* SOCIAL */}
<div
  className="
    flex
    items-center
    gap-3
    md:gap-4
    lg:gap-6
  "
>

  {/* INSTAGRAM */}
  <a
    href="https://www.instagram.com/stavo.official?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
    target="_blank"
    rel="noopener noreferrer"
  >
    <img
      src={instagram_cloud}
      alt="Instagram"
      className="
        w-7 h-7
        md:w-8 md:h-8
        lg:w-9 lg:h-9
        cursor-pointer
        transition-transform duration-300
        hover:scale-110
      "
    />
  </a>

  {/* TIKTOK */}
  <a
    href="https://www.tiktok.com/@stavo.official1?is_from_webapp=1&sender_device=pc"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img
      src={tiktok_cloud}
      alt="TikTok"
      className="
        w-7 h-7
        md:w-8 md:h-8
        lg:w-9 lg:h-9
        cursor-pointer
        transition-transform duration-300
        hover:scale-110
      "
    />
  </a>

  {/* TELEGRAM (unchanged - add link if you want later) */}
  <img
    src={telegram_cloud}
    alt="Telegram"
    className="
      w-7 h-7
      md:w-8 md:h-8
      lg:w-9 lg:h-9
      cursor-pointer
      transition-transform duration-300
      hover:scale-110
    "
  />

</div>

    </div>
  </div>
</motion.div>

      {/* ================= SCENE 0 ================= */}
      <AnimatePresence mode="wait">
  {scene === 0 && (
        <motion.div
      key="scene0"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="absolute inset-0"
    >

          {/* CLOUD */}
          <motion.img
          key="cloud"
          src={cloud}
          alt=""
          variants={cloudAnim}
          initial="hidden"
          animate="show"
          exit="exit"
          className="absolute bottom-0 left-0 w-full h-40 sm:h-48 object-cover z-10"
        />

          {/* TITLE */}
          <motion.div
            variants={titleAnim}
            initial="hidden"
            animate="show"
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
          >
            <h1 className="text-[18vw] leading-none font-['GFS_Didot'] text-[#AD2E1B] drop-shadow-[0_0_18px_rgba(255,0,0,0.25)]">
              STAVO
            </h1>

            <motion.img
              src={stavo_image}
              alt="STAVO model"
              variants={imageAnim}
              initial="hidden"
              animate="show"
              className="absolute bottom-[20px] sm:bottom-[40px] w-[80vw] sm:w-[60vw] max-w-[800px] z-20"
              style={{ filter: "none" }}
            />
          </motion.div>
        </motion.div>
        )}

      {/* ================= SCENE 1 ================= */}
      {scene === 1 && (
        <motion.div
      key="scene1"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="absolute inset-0 flex items-center justify-center px-4"
    >

          {/* LINES */}
          <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          exit={{ scaleX: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ transformOrigin: "left center" }}
          className="absolute top-[40%] w-full h-[3px] bg-red-500/40"
        />

          <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          exit={{ scaleX: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ transformOrigin: "right center" }}
          className="absolute bottom-[40%] w-full h-[3px] bg-red-500/40"
        />

          {/* TEXT BLOCK RESPONSIVE */}
          <h2 className="w-full max-w-[973px] text-center font-['Montserrat_Alternates'] text-sm sm:text-lg md:text-2xl lg:text-3xl tracking-[4px] sm:tracking-[8px] lg:tracking-[13.44px] leading-relaxed">

            <span className="text-red-700">
              {words.map((w, i) =>
                i === 0 ? (
                  <motion.span  
                    key={i}
                    custom={i}
                    variants={wordAnim}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="inline-block mr-2"
                  >
                    {w}
                  </motion.span>
                ) : null
              )}
            </span>

            <span className="text-white">
              {" "}
              {words.slice(1).map((w, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={wordAnim}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className="inline-block mr-2"
                >
                  {w}
                </motion.span>
              ))}
            </span>

          </h2>

        </motion.div>
      )}

      {/* ================= SCENE 2 ================= */}
{scene === 2 && (
  <motion.div
    key="scene2"
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -40 }}
    transition={{ duration: 0.8, ease: "easeInOut" }}
    className="absolute inset-0 bg-[#141720] overflow-y-auto scrollbar-hide mt-7"
    style={{
      WebkitOverflowScrolling: "touch",
      overscrollBehavior: "contain",
    }}
  >
    <div className="w-full min-h-[100dvh] flex flex-col items-center px-4  mt-32 pb-16 gap-20">

      {/* ================= BASE ================= */}
      <section className="w-full max-w-6xl flex flex-col items-center gap-12">

        <h1 className="text-center text-white text-3xl sm:text-5xl font-bold">
          Colecția de bază
        </h1>

          <div className="flex flex-wrap justify-center gap-8">
                  {[img1, img2, img3, img4, img5].map((img, i) => (
                    <div key={i} className="w-[320px] sm:w-[340px]">
                      <FlipCard
                        title={["STAVO CAP", "WINDBREAKER", "CREWNECK BLACK", "OVERSIZED TEE", "HOODIE"][i]}
                        price={["€29", "€89", "€69", "€49", "€99"][i]}
                        img={img}
                        isFlipped={flippedCard === i}
                        onFlip={() => setFlippedCard(flippedCard === i ? null : i)}
                      />
                    </div>

          ))}

        </div>
      </section>

      {/* ================= DIVIDER 1 ================= */}
      <div className="w-full max-w-6xl h-px bg-neutral-700/60" />

      {/* ================= COMBO ================= */}
      <section className="w-full max-w-6xl flex flex-col items-center gap-12">
                <h2 className="text-center text-white text-3xl sm:text-5xl font-bold">
                  Colecția combo
                </h2>

                <div className="flex flex-wrap justify-center gap-10">
                  <div className="w-[360px] sm:w-[420px]">
                    <FlipCard
                      title="SUMMER COMBO GREY"
                      price="€129"
                      img={img6}
                      isFlipped={flippedCard === 5}
                      onFlip={() => setFlippedCard(flippedCard === 5 ? null : 5)}
                    />
                  </div>

                  <div className="w-[360px] sm:w-[420px]">
                    <FlipCard
                      title="SUMMER COMBO BLACK"
                      price="€129"
                      img={img7}
                      isFlipped={flippedCard === 6}
                      onFlip={() => setFlippedCard(flippedCard === 6 ? null : 6)}
                    />
                  </div>
                </div>
              </section>

      {/* ================= DIVIDER 2 ================= */}
      <div className="w-full max-w-6xl h-px bg-neutral-700/60" />

      {/* ================= CTA ================= */}
      <section className="w-full max-w-6xl flex flex-col items-center gap-6 pt-10">

        <h3 className="text-white text-2xl sm:text-4xl font-semibold text-center">
          Join the Movement
        </h3>

        <p className="text-neutral-400 text-center max-w-xl">
          Get early access to drops, exclusive releases, and behind-the-scenes updates.
        </p>

        <a
          href="https://t.me/yourchannel"
          target="_blank"
          rel="noreferrer"
          className="
            px-8 py-4
            bg-red-600 hover:bg-red-700
            text-white font-semibold
            rounded-full
            transition-all duration-300
            active:scale-95
          "
        >
          Go to Telegram
        </a>
      </section>

      {/* ================= DIVIDER 3 ================= */}
      <div className="w-full max-w-6xl h-px bg-neutral-700/60" />

      {/* ================= FOOTER ================= */}
      <footer className="w-full max-w-6xl flex flex-col items-center gap-2 pt-0">

        <p className="text-neutral-500 text-sm tracking-wider">
          © 2026 STAVO. All rights reserved.
        </p>

      </footer>

    </div>
  </motion.div>
)}
      </AnimatePresence>

    </section>
  );
}