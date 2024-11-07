<?php

namespace App\Http\Controllers;

use App\Services\AzureFaceService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;

class FaceController extends Controller
{
    protected $faceService;

    public function __construct(AzureFaceService $faceService)
    {
        $this->faceService = $faceService;
    }

    public function index()
    {
        return Inertia::render('FaceAnalysis/Index');
    }

    public function analyze(Request $request)
    {
        $request->validate(['image' => 'required|image|mimes:jpg,jpeg,png']);

        $imagePath = $request->file('image')->getPathname();
        $analysis = $this->faceService->analyzeEmotions($imagePath);

        return Inertia::render('FaceAnalysis/Index', [
            'analysis' => $analysis,
        ]);
    }
}
