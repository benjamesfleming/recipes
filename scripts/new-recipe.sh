#!/bin/bash

# ask function
ask() {
    if [ "$1" == "-t" ]; then
        echo -n "$2? ($3) "; read __
        if [ "$__" == "" ]; then
            __=$3
        fi
        return 1
    fi

    if [ "$1" == "-b" ]; then
        echo "Ask Function Not Implemented!"; __=0
        return 0
    fi
}

# use ask function to get simple recipe metadata
ask -t "enter recipe title" "My Recipe Title"; title=${__}
ask -t "enter recipe slug" $(echo $title | awk '{gsub(" ", "-"); print tolower($0)}'); slug=${__}
ask -t "enter recipe tags" "tag1, tag2, tag3"; tags=${__}
ask -t "enter prep time" "10m"; prepTime=${__}
ask -t "enter cook time" "15m"; cookTime=${__}

# cat the recipe template to a new file
touch ./recipes/$slug.md
cat > ./recipes/$slug.md << EOF
---
path: /r/$slug
date: $(date +"%Y-%m-%d")
title: $title
tags: [$tags]
time: prep=$prepTime cook=$cookTime
category: null
---

Makes 0 | Serves 0

### Ingredients:

-   
-   

### Steps:

1. 
2. 

EOF