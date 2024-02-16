<template>
  <RouterView />
</template>

<style lang="scss">
@use './assets/variables' as vars;
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital@0;1&family=Inter:wght@400..700&display=swap');

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'Inter', sans-serif;
  font-weight: bold;
  color: white;
}

p {
  font-family: 'Inter', sans-serif;
  color: white;
}

#app {
  min-height: 100vh;
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: vars.$bg_color;

  .subtitle_text {
    font-family: 'IBM Plex Serif', serif;
  }

  .bold_text {
    font-weight: bold;
  }

  .page__header {
    font-size: 1.875rem;
    text-align: center;
  }
  
  .page__subtitle {
    font-size: 1.125rem;
  }
}
</style>
