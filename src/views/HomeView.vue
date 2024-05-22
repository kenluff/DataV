<template>
  <el-menu
    :default-active="activeIndex"
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="el-menu-demo"
    mode="horizontal"
    text-color="#fff"
    @select="handleSelect"
  >
    <template v-for="(item, index) in routers" :key="index">
      <component :is="getEl(item)" :index="`${index}`">
        <template v-if="!item.children">{{ item.meta.title }}</template>
        <template v-if="item.children" #title>{{ item.meta.title }}</template>
        <template v-if="item.children">
          <template v-for="(child, childIndex) in item.children" :key="childIndex">
            <component :is="getEl(child)" :index="`${index}-${childIndex}`">
              {{ child.meta.title }}
            </component>
          </template>
        </template>
      </component>
    </template>
  </el-menu>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMenuItem, ElSubMenu } from 'element-plus'

const activeIndex = ref('1')
const route = useRoute()
const router = useRouter()
const routers = router.options.routes
const handleSelect = (key, keyPath, item) => {
  const index = item.indexPath[0]
  const children = routers[index].children
  if (children && children.length > 0) {
    const childrenIndex = item.indexPath[1].split('-')[1]
    const menu = children[childrenIndex]
    router.push({ name: menu.name })
  } else {
    router.push({ name: routers[index].name })
  }
}

const getEl = (item) => {
  if (item.children) {
    return ElSubMenu
  }
  return ElMenuItem
}

onMounted(() => {
  console.log(route)
  console.log(router)
  console.log(routers)
})
</script>
