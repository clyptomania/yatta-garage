import React from "react";
import Image from 'next/image'
import Navbar from "@/components/Navbar";
import HeaderSection from "@/components/Header-section";


export default function SketchNavBar() {

  return (
    <>
      <Navbar/>
      <main id="main-content">
        <HeaderSection/>

        {/* CONTENT */}
        <div className="content pt-[40em] px-40 2xl:px-10 max-w-[1536px] mx-auto">
          <h1>Lorem ipsum dolor sit amet</h1>
          <h3>
              Consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam
              voluptua. At vero eos et accusam et justo duo dolores et ea
              rebum. Stet clita kasd gubergren, no sea takimata sanctus est
              Lorem ipsum dolor sit amet.
          </h3>
          <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
              diam nonumy eirmod tempor invidunt ut labore et dolore magna
              aliquyam erat, sed diam voluptua. At vero eos et accusam et
              justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
              takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
              dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
              eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
              sed diam voluptua. At vero eos et accusam et justo duo dolores
              et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
              est Lorem ipsum dolor sit amet. Duis autem vel eum iriure dolor
              in hendrerit in vulputate velit esse molestie consequat, vel
              illum dolore eu feugiat nulla facilisis at vero eros et accumsan
              et iusto odio dignissim qui blandit praesent luptatum zzril
              delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum
              dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
              nibh euismod tincidunt ut laoreet dolore magna aliquam erat
              volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
              tation ullamcorper suscipit lobortis nisl ut aliquip ex ea
              commodo consequat. Duis autem vel eum iriure dolor in hendrerit
              in vulputate velit esse molestie consequat, vel illum dolore eu
              feugiat nulla facilisis at vero eros et accumsan et iusto odio
              dignissim qui blandit praesent luptatum zzril delenit augue duis
              dolore te feugait nulla facilis Nam liber tempor cum soluta
              nobis eleifend option congue nihil imperdiet doming id quod
              mazim placerat facer possim assum. Lorem ipsum dolor sit amet,
              consectetuer adipiscing elit, sed diam nonummy nibh euismod
              tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi
              enim ad minim veniam, quis nostrud exerci tation ullamcorper
              suscipit lobortis nisl ut aliquip ex ea commodo consequat.{" "}
          </p>
          <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
              diam nonumy eirmod tempor invidunt ut labore et dolore magna
              aliquyam erat, sed diam voluptua. At vero eos et accusam et
              justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
              takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
              dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
              eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
              sed diam voluptua. At vero eos et accusam et justo duo dolores
              et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
              est Lorem ipsum dolor sit amet. Duis autem vel eum iriure dolor
              in hendrerit in vulputate velit esse molestie consequat, vel
              illum dolore eu feugiat nulla facilisis at vero eros et accumsan
              et iusto odio dignissim qui blandit praesent luptatum zzril
              delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum
              dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
              nibh euismod tincidunt ut laoreet dolore magna aliquam erat
              volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
              tation ullamcorper suscipit lobortis nisl ut aliquip ex ea
              commodo consequat. Duis autem vel eum iriure dolor in hendrerit
              in vulputate velit esse molestie consequat, vel illum dolore eu
              feugiat nulla facilisis at vero eros et accumsan et iusto odio
              dignissim qui blandit praesent luptatum zzril delenit augue duis
              dolore te feugait nulla facilis Nam liber tempor cum soluta
              nobis eleifend option congue nihil imperdiet doming id quod
              mazim placerat facer possim assum. Lorem ipsum dolor sit amet,
              consectetuer adipiscing elit, sed diam nonummy nibh euismod
              tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi
              enim ad minim veniam, quis nostrud exerci tation ullamcorper
              suscipit lobortis nisl ut aliquip ex ea commodo consequat.{" "}
          </p>
        </div>   

      </main>


    </>
  );
}
