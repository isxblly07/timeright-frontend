#!/bin/bash
cd /workspaces/timeright-frontend/backend

while true; do
    echo "$(date): Iniciando servidor..."
    node server-fixed.js
    echo "$(date): Servidor parou. Reiniciando em 2 segundos..."
    sleep 2
done