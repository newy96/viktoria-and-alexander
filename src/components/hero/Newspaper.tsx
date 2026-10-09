import React from "react";
import { couple, images } from "../../data/wedding";

export function Newspaper() {
  return (
    <article className="paper px-4 pb-6 pt-4 text-neutral-900 shadow-2xl sm:px-5" aria-label="Запазете датата">
      <div className="flex justify-between border-b border-neutral-900 pb-1 font-news text-[7px] uppercase tracking-widest sm:text-[8px]">
        <span>Брой № 1</span>
        <span>Специално издание</span>
        <span>Цена: 1 усмивка</span>
      </div>
      <h2 className="mt-2 text-center font-news text-3xl font-bold sm:text-4xl">The Wedding Times</h2>
      <p className="mt-1 border-y border-neutral-900 py-1 text-center font-news text-[7px] uppercase tracking-[0.3em] sm:text-[8px]">
        Две сърца · Една история · Едно „да“
      </p>
      <p className="mt-3 text-center font-display text-[30px] font-black uppercase leading-[0.95] tracking-tight sm:text-[38px]">
        Запазете
        <br />
        датата
      </p>
      <p className="mt-2 text-center font-serif text-xl italic">
        {couple.bride} & {couple.groom}
      </p>
      <div className="mt-1 flex items-center gap-3">
        <span className="h-px flex-1 bg-neutral-900" />
        <span className="font-news text-sm tracking-[0.35em]">{couple.dateShort}</span>
        <span className="h-px flex-1 bg-neutral-900" />
      </div>
      <img
        src={images.coupleNewspaper}
        alt="Виктория и Александър се смеят заедно"
        className="mt-3 aspect-[4/3] w-full object-cover grayscale contrast-125" />
      
      <div className="mt-3 grid grid-cols-2 gap-3 text-justify font-news text-[8.5px] leading-snug">
        <p>
          <span className="font-bold uppercase">София.</span> След десет години любов, смях и приключения двойката
          официално обяви, че ще си каже „да“ на брега на язовир Пасарел.
        </p>
        <p>
          Според наши източници празникът ще продължи до зори. Гостите са призовани да запазят датата и да донесат
          най-доброто си настроение.
        </p>
      </div>
    </article>);

}