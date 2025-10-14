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
        Schema::create('overtime', function (Blueprint $table){
            $table->id();
            $table->foreignId('staff_id')->constrained('staff')->onDelete('cascade');
            $table->foreignId('proyek_id')->constrained('proyek')->onDelete('cascade');
            $table->foreignId('dt_payroll_id')->constrained('detail_payroll')->onDelete('cascade');
            $table->string('keterangan');
            $table->date('tanggal');
            $table->dateTime('waktu_mulai');   
            $table->dateTime('waktu_selesai'); 
            $table->decimal('durasi_jam');
            $table->string('foto', 255)->nullable();
            $table->string('status')->default('pending');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
                Schema::dropIfExists('overtime');
    }
};
