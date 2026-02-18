<script lang="ts" setup>
import { LineChart } from "@/components/ui/chart-line"
import CustomChartTooltip from "./ui/chart/ChartTooltip.vue"
import { VisXYContainer, VisScatter } from "@unovis/vue"
import { computed } from "vue"
import type { PersonTemperaturePoint } from "@/lib/regression"

type ChartPoint = { people: number; Temperatur: number }

const props = defineProps<{
    series: ChartPoint[]
    points?: PersonTemperaturePoint[]
}>()

// Get min and max people values from series for interpolation
const minPeople = computed(() => props.series[0]?.people ?? 0)
const maxPeople = computed(() => props.series[props.series.length - 1]?.people ?? 0)

// Get min and max temperature values for y-axis scaling
const minTemp = computed(() => Math.min(...props.series.map(s => s.Temperatur)))
const maxTemp = computed(() => Math.max(...props.series.map(s => s.Temperatur)))

// Transform raw regression points to chart format for scatter dots
const scatterData = computed(() => {
    if (!props.points) return []
    return props.points.map(p => ({
        people: p.personCount,
        Temperatur: p.temperature
    }))
})

// format x and y axis ticks
const xFormatter = (tick: number | Date) => {
    const index = typeof tick === 'number' ? tick : 0
    return `${props.series[index]?.people ?? index}`
}

const yFormatter = (tick: number | Date) => {
    return `${tick}°C`
}
</script>

<template>
    <div class="relative w-full">
        <LineChart :data="props.series" index="people" :categories="['Temperatur']" :colors="['red']"
            :margin="{ top: 10, bottom: 60, left: 80, right: 20 }" :x-formatter="xFormatter" :y-formatter="yFormatter"
            :show-legend="false" x-label="Personen im Raum" y-label="Temperatur" :custom-tooltip="CustomChartTooltip" />
        
        <div v-if="scatterData.length > 0" class="absolute inset-0" style="pointer-events: none;">
            <VisXYContainer 
                :data="scatterData" 
                :margin="{ top: 10, bottom: 60, left: 80, right: 20 }"
                :x-domain="[minPeople, maxPeople]"
                :y-domain="[minTemp, maxTemp]"
                style="width: 100%; height: 100%;"
            >
                <VisScatter
                    :x="(d: ChartPoint) => d.people"
                    :y="(d: ChartPoint) => d.Temperatur"
                    :size="() => 6"
                    :color="() => 'blue'"
                />
            </VisXYContainer>
        </div>
    </div>
</template>