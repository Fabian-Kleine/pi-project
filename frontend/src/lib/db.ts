import type { ReadingHistory } from "@/types";
import { onScopeDispose, reactive, ref, type Ref } from "vue";
import { formatISODate } from "./utils";

interface GetLiveDataResponse {
    temperature: number;
    humidity: number;
    pressure: number;
    gasResistance: number;
    readingHistory: ReadingHistory[];
}

export const getLiveData = async (): Promise<GetLiveDataResponse> => {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const formattedNow = formatISODate(now);
    const formattedOneDayAgo = formatISODate(oneDayAgo)
    
    const response = await fetch(
        `http://172.16.111.34/pi-project/backend/voc/period/?start=${formattedOneDayAgo}&end=${formattedNow}`
    );

    const results = await response.json();

    if (!results || !results.length) {
        throw new Error("Error fetching data!");
    }

    console.log(results);

    const transformedResults: ReadingHistory[] = results.map((data: any) => {
        const sensorData = JSON.parse(data.sensor_data);
        const date = new Date(data.created_at);
        const formattedTime = date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });

        return {
            temperature: sensorData.temperature,
            humidity: sensorData.humidity,
            pressure: sensorData.pressure,
            gasResistance: parseFloat(sensorData.gas_resistance).toFixed(2),
            time: formattedTime
        }
    });

    console.log(transformedResults)

    const latestValues = transformedResults[0];

    return {
        temperature: latestValues?.temperature ?? 0,
        humidity: latestValues?.humidity ?? 0,
        pressure: latestValues?.pressure ?? 0,
        gasResistance: latestValues?.gasResistance ?? 0,
        readingHistory: transformedResults
    };
}

export function useLiveData(updateIntervalMs = 5 * 60 * 1000) {
    const state = reactive<Omit<GetLiveDataResponse, "readingHistory">>({
        temperature: 0,
        humidity: 0,
        pressure: 0,
        gasResistance: 0,
    });

    const readingHistory: Ref<ReadingHistory[]> = ref([]);

    let timer: ReturnType<typeof setInterval> | undefined;

    const refresh = async () => {
        const data = await getLiveData();
        console.log("Live data refreshed:", data);
        state.temperature = data.temperature;
        state.humidity = data.humidity;
        state.pressure = data.pressure;
        state.gasResistance = data.gasResistance;
        readingHistory.value = data.readingHistory;
    };

    const start = () => {
        // prevent multiple intervals if useLiveData() is called more than once in same scope
        stop();

        refresh(); // initial load
        timer = setInterval(refresh, updateIntervalMs);
    };

    const stop = () => {
        if (timer) clearInterval(timer);
        timer = undefined;
    };

    // start immediately when the composable is created (works in and out of components)
    start();

    // auto-cleanup when used inside a component/effect scope
    onScopeDispose(() => stop());

    return {
        state,
        readingHistory, // ref
        refresh,
        start,
        stop,
    };
}