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
run-anything [0d]
quantified_self [217d]
psychic-ui [19d]
psychic [247d]
npm-what [18d]
node-timecapsule [74d]
node-tester [217d]
node-notebook [130d]
node-git-server [9d]
node-flat-db [413d]
node-dashboard [385d]
node-chat-rooms [270d]
monotime [7d]
local-npm-daemon [44d]
local-npm [10d]
lcov-server [4d]
json-ex [6d]
grunt-screenshot [306d]
git-unstaged [17d]
git-timesince [7d]
gh-sync [71d]
gh-metrics [7d]
gh-manager [71d]
gabrielcsapo.github.io [12d]
espyjs [147d]
deploy.sh [41d]
cproxy [26d]
compress-object [109d]
build.sh [2d]
bream [695d]
bluse [0d]
bash-codegen [80d]
tryitout [6d]
tap-html [8d]
steno [270d]
saywhat [7d]
shell-p [5d]
```
