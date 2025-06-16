<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\User;

return new class extends Migration
{
    public function up()
    {
        User::where('email', 'zyadd.aymann@gmail.com')->update(['is_admin' => true]);
    }

    public function down()
    {
        User::where('email', 'zyadd.aymann@gmail.com')->update(['is_admin' => false]);
    }
}; 