$json = @"
{ "language": "c", "version": "10.2.0", "files": [{"content": "int main(){ return 0; }"}] }
"@
Invoke-RestMethod -Uri "https://emkc.org/api/v2/piston/execute" -Method Post -Body $json -ContentType "application/json" | ConvertTo-Json -Depth 5
