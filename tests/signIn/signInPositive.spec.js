import { test } from '../_fixtures/fixtures';

test('Successful `Sign in` flow test', async ({ signInPage, homePage }) => {
  const user = {
    email: 'test_new_user1@gmail.com',
    password: 'newpass123',
  };

  await signInPage.open();
  await signInPage.fillEmailField(user.email);
  await signInPage.fillPasswordField(user.password);
  await signInPage.clickSignInButton();

  await homePage.assertYourFeedTabIsVisible();
});
