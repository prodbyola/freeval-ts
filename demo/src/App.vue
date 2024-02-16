<template>
  <RouterView />
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital@0;1&family=Inter:wght@400..700&display=swap');

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'Inter', sans-serif;
  font-weight: bold;
}

p {
  font-family: 'Inter', sans-serif;
}

#app {
  min-height: 100vh;
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;

  .subtitle_text {
    font-family: 'IBM Plex Serif', serif;
  }

  .bold_text {
    font-weight: bold;
  }
}
</style>
