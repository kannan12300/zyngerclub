Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$public = Join-Path $root "public"
$paths = @("hero", "menu", "gallery")
foreach ($path in $paths) {
  New-Item -ItemType Directory -Force -Path (Join-Path $public $path) | Out-Null
}

function Brush($hex) {
  return [System.Drawing.SolidBrush]::new([System.Drawing.ColorTranslator]::FromHtml($hex))
}

function Pen($hex, $width) {
  return [System.Drawing.Pen]::new([System.Drawing.ColorTranslator]::FromHtml($hex), $width)
}

function Draw-Capsule($g, $x, $y, $w, $h, $brush) {
  $r = $h
  $path = [System.Drawing.Drawing2D.GraphicsPath]::new()
  $path.AddArc($x, $y, $r, $r, 90, 180)
  $path.AddArc($x + $w - $r, $y, $r, $r, 270, 180)
  $path.CloseFigure()
  $g.FillPath($brush, $path)
  $path.Dispose()
}

function Draw-Burger($g, $cx, $cy, $scale) {
  Draw-Capsule $g ($cx - 165 * $scale) ($cy - 105 * $scale) (330 * $scale) (82 * $scale) (Brush "#FDBA21")
  Draw-Capsule $g ($cx - 145 * $scale) ($cy - 32 * $scale) (290 * $scale) (36 * $scale) (Brush "#FDE68A")
  Draw-Capsule $g ($cx - 155 * $scale) ($cy + 18 * $scale) (310 * $scale) (54 * $scale) (Brush "#7C2D12")
  Draw-Capsule $g ($cx - 165 * $scale) ($cy + 86 * $scale) (330 * $scale) (72 * $scale) (Brush "#EA580C")
  $sesame = Brush "#7C2D12"
  foreach ($p in @(@(-82,-70), @(0,-82), @(78,-62))) {
    $g.FillEllipse($sesame, $cx + $p[0] * $scale, $cy + $p[1] * $scale, 13 * $scale, 13 * $scale)
  }
}

function Draw-Fries($g, $cx, $cy, $scale) {
  $fries = Brush "#FDBA21"
  foreach ($p in @(@(-96,-155,38,260), @(-30,-190,38,300), @(36,-160,38,265), @(96,-128,38,230))) {
    $g.FillRectangle($fries, $cx + $p[0] * $scale, $cy + $p[1] * $scale, $p[2] * $scale, $p[3] * $scale)
  }
  $g.FillRectangle((Brush "#DC2626"), $cx - 145 * $scale, $cy - 32 * $scale, 290 * $scale, 190 * $scale)
  $g.FillRectangle((Brush "#F97316"), $cx - 108 * $scale, $cy + 25 * $scale, 216 * $scale, 34 * $scale)
}

function Draw-Chicken($g, $cx, $cy, $scale) {
  $g.FillEllipse((Brush "#C2410C"), $cx - 160 * $scale, $cy - 95 * $scale, 260 * $scale, 185 * $scale)
  $g.FillEllipse((Brush "#F97316"), $cx - 94 * $scale, $cy - 74 * $scale, 200 * $scale, 142 * $scale)
  $g.FillEllipse((Brush "#FDE68A"), $cx + 78 * $scale, $cy - 122 * $scale, 68 * $scale, 68 * $scale)
}

function Draw-Drink($g, $cx, $cy, $scale, $color) {
  $g.FillRectangle((Brush "#1F2937"), $cx + 4 * $scale, $cy - 202 * $scale, 14 * $scale, 112 * $scale)
  $g.FillRectangle((Brush "#FFFFFF"), $cx - 88 * $scale, $cy - 130 * $scale, 176 * $scale, 276 * $scale)
  $g.FillRectangle((Brush $color), $cx - 74 * $scale, $cy - 84 * $scale, 148 * $scale, 216 * $scale)
  Draw-Capsule $g ($cx - 52 * $scale) ($cy - 60 * $scale) (104 * $scale) (34 * $scale) (Brush "#FFFFFF")
  $g.FillEllipse((Brush "#FDBA21"), $cx - 36 * $scale, $cy + 34 * $scale, 72 * $scale, 72 * $scale)
}

function Draw-Pizza($g, $cx, $cy, $scale) {
  $points = [System.Drawing.PointF[]]@(
    [System.Drawing.PointF]::new($cx - 160 * $scale, $cy - 130 * $scale),
    [System.Drawing.PointF]::new($cx + 180 * $scale, $cy - 70 * $scale),
    [System.Drawing.PointF]::new($cx - 25 * $scale, $cy + 170 * $scale)
  )
  $g.FillPolygon((Brush "#FDBA21"), $points)
  $g.DrawPolygon((Pen "#EA580C" (18 * $scale)), $points)
  foreach ($p in @(@(-45,-42), @(48,-18), @(18,70), @(-78,50))) {
    $g.FillEllipse((Brush "#DC2626"), $cx + $p[0] * $scale, $cy + $p[1] * $scale, 42 * $scale, 42 * $scale)
  }
}

function Draw-Wrap($g, $cx, $cy, $scale) {
  $g.TranslateTransform($cx, $cy)
  $g.RotateTransform(-12)
  Draw-Capsule $g (-160 * $scale) (-65 * $scale) (320 * $scale) (130 * $scale) (Brush "#FDE68A")
  Draw-Capsule $g (-132 * $scale) (-38 * $scale) (264 * $scale) (76 * $scale) (Brush "#F97316")
  $g.ResetTransform()
}

