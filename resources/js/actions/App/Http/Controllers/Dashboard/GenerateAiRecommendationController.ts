import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Dashboard\GenerateAiRecommendationController::generate
* @see app/Http/Controllers/Dashboard/GenerateAiRecommendationController.php:20
* @route '/dashboard/generate-ai-recommendation'
*/
export const generate = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generate.url(options),
    method: 'post',
})

generate.definition = {
    methods: ["post"],
    url: '/dashboard/generate-ai-recommendation',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Dashboard\GenerateAiRecommendationController::generate
* @see app/Http/Controllers/Dashboard/GenerateAiRecommendationController.php:20
* @route '/dashboard/generate-ai-recommendation'
*/
generate.url = (options?: RouteQueryOptions) => {
    return generate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Dashboard\GenerateAiRecommendationController::generate
* @see app/Http/Controllers/Dashboard/GenerateAiRecommendationController.php:20
* @route '/dashboard/generate-ai-recommendation'
*/
generate.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generate.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Dashboard\GenerateAiRecommendationController::generate
* @see app/Http/Controllers/Dashboard/GenerateAiRecommendationController.php:20
* @route '/dashboard/generate-ai-recommendation'
*/
const generateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: generate.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Dashboard\GenerateAiRecommendationController::generate
* @see app/Http/Controllers/Dashboard/GenerateAiRecommendationController.php:20
* @route '/dashboard/generate-ai-recommendation'
*/
generateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: generate.url(options),
    method: 'post',
})

generate.form = generateForm

const GenerateAiRecommendationController = { generate }

export default GenerateAiRecommendationController