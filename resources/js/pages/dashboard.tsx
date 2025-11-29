import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Hiarc } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { TriangleAlert, Sparkles, Loader2, AlertCircle } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'HIRADC',
        href: 'dashboard',
    },
];

interface DashboardProps {
    hiarcs: Hiarc[];
}

const getRiskScoreLabel = (score: number | null): string => {
    if (score === 3) return 'High';
    if (score === 2) return 'Medium';
    if (score === 1) return 'Low';
    return 'N/A';
};

const getRiskScoreBgColor = (score: number | null): string => {
    if (score === 3) return 'bg-red-500';
    if (score === 2) return 'bg-yellow-500';
    if (score === 1) return 'bg-green-500';
    return 'bg-gray-500';
};

function HiarcCardIdentification({ hiarc }: { hiarc: Hiarc }) {
    return (
        <div className="rounded-lg border bg-card p-4 shadow-sm">
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">
                        {hiarc.code || `HIRADC #${hiarc.id}`}
                    </h3>
                    {hiarc.score && (
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                            Score: {hiarc.score}
                        </span>
                    )}
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-3'>
                    {hiarc.activity && (
                        <p className="text-md">
                            <span className="font-bold">Activity:</span> {hiarc.activity}
                        </p>
                    )}
                    {hiarc.work_unit && (
                        <p className="text-md">
                            <span className="font-bold">Work Unit:</span> {hiarc.work_unit}
                        </p>
                    )}
                    {hiarc.location && (
                        <p className="text-md">
                            <span className="font-bold">Location:</span> {hiarc.location}
                        </p>
                    )}
                </div>

                <div className="mt-4">
                    {hiarc.potential_dangers && hiarc.potential_dangers.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b bg-muted/50">
                                        <th className="px-4 py-2 text-left text-sm font-semibold">Potential Hazard</th>
                                        <th className="px-4 py-2 text-left text-sm font-semibold">Factors</th>
                                        <th className="px-4 py-2 text-left text-sm font-semibold">Impact</th>
                                        <th className="px-4 py-2 text-left text-sm font-semibold">Current Controls</th>
                                        <th className="px-4 py-2 text-left text-sm font-semibold">Risk Score</th>
                                        <th className="px-4 py-2 text-left text-sm font-semibold">Opportunity for Improvement</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {hiarc.potential_dangers.map((danger) => (
                                        <tr key={danger.id} className="border-b hover:bg-muted/30">
                                            <td className="px-4 py-3 text-sm">
                                                {danger.description || '-'}
                                            </td>
                                            <td className="px-4 py-3 text-sm">
                                                {danger.factors || '-'}
                                            </td>
                                            <td className="px-4 py-3 text-sm">
                                                {danger.impact || '-'}
                                            </td>
                                            <td className="px-4 py-3 text-sm">
                                                {danger.current_controls || '-'}
                                            </td>
                                            <td className="px-4 py-3 text-sm">
                                                {danger.risk_score ? (
                                                    <span
                                                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium text-white ${getRiskScoreBgColor(danger.risk_score)}`}
                                                    >
                                                        {getRiskScoreLabel(danger.risk_score)} ({danger.risk_score})
                                                    </span>
                                                ) : (
                                                    '-'
                                                )}
                                            </td>
                                            <td className="px-4 py-3 text-sm">
                                                {danger.opportunity_for_improvement || '-'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground">No potential dangers identified</p>
                    )}
                </div>
            </div>
        </div>
    );
}


export default function Dashboard({ hiarcs }: DashboardProps) {
    const [activeTab, setActiveTab] = useState<'identification' | 'recommendation'>('identification');
    const [isGenerating, setIsGenerating] = useState(false);
    const [aiSummary, setAiSummary] = useState<string | null>(null);
    const [aiOverallRiskScore, setAiOverallRiskScore] = useState<number | null>(null);
    const [aiDetermining, setAiDetermining] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    // For displaying disclaimer after generation
    const [hasGenerated, setHasGenerated] = useState(false);

    const handleGenerateAI = async () => {
        setIsGenerating(true);
        setError(null);
        setHasGenerated(false);

        try {
            const csrfToken = document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content;
            
            if (!csrfToken) {
                throw new Error('CSRF token not found');
            }

            const response = await fetch('/dashboard/generate-ai-recommendation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json',
                },
                credentials: 'same-origin',
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || 'Failed to generate recommendations');
            }
            console.log(data);
            
            setAiSummary(data.summary);
            setAiOverallRiskScore(data.scoring);
            setAiDetermining(data.recommendation);
            setError(null);

            setHasGenerated(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to generate recommendations. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="HIRADC" />
            <div className="mb-2 px-5 flex items-center gap-4 mt-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600/10 text-red-700 dark:bg-red-900/30 dark:text-red-300">
                    <TriangleAlert className="w-6 h-6"/>
                </div>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">HIRADC</h1>
                    <p className="text-base text-muted-foreground">
                        Hazard Identification, Risk Assessment, and Determining Control
                    </p>
                </div>
            </div>
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {hiarcs.length === 0 ? (
                    <div className="flex h-full items-center justify-center">
                        <p className="text-muted-foreground">No HIRADC data</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {/* Tabs Header */}
                        <div className="border-b">
                            <nav className="-mb-px flex gap-2">
                                <button
                                    onClick={() => setActiveTab('identification')}
                                    className={cn(
                                        'border-b-2 px-2 py-2 text-md font-semibold transition-colors',
                                        activeTab === 'identification'
                                            ? 'border-primary text-primary'
                                            : 'border-transparent text-muted-foreground hover:border-muted-foreground/50 hover:text-foreground'
                                    )}
                                >
                                    Hazard Identification
                                </button>
                                <button
                                    onClick={() => setActiveTab('recommendation')}
                                    className={cn(
                                        'border-b-2 px-2 py-2 text-md font-semibold transition-colors',
                                        activeTab === 'recommendation'
                                            ? 'border-primary text-primary'
                                            : 'border-transparent text-muted-foreground hover:border-muted-foreground/50 hover:text-foreground'
                                    )}
                                >
                                    Determining Control
                                </button>
                            </nav>
                        </div>

                        {/* Tab Content */}
                        <div className="space-y-4">
                            {activeTab === 'identification' && (
                                <>
                                    {hiarcs.map((hiarc) => (
                                        <HiarcCardIdentification key={hiarc.id} hiarc={hiarc} />
                                    ))}
                                </>
                            )}

                            {activeTab === 'recommendation' && (
                                <div className="space-y-4">
                                    {/* Single Generate AI button at the top */}
                                    {hasGenerated === false ? (
                                        <div className="flex justify-start mb-4">
                                            <button
                                                onClick={handleGenerateAI}
                                                disabled={isGenerating}
                                                className={cn(
                                                    'inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors',
                                                    'hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                                                    'disabled:cursor-not-allowed disabled:opacity-50'
                                                )}
                                            >
                                                {isGenerating ? (
                                                    <>
                                                        <Loader2 className="h-4 w-4 animate-spin" />
                                                        Generating...
                                                    </>
                                                ) : hasGenerated === false ? (
                                                    <>
                                                        <Sparkles className="h-4 w-4" />
                                                        Generate 
                                                    </>
                                                ) : null }
                                            </button>
                                        </div>
                                    ) : null}

                                    {/* Disclaimer for Gemini-2.5-flash */}
                                    {hasGenerated && (
                                        <div className="flex items-center gap-2 rounded-md bg-yellow-100 border border-yellow-300 text-yellow-700 p-3 text-sm mb-4">
                                            <span>
                                                <b>Disclaimer:</b> Hasil yang dihasilkan menggunakan Gemini-2.5-flash dapat mengandung kesalahan. Silakan lakukan verifikasi ulang hasil rekomendasi maupun identifikasi sebelum mengambil keputusan lebih lanjut.
                                            </span>
                                        </div>
                                    )}

                                    <div className="rounded-lg border bg-card p-6 shadow-sm">
                                        <div className="mb-4 flex items-center justify-between">
                                            <h3 className="text-lg font-semibold">Summary of Hazard Identification</h3>
                                        </div>
                                        {error && (
                                            <div className="mb-4 rounded-md bg-destructive/10 p-0 text-sm text-destructive">
                                                {error}
                                            </div>
                                        )}
                                        {isGenerating && !aiSummary && (
                                            <div className="space-y-2">
                                                <div className="h-4 animate-pulse rounded bg-muted" />
                                                <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
                                                <div className="h-4 w-4/6 animate-pulse rounded bg-muted" />
                                            </div>
                                        )}
                                        {aiSummary ? (
                                            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{aiSummary}</p>
                                        ) : isGenerating === false ? (
                                            <div className="mb-2 rounded-md bg-warning/10 p-0 text-sm text-warning-foreground">
                                                -
                                            </div>
                                        ) : null}
                                    </div>

                                    <div className="rounded-lg border bg-card p-6 shadow-sm">
                                        <div className="mb-4 flex items-center justify-between">
                                            <h3 className="text-lg font-semibold">Recommendation for Determining Control</h3>
                                        </div>
                                        {error && (
                                            <div className="mb-4 rounded-md bg-destructive/10 p-0 text-sm text-destructive">
                                                {error}
                                            </div>
                                        )}
                                        {isGenerating && !aiDetermining && (
                                            <div className="space-y-2">
                                                <div className="h-4 animate-pulse rounded bg-muted" />
                                                <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
                                                <div className="h-4 w-4/6 animate-pulse rounded bg-muted" />
                                            </div>
                                        )}
                                        {aiDetermining ? (
                                            <div
                                                className="text-sm text-muted-foreground whitespace-pre-wrap"
                                                dangerouslySetInnerHTML={{ __html: aiDetermining }}
                                            />
                                        ) : isGenerating === false ? (
                                            <div className="mb-2 rounded-md bg-warning/10 p-0 text-sm text-warning-foreground">
                                                -
                                            </div>
                                        ) : null}
                                    </div>
                                    
                                    <div className="rounded-lg border bg-card p-6 shadow-sm">
                                        <div className="mb-4 flex items-center justify-between">
                                            <h3 className="text-lg font-semibold">Overall Risk Assessment</h3>
                                        </div>
                                        {isGenerating && aiOverallRiskScore === null && (
                                            <div className="h-8 w-32 animate-pulse rounded bg-muted" />
                                        )}
                                        {aiOverallRiskScore !== null ? (
                                            <div className="flex items-center gap-4">
                                                <span
                                                    className={`inline-flex items-center rounded-full px-6 py-3 text-base font-medium text-white ${getRiskScoreBgColor(aiOverallRiskScore)}`}
                                                >
                                                    {getRiskScoreLabel(Number(aiOverallRiskScore))} ({aiOverallRiskScore})
                                                </span>
                                                <div className="text-sm text-muted-foreground">
                                                    AI-generated overall risk score based on comprehensive analysis of all HIRADC assessments.
                                                </div>
                                            </div>
                                        ) : isGenerating === false ? (
                                            <div className="mb-2 rounded-md bg-warning/10 p-0 text-sm text-warning-foreground">
                                                -
                                            </div>
                                        ) : null}
                                    </div>

                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