function Draw-Plate($g, $cx, $cy, $scale, $kind) {
  $g.FillEllipse((Brush "#FFFFFF"), $cx - 230 * $scale, $cy - 40 * $scale, 460 * $scale, 130 * $scale)
  if ($kind -eq "burger") { Draw-Burger $g $cx ($cy - 75 * $scale) $scale }
  elseif ($kind -eq "fries") { Draw-Fries $g $cx ($cy - 34 * $scale) $scale }
  elseif ($kind -eq "drink-blue") { Draw-Drink $g $cx ($cy - 20 * $scale) $scale "#38BDF8" }
  elseif ($kind -eq "shake") { Draw-Drink $g $cx ($cy - 20 * $scale) $scale "#C084FC" }
  elseif ($kind -eq "pizza") { Draw-Pizza $g $cx ($cy - 20 * $scale) $scale }
  elseif ($kind -eq "wrap") { Draw-Wrap $g $cx ($cy - 35 * $scale) $scale }
  else {
    Draw-Chicken $g ($cx - 50 * $scale) ($cy - 48 * $scale) $scale
    Draw-Fries $g ($cx + 92 * $scale) ($cy - 24 * $scale) ($scale * 0.55)
  }
}

function New-FoodAsset($relativePath, $title, $subtitle, $kind, $w = 1200, $h = 900, $jpg = $false) {
  $file = Join-Path $public $relativePath
  New-Item -ItemType Directory -Force -Path (Split-Path -Parent $file) | Out-Null
  $bmp = [System.Drawing.Bitmap]::new($w, $h)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $rect = [System.Drawing.Rectangle]::new(0, 0, $w, $h)
  $bg = [System.Drawing.Drawing2D.LinearGradientBrush]::new($rect, [System.Drawing.ColorTranslator]::FromHtml("#FFF7ED"), [System.Drawing.ColorTranslator]::FromHtml("#F97316"), 35)
  $g.FillRectangle($bg, $rect)
  $g.FillEllipse((Brush "#FDBA21"), -140, -150, 460, 460)
  $g.FillEllipse((Brush "#DC2626"), $w - 260, 70, 360, 360)
  $g.FillEllipse((Brush "#FFFFFF"), 96, 135, $w - 192, $h - 270)
  $g.FillEllipse((Brush "#FFF7ED"), 126, 165, $w - 252, $h - 330)
  Draw-Plate $g ($w / 2) ($h * 0.52) ([Math]::Min($w, $h) / 900) $kind
  $fontTitle = [System.Drawing.Font]::new("Arial Black", [Math]::Max(34, $w / 18), [System.Drawing.FontStyle]::Bold)
  $fontSub = [System.Drawing.Font]::new("Arial", [Math]::Max(18, $w / 42), [System.Drawing.FontStyle]::Bold)
  $fontBrand = [System.Drawing.Font]::new("Arial Black", [Math]::Max(18, $w / 44), [System.Drawing.FontStyle]::Bold)
  $g.DrawString("ZYnger Club", $fontBrand, (Brush "#FFFFFF"), 42, 34)
  Draw-Capsule $g 38 30 230 50 (Brush "#DC2626")
  $g.DrawString("ZYnger Club", $fontBrand, (Brush "#FFFFFF"), 55, 38)
  $g.DrawString($title.ToUpperInvariant(), $fontTitle, (Brush "#1F2937"), 58, $h - 178)
  $g.DrawString($subtitle, $fontSub, (Brush "#DC2626"), 64, $h - 100)
  $format = if ($jpg) { [System.Drawing.Imaging.ImageFormat]::Jpeg } else { [System.Drawing.Imaging.ImageFormat]::Png }
  $bmp.Save($file, $format)
  $fontTitle.Dispose(); $fontSub.Dispose(); $fontBrand.Dispose(); $bg.Dispose(); $g.Dispose(); $bmp.Dispose()
}

New-FoodAsset "hero/hero-combo.png" "Crispy Combo" "Burgers. Chicken. Fries. Drinks." "combo" 1600 1100
New-FoodAsset "menu/zinger-burger.png" "Zinger Burger" "Crispy signature burger" "burger"
New-FoodAsset "menu/signature-loaded-fries.png" "Loaded Fries" "Saucy crispy fries" "fries"
New-FoodAsset "menu/family-meal.png" "Family Meal" "Built for sharing" "combo"
New-FoodAsset "menu/bucket-meal.png" "Bucket Meal" "Crispy chicken bucket" "combo"
New-FoodAsset "menu/blue-coraco-mojito.png" "Blue Coraco" "Chilled mojito" "drink-blue"
New-FoodAsset "menu/hazelnut-shake.png" "Hazel Nut Shake" "Creamy shake" "shake"
New-FoodAsset "menu/pizza.png" "Chicken Pizza" "Hot cheesy slice" "pizza"
New-FoodAsset "menu/wrap.png" "Zynger Wrap" "Crispy wrap" "wrap"
New-FoodAsset "menu/chicken-strips.png" "Chicken Strips" "Golden strips" "combo"
New-FoodAsset "menu/wings.png" "Hot Wings" "Spicy wings" "combo"
New-FoodAsset "menu/nuggets.png" "Nuggets" "Crispy bites" "combo"
New-FoodAsset "gallery/gallery-1.png" "Burger Mood" "Demo branded visual" "burger"
New-FoodAsset "gallery/gallery-2.png" "Bucket Night" "Demo branded visual" "combo"
New-FoodAsset "gallery/gallery-3.png" "Loaded Fries" "Demo branded visual" "fries"
New-FoodAsset "gallery/gallery-4.png" "Drinks Bar" "Demo branded visual" "drink-blue"
New-FoodAsset "og-image.jpg" "Zynger Club" "Fried Chicken Cafe Kunnamkulam" "combo" 1200 630 $true
