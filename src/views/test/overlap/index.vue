<template>
  <div class="point-container flex-center relative" @click.stop="current = -1">
    <div class="relative wh-100">
      <div v-for="index in boxList.length" :key="index">
        <div
          @click.stop="current = index - 1"
          class="point flex-center pointer fs-12 white-color br-50"
          :style="{
            top: `${points[index - 1].position.y}px`,
            left: `${points[index - 1].position.x}px`,
            opacity: current === -1 || current === index - 1 ? '1' : '0.2'
          }"
        >
          {{ index - 1 }}
        </div>
        <div
          @click.stop="current = index - 1"
          class="box-wrap flex-center pointer"
          :style="{
            top: `${boxList[index - 1].y}px`,
            left: `${boxList[index - 1].x}px`,
            width: `${boxList[index - 1].width}px`,
            height: `${boxList[index - 1].height}px`,
            backgroundColor: boxList[index - 1].color,
            opacity: current === -1 || current === index - 1 ? '1' : '0.2'
          }"
        >
          {{ index - 1 }}
        </div>
      </div>
    </div>

    <a-button class="refresh-btn" shape="circle" type="primary" @click="methods.genRandomPoint()">
      <icon-refresh />
    </a-button>
  </div>
</template>

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'

type Point = {
  color: string
  position: { x: number; y: number }
}

type Quadrant = 'UPPER_RIGHT' | 'LOWER_LEFT' | 'UPPER_LEFT' | 'LOWER_RIGHT'

type Box = {
  x: number
  y: number
  width: number
  height: number
  color: string
  quadrant?: Quadrant
  distance?: number
  origin: { x: number; y: number }
}

const current = ref(-1)
const stepDis = 30
const pointCount = 20
const { width, height } = useWindowSize()
const points = ref<Point[]>([])
const boxList = ref<Box[]>([])
const pointBox = ref<Box[]>([])

watch([width, height], () => {
  methods.genRandomPoint()
})

const methods = {
  // 生成随机点
  genRandomPoint(count: number = pointCount): void {
    points.value = []
    boxList.value = []
    pointBox.value = []

    for (let i = 0; i < count; i++) {
      const position = {
        x: methods.getRandomInt(50, width.value - 50),
        y: methods.getRandomInt(50, height.value - 50)
        // x: methods.getRandomInt(0, 50),
        // y: methods.getRandomInt(0, 50)
      }
      points.value.push({
        color: methods.genRandomColor(),
        position: position
      })

      pointBox.value.push({
        x: position.x - 5,
        y: position.y - 5,
        width: 10,
        height: 10,
        color: '#00000020',
        quadrant: 'UPPER_LEFT',
        origin: position
      })
    }

    for (const point of points.value) {
      const { position } = point
      const w = methods.getRandomInt(100, 300)
      const h = methods.getRandomInt(60, 100)
      let box = {
        width: w,
        height: h,
        x: position.x - w / 2,
        y: position.y - h - 15,
        origin: position,
        color: methods.genRandomColor(0.3)
      }

      box = methods.setPosition(box)

      boxList.value.push(box)
    }
  },

  setPosition(box: Box) {
    let result = box
    let hasBump = false
    for (const b of [...pointBox.value, ...boxList.value]) {
      if (methods.handleBump(box, b)) {
        hasBump = true
        break
      }
    }
    if (hasBump) {
      if (!box.distance) box.distance = 50
      const quadrant = methods.getQuadrant(box)
      if (box.quadrant !== quadrant && quadrant === 'UPPER_LEFT') {
        box.distance += 50
      }
      const radius = box.distance

      box.quadrant = quadrant
      switch (quadrant) {
        case 'UPPER_RIGHT': // 第一象限
          if (box.x < box.origin.x + radius) box.x += stepDis
          else box.y += stepDis
          break
        case 'LOWER_RIGHT': // 第二象限
          if (box.y < box.origin.y + radius) box.y += stepDis
          else box.x -= stepDis
          break
        case 'LOWER_LEFT': // 第三象限
          if (box.x > box.origin.x - radius) box.x -= stepDis
          else box.y -= stepDis
          break
        case 'UPPER_LEFT': // 第四象限
          if (box.y > box.origin.y - radius) box.y -= stepDis
          else box.x += stepDis
          break
      }
      result = methods.setPosition(box)
    }
    return result
  },

  // 获取象限
  getQuadrant(box: Box) {
    if (box.y > box.origin.y) {
      return box.x > box.origin.x ? 'LOWER_RIGHT' : 'LOWER_LEFT'
    } else {
      return box.x > box.origin.x ? 'UPPER_RIGHT' : 'UPPER_LEFT'
    }
  },

  handleBump(box: Box, taget: Box) {
    const isBump =
      box.x < taget.x + taget.width + 10 &&
      box.x + box.width + 10 > taget.x &&
      box.y < taget.y + taget.height + 10 &&
      box.y + box.height + 10 > taget.y
    return isBump
  },

  // 生成随机颜色
  genRandomColor(alpha: number = 1) {
    return `rgba(${Math.floor(Math.random() * 256)},${Math.floor(
      Math.random() * 256
    )},${Math.floor(Math.random() * 256)},${alpha})`
  },

  getRandomInt: (min: number, max: number) => {
    min = Math.ceil(min) // 向上取整
    max = Math.floor(max) // 向下取整
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
}

methods.genRandomPoint()
</script>

<style lang="scss" scoped>
.point-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .box-wrap {
    position: absolute;
  }

  .refresh-btn {
    position: absolute;
    bottom: 20px;
    right: 20px;
  }

  .point {
    width: 16px;
    height: 16px;
    color: #fff;
    font-size: 10px;
    position: absolute;
    background-color: red;
    transform: translate(-50%, -50%);
  }
}
</style>
