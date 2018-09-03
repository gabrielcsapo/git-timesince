# 2.0.0 (09/02/2018)

- no longer uses sync functions
  - no more blocking io, (0.326s -> 0.266s) 81% increase in speed
- removes callbacks

# 1.0.2 (01/11/2018)

- updates turtler

# 1.0.1 (12/27/2017)

- uses turtler instead of cli-table2
- fixes bug where running git-timesince in a directory would cause it to fail

# 1.0.0 (12/16/2017)

- adds a sort option `-s, --sort [direction]` by default the sort direction is desc but can also be set to asc
- fixes the help command to not fail
- fixes the version and help command to exit the process
- changes the return from the `Timesince` function, which used to return a array of two values, but now will return with three values `['repo', 'diff in milliseconds', 'human readable diff']`
- output will take more use of space

# 0.3.1 (12/11/2017)

- removes commander, parsing args the old fashion way
- automatically uses the terminal size to determine how many columns should be rendered, instead of an arbitrary count of 4

# 0.3.0 (11/27/2017)

- fixes finding recursive directory structures
- reformats output to be more tabular

# 0.2.0 (11/26/2017)

- updates interface for internal timesince functionality
- updates dependencies

# 0.1.0 (09/26/2017)

- fixes default to return with ms suffix
- drops support for node@4
- adds option to change the cwd

# 0.0.1 (08/26/2017)

- basic usage
- can search repositories nested one deep
