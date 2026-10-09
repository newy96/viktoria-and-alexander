import React from "react";

export function Programme() {
  return (
    <section
      id="programme"
      aria-label="Програмата"
      className="relative z-10 h-[100svh] w-full overflow-hidden bg-wine-950"
    >
      <picture className="block h-full w-full">
        <source
          media="(max-width: 767px)"
          srcSet="/timeline_mobile.png"
        />

        <img
          src="/timeline.png"
          alt="Програма на сватбата"
          draggable={false}
          className="block h-full w-full object-cover object-center"
        />
      </picture>
    </section>
  );
}