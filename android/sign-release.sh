#!/usr/bin/env bash
# Sign the release bundle with the upload key, ready for Play Console.
#   JAVA_HOME=~/android-jdk17/Contents/Home ./gradlew bundleRelease && ./sign-release.sh
# The upload key lives OUTSIDE the repo, in ~/.history-quiz (keystore + password file).
# Back that folder up: losing it means asking Google to reset the upload key.
set -euo pipefail
cd "$(dirname "$0")"

DIR="${HISTORY_QUIZ_KEYS:-$HOME/.history-quiz}"
KEYSTORE="$DIR/upload.keystore"
ALIAS="history-quiz"
UNSIGNED="app/build/outputs/bundle/release/app-release.aab"
VERSION="$(grep -m1 'versionName' app/build.gradle | sed 's/.*"\(.*\)".*/\1/')"
SIGNED="history-quiz-$VERSION.aab"
JARSIGNER="${JAVA_HOME:-$HOME/android-jdk17/Contents/Home}/bin/jarsigner"
KEYTOOL="${JAVA_HOME:-$HOME/android-jdk17/Contents/Home}/bin/keytool"

[[ -f "$KEYSTORE" ]] || { echo "!! $KEYSTORE not found."; exit 1; }
[[ -f "$UNSIGNED" ]] || { echo "!! $UNSIGNED not found — run ./gradlew bundleRelease first."; exit 1; }

if [[ -f "$DIR/keystore-password.txt" ]]; then PW="$(cat "$DIR/keystore-password.txt")"
else read -rs -p "Keystore password: " PW; echo; fi

echo ">> Signing $UNSIGNED ..."
"$JARSIGNER" -sigalg SHA256withRSA -digestalg SHA-256 -keystore "$KEYSTORE" \
  -storepass "$PW" -keypass "$PW" -signedjar "$SIGNED" "$UNSIGNED" "$ALIAS"
"$JARSIGNER" -verify "$SIGNED" >/dev/null && echo "   signature OK"
unset PW

echo
echo "=== upload-key SHA-256 (Play Console shows this as the upload certificate) ==="
"$KEYTOOL" -printcert -jarfile "$SIGNED" | grep -i "SHA256:" | head -1
echo
echo "DONE. Upload to Play Console: android/$SIGNED"
