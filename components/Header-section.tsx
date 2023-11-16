"use client";

import React from 'react';
import Image from 'next/image';
import PurpleSection from './Purple-section';

const HeaderSection = () => {

    return (
        <>
            {/* FULL SCREEN HEADER IMAGE */}
            <section className="relative header-img w-full h-screen">
                <Image 
                    className="object-cover object-center h-full w-full"
                    src="/image/header-img-YattaFFM_Tag01_0109.png"
                    width={5312} height={3543} alt={"career page header"}              />
            </section>

            <section className='absolute top-0 right-0 bottom-0 left-0 grid grid-rows-5 grid-cols-6'>
                <PurpleSection/>
            </section>

        </>
    )
};

export default HeaderSection;