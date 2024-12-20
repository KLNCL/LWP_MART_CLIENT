import React from "react";
import "./AboutUs.scss";
import backgroundImage from "../../Image/aboutUS.jpg";

export default function AboutUs() {
  return (
    <div className="about-container">
      <div className="tite">
        <p>About Us</p>
        <hr style={{ width: "85vw", color: "black", marginTop: "173px" }} />
      </div>
      <div className="body">
        <div className="left">
          <img src={backgroundImage} />
        </div>
        <div className="right">
          <p>
            At LWP Mart, we are dedicated to celebrating the timeless artistry
            of rural wood producers while empowering them to thrive in today's
            modern market. Our platform bridges the gap between traditional
            craftsmanship and contemporary consumer demands, providing a space
            where artisans can showcase their unique wooden creations to a
            global audience.We understand the challenges faced by rural wood
            artisans, including limited market access and reliance on
            intermediaries. By offering a direct-to-consumer online marketplace,
            we ensure that these talented producers receive fair value for their
            exceptional work, eliminating the need for brokers and fostering
            sustainable growth.
            <br />
            <br />
            With features like detailed product descriptions, high-resolution
            images, secure payment systems, and seamless communication tools,
            LWP Mart not only enhances visibility for artisans but also enriches
            the shopping experience for customers seeking authentic, handcrafted
            wooden products.Our mission is to uplift rural communities, promote
            economic opportunities, and preserve the rich heritage of
            traditional woodcraft. At LWP Mart, we are not just a marketplace;
            we are a movement to honor and sustain the art of woodworking for
            generations to come.
          </p>
        </div>
      </div>
    </div>
  );
}
