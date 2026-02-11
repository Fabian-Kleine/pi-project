<script setup lang="ts">
import { type ReadingHistory } from '@/types';

defineProps<{
  readings: ReadingHistory[]
}>()
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between gap-4" v-for="(reading, index) in readings" :key="index">
      <div class="flex flex-col min-w-[60px]">
        <span class="text-sm font-medium">{{ reading.time }}</span>
      </div>
      <div class="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground flex-1">
        <span>{{ reading.humidity }}%</span>
        <span>{{ reading.pressure }} hPa</span>
        <span>{{ reading.gasResistance }} &Omega;</span>
      </div>
      <div class="font-medium whitespace-nowrap">
        {{ reading.temperature }}°C
      </div>
    </div>
  </div>
</template>
