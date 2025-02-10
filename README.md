# Practice task: Add fixtures for Conduit edit article tests

## Preparation:
1. Open the forked repo in VSCode.
2. Create a new branch: git checkout -b added_article_test
3. Run the installation commands `npm ci` & `npx playwright install`.

## Main task:
1. Add all the edit article tests you have created in the previous home work. 
2. Create file `fixturesArticles.ts` under the `tests/_fixtures` folder.
3. Add test scope fixtures to the file:
- `createArticlePage` - for initializing CreateArticlePage page.
- `viewArticlePage` - for initializing ViewArticlePage page.
- `editArticlePage` - for initializing EditArticlePage page.
- `articleWithoutTags` - for generating random article test data.
- `articleWithOneTag` - for generating random article test data.
- `articleWithTwoTags` - for generating random article test data.
3. Merge fixtures from `fixturesArticles.ts` to the `fixtures.ts` file.
4. Add logger to the input parameters of the `generateNewArticleData.js` and the debug log `New article geenrated: ${article}`. 
- use as an example `generateNewUserData.js`.
4. Update all the article tests to use fixtures. 
5. Re-run all your tests and make sure they pass after the updates. 


## Task Reporting: 
1. Add and commit all your updates. 
2. Push the code to the origin.
3. Create PR for your changes. 
4. Fix all the suggestions from the Code review until PR is approved.  

