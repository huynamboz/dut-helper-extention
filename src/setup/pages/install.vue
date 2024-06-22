<script setup lang="ts">

const displayName = __DISPLAY_NAME__;
const version = __VERSION__;

</script>

<template>
  <div class="w-full h-full flex flex-col gap-y-4 justify-center items-center">
    <h1 class="text-4xl font-bold">
      🎉 Đã cài đặt thành công! 🚀
    </h1>
    <p class="text-xl">
      Cài thành công rồi thì vô star cho tui de <a class=" text-blue-800 underline" href="https://github.com/huynamboz/dut-helper-extention" target="_blank">{{ displayName }}</a>! ❤️
    </p>
    <p class="text-lg">
      Có bug thì report ở đây nè <a class=" text-blue-800 underline" href="https://github.com/huynamboz/dut-helper-extention/issues" target="_blank">Issues</a>! 🐞
    </p>
    <p>Version: {{ version }}</p>
  </div>
</template>

<style lang="scss" scoped></style>