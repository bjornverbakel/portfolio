<template>
  <section class="snap-section">
    <h1>About Me</h1>
    <p>
      My name is Bjorn Verbakel. I am an HBO-ICT student at Fontys University of
      Applied Sciences in Eindhoven, with a focus on front-end development.
    </p>
  </section>

  <section class="snap-section">
    <h2>My Focus</h2>
    <p>
      My studies and personal projects have given me a solid understanding of
      how to build clear and appealing user interfaces using modern web
      technologies.
    </p>
  </section>

  <section class="snap-section">
    <h2>Interests</h2>
    <p>
      In addition to web development, I'm also interested in 3D modeling. I like
      exploring how 3D elements can be used in websites or applications to
      create more engaging and interactive experiences.
    </p>
  </section>
</template>

<style scoped>
.about-content {
  width: 100%;
}

.snap-section {
  min-height: 100vh;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

h1,
h2 {
  margin-bottom: 1rem;
}

p {
  max-width: 600px;
  line-height: 1.6;
}
</style>
