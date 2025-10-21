#!/usr/bin/env bash

set -e
set -o nounset

ip_addr="$(ipconfig getifaddr $(route get default | awk '/interface: / {print $2}'))"

echo "Local IP address: ${ip_addr}"
echo "Remove QLC+ Web URL: http://${ip_addr}:9999"

/Applications/QLC+.app/Contents/MacOS/qlcplus -w

