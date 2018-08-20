# Schematics rules

## Generate Store
`ng generate @ngrx/schematics:store State --root --module app.module.ts` - generate store for root app module.

## Auth
`ng generate @ngrx/schematics:reducer Auth --group` - generate Auth reducer

`ng generate @ngrx/schematics:action Auth --group` - generate Auth actions

`ng generate @ngrx/schematics:effect Auth --module app.module.ts --group` - generate Auth effects


## Courses
`ng generate @ngrx/schematics:reducer Courses --group` - generate Courses reducer

`ng generate @ngrx/schematics:action Courses --group` - generate Courses actions

`ng generate @ngrx/schematics:effect Courses --module app.module.ts --group` - generate Courses effects


## UI
`ng generate @ngrx/schematics:reducer UI --group` - generate UI reducer

`ng generate @ngrx/schematics:action UI --group` - generate UI actions
