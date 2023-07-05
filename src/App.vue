<template>
  <el-config-provider :size="size" :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';


// 导入 Element Plus 语言包


const size: any = computed(() => 'default');

const locale = ref();


</script>
