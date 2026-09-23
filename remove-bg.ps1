Add-Type -AssemblyName System.Drawing

$inPath = "c:\Users\danie\READET~1\PORTFO~3\public\LOGO-V~1.PNG"
$outPath = "c:\Users\danie\READET~1\PORTFO~3\public\logo-symbol.png"

$img = [System.Drawing.Bitmap]::new($inPath)
$w = $img.Width
$h = $img.Height

# Find bounding box of the W symbol only (top 50% of image, skip text)
$topLimit = [int]($h * 0.50)

$minX = $w
$minY = $topLimit
$maxX = 0
$maxY = 0

for ($y = 0; $y -lt $topLimit; $y++) {
    for ($x = 0; $x -lt $w; $x++) {
        $pixel = $img.GetPixel($x, $y)
        $brightness = ([int]$pixel.R + [int]$pixel.G + [int]$pixel.B) / 3
        if ($brightness -gt 55) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

Write-Host "Symbol bounds: ($minX, $minY) to ($maxX, $maxY)"

# Add small padding
$pad = 10
$minX = [Math]::Max(0, $minX - $pad)
$minY = [Math]::Max(0, $minY - $pad)
$maxX = [Math]::Min($w - 1, $maxX + $pad)
$maxY = [Math]::Min($topLimit - 1, $maxY + $pad)

$cropW = $maxX - $minX + 1
$cropH = $maxY - $minY + 1

Write-Host "Cropping to: ${cropW}x${cropH}"

$cropped = New-Object System.Drawing.Bitmap($cropW, $cropH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($cropped)
$srcRect = New-Object System.Drawing.Rectangle($minX, $minY, $cropW, $cropH)
$destRect = New-Object System.Drawing.Rectangle(0, 0, $cropW, $cropH)
$g.DrawImage($img, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose()
$img.Dispose()

# Make dark pixels transparent
for ($x = 0; $x -lt $cropped.Width; $x++) {
    for ($y = 0; $y -lt $cropped.Height; $y++) {
        $pixel = $cropped.GetPixel($x, $y)
        $brightness = ([int]$pixel.R + [int]$pixel.G + [int]$pixel.B) / 3
        if ($brightness -lt 55) {
            $cropped.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        }
    }
}

$cropped.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Saved tightly cropped symbol: ${cropW}x${cropH}"
$cropped.Dispose()
