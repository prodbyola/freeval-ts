<template>
  <div class="app_socials">
    <div
      v-for="(social, index) in socials"
      :key="index"
      @click="() => openLink(social)"
      class="social_logo"
    >
      <img :src="social + '.png'" />
    </div>
  </div>
</template>
<script setup lang="ts">
const socials = ['twitter', 'linkedin', 'github']

const openLink = (social: (typeof socials)[number]) => {
  let link = `https://${social}.com/${social === 'linkedin' ? 'in/' : ''}prodbyola`
  if (social === 'github') {
    link += '/freeval-ts'
  }

  window.open(link, '_target')
}
</script>
<style lang="scss" scoped>
$logo_size: 24px;
$column_gap: 12px;

.app_socials {
  display: flex;
  justify-content: center;
  background-color: white;
  padding: 12px;
  column-gap: $column_gap;
  border-radius: 999px;
  margin: 24px auto 0px auto;
  width: calc(($logo_size * 3) + ($column_gap * 3) + 120px);

  .social_logo {
    height: $logo_size;
    width: $logo_size;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
