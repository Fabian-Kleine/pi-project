<script lang="ts" setup>
import { LineChart } from "@/components/ui/chart-line"
import CustomChartTooltip from "./ui/chart/ChartTooltip.vue"
import type { ReadingHistory } from "@/types"
import { computed } from "vue";

const props = defineProps<{
    readings: ReadingHistory[]
}>();

const transformedReadings = computed(() => {
    return props.readings.map((reading) => {
        return {
            'Temperatur': reading.temperature,
            time: reading.time
        }
    }).reverse();
});

const xFormatter = (tick: number | Date) => {
  if (tick instanceof Date) return tick.toISOString()

  const index = tick

  const reading = transformedReadings.value[index]
  return `${reading?.time ?? index}`
}

const yFormatter = (tick: number | Date) => {
    return `${tick}°C`
}
</script>

<template>
    <LineChart 
        :data="transformedReadings" 
        index="time" 
        :categories="['Temperatur']" 
        :colors="['red']"
        :margin="{ top: 10, bottom: 60, left: 80, right: 20 }"
        :x-formatter="xFormatter"
        :y-formatter="yFormatter"
        :show-legend="false"
        x-label="Uhrzeit"
        y-label="Temperatur"
        :custom-tooltip="CustomChartTooltip" />
</template>