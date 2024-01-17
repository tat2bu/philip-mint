#!/bin/bash
# magick mogrify -resize 1200x1200 -quality 100 -filter point -background "#638596" -alpha remove -alpha off -path ../new-thumbs *.png
for i in {0..10000}; do
    printf -v url "https://cryptopunks.app/public/images/cryptopunks/punk%04d.png" $i
    curl -O $url
done