"use client";

import Lottie, { LottieRefCurrentProps } from "lottie-react";
import React, { useEffect, useRef, useState } from "react";
import logoOnPageLoad from "@/public/lottie/yattaLogo/logoOnPageLoad.json";
import logoOnHover from "@/public/lottie/yattaLogo/logoOnHover.json";


const Navbar = () => {
    const styleLogo = {
        overflow: "hidden",
        width: 162,
        height: 64,
        cursor: "pointer",
        margin: 0,
        };

        const [isHovered, setIsHovered] = useState(false);
        const [shouldAnimatePageLoad, setShouldAnimatePageLoad] = useState(true);
        const [isHeaderHidden, setIsHeaderHidden] = useState(false);
        const lottieRef = useRef<LottieRefCurrentProps | null>(null);
        const prevScrollY = useRef(0);

        const handleMouseEnter = () => {
        if (lottieRef.current) {
            if (!shouldAnimatePageLoad) {
            setIsHovered(true);
            lottieRef.current.setDirection(1);
            lottieRef.current.goToAndPlay(0, true);
            }
        }
        };

        const handleAnimationComplete = () => {
        if (shouldAnimatePageLoad) {
            setShouldAnimatePageLoad(false);
            if (lottieRef.current) {
            lottieRef.current.setDirection(1);
            lottieRef.current.play();
            }
        }
        };

        const handleScroll = () => {
        const currentScrollY = window.scrollY || document.documentElement.scrollTop;
        const scrollThreshold = 10;
        const animationFrame = document.getElementById("animationFrame");

        if (animationFrame) {
            // Check if scrolling down
            if (currentScrollY > prevScrollY.current + scrollThreshold) {
            setIsHeaderHidden(true);
            animationFrame.style.width = "65px";
            }
            // Check if scrolling up
            else if (currentScrollY < prevScrollY.current - scrollThreshold) {
            setIsHeaderHidden(false);
            animationFrame.style.width = "162px";
            }

                // Add/remove the transition class dynamically
                animationFrame.classList.add("animationFrameTransition");

        }

        prevScrollY.current = currentScrollY;
        };


        useEffect(() => {
        // Add scroll event listener when component mounts
        window.addEventListener("scroll", handleScroll);

        // Remove event listener when component unmounts
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
        }, []);

      
    return (
        <>
            <section className="flex fixed top-0 w-full z-50">
                <div className="flex-1"></div>
                <div className="parent w-full max-w-[1536px] mx-auto flex justify-between">
                <div
                    className="child-logo h-[64px] w-[162px]"
                    id="lottie"
                    onMouseEnter={handleMouseEnter}
                >
                    <div className="animationFrame overflow-hidden w-[162px]" id="animationFrame">
                    <Lottie
                        className="logo"
                        animationData={isHovered ? logoOnHover : logoOnPageLoad}
                        style={styleLogo}
                        loop={false}
                        autoplay={shouldAnimatePageLoad || isHovered}
                        lottieRef={lottieRef}
                        onComplete={handleAnimationComplete}
                    />
                    </div>
                </div>
                </div>
                <div className="flex-1"></div>
            </section>

            <header
                className={`flex fixed top-0 w-full z-40 transition-transform ${
                isHeaderHidden ? "-translate-y-full" : "translate-y-0"
                }`}
                id="navbar-01"
            >
                <div className="flex-1 bg-[#1e245e]"></div>
                <div className="parent w-full max-w-[1536px] mx-auto flex justify-between">
                <div
                    className="child-logo bg-[#1e245e] h-[64px] w-[162px]"
                >
                </div>
                <div className="child-menu text-white">
                    <a>Thoughts</a>
                    <a>Products</a>
                    <a>Projects</a>
                    <a>Careers</a>
                </div>
                </div>
                <div className="flex-1"></div>
            </header>
        </>
    )
};

export default Navbar;