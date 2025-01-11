<script setup lang="ts">
import { useEventEmitter } from '@/hooks/events'

const systemStore = useSystemStore()
systemStore.init()

useEventEmitter()
</script>

<template>
  <router-view />
</template>

<style lang="scss">
@font-face {
  font-family: douyu;
  src:
    url(/static/fonts/douyu.woff) format('woff'),
    url(/static/fonts/douyu.ttf) format('truetype');
}

@font-face {
  font-family: iconfont;
  src: url(/static/fonts/iconfont.eot);
  src:
    url(/static/fonts/iconfont.eot#iefix) format('embedded-opentype'),
    url(/static/fonts/iconfont.woff2) format('woff2'),
    url(/static/fonts/iconfont.woff) format('woff'),
    url(/static/fonts/iconfont.ttf) format('truetype');
  font-display: swap;
}
* {
  @include useTheme {
    @include scrollbar(5px, getVal(scrollColor));
  }
}
</style>
