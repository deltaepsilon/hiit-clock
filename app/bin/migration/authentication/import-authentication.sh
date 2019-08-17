npx firebase auth:import /app/bin/migration/authentication/authentication-filtered.csv \
  --project=quiver-hiit-clock \
  --token=$FIREBASE_TOKEN \
  --hash-algo=$AUTH_ALGORITHM \
  --hash-key=$HASH_KEY \
  --rounds=$AUTH_ROUNDS \
  --mem-cost=$AUTH_MEM_COST \
  --salt-separator=$AUTH_BASE64_SALT_SEPARATOR