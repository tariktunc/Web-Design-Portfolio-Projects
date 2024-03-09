import React from "react";
import Navbar from "@/app/Components/Navbar/Navbar";

export default function Notfound() {
  return (
    <>
      <Navbar />
      <div className="bg-blue-500 flex flex-col justify-center items-center">
        <h2>There was a problem.</h2>
        <p>
          We could not find the page you were looking for. <br /> Go back to the
          home
        </p>
      </div>
    </>
  );
}
