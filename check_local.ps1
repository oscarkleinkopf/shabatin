# PowerShell script to check javascript brackets locally
$filePath = "C:\Users\oscar\.gemini\antigravity\scratch\shabateinu-nbi\app.js"
if (-not (Test-Path $filePath)) {
    Write-Host "File not found: $filePath"
    exit
}

$text = [System.IO.File]::ReadAllText($filePath)

# State variables
$inString = $false
$stringChar = $null
$inSingleComment = $false
$inMultiComment = $false
$escape = $false

$braces = @()
$parens = @()
$brackets = @()

$len = $text.Length
for ($i = 0; $i -lt $len; $i++) {
    $c = $text[$i]
    $next = if ($i + 1 -lt $len) { $text[$i+1] } else { $null }
    
    # Handle escape characters
    if ($escape) {
        $escape = $false
        continue
    }
    
    # Handle comments
    if ($inSingleComment) {
        if ($c -eq "`n" -or $c -eq "`r") {
            $inSingleComment = $false
        }
        continue
    }
    
    if ($inMultiComment) {
        if ($c -eq '*' -and $next -eq '/') {
            $inMultiComment = $false
            $i++
        }
        continue
    }
    
    # Handle strings
    if ($inString) {
        if ($c -eq '\') {
            $escape = $true
        } elseif ($c -eq $stringChar) {
            $inString = $false
            $stringChar = $null
        }
        continue
    }
    
    # Check start of comment
    if ($c -eq '/' -and $next -eq '/') {
        $inSingleComment = $true
        $i++
        continue
    }
    if ($c -eq '/' -and $next -eq '*') {
        $inMultiComment = $true
        $i++
        continue
    }
    
    # Check start of string
    if ($c -eq '"' -or $c -eq "'" -or $c -eq '`') {
        $inString = $true
        $stringChar = $c
        continue
    }
    
    # Track brackets
    if ($c -eq '{') {
        $braces += $i
    } elseif ($c -eq '}') {
        if ($braces.Count -gt 0) {
            $braces = $braces[0..($braces.Count-2)]
        } else {
            Write-Host "Unmatched } at char $i"
            exit
        }
    } elseif ($c -eq '(') {
        $parens += $i
    } elseif ($c -eq ')') {
        if ($parens.Count -gt 0) {
            $parens = $parens[0..($parens.Count-2)]
        } else {
            Write-Host "Unmatched ) at char $i"
            exit
        }
    } elseif ($c -eq '[') {
        $brackets += $i
    } elseif ($c -eq ']') {
        if ($brackets.Count -gt 0) {
            $brackets = $brackets[0..($brackets.Count-2)]
        } else {
            Write-Host "Unmatched ] at char $i"
            exit
        }
    }
}

Write-Host "Scan completed."
Write-Host "Unmatched open braces count: $($braces.Count)"
Write-Host "Unmatched open parens count: $($parens.Count)"
Write-Host "Unmatched open brackets count: $($brackets.Count)"
