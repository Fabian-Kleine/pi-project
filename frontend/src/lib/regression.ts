import regression from "regression"
import { computed, onMounted, ref } from "vue"
import { getRegressionData } from "@/lib/db"

export type PersonTemperaturePoint = {
	personCount: number
	temperature: number
}

export type PersonTemperatureModel = {
	predictTemperature: (personCount: number) => number
	slope: number
	intercept: number
	r2: number
}

export type PersonTemperatureChartPoint = {
	people: number
	Temperatur: number
}

export type TemperatureForecast = {
	emptyRoom: number | null
	p60: number | null
	p120: number | null
	p180: number | null
}

// Fit a linear regression model to the given person-temperature data points
export function fitPersonTemperatureModel(
	points: PersonTemperaturePoint[],
): PersonTemperatureModel {
	if (points.length < 2) {
		throw new Error("Need at least 2 points to fit regression model")
	}

	const data: Array<[number, number]> = points
		.map((p): [number, number] => [p.personCount, p.temperature])
		.sort(([ax], [bx]) => ax - bx)

	const result = regression.linear(data, { precision: 6 })
	const slopeRaw = result.equation[0]
	const interceptRaw = result.equation[1]

	if (typeof slopeRaw !== "number" || typeof interceptRaw !== "number") {
		throw new Error("Regression model did not produce a slope/intercept")
	}
	if (!Number.isFinite(slopeRaw) || !Number.isFinite(interceptRaw)) {
		throw new Error("Regression model did not produce a valid slope/intercept")
	}

	const slope = slopeRaw
	const intercept = interceptRaw

	return {
		predictTemperature: (personCount: number) => result.predict(personCount)[1],
		slope,
		intercept,
		r2: result.r2,
	}
}

// Build a series of predicted temperatures for a range of people counts based on the fitted model
export function buildPersonTemperatureSeries(
	points: PersonTemperaturePoint[],
	model: PersonTemperatureModel,
): PersonTemperatureChartPoint[] {
	if (points.length < 2) return []

	const peopleCounts = points.map((p) => p.personCount)
	const minPeople = Math.min(...peopleCounts)
	const maxPeople = Math.max(...peopleCounts)

	const range = maxPeople - minPeople
	const step = range <= 25 ? 1 : 5

	const series: PersonTemperatureChartPoint[] = []
	for (let people = minPeople; people <= maxPeople; people += step) {
		const temp = model.predictTemperature(people)
		series.push({ people, Temperatur: Number(temp.toFixed(2)) })
	}

	return series
}

// Custom hook to manage person-temperature regression data and model state
export function usePersonTemperatureRegression() {
	const regressionPoints = ref<PersonTemperaturePoint[]>([])

    // Fetch regression data from the backend and transform it to match the PersonTemperaturePoint interface
	const model = computed(() => {
		if (regressionPoints.value.length < 2) return null
		return fitPersonTemperatureModel(regressionPoints.value)
	})

    // Compute the series of predicted temperatures for charting based on the current regression points and model
	const series = computed(() => {
		if (!model.value) return []
		return buildPersonTemperatureSeries(regressionPoints.value, model.value)
	})

    // Compute temperature forecasts for specific people counts (0, 60, 120, 180) based on the fitted model
	const forecast = computed<TemperatureForecast>(() => {
		if (!model.value) {
			return { emptyRoom: null, p60: null, p120: null, p180: null }
		}

		const predict = (count: number) => Number(model.value!.predictTemperature(count).toFixed(1))
		return {
			emptyRoom: predict(0),
			p60: predict(60),
			p120: predict(120),
			p180: predict(180),
		}
	})

    // Function to refresh regression data by fetching from the backend and updating the state
	const refresh = async () => {
		try {
			const raw = await getRegressionData()
			regressionPoints.value = raw
				.filter((d) => Number.isFinite(d.personCount) && Number.isFinite(d.temperature))
				.map((d) => ({ personCount: d.personCount, temperature: d.temperature }))
		} catch (e) {
			console.error("Failed to refresh regression data", e)
			regressionPoints.value = []
		}
	}

	onMounted(() => {
		refresh()
	})

	return {
		regressionPoints,
		model,
		series,
		forecast,
		refresh,
	}
}
