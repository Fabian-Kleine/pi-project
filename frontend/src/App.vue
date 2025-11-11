<script setup lang="ts">
import TemperatureForecast from './components/TemperatureForecast.vue';
import CurrentVocValues from './components/CurrentVocValues.vue';
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import PersonTemperatureDiagramm from './components/PersonTemperatureDiagramm.vue';
import { Button } from './components/ui/button';
</script>

<template>
  <div class="flex-1 space-y-4 p-8 pt-6">
    <h1 class="text-3xl font-bold tracking-tight">Asia Markt</h1>
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
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card class="col-span-4">
        <CardHeader>
          <CardTitle>Diagramm</CardTitle>
        </CardHeader>
        <CardContent class="p-0">
          <PersonTemperatureDiagramm />
        </CardContent>
      </Card>
      <Card class="col-span-3">
        <CardHeader>
          <CardTitle>Letzte Messwerte</CardTitle>
          <CardDescription>
            Die Messwerte der letzten Stunden im Überblick.
          </CardDescription>
          <CardAction>
            <Button variant="outline">
              Alle anzeigen
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          test
        </CardContent>
      </Card>
    </div>
  </div>
</template>
