<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;

class EmotionController extends Controller
{
    public function analyzeEmotion(Request $request)
    {
        $request->validate([
            'photo' => 'required|image|max:2048',
        ]);

        $photo = $request->file('photo');
        $photoPath = $photo->store('uploads', 'public');

        $process = new Process([
            'C:\Python39',
            'C:\Users\Nikolajs\Documents\laravel\mood-music\app\camera.py',
            storage_path("app/public/$photoPath")
        ]);
        $process->run();

        if (!$process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }

        $emotion = trim($process->getOutput());

        dd($emotion);

        return response()->json(['emotion' => $emotion]);



    }
}
