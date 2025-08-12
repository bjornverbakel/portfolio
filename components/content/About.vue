<template>
  <section>
    <h1>About Me</h1>
    <p>
      My name is Bjorn Verbakel. I am an HBO-ICT student at Fontys University of
      Applied Sciences in Eindhoven, with a focus on front-end development. My
      studies and personal projects have given me a solid understanding of how
      to build clear and appealing user interfaces using modern web
      technologies. <br />
      <br />
      In addition to web development, I'm also interested in 3D modeling. I like
      exploring how 3D elements can be used in websites or applications to
      create more engaging and interactive experiences.
    </p>
    <div
      class="portrait-container border-4 border-solid border-[var(--black)]"
    >
      <NuxtImg
        src="/images/portrait-dither.png"
        alt="Profile picture of Bjorn Verbakel"
        width="200"
        height="auto"
        class="portrait portrait-dithered"
        loading="lazy"
      />
      <NuxtImg
        src="/images/portrait.jpg"
        alt="Profile picture of Bjorn Verbakel"
        width="200"
        height="auto"
        class="portrait portrait-normal"
        loading="lazy"
      />
    </div>
  </section>
</template>

<style scoped>
.portrait-container {
  position: relative;
  display: inline-block;
  width: 200px;
  height: auto;
}

.portrait {
  width: 200px;
  height: auto;
  transition: opacity 0.3s ease;
}

.portrait-dithered {
  position: relative;
  z-index: 2;
}

.portrait-normal {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  opacity: 0;
}

.portrait-container:hover .portrait-dithered {
  opacity: 0;
}

.portrait-container:hover .portrait-normal {
  opacity: 1;
}
</style>
