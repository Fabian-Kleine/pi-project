<script setup lang="ts">
import { Bubbles, Droplets, Thermometer, WindArrowDown } from "lucide-vue-next";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

defineProps<{
  temperature: number;
  gasResistance: number;
  pressure: number;
  humidity: number;
}>();
</script>

<template>
  <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    <Card class="gap-2">
      <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium">Temperatur</CardTitle>
        <Thermometer class="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">{{ temperature }} °C</div>
      </CardContent>
    </Card>
    <Card class="gap-2">
      <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium">Luftfeuchtigkeit</CardTitle>
        <Droplets class="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">{{ humidity }} %</div>
      </CardContent>
    </Card>
    <Card class="gap-2">
      <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium">Luftdruck</CardTitle>
        <WindArrowDown class="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">{{ pressure }} hPa</div>
      </CardContent>
    </Card>
    <Card class="gap-2">
      <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium">Luftwiederstand</CardTitle>
        <Bubbles class="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">{{ gasResistance }} &Omega;</div>
      </CardContent>
    </Card>
  </div>
</template>
