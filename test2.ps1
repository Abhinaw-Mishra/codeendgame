$json = @"
{ "compiler": "gcc-head", "code": "#include <stdio.h>\nint main(){ return 0; }" }
"@
Invoke-RestMethod -Uri "https://wandbox.org/api/compile.json" -Method Post -Body $json -ContentType "application/json" | ConvertTo-Json -Depth 5
