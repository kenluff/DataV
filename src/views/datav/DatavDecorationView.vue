<script lang="ts" setup>
import {
  Decoration1,
  Decoration2,
  Decoration3,
  Decoration4,
  Decoration5,
  Decoration6,
  Decoration7,
  Decoration8
} from '@dataview/datav-vue3'
</script>
<template>
  <div class="container">
    <div><Decoration1 style="width: 200px; height: 50px" /></div>
    <div><Decoration2 style="width: 200px; height: 5px" /></div>
    <div><Decoration2 :reverse="true" style="width: 5px; height: 150px" /></div>
    <div><Decoration3 style="width: 250px; height: 30px" /></div>
    <div><Decoration4 style="width: 5px; height: 150px" /></div>
    <div><Decoration4 :reverse="true" style="width: 250px; height: 5px" /></div>
    <div><Decoration5 style="width: 300px; height: 40px" /></div>
    <div><Decoration6 style="width: 300px; height: 30px" /></div>
    <div><Decoration7 style="width: 150px; height: 30px">Decoration</Decoration7></div>
    <div><Decoration8 style="width: 300px; height: 50px" /></div>
    <div><Decoration8 :reverse="true" style="width: 300px; height: 50px" /></div>
    <!-- <div><Decoration9 style="width: 150px; height: 150px">66%</Decoration9></div> -->
    <div><Decoration10 style="width: 90%; height: 5px" /></div>
    <!-- <div><Decoration11 style="width: 200px; height: 60px">Decoration11</Decoration11></div> -->
    <div><Decoration12 style="width: 150px; height: 150px" /></div>
  </div>
</template>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
  background: #282c34;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  div {
    margin: 10px;
  }
}
</style>
