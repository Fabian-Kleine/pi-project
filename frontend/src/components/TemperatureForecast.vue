<script setup lang="ts">
import { Users, UserX } from "lucide-vue-next";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const props = defineProps<{
  emptyRoom: number | null
  p60: number | null
  p120: number | null
  p180: number | null
}>()

function formatTemp(value: number | null) {
  if (value === null) return "—"
  return `${value} °C`
}
</script>

<template>
  <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    <Card class="gap-2">
      <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium">Vorhersage: leerer Raum</CardTitle>
        <UserX class="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">{{ formatTemp(props.emptyRoom) }}</div>
      </CardContent>
    </Card>
    <Card class="gap-2">
      <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium">Vorhersage: 60 Personen</CardTitle>
        <Users class="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">{{ formatTemp(props.p60) }}</div>
      </CardContent>
    </Card>
    <Card class="gap-2">
      <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium">Vorhersage: 120 Personen</CardTitle>
        <Users class="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">{{ formatTemp(props.p120) }}</div>
      </CardContent>
    </Card>
    <Card class="gap-2">
      <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium">Vorhersage: 180 Personen</CardTitle>
        <Users class="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">{{ formatTemp(props.p180) }}</div>
      </CardContent>
    </Card>
  </div>
</template>
