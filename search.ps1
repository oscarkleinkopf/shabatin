$filePath = "C:\Users\oscar\.gemini\antigravity\scratch\shabateinu-nbi\app.js"
$results = @()
$lines = Get-Content $filePath
for ($i = 0; $i -lt $lines.Length; $i++) {
    if ($lines[$i] -match "speak|voice|speech|synthesis|lang") {
        $results += "$($i + 1): $($lines[$i])"
    }
}
[System.IO.File]::WriteAllLines("C:\Users\oscar\.gemini\antigravity\scratch\shabateinu-nbi\search_result.txt", $results)
