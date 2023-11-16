import React from "react";
import BaseLayout from "@/components/BaseLayout";
import Image from "next/image";
import groupIconExample from "@/public/icons/Group-240753.png";
import iconContact from "@/public/icons/contact.svg";
import iconGeneral from "@/public/icons/general.svg";
import iconRegistration from "@/public/icons/registration.svg";

const infoCard = [
  {
    title: "General",
    icon: iconGeneral,
    iconId: "icon-general",
    companyName: "BeeTools Gesellschaft mit beschränkter Haftung",
    companyAlias: "BeeTools",
    vatID: "DE987654321",
    companyWebsite: "http://www.bee-tools.de",
    businessAddress: "Hauptstraße 123, 10115 Berlin, Germany",
  },
  {
    title: "Contact",
    icon: iconContact,
    iconId: "icon-contact",
    contactEmail: "contact@bee-tools.de",
    contactPhoneNumber: "+49 30 12345678",
  },
  {
    title: "Registration",
    icon: iconRegistration,
    iconId: "icon-registration",
    registrationNumber: "HRB 123456",
    registerCourt: "Amtsgericht Berlin",
  },
];

export default function Company() {

  return (
    <>
      <BaseLayout>

        <section className="wrapper__companyTitle">
          <h1>Company Profile</h1>
          <p>Manage your companies information, including business registrations and contact addresses</p>
        </section>

        <section className="wrapper__productCard flex bg-[#26262E] w-full h-auto rounded-[24px] p-8 text-white my-8">
          <div className="pr-8">
            <h2 className="pb-2">BeeTools</h2>
            <p className="">Streamline Your Data Management. BeeTools develops tools to simplifiy data organization, analysis, and visualization for enhanced business insights and decision-making.</p>
          </div>
          <div className="flex w-auto px-6">
            <Image
              className="w-[34px] h-[34px] border-solid border-white rounded-[8px] border-[1px]" 
              id="group-icon"
              src={groupIconExample}
              alt="Group Icon Placeholder"
              style={{}}                            
            />
            <h1 className="px-4">BeeTools</h1>
          </div>
        </section>

        <section className="wrapper__tagsFlags">
          <h2 className="pb-3">Tags & flags</h2>
          <div className="flex flex-wrap font-yattaSans">
            <span className="bg-[#F2F2F2] px-3 rounded-[24px] mr-3 mb-3"># data management</span>
            <span className="bg-[#F2F2F2] px-3 rounded-[24px] mr-3 mb-3"># data analysis</span>
            <span className="bg-[#F2F2F2] px-3 rounded-[24px] mr-3 mb-3"># software tools</span>
            <span className="bg-[#F2F2F2] px-3 rounded-[24px] mr-3 mb-3"># eclipse</span>
          </div>
        </section>

        {infoCard.map(({ 
          title, 
          icon: Icon, 
          iconId, 
          companyName, 
          companyAlias, 
          vatID, 
          companyWebsite, 
          businessAddress, 
          contactEmail,
          contactPhoneNumber,
          registrationNumber,
          registerCourt,
          }) => (
          <section className="wrapper__info bg-white rounded-[24px] shadow-md p-8 my-8">
            <div className="flex mb-8">
              <Image
                  className="" 
                  id={iconId}
                  src={Icon}
                  alt="Info Icon"
                  style={{}}                            
                />
              <h2 className="ml-4">{title}</h2>
            </div>
            <ul>
              {companyName && ( 
                <li className="flex flex-wrap">
                  <span className="w-[15rem] text-[#858585] text-xs my-auto">Company name as registered</span>
                  <span className="my-auto">{companyName}</span>
                </li>
              )}
            </ul>
          </section>
        ))}
      </BaseLayout>
    </>
  )
}
