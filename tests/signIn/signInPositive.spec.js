import { test } from '../_fixtures/fixtures';

let user;

test.beforeEach(async ({}) => {
  user = {
    email: 'testtgg1@gmail.com',
    password: 'test1234',
  };
});

test('Successful `Sign in` flow test', async ({ signInPage, homePage }) => {
  await signInPage.open();
  await signInPage.fillEmailField(user.email);
  await signInPage.fillPasswordField(user.password);
  await signInPage.clickSignInButton();

  await homePage.assertYourFeedTabIsVisible();
});
