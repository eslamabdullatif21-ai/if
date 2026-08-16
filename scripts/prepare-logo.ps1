param(
    [string]$Source = "Gemini_Generated_Image_rp7emprp7emprp7e.jfif",
    [string]$OutputDirectory = "public"
)

$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Drawing

$processor = @"
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Runtime.InteropServices;

public static class LogoProcessor
{
    public static void Export(string sourcePath, string outputPath, bool monogramOnly)
    {
        using (var original = new Bitmap(sourcePath))
        using (var source = original.Clone(
            new Rectangle(0, 0, original.Width, original.Height),
            PixelFormat.Format32bppArgb))
        {
            var sourceRect = new Rectangle(0, 0, source.Width, source.Height);
            var sourceData = source.LockBits(sourceRect, ImageLockMode.ReadOnly, PixelFormat.Format32bppArgb);
            var sourceStride = sourceData.Stride;
            var sourceBytes = new byte[Math.Abs(sourceStride) * source.Height];
            Marshal.Copy(sourceData.Scan0, sourceBytes, 0, sourceBytes.Length);
            source.UnlockBits(sourceData);

            var scanHeight = monogramOnly ? (int)(source.Height * 0.59) : source.Height;
            var minX = source.Width;
            var minY = scanHeight;
            var maxX = 0;
            var maxY = 0;

            for (var y = 0; y < scanHeight; y++)
            {
                var row = y * sourceStride;
                for (var x = 0; x < source.Width; x++)
                {
                    var index = row + (x * 4);
                    var blue = sourceBytes[index];
                    var green = sourceBytes[index + 1];
                    var red = sourceBytes[index + 2];
                    var luminance = (0.2126 * red) + (0.7152 * green) + (0.0722 * blue);
                    if (luminance < 170)
                    {
                        minX = Math.Min(minX, x);
                        minY = Math.Min(minY, y);
                        maxX = Math.Max(maxX, x);
                        maxY = Math.Max(maxY, y);
                    }
                }
            }

            var padding = monogramOnly ? 42 : 58;
            minX = Math.Max(0, minX - padding);
            minY = Math.Max(0, minY - padding);
            maxX = Math.Min(source.Width - 1, maxX + padding);
            maxY = Math.Min(source.Height - 1, maxY + padding);

            var width = maxX - minX + 1;
            var height = maxY - minY + 1;
            using (var output = new Bitmap(width, height, PixelFormat.Format32bppArgb))
            {
                var outputRect = new Rectangle(0, 0, width, height);
                var outputData = output.LockBits(outputRect, ImageLockMode.WriteOnly, PixelFormat.Format32bppArgb);
                var outputBytes = new byte[Math.Abs(outputData.Stride) * height];

                for (var y = 0; y < height; y++)
                {
                    var sourceRow = (minY + y) * sourceStride;
                    var outputRow = y * outputData.Stride;
                    for (var x = 0; x < width; x++)
                    {
                        var sourceIndex = sourceRow + ((minX + x) * 4);
                        var outputIndex = outputRow + (x * 4);
                        var blue = sourceBytes[sourceIndex];
                        var green = sourceBytes[sourceIndex + 1];
                        var red = sourceBytes[sourceIndex + 2];
                        var luminance = (0.2126 * red) + (0.7152 * green) + (0.0722 * blue);
                        var alpha = (int)Math.Round((238 - luminance) * 255 / 168);
                        alpha = Math.Max(0, Math.Min(255, alpha));

                        outputBytes[outputIndex] = 58;
                        outputBytes[outputIndex + 1] = 31;
                        outputBytes[outputIndex + 2] = 11;
                        outputBytes[outputIndex + 3] = (byte)alpha;
                    }
                }

                Marshal.Copy(outputBytes, 0, outputData.Scan0, outputBytes.Length);
                output.UnlockBits(outputData);
                output.Save(outputPath, ImageFormat.Png);
            }
        }
    }
}
"@

Add-Type -TypeDefinition $processor -ReferencedAssemblies System.Drawing

$resolvedSource = (Resolve-Path -LiteralPath $Source).Path
$resolvedOutput = Join-Path (Get-Location) $OutputDirectory
New-Item -ItemType Directory -Path $resolvedOutput -Force | Out-Null

[LogoProcessor]::Export($resolvedSource, (Join-Path $resolvedOutput "brand-monogram.png"), $true)
[LogoProcessor]::Export($resolvedSource, (Join-Path $resolvedOutput "brand-lockup.png"), $false)

Write-Output "Prepared transparent brand assets in $resolvedOutput"
