import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Dashboard\GenerateAiRecommendationController::generateAiRecommendation
* @see app/Http/Controllers/Dashboard/GenerateAiRecommendationController.php:20
* @route '/dashboard/generate-ai-recommendation'
*/
export const generateAiRecommendation = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generateAiRecommendation.url(options),
    method: 'get',
})

generateAiRecommendation.definition = {
    methods: ["get","head"],
    url: '/dashboard/generate-ai-recommendation',
} satisfies RouteDefinition<["get","head"]>

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
generateAiRecommendation.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generateAiRecommendation.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Dashboard\GenerateAiRecommendationController::generateAiRecommendation
* @see app/Http/Controllers/Dashboard/GenerateAiRecommendationController.php:20
* @route '/dashboard/generate-ai-recommendation'
*/
generateAiRecommendation.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: generateAiRecommendation.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Dashboard\GenerateAiRecommendationController::generateAiRecommendation
* @see app/Http/Controllers/Dashboard/GenerateAiRecommendationController.php:20
* @route '/dashboard/generate-ai-recommendation'
*/
const generateAiRecommendationForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: generateAiRecommendation.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Dashboard\GenerateAiRecommendationController::generateAiRecommendation
* @see app/Http/Controllers/Dashboard/GenerateAiRecommendationController.php:20
* @route '/dashboard/generate-ai-recommendation'
*/
generateAiRecommendationForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: generateAiRecommendation.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Dashboard\GenerateAiRecommendationController::generateAiRecommendation
* @see app/Http/Controllers/Dashboard/GenerateAiRecommendationController.php:20
* @route '/dashboard/generate-ai-recommendation'
*/
generateAiRecommendationForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: generateAiRecommendation.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

generateAiRecommendation.form = generateAiRecommendationForm

const dashboard = {
    generateAiRecommendation: Object.assign(generateAiRecommendation, generateAiRecommendation),
}

export default dashboard