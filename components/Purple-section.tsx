"use client";

import React from 'react';
import Image from 'next/image';
import purpleSectionTop from "../public/svg/yatta_section_purple_01.svg";
import purpleSectionBottom from "../public/svg/yatta_section_purple_03.svg";

const PurpleSection = () => {
    return (
        <>
            {/* PURPLE ELEMENT SECTION */}
            <div className='row-start-5 w-screen h-auto'>
                    <Image
                        className='purpleSectionTop'
                        src={purpleSectionTop}
                        alt="Content Section"
                        style={{objectFit: "cover", width:"100vw"}}
                    />
                    <div className='purpleSectionMiddle bg-[#8649ff] h-[500px] -m-1'></div>
                    <Image
                        className='purpleSectionBottom'
                        src={purpleSectionBottom}
                        alt="Content Section"
                        style={{objectFit: "cover", width:"100vw"}}
                    />
            </div>
        </>
    )
};

export default PurpleSection;