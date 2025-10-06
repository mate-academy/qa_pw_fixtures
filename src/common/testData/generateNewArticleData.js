/**
 * Generates new article test data and logs it.
 * @param {import('pino').Logger} logger
 * @returns {{ title: string, description: string, body: string, tags: string[] }}
 */
export function generateNewArticleData(logger) {
  const article = {
    title: faker.lorem.words(3),
    description: faker.lorem.sentence(),
    body: faker.lorem.paragraphs(2),
    tags: [faker.word.noun(), faker.word.noun()],
  };

  logger.debug(`New article generated: ${article}`);
  return article;
}
