import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';
import { HomePage } from '../../src/ui/pages/HomePage';

test('Successful `Sign in` flow test', async ({ page, browser, user }) => {
  await signUpUser(page, user);

  // Новий, повністю ізольований контекст — те саме, що Incognito-вікно
  const context = await browser.newContext();
  const freshPage = await context.newPage();

  const signInPage = new SignInPage(freshPage);
  const homePage = new HomePage(freshPage);

  await signInPage.open();
  // Бекенд зберігає email у нижньому регістрі при реєстрації,
  // але не приводить його до нижнього регістру при вході,
  // тому тут теж використовуємо toLowerCase(), інакше вхід не пройде
  await signInPage.fillEmailField(user.email.toLowerCase());
  await signInPage.fillPasswordField(user.password);
  await signInPage.clickSignInButton();
  await homePage.assertYourFeedTabIsVisible();

  await context.close();
});