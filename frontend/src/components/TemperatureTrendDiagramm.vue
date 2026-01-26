<script lang="ts" setup>
import { LineChart } from "@/components/ui/chart-line"
import CustomChartTooltip from "./ui/chart/ChartTooltip.vue"

const exampleData = [
    { "Temperatur": 22.5, "time": "00:00" },
    { "Temperatur": 23.2, "time": "01:00" },
    { "Temperatur": 24.1, "time": "02:00" },
    { "Temperatur": 25.3, "time": "03:00" },
    { "Temperatur": 26.8, "time": "04:00" },
    { "Temperatur": 28.5, "time": "05:00" },
    { "Temperatur": 30.4, "time": "06:00" },
    { "Temperatur": 32.7, "time": "07:00" },
    { "Temperatur": 35.2, "time": "08:00" },
    { "Temperatur": 38.1, "time": "09:00" },
    { "Temperatur": 41.3, "time": "10:00" },
    { "Temperatur": 44.8, "time": "11:00" },
    { "Temperatur": 48.5, "time": "12:00" },
    { "Temperatur": 22.5, "time": "13:00" },
    { "Temperatur": 23.2, "time": "14:00" },
    { "Temperatur": 24.1, "time": "15:00" },
    { "Temperatur": 25.3, "time": "16:00" },
    { "Temperatur": 26.8, "time": "17:00" },
    { "Temperatur": 28.5, "time": "18:00" },
    { "Temperatur": 30.4, "time": "19:00" },
    { "Temperatur": 32.7, "time": "20:00" },
    { "Temperatur": 35.2, "time": "21:00" },
    { "Temperatur": 38.1, "time": "22:00" },
    { "Temperatur": 41.3, "time": "23:00" },
    { "Temperatur": 44.8, "time": "24:00" }
]

const xFormatter = (tick: number | Date) => {
    const index = typeof tick === 'number' ? tick : 0
    return `${exampleData[index]?.time ?? index}`
}

const yFormatter = (tick: number | Date) => {
    return `${tick}°C`
}
</script>

<template>
    <LineChart 
        :data="exampleData" 
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