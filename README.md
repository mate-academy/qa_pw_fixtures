# Add Fixtures for Conduit Edit Article Tests

## Preparation

1. Open the forked repo in VSCode.
2. Create a new branch by running `git checkout -b task_solution`.
3. Run the installation commands: `npm ci` and `npx playwright install`.

## Task

1. Add all the edit article tests you have created in the previous homework.
2. Create the `fixturesArticles.ts` file under the `tests/_fixtures` folder.
3. Add test scope fixtures to the file:
    - `createArticlePage` to initialize the `CreateArticlePage` page
    - `viewArticlePage` to initialize the `ViewArticlePage` page
    - `editArticlePage` to initialize the `EditArticlePage` page
    - `articleWithoutTags` to generate random article test data
    - `articleWithOneTag` to generate random article test data
    - `articleWithTwoTags` to generate random article test data
4. Merge fixtures from the `fixturesArticles.ts` to the `fixtures.ts` file.
5. Add a logger to the input parameters of the `generateNewArticleData.js` and the debug log `New article generated: ${article}`. Use the `generateNewUserData.js` file as an example.
6. Update all the article tests to use fixtures.
7. Re-run all your tests and make sure they pass after the updates.
8. Change the log level from `error` to `debug` in the `logger` fixture. Run the `npx playwright test` command and observe the logs reported. 
9. Change the log level from `debug` to `info` in the `logger` fixture. Run the `npx playwright test` command and observe the logs reported. 
10. Change the log level from `debug` to `warn` in the `logger` fixture. Run the `npx playwright test` command and observe the logs reported. 
11. Change the log level from `warn` to `error` in the `logger` fixture. Run the `npx playwright test` command and observe the logs reported. 

## Task Reporting

1. Add and commit all your updates. 
2. Push the code to the origin.
3. Create PR for your changes. 
4. Fix all the suggestions from the code review until PR is approved.  
