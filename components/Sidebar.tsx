"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import iconPayments from "@/public/icons/credit-card.svg";
import iconDashboard from "@/public/icons/dashboard.svg";
import iconProducts from "@/public/icons/product.svg";
import iconPayouts from "@/public/icons/payouts.svg";
import iconCompany from "@/public/icons/office.svg";
import iconSubscription from "@/public/icons/subscription.svg";
import iconMember from "@/public/icons/user-group.svg";
import iconSettings from "@/public/icons/settings.svg";
import iconCollapse from "@/public/icons/collapse.svg";

const sidebarItems = [
  {
    name: "Dashboard",
    href: "/vision/dashboard",
    icon: iconDashboard,
    iconId: "icon-dashboard",
  },
  {
    name: "Company Profile",
    href: "/vision/company-profile",
    icon: iconCompany,
    iconId: "icon-company",
  },
  {
    name: "Products",
    href: "/vision/products",
    icon: iconProducts,
    iconId: "icon-products",
  },
  {
    name: "Payouts",
    href: "/vision/payouts",
    icon: iconPayouts,
    iconId: "icon-payouts",
  },
  {
    name: "Payments",
    href: "/vision/payments",
    icon: iconPayments,
    iconId: "icon-payments",
  },
  {
    name: "Active Subscriptions",
    href: "/vision/active-subscriptions",
    icon: iconSubscription,
    iconId: "icon-subscriptions",
  },
  {
    name: "Member",
    href: "/vision/member",
    icon: iconMember,
    iconId: "icon-member",
  }
];

export default function Sidebar () {

  const [isCollapsedSidebar, settoggleSidebarCollapse] = useState<boolean>(false);
  const toggleSidebarCollapseHandler = () => {
    settoggleSidebarCollapse((prev) => !prev);
  }
  console.log(isCollapsedSidebar)

  return (
    <>
      <div className="sidebar__wrapper relative">
        <button className="btnResize absolute pointer right-[-2.5rem] top-[4.8rem] w-[1.5rem] h-[1.5rem] z-50" onClick={toggleSidebarCollapseHandler}>                  
          <Image
            className="" 
            id="icon-collapse"
            src={iconCollapse}
            alt="Collapse Sidebar"
            style={{}}      
          />
        </button>

        <aside className="sidebar flex flex-col border col-span-1 h-screen pt-16 relative bg-white overflow-hidden" id="sidebar" data-collapse={isCollapsedSidebar}>
          <ul className="w-full mt-0 overflow-y-auto overflow-x-hidden" id="sidebar-list">
            {sidebarItems.map(({ name, href, icon: Icon, iconId }) => (
              <li className="flex items-center pl-4 h-[48px] hover:bg-[#F4F0FF] text-black hover:text-[#8649FF] hover:font-bold text-[15px]" key={name}>
                <Link href={href} className="sidebar-link flex ">
                  <Image
                      className="" 
                      id={iconId}
                      src={Icon}
                      alt={name}
                      style={{}}      
                  />
                  <span className="label ml-4" id="sidebar-name">{name}</span>
                </Link>
              </li>
            ))}
          </ul>
          <button className="flex absolute bottom-0 left-0 items-center pl-4 h-[48px] bg-white w-full" id="user-settings">
                <Image
                    className="" 
                    id="icon-settings"
                    src={iconSettings}
                    alt="User Settings"
                    style={{}}      
                />
                <span className="label ml-4">User Settings</span>
          </button>
        </aside>
        
      </div>
    </>
  )

}