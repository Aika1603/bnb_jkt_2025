import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Dashboard\GenerateAiRecommendationController::generateAiRecommendation
* @see app/Http/Controllers/Dashboard/GenerateAiRecommendationController.php:20
* @route '/dashboard/generate-ai-recommendation'
*/
export const generateAiRecommendation = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generateAiRecommendation.url(options),
    method: 'post',
})

generateAiRecommendation.definition = {
    methods: ["post"],
    url: '/dashboard/generate-ai-recommendation',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Dashboard\GenerateAiRecommendationController::generateAiRecommendation
* @see app/Http/Controllers/Dashboard/GenerateAiRecommendationController.php:20
* @route '/dashboard/generate-ai-recommendation'
*/
generateAiRecommendation.url = (options?: RouteQueryOptions) => {
    return generateAiRecommendation.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Dashboard\GenerateAiRecommendationController::generateAiRecommendation
* @see app/Http/Controllers/Dashboard/GenerateAiRecommendationController.php:20
* @route '/dashboard/generate-ai-recommendation'
*/
generateAiRecommendation.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generateAiRecommendation.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Dashboard\GenerateAiRecommendationController::generateAiRecommendation
* @see app/Http/Controllers/Dashboard/GenerateAiRecommendationController.php:20
* @route '/dashboard/generate-ai-recommendation'
*/
const generateAiRecommendationForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: generateAiRecommendation.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Dashboard\GenerateAiRecommendationController::generateAiRecommendation
* @see app/Http/Controllers/Dashboard/GenerateAiRecommendationController.php:20
* @route '/dashboard/generate-ai-recommendation'
*/
generateAiRecommendationForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: generateAiRecommendation.url(options),
    method: 'post',
})

generateAiRecommendation.form = generateAiRecommendationForm

const dashboard = {
    generateAiRecommendation: Object.assign(generateAiRecommendation, generateAiRecommendation),
}

export default dashboard