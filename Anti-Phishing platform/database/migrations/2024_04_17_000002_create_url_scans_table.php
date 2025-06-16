<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('url_scans', function (Blueprint $table) {
            $table->id();
            $table->string('url');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->boolean('is_malicious')->default(false);
            $table->json('scan_results')->nullable();
            $table->timestamp('scanned_at')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('url_scans');
    }
}; 