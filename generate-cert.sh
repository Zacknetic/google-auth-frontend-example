#!/bin/bash

# CHANGE ME TO LF line endings!!!!!!!!!!!!!!!!!!!!!!!!!!!!
certDir=$(dirname "$0")
keyPath="${certDir}/ssl.key"
certPath="${certDir}/ssl.crt"
csrPath="${certDir}/ssl.csr"

if [[ ! -f "$keyPath" || ! -f "$certPath" ]]; then
  echo "Generating SSL certificate and key..."

  openssl genrsa -out "$keyPath" 2048
  openssl req -new -key "$keyPath" -out "$csrPath" -subj "/C=US/ST=California/L=San Francisco/O=Your Organization/OU=Your Unit/CN=localhost"
  openssl x509 -req -days 365 -in "$csrPath" -signkey "$keyPath" -out "$certPath"

  echo "SSL certificate and key generated successfully."
else
  echo "SSL certificate and key already exist. Skipping generation."
fi
