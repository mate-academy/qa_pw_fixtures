# Practice task: Add fixtures for Conduit edit article tests

## Preparation:
1. Open the forked repo in VSCode.
2. Create a new branch: git checkout -b task_solution
3. Run the installation commands `npm ci` & `npx playwright install`.

## Main task:
1. Add all the edit article tests you have created in the previous homework.
2. Create the file `fixturesArticles.ts` under the `tests/_fixtures` folder.
3. Add test scope fixtures to the file:
- `createArticlePage` - for initializing the CreateArticlePage page.
- `viewArticlePage` - for initializing the ViewArticlePage page.
- `editArticlePage` - for initializing the EditArticlePage page.
- `articleWithoutTags` - for generating random article test data.
- `articleWithOneTag` - for generating random article test data.
- `articleWithTwoTags` - for generating random article test data.
3. Merge fixtures from `fixturesArticles.ts` to the `fixtures.ts` file.
4. Add a logger to the input parameters of the `generateNewArticleData.js` and the debug log `New article generated: ${article}`.
- use as an example `generateNewUserData.js`.
4. Update all the article tests to use fixtures.
5. Re-run all your tests and make sure they pass after the updates.
6. Change log level from `error` to `debug` in the `logger` fixture. Run the command `npx playwright test` and observe the logs reported. 
7. Change log level from `debug` to `info` in the `logger` fixture. Run the command `npx playwright test` and observe the logs reported. 
8. Change log level from `debug` to `warn` in the `logger` fixture. Run the command `npx playwright test` and observe the logs reported. 
9. Change log level from `warn` to `error` in the `logger` fixture. Run the command `npx playwright test` and observe the logs reported. 

## Task Reporting: 
1. Add and commit all your updates. 
2. Push the code to the origin.
3. Create PR for your changes. 
4. Fix all the suggestions from the Code review until PR is approved.  

