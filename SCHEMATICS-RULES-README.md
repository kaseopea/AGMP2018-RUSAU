# Schematics rules

## Generate Store
`ng generate @ngrx/schematics:store State --root --module app.module.ts` - generate store for root app module.

## Generate Auth reducer
`ng generate @ngrx/schematics:reducer Auth --group` - generate Auth reducer

## Generate Auth actions
`ng generate @ngrx/schematics:action Auth --group` - generate Auth reducer

## Generate Auth effects
`ng generate @ngrx/schematics:effect Auth --module app.module.ts --group` - generate Auth effects