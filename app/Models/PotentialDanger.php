<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PotentialDanger extends Model
{
    /** @use HasFactory<\Database\Factories\PotentialDangerFactory> */
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'potential_danger';
    
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'hiarc_id',
        'description',
        'factors',
        'impact',
        'current_controls',
        'risk_score',
        'opportunity_for_improvement',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'risk_score' => 'integer',
        ];
    }

    /**
     * Get the hiarc that owns the potential danger.
     */
    public function hiarc(): BelongsTo
    {
        return $this->belongsTo(Hiarc::class);
    }
}
