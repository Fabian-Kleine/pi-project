<script setup lang="ts">
import TemperatureForecast from './components/TemperatureForecast.vue';
import CurrentVocValues from './components/CurrentVocValues.vue';
import RecentReadings from './components/RecentReadings.vue';
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog';
import PersonTemperatureDiagramm from './components/PersonTemperatureDiagramm.vue';
import TemperatureTrendDiagramm from './components/TemperatureTrendDiagramm.vue';
import { Button } from './components/ui/button';
import { computed, ref } from 'vue';
import { useLiveData } from './lib/db';
import { Info, RefreshCcw } from 'lucide-vue-next';
import { usePersonTemperatureRegression } from "@/lib/regression";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// use custom hook to manage live data fetching and state
const { state: readings, readingHistory, refresh: refreshLive } = useLiveData();
const lastHourReadings = computed(() => readingHistory.value.slice(0, 12));

const {
  regressionPoints: personTemperatureRegressionPoints,
  series: personTemperatureSeries,
  forecast: temperatureForecast,
  model: personTemperatureModel,
  refresh: refreshRegression,
} = usePersonTemperatureRegression();

const formatValue = (value: number | null | undefined, digits = 3) => {
  if (value === null || value === undefined || !Number.isFinite(value)) return "—";
  return value.toFixed(digits);
};

const refreshAll = async () => {
  await Promise.all([refreshLive(), refreshRegression()]);
};

// store active tab
const activeTab = ref('current-data');
</script>

<template>
  <div class="flex-1 space-y-4 p-8 pt-6">
  <div class="flex items-center gap-2">
      <img src="/logo.png" alt="Logo" width="60" height="60" />
      <h1 class="text-3xl font-bold tracking-tight">Asia Markt</h1>
  </div>
    <div class="relative flex items-center gap-2">
      <div class="flex items-center gap-2">
        <span class="relative flex size-2">
          <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
          <span class="relative inline-flex size-2 rounded-full bg-green-500"></span>
        </span>
        Live Daten werden alle 5 Minuten automatisch aktualisiert
        <Button @click="refreshAll" size="icon-sm" variant="ghost" title="Neu Laden">
          <RefreshCcw />
        </Button>
      </div>
    </div>
    <Tabs v-model="activeTab" default-value="current-data" class="w-full">
      <TabsList class="mb-4">
        <TabsTrigger value="current-data">Aktuelle Daten</TabsTrigger>
        <TabsTrigger value="temperature-forecast">Temperaturvorhersage</TabsTrigger>
      </TabsList>
      <TabsContent value="temperature-forecast">
        <TemperatureForecast :empty-room="temperatureForecast.emptyRoom" :p60="temperatureForecast.p60"
          :p120="temperatureForecast.p120" :p180="temperatureForecast.p180" />
      </TabsContent>
      <TabsContent value="current-data">
        <CurrentVocValues :temperature="readings.temperature" :gasResistance="readings.gasResistance"
          :humidity="readings.humidity" :pressure="readings.pressure" />
      </TabsContent>
    </Tabs>
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card class="col-span-4">
        <CardHeader>
          <CardTitle v-if="activeTab === 'temperature-forecast'" class="flex items-center gap-2">
            Temperaturvorhersage
            <Popover>
              <PopoverTrigger as-child>
                <Button variant="ghost" size="icon-sm" title="Details anzeigen">
                  <Info />
                </Button>
              </PopoverTrigger>
              <PopoverContent class="w-80">
                <div class="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 text-sm">
                  <span class="text-muted-foreground">Steigung</span>
                  <span class="font-medium">{{ formatValue(personTemperatureModel?.slope, 4) }}</span>

                  <span class="text-muted-foreground">Achsenabschnitt</span>
                  <span class="font-medium">{{ formatValue(personTemperatureModel?.intercept, 2) }}</span>

                  <span class="text-muted-foreground">R²-Wert</span>
                  <span class="font-medium">{{ formatValue(personTemperatureModel?.r2, 3) }}</span>
                </div>
              </PopoverContent>
            </Popover>
          </CardTitle>
          <CardTitle v-else>
            Temperaturverlauf
          </CardTitle>
        </CardHeader>
        <CardContent class="p-0">
          <PersonTemperatureDiagramm
            v-if="activeTab === 'temperature-forecast'"
            :series="personTemperatureSeries"
            :points="personTemperatureRegressionPoints"
          />
          <TemperatureTrendDiagramm :readings="readingHistory" v-else />
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
                  <RecentReadings :readings="readingHistory" />
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
