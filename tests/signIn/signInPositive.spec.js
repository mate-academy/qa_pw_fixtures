import { test } from '../_fixtures/fixtures';

let user;

test.beforeEach(async ({}) => {
  user = {
    email: 'didik_1234test@gmail.com',
    password: 'didik_1234test',
  };
});

test('Successful `Sign in` flow test', async ({ signInPage, homePage }) => {
  await signInPage.open();
  await signInPage.fillEmailField(user.email);
  await signInPage.fillPasswordField(user.password);
  await signInPage.clickSignInButton();

  await homePage.assertYourFeedTabIsVisible();
});
