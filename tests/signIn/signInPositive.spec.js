import { test } from '../_fixtures/fixtures';

let user = {
  email: 'ydo1991@gmail.com',
  password: '123456',
};

test('Successful `Sign in` flow test', async ({ signInPage, homePage }) => {
  await signInPage.open();
  await signInPage.fillEmailField(user.email);
  await signInPage.fillPasswordField(user.password);
  await signInPage.clickSignInButton();
  await homePage.assertYourFeedTabIsVisible();
});
