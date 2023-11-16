import React from "react";
import BaseLayout from "@/components/BaseLayout";
import Image from "next/image";
import groupIconExample from "@/public/icons/Group-240753.png";

export default function Company() {

  return (
    <>
      <BaseLayout>
        <h1>Company Profile</h1>
        <p>Manage your companies information, including business registrations and contact addresses</p>
        <div className="card flex bg-[#26262E] w-full h-auto rounded-[24px] p-8 text-white my-8">
          <div className="pr-8">
            <h2 className="pb-2">Honeycomb</h2>
            <p className="">Streamline Your Data Management. Our SaaS tool simplifies data organization, analysis, and visualization for enhanced business insights and decision-making.</p>
          </div>
          <div className="flex w-auto px-6">
            <Image
              className="w-[34px] h-[34px] border-solid border-white rounded-[8px] border-[1px]" 
              id="group-icon"
              src={groupIconExample}
              alt="Group Icon Placeholder"
              style={{}}                            
            />
            <h1 className="px-4">Honeycomb</h1>
          </div>
        </div>
      </BaseLayout>
    </>
  )
}
