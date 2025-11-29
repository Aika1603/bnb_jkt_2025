<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('hiarc', function (Blueprint $table) {
            $table->id();
            $table->string('code')->nullable();
            $table->string('activity')->nullable();
            $table->string('work_unit')->nullable();
            $table->string('location')->nullable();
            $table->text('recommendation')->nullable();
            $table->smallInteger('score')->nullable();
            $table->timestamps();
        });

        Schema::create('potential_danger', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('hiarc_id');
            $table->text('description')->nullable();
            $table->text('factors')->nullable();
            $table->text('impact')->nullable();
            $table->text('current_controls')->nullable();
            $table->enum('risk_score', [1,2,3])->nullable();
            $table->text('opportunity_for_improvement')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hiarc');
        Schema::dropIfExists('potential_danger');
    }
};
