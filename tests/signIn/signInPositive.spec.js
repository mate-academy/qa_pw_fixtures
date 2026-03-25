import { test } from '../_fixtures/fixtures';

test('Successful `Sign in` flow test', async ({
  signUpPage,
  signInPage,
  homePage,
  user,
  page,
}) => {
  await signUpPage.open();
  await signUpPage.submitSignUpForm(user);
  await homePage.assertYourFeedTabIsVisible();

  await signInPage.open();
  await signInPage.fillEmailField(user.email);
  await signInPage.fillPasswordField(user.password);
  await signInPage.clickSignInButton();
  await homePage.assertYourFeedTabIsVisible();
});
