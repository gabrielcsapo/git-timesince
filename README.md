# git-timesince

> ⏰ a simple extension of git that shows the time since the last commit

[![Npm Version](https://img.shields.io/npm/v/git-timesince.svg)](https://www.npmjs.com/package/git-timesince)
[![Build Status](https://travis-ci.org/gabrielcsapo/git-timesince.svg?branch=master)](https://travis-ci.org/gabrielcsapo/git-timesince)
[![Coverage Status](https://lcov-server.gabrielcsapo.com/badge/github%2Ecom/gabrielcsapo/git-timesince.svg)](https://lcov-server.gabrielcsapo.com/coverage/github%2Ecom/gabrielcsapo/git-timesince)
[![Dependency Status](https://starbuck.gabrielcsapo.com/badge/github/gabrielcsapo/git-timesince/status.svg)](https://starbuck.gabrielcsapo.com/github/gabrielcsapo/git-timesince)
[![devDependency Status](https://starbuck.gabrielcsapo.com/badge/github/gabrielcsapo/git-timesince/dev-status.svg)](https://starbuck.gabrielcsapo.com/github/gabrielcsapo/git-timesince#info=devDependencies)
[![npm](https://img.shields.io/npm/dt/git-timesince.svg)]()
[![npm](https://img.shields.io/npm/dm/git-timesince.svg)]()

## Installation

```
npm install git-timesince -g
```

## Usage

```
Usage: git-timesince [options]

Commands:
  -h, --help, help             Output usage information
  -v, --version, version       Output the version number

Options:
  -s, --sort [direction]       Can change the direction of the time since for the repos provided (asc, desc) [default is desc]
  -r, --recursive              Recursively looks through directories, using the current working directory as the base
  -t, --timeFormat [range]     The time format that the output will be formatted in, [seconds, minutes, hours, days, weeks]
  -d, --directory [directory]  The current working directory, defaults to process.cwd()
```

> This can also be used when installed globally as an extension of git

```
git timesince
```

If you want to use any options it can applied as such

```
git timesince -r
```

The default time format is days, but can also be; `seconds`, `minutes`, `hours`, `days`, `weeks`.

```
$ git timesince --timeFormat seconds
/git-timesince [11910s]
```

```
$ git timesince -r

git-timesince [0d]     gabrielcsapo.github.io [0d] compress-object [0d]                  
woof [0d]              sweeney [5d]                tryitout [8d]                         
lcov-server [8d]       node-git-server [8d]        groffee [9d]                          
build.sh [12d]         run-anything [14d]          tap-html [15d]                        
places [20d]           badgeit [22d]               css-commons [22d]                     
monotime [33d]         context-link [33d]          node-chat-rooms [36d]                 
starbuck [38d]         node-timecapsule [44d]      mocha-markdown-extended-reporter [44d]
grunt-screenshot [44d] espyjs [44d]                json-ex [44d]                         
npm-what [49d]         psychic.css [54d]           git-unstaged [57d]                    
saywhat [57d]          shell-p [57d]               bluse [57d]                           
deploy.sh [57d]        steno [71d]                 cproxy [107d]                         
bash-codegen [161d]    node-notebook [211d]                  
```
