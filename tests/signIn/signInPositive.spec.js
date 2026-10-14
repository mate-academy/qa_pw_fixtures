import { test } from '../_fixtures/fixtures';

let user;

test.beforeEach(async ({}) => {
  user = {
    email: 'ivan_test20254@gmail.com',
    password: 'qwerty23456!',
  };
});

test('Successful `Sign in` flow test', async ({ signInPage, homePage }) => {
  await signInPage.open();
  await signInPage.fillEmailField(user.email);
  await signInPage.fillPasswordField(user.password);
  await signInPage.clickSignInButton();

  await homePage.assertYourFeedTabIsVisible();
});
