import type { ReadingHistory } from "@/types";
import { onScopeDispose, reactive, ref, type Ref } from "vue";
import { formatISODateLocal } from "./utils";
import { API_BASE_URL, UPDATE_INTERVAL_MS } from "@/config";

interface GetLiveDataResponse {
    temperature: number;
    humidity: number;
    pressure: number;
    gasResistance: number;
    readingHistory: ReadingHistory[];
}

// Fetch live data from the backend and transform it to match the GetLiveDataResponse interface
export const getLiveData = async (): Promise<GetLiveDataResponse> => {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const formattedNow = formatISODateLocal(now);
    const formattedOneDayAgo = formatISODateLocal(oneDayAgo)
    
    const response = await fetch(
        `${API_BASE_URL}/pi-project/backend/voc/period/?start=${formattedOneDayAgo}&end=${formattedNow}`
    );

    const results = await response.json();

    if (!results || !results.length) {
        throw new Error("Error fetching data!");
    }

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

    const latestValues = transformedResults[0];

    return {
        temperature: latestValues?.temperature ?? 0,
        humidity: latestValues?.humidity ?? 0,
        pressure: latestValues?.pressure ?? 0,
        gasResistance: latestValues?.gasResistance ?? 0,
        readingHistory: transformedResults
    };
}

// hook to manage live data fetching and state
export function useLiveData(updateIntervalMs = UPDATE_INTERVAL_MS) {
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
        state.temperature = data.temperature;
        state.humidity = data.humidity;
        state.pressure = data.pressure;
        state.gasResistance = data.gasResistance;
        readingHistory.value = data.readingHistory;
    };

    const start = () => {
        stop();

        refresh();
        timer = setInterval(refresh, updateIntervalMs);
    };

    const stop = () => {
        if (timer) clearInterval(timer);
        timer = undefined;
    };

    start();

    onScopeDispose(() => stop());

    return {
        state,
        readingHistory,
        refresh,
        start,
        stop,
    };
}

interface RegressonDataResponse {
    vocValue: number;
    temperature: number;
    personCount: number;
}

// Fetch regression data from the backend and transform it to match the RegressonDataResponse interface
export const getRegressionData = async (): Promise<RegressonDataResponse[]> => {
    const response = await fetch(
        `${API_BASE_URL}/pi-project/backend/regression/`
    );

    const results = await response.json();  

    if (!results || !results.length) {
        throw new Error("Error fetching regression data!");
    }

    const transformedResults: RegressonDataResponse[] = results.map((data: any) => {
        return {
            vocValue: data.voc_value,
            temperature: parseFloat(data.temperature),
            personCount: data.persons_estimated
        };
    });

    return transformedResults;
}