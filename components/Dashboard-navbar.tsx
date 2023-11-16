"use client";

import React from "react";
import Image from "next/image";
import iconSearch from "../public/icons/search.svg";
import iconNotification from "../public/icons/notification.svg";
import iconProfile from "../public/icons/user-circle.svg";
import iconPlus from "../public/icons/plus.svg";
import iconCaretUp from "../public/icons/caret-up.svg";
import iconCaretDown from "../public/icons/caret-down.svg";
import iconCaretDouble from "../public/icons/caret-double-vertical.svg";
import groupIconExample from "../public/icons/Group-240753.png";


const DashboardNavbar = () => {
    return (
        <>
            <header
                className="navContainer fixed top-0 left-0 flex h-16 w-full z-40 bg-[#1e245e] mx-auto justify-between"
                id="dashboard-navbar"
            >
                <div className="child flex items-center justify-between" id="select-group">
                    <button className="flex w-[300px] items-center justify-between px-3">
                        <Image
                            className="w-[34px] border-solid border-white rounded-[8px] border-[1px]" 
                            id="group-icon"
                            src={groupIconExample}
                            alt="Group Icon Placeholder"
                            style={{}}                            
                        />
                        <div className="flex flex-col text-white px-3">
                            <p className="mr-auto leading-4" id="product-name">Honeycomb</p>
                            <p className="text-[13px] opacity-60 mr-auto leading-3 pt-1" id="product-company">BeeToools GmbH</p>
                        </div>
                        <Image
                            className="ml-auto" 
                            id="caret-double-icon"
                            src={iconCaretDouble}
                            alt="Caret Double Icon"
                            style={{}}                            
                        />
                    </button>
                </div>
                <div className="child w-[200px] mr-auto my-auto" id="add-group">
                    <button className="flex m-auto py-1 px-2 border-solid border-white rounded-[8px] border-[1px]">
                        <Image 
                            className="mr-1" 
                            id="add-group"
                            src={iconPlus}
                            alt="Add Group"
                            style={{}}
                        />
                        <Image 
                            className="" 
                            id="group-caret-down"
                            src={iconCaretDown}
                            alt="Add Group Dropdown"
                            style={{}}
                        />
                    </button>
                </div>
                <div className="child flex justify-between text-white" id="nav-links">
                    <a className="m-auto">Link Uno</a>
                    <a className="m-auto">Link Dos</a>
                    <a className="m-auto">Link Tres</a>
                </div>
                <div className="child flex justify-between px-3" id="nav-profile">
                    <Image 
                        className='icon mx-2'
                        id="search"
                        src={iconSearch}
                        alt="Search"
                        style={{}}
                    />
                    <Image 
                        className='icon mx-2'
                        id="notifications"
                        src={iconNotification}
                        alt="Notifications"
                        style={{}}
                    />
                    <Image 
                        className='icon mx-2'
                        id="profile"
                        src={iconProfile}
                        alt="Profile"
                        style={{}}
                    />
                </div>
            </header>
        </>
    )
};

export default DashboardNavbar;