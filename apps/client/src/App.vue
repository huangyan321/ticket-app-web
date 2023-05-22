<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { getTicketList } from '@/apis'
const list = ref<any[]>([])
onBeforeMount(async () => {
  const res = await getTicketList()
  console.log(res)
  list.value = res.data
})
</script>

<template>
  <ul
    v-for="(item, index) in list"
    :key="index"
    style="margin-bottom: 15px; border: 1px solid #000"
  >
    <li>消费券分配理由：{{ item.dis_reason }}</li>
    <li>是否在申请中：{{ item.is_applying == 1 ? '是' : '否' }}</li>
    <li>是否已核销：{{ item.is_invalid == 1 ? '是' : '否' }}</li>
    <li>是否被拒绝：{{ item.is_rejected == 1 ? '是' : '否' }}</li>
    <li>是否已使用：{{ item.is_used == 1 ? '是' : '否' }}</li>
    <li>
      消费券类型：{{
        item.type == 1
          ? '消气券'
          : item.type == 2
          ? '去玩券'
          : item.type == 3
          ? '煮饭券'
          : item.type == 4
          ? '礼物券'
          : '未知'
      }}
    </li>
  </ul>
</template>

<style lang="scss" scoped></style>
