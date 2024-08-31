import React from "react";

const Skills = () => {
  return (
    <div className="flex pb-20 justify-center">
      <div className="bg-[#131212] w-[80rem] p-10  rounded-[5rem]  shadow-lg flex flex-col items-center">
        <div className="text-white font-bold text-5xl mb-8">
          <p>Skills</p>
        </div>
        <div className="text-white w-[45rem] mb-10">
          <p className="text-white font-light text-center">
            Proficient in a range of modern tools and frameworks, capable of
            building robust and responsive web applications with a focus on
            clean design and efficient performance. If you want to see more 
            you can check my 
          </p>
        </div>
        <div className="flex flex-wrap gap-8 justify-center">
          <div className="bg-[#2a2929] p-6 rounded-lg shadow-md w-[30rem]">
            <p className="text-3xl font-bold  text-white mb-4">
              Frontend Development
            </p>
            <p className="font-light text-gray-300">
              Skilled in React, Next.js, and Angular. Experienced with Tailwind
              CSS and Sass/SCSS for styling, adept at state management with
              Redux and Context API, and capable of handling API integration
              with Axios, React Router, and Vite.
            </p>
          </div>
          <div className="bg-[#2a2929] p-6 rounded-lg shadow-md w-[30rem]">
            <p className="text-3xl font-bold text-white mb-4">
              Backend Development
            </p>
            <p className="font-light text-gray-300">
              While focused on frontend, also have a solid understanding of
              backend technologies including Node.js, Express, and database
              management with MongoDB and SQL.
            </p>
          </div>
          <div className="bg-[#2a2929] p-6 rounded-lg shadow-md w-[30rem]">
            <p className="text-3xl font-bold text-white mb-4">UI/UX Design</p>
            <p className="font-light text-gray-300">
              Experienced in creating user-friendly interfaces with a focus on
              simplicity and usability, using tools like Figma and Adobe XD.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
