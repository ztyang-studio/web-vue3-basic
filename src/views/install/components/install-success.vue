<template>
  <a-result status="success" title="安装成功！">
    <template #subtitle> 恭喜你，系统安装成功! </template>
    <template #extra>
      <a-button class="mt-20" type="primary" @click="handleStart">点击开始</a-button>
    </template>
  </a-result>
</template>

<script setup lang="ts">


const handleStart = async () => {
  window.location.reload()
}
</script>

<style lang="scss" scoped></style>
