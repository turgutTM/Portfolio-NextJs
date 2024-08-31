import React from "react";
import Link from "next/link";

const Projects = () => {
  return (
    <div className="bg-black gap-9 pb-10 text-white flex flex-col items-center justify-center">
      <div className="mt-14">
        <p className="text-5xl font-semibold">Projects</p>
      </div>
      <div className="w-[40rem]">
        <p className="font-mono">
          I have previously developed many projects, but some of these were
          solely frontend or backend. Below are two example projects where I
          handled the entire development of the websites.If you want to see more
          you can check my{" "}
          <span>
            <Link href="https://github.com/turgutTM?tab=repositories">
              github
            </Link>
          </span>{" "}
          address
        </p>
      </div>
      <div className="flex gap-10">
        <div className="flex flex-col gap-4">
          <Link
            href="https://github.com/turgutTM/Social-Media-App"
            target="_blank"
          >
            <img
              className="w-[30rem] h-[20rem] rounded-lg object-center object-cover transition-transform duration-300 hover:scale-105"
              src="/Socialmediaphoto.png"
              alt="Social Media App"
            />
          </Link>
          <p className="flex justify-center font-medium">Social Media app</p>
        </div>
        <div className="flex flex-col gap-4">
          <Link
            target="_blank"
            href="https://github.com/turgutTM/Science-Blog-App"
          >
            <img
              className="w-[30rem] h-[20rem] rounded-lg object-cover transition-transform duration-300 hover:scale-105"
              src="/Scienceproject-photo.png"
              alt="Science Blog App"
            />
          </Link>
          <p className="flex justify-center font-medium">Science Blog App</p>
        </div>
      </div>
    </div>
  );
};

export default Projects;
