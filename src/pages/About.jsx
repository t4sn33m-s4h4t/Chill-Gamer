import React from "react";
import Title from "../components/title/Title";

const About = () => {
  return (
    <div className="md:max-w-[80%] max-w-[90%] mx-auto pt-10">
      <div className="lg:px-60 md:px-20 px-2 md:py-20 py-2 bg-green-950 dark:bg-sky-900 rounded-xl">
        <div className="bg-white dark:bg-indigo-950 lg:px-[15%] md:px-12 px-4 py-10 rounded-lg">

          <Title text={"About Us"} />
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            Welcome to <span className="font-bold text-sky-600 ">Chill Gamer</span> — your ultimate destination for game reviews and discovery!
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            At Chill Gamer, we believe gaming should be an enjoyable and relaxing experience, just like our platform. Designed with gamers in mind, our user-friendly application offers a space where users can explore detailed game reviews, share their opinions, and connect with others who share their passion for gaming.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            <strong>Key Features:</strong>
          </p>
          <ul className="text-left text-gray-700 dark:text-gray-300 list-disc list-inside my-4">
            <li>
              <span className="font-semibold">User Authentication:</span> A secure and seamless login experience to protect your profile and reviews.
            </li>
            <li>
              <span className="font-semibold">Review Management:</span> Write, edit, and manage reviews easily for all your favorite games.
            </li>
          </ul>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Our clean, responsive UI ensures you have a seamless, <span className="italic">chill</span> experience while browsing the world of gaming.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mt-6">
            Join <span className="font-bold text-sky-600 ">Chill Gamer</span> today and explore the gaming universe like never before!
          </p>

        </div>
      </div>
    </div>
  );
};

export default About;
