import { AngularTeamsOrfeusPage } from './app.po';

describe('angular-teams-orfeus App', () => {
  let page: AngularTeamsOrfeusPage;

  beforeEach(() => {
    page = new AngularTeamsOrfeusPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
