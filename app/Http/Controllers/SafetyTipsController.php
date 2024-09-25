<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class SafetyTipsController extends Controller
{
    public function index()
    {
        return Inertia::render('SafetyTips');
    }
}