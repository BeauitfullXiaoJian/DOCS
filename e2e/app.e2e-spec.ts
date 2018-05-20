import { AppPage } from './app.po';

describe('api-docs App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display project name in navigation', () => {
    page.navigateTo();
    expect(page.getNavText()).toEqual('api-docs');
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getWelcomeText()).toEqual('Welcome to IgniteUI for Angular!');
  });
});
