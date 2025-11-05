<script setup lang="ts">
import TemperatureForecast from './components/TemperatureForecast.vue';
import CurrentVocValues from './components/CurrentVocValues.vue';
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
</script>

<template>
  <div class="flex-1 space-y-4 p-8 pt-6">
    <h1 class="text-3xl font-bold underline">Asia Markt</h1>
    <Tabs default-value="temperature-forecast" class="w-full">
      <TabsList class="mb-4">
        <TabsTrigger value="temperature-forecast">Temperaturvorhersage</TabsTrigger>
        <TabsTrigger value="current-data">Aktuelle Daten</TabsTrigger>
      </TabsList>
      <TabsContent value="temperature-forecast">
        <TemperatureForecast />
      </TabsContent>
      <TabsContent value="current-data">
        <CurrentVocValues />
      </TabsContent>
    </Tabs>
  </div>
</template>
