<template>
  <div class="empty-file-placeholder-wrap">
    <div class="text-center title-color fw-600 fs-16">将文件拖拽到这里</div>
    <div class="muted-color fs-14 text-center my-25">或者</div>
    <div class="flex-yc">
      <div
        class="event-item-wrap overhide text-center trf mx-10 pointer br-5 p-10"
        v-for="item in menuEventList"
        :key="item.name"
        @click="item.action"
        v-ripple="{ color: '#777' }"
      >
        <div class="fs-14 text-center w-100 mt-10 fw-500">{{ item.name }}</div>
        <IconSvg class="mt-20 empty-event-icon ml-20" :size="70" :name="item.icon" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { handleUploadFile } = useFileUpload()
const { selectFile, selectFolder, createFolder } = useFileSelect({
  selectFile: handleUploadFile
})

const menuEventList = [
  {
    name: '新建文件夹',
    icon: 'create-folder',
    action: createFolder
  },
  {
    name: '上传文件',
    icon: 'upload-file',
    action: selectFile
  },
  {
    name: '上传文件夹',
    icon: 'upload-folder',
    action: selectFolder
  }
]
</script>

<style lang="scss" scoped>
.event-item-wrap {
  height: 100px;
  width: 100px;

  @include useTheme {
    background-color: rgba(getVal(keyColor), 0.05);

    &:hover {
      background-color: rgba(getVal(keyColor), 0.1);

      .empty-event-icon {
        opacity: 1;
      }
    }
  }

  .empty-event-icon {
    opacity: 0.7;
  }
}
</style>
