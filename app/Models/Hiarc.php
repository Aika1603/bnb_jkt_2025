<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Hiarc extends Model
{
    /** @use HasFactory<\Database\Factories\HiarcFactory> */
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'hiarc';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'code',
        'activity',
        'work_unit',
        'location',
        'recommendation',
    ];

    /**
     * Get the potential dangers for the hiarc.
     */
    public function potentialDangers(): HasMany
    {
        return $this->hasMany(PotentialDanger::class);
    }
}
