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
        Schema::create('training_contents', function (Blueprint $table) {
            $table->id();                            // مفتاح أساسي
            $table->string('title');                 // عنوان المحتوى التدريبي
            $table->text('description');             // شرح المحتوى
            $table->string('type');                  // نوع المحتوى (فيديو، مقال...)
            $table->string('video_url')->nullable(); // رابط الفيديو لو موجود
            $table->string('difficulty_level');      // مستوى الصعوبة (سهل - متوسط - صعب)
            $table->timestamps();                    // تاريخ الإنشاء والتعديل
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('training_contents');
    }
};
