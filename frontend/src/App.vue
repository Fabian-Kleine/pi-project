<script setup lang="ts">
import TemperatureForecast from './components/TemperatureForecast.vue';
import CurrentVocValues from './components/CurrentVocValues.vue';
import RecentReadings, { type Reading } from './components/RecentReadings.vue';
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog';
import PersonTemperatureDiagramm from './components/PersonTemperatureDiagramm.vue';
import { Button } from './components/ui/button';

// Generate mock data
const generateReadings = (): Reading[] => {
  const readings: Reading[] = [];
  const now = new Date();
  // Generate readings for the whole day (every 5 minutes)
  for (let i = 0; i < 288; i++) { // 24 hours * 12 readings/hour = 288
    const date = new Date(now.getTime() - i * 5 * 60 * 1000);
    readings.push({
      time: date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }),
      temperature: Number((20 + Math.random() * 5).toFixed(1)),
      voc: Math.floor(100 + Math.random() * 400),
      pressure: Math.floor(1000 + Math.random() * 30),
      humidity: Math.floor(40 + Math.random() * 40)
    });
  }
  return readings;
};

const allReadings = generateReadings();
const lastHourReadings = allReadings.slice(0, 12);
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
          <CardTitle>Diagramm Temperaturvorhersage</CardTitle>
        </CardHeader>
        <CardContent class="p-0">
          <PersonTemperatureDiagramm />
        </CardContent>
      </Card>
      <Card class="col-span-3 flex flex-col">
        <CardHeader>
          <CardTitle>Letzte Messwerte</CardTitle>
          <CardDescription>
            Die Messwerte der letzten Stunden im Überblick.
          </CardDescription>
          <CardAction>
            <Dialog>
              <DialogTrigger as-child>
                <Button variant="outline">
                  Alle anzeigen
                </Button>
              </DialogTrigger>
              <DialogContent class="max-w-2xl max-h-[80vh]">
                <DialogHeader>
                  <DialogTitle>Alle Messwerte des Tages</DialogTitle>
                  <DialogDescription>
                    Messwerte der letzten 24 Stunden im Überblick.
                  </DialogDescription>
                </DialogHeader>
                <div class="h-[60vh] overflow-y-auto pr-4">
                  <RecentReadings :readings="allReadings" />
                </div>
              </DialogContent>
            </Dialog>
          </CardAction>
        </CardHeader>
        <CardContent class="flex-1 overflow-hidden">
          <div class="h-[350px] overflow-y-auto pr-4">
            <RecentReadings :readings="lastHourReadings" />
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
