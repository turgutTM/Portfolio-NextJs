import React from "react";
import TypingEffect from "../pages/typingeffect";

const Main = () => {
  return (
    <div className=" h-screen flex justify-center items-center ">
      <div className="flex justify-between w-full mt-32 pl-20 pr-36">
        <div className=" text-white  flex flex-col gap-2 w-[50rem]">
          <div className="border bg-gradient-to-r rounded-sm from-[#7c5656] to-[#3b2274] p-2 w-fit">
            <p className="font-semibold text-2xl ">Welcome to my Portfolio</p>
          </div>
          <div className="">
            <p className="text-6xl w-[55rem] font-extrabold">
              Hi! I'm Turgut <TypingEffect></TypingEffect>
            </p>
          </div>
          <div className="mt-5 font-thin  text-base">
            Hello, I'm Turgut Muradlı, I am 20 years old, and I've been
            developing myself in the field of web development for almost 2
            years. This is my portfolio. I have developed many projects before
            and have also been involved in projects that were developed. If you
            want to learn more about me, you can visit my social media
            platforms.
          </div>
        </div>
        <div className="">
          <img
            src="/asteroid.png"
            alt="Asteroid"
            className="w-60 h-60 animation-move-up-down" 
          />
        </div>
      </div>
    </div>
  );
};

export default Main;
