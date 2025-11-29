import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Dashboard\GenerateAiRecommendationController::generate
* @see app/Http/Controllers/Dashboard/GenerateAiRecommendationController.php:20
* @route '/dashboard/generate-ai-recommendation'
*/
export const generate = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generate.url(options),
    method: 'get',
})

generate.definition = {
    methods: ["get","head"],
    url: '/dashboard/generate-ai-recommendation',
} satisfies RouteDefinition<["get","head"]>

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
generate.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generate.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Dashboard\GenerateAiRecommendationController::generate
* @see app/Http/Controllers/Dashboard/GenerateAiRecommendationController.php:20
* @route '/dashboard/generate-ai-recommendation'
*/
generate.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: generate.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Dashboard\GenerateAiRecommendationController::generate
* @see app/Http/Controllers/Dashboard/GenerateAiRecommendationController.php:20
* @route '/dashboard/generate-ai-recommendation'
*/
const generateForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: generate.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Dashboard\GenerateAiRecommendationController::generate
* @see app/Http/Controllers/Dashboard/GenerateAiRecommendationController.php:20
* @route '/dashboard/generate-ai-recommendation'
*/
generateForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: generate.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Dashboard\GenerateAiRecommendationController::generate
* @see app/Http/Controllers/Dashboard/GenerateAiRecommendationController.php:20
* @route '/dashboard/generate-ai-recommendation'
*/
generateForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: generate.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

generate.form = generateForm

const GenerateAiRecommendationController = { generate }

export default GenerateAiRecommendationController