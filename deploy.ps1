
param(
    [Parameter(Mandatory = $false)]
    [string]$Message = "Atualização do projeto"
)

$ErrorActionPreference = "Stop"

try {
    Write-Host "`n=== Verificando alterações ===" -ForegroundColor Cyan
    git status --short

    Write-Host "`n=== Adicionando arquivos ===" -ForegroundColor Cyan
    git add .

    # Não cria commit se não houver alterações
    git diff --cached --quiet
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Nenhuma alteração para commit." -ForegroundColor Yellow
        exit 0
    }

    Write-Host "`n=== Criando commit ===" -ForegroundColor Cyan
    git commit -m $Message
    if ($LASTEXITCODE -ne 0) {
        throw "Falha ao criar o commit."
    }

    Write-Host "`n=== Enviando para o GitHub ===" -ForegroundColor Cyan
    git push
    if ($LASTEXITCODE -ne 0) {
        throw "Falha no git push. O deploy não será executado."
    }

    Write-Host "`n=== Executando deploy no servidor ===" -ForegroundColor Cyan
    ssh codepro@194.163.132.253 -p 2222 "bash /home/codepro/groups/sites/deploy.sh"

    if ($LASTEXITCODE -ne 0) {
        throw "O deploy remoto falhou."
    }

    Write-Host "`nDeploy concluído com sucesso!" -ForegroundColor Green
}
catch {
    Write-Host "`nERRO: $_" -ForegroundColor Red
    exit 1
}
