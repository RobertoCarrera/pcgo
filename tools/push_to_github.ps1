# scripts/push_to_github.ps1
# Helper que añade el remote y hace push.
# Uso: .\tools\push_to_github.ps1 -GitHubUser "tu-usuario"

param(
  [Parameter(Mandatory=$true)]
  [string]$GitHubUser,

  [string]$RepoName = "pcgo",

  [string]$Branch = "main"
)

$repo = "https://github.com/$GitHubUser/$RepoName.git"

Write-Host "Setting remote to $repo"
git remote remove origin 2>$null
git remote add origin $repo

Write-Host "Renaming branch to $Branch (if needed)"
git branch -M $Branch

Write-Host "Pushing to origin/$Branch ..."
git push -u origin $Branch
