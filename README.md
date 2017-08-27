# git-timesince

> ⏰ a simple extension of git that shows the time since the last commit

[![Npm Version](https://img.shields.io/npm/v/git-timesince.svg)](https://www.npmjs.com/package/git-timesince)
[![Build Status](https://travis-ci.org/gabrielcsapo/git-timesince.svg?branch=master)](https://travis-ci.org/gabrielcsapo/git-timesince)
[![Coverage Status](https://node-coverage-server.herokuapp.com/badge/github%2Ecom/gabrielcsapo/git-timesince.svg)](https://node-coverage-server.herokuapp.com/coverage/github%2Ecom/gabrielcsapo/git-timesince)
[![Dependency Status](https://david-dm.org/gabrielcsapo/git-timesince.svg)](https://david-dm.org/gabrielcsapo/git-timesince)
[![devDependency Status](https://david-dm.org/gabrielcsapo/git-timesince/dev-status.svg)](https://david-dm.org/gabrielcsapo/git-timesince#info=devDependencies)
[![npm](https://img.shields.io/npm/dt/git-timesince.svg)]()
[![npm](https://img.shields.io/npm/dm/git-timesince.svg)]()

## Installation

```bash
npm install git-timesince -g
```

## Usage

```bash
Usage: git-timesince [options]


Options:

  -V, --version             output the version number
  -r, --recursive           Recursively looks through directories, using the current working directory as the base
  -t, --timeFormat <range>  The time format that the output will be formatted in, [seconds, minutes, hours, days, weeks]
  -h, --help                output usage information
```

> This can also be used when installed globally as an extension of git

```bash
git timesince
```

If you want to use any options it can applied as such

```bash
git timesince -r
```

The default time format is days, but can also be; `seconds`, `minutes`, `hours`, `days`, `weeks`.

```bash
$ git timesince --timeFormat seconds
/git-timesince [11910s]
```
