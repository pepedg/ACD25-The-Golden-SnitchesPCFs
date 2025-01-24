param(
    [Parameter(Mandatory = $true)]
    [string]$folder,

    [Parameter(Mandatory = $true)]
    [string]$solutionVersionNumber,

    [Parameter(Mandatory = $true)]
    [string]$controlVersionNumber
)
$scanFolderDepth = 3

function UpdateSolutionVersion([string]$version, [string]$dir) {
    Write-Host "Updating solution version to: $($version), path: $($dir)"
    $solutionXmlFiles = Get-ChildItem -Path $dir -Recurse -Filter "Solution.xml" -Depth $scanFolderDepth
    $count = ($solutionXmlFiles | Measure-Object).Count
    Write-Host "Found files: $($count)"
    foreach ($solFile in $solutionXmlFiles) {
        $path = $solFile.FullName;
        Write-Host "Processing file: $($path)"
        $solution = [xml](Get-Content "$($path)");
        $solution.ImportExportXml.SolutionManifest.Version = "$($version)";
        $solution.Save($path);
    }
}

function UpdatingControlVersion([string]$version, [string]$dir) {
    Write-Host "Updating control version to: $($version), path: $($dir)"
    $controlManifestFiles = Get-ChildItem -Path $dir -File -Recurse -Filter "ControlManifest.Input.xml" -Depth $scanFolderDepth
    $count = ($controlManifestFiles | Measure-Object).Count
    Write-Host "Found files: $($count)"
    foreach ($controlManifest in $controlManifestFiles) {
        $path = $controlManifest.FullName;
        Write-Host "Processing file: $($path)"
        $xml = [xml](Get-Content "$($path)");
        $prevVersion = [version]$xml.manifest.control.version
        Write-Host "Prev. version: $($prevVersion), new version: $($version)"
        $xml.manifest.control.version = "$($version)";
        $xml.Save("$($path)")
    }
}

UpdateSolutionVersion -version: $solutionVersionNumber -dir: $folder
UpdatingControlVersion -version: $controlVersionNumber -dir: $folder