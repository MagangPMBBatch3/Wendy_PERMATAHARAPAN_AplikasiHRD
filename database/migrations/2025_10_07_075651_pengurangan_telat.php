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
         Schema::create('pengurangan_telat', function (Blueprint $table) {
            $table->id();
            $table->foreignId('staff_id')->constrained('staff')->onDelete('cascade');
            $table->foreignId('dt_payroll_id')->constrained('detail_payroll')->onDelete('cascade');
            $table->string('keterangan');
            $table->decimal('jumlah', 15, 2)->default(0);
            $table->date('tanggal');
            $table->time('waktu_datang');
            $table->decimal('durasi_telat', 8, 2);
            $table->timestamps();
            $table->softDeletes();
         });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengurangan_telat');
    }
};
