<script lang="ts" setup>
import {
  BorderBox1,
  BorderBox2,
  BorderBox3,
  BorderBox4,
  BorderBox5,
  BorderBox6,
  BorderBox7,
  BorderBox8,
  BorderBox9,
  BorderBox10,
  BorderBox11,
  BorderBox12,
  BorderBox13
} from '@dataview/datav-vue3'

const BorderBox = {
  BorderBox1,
  BorderBox2,
  BorderBox3,
  BorderBox4,
  BorderBox5,
  BorderBox6,
  BorderBox7,
  BorderBox8,
  BorderBox9,
  BorderBox10,
  BorderBox11,
  BorderBox12,
  BorderBox13
}
</script>
<template>
  <div class="bg-slate-900 p-32 flex flex-row flex-wrap justify-between">
    <div class="w-3/12 h-80 mx-5 my-10" v-for="(item, index) in BorderBox" :key="index">
      <component :is="item">
        <div class="h-80 text-slate-200 flex flex-col justify-center items-center">
          {{ index }}
        </div>
      </component>
    </div>
  </div>
</template>
