<script lang="ts" setup>
import { LineChart } from "@/components/ui/chart-line"
import CustomChartTooltip from "./ui/chart/ChartTooltip.vue"

const exampleData = [
    { "people": 0, "Temperatur": 22.5 },
    { "people": 10, "Temperatur": 23.2 },
    { "people": 20, "Temperatur": 24.1 },
    { "people": 30, "Temperatur": 25.3 },
    { "people": 40, "Temperatur": 26.8 },
    { "people": 50, "Temperatur": 28.5 },
    { "people": 60, "Temperatur": 30.4 },
    { "people": 70, "Temperatur": 32.7 },
    { "people": 80, "Temperatur": 35.2 },
    { "people": 90, "Temperatur": 38.1 },
    { "people": 100, "Temperatur": 41.3 },
    { "people": 110, "Temperatur": 44.8 },
    { "people": 120, "Temperatur": 48.5 }
]

const xFormatter = (tick: number | Date) => {
    const index = typeof tick === 'number' ? tick : 0
    return `${exampleData[index]?.people ?? index}`
}

const yFormatter = (tick: number | Date) => {
    return `${tick}°C`
}
</script>

<template>
    <LineChart 
        :data="exampleData" 
        index="people" 
        :categories="['Temperatur']" 
        :colors="['red']"
        :margin="{ top: 10, bottom: 60, left: 80, right: 20 }"
        :x-formatter="xFormatter"
        :y-formatter="yFormatter"
        :show-legend="false"
        x-label="Personen im Raum"
        y-label="Temperatur"
        :custom-tooltip="CustomChartTooltip" />
</template>