# Generate production assess on the /priv/static
cd angular;
npm install;
ng build --target=production --env=prod --output-hashing=false --vendor-chunk=true --extractCss=false

# Diggest the static
cd ..;
mix deps.get;
MIX_ENV=prod mix phoenix.digest;

# Generate release
MIX_ENV=prod mix release.init;
MIX_ENV=prod mix release;

