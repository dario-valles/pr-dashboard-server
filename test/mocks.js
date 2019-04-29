const fakeUser = {
  _id: '1234',
  loginName: 'konstantin',
  displayName: 'Konstantin',
  email: 'k@gmail.com',
  picture: 'konstantin.jpg',
  webUrl: 'https://www.konstantin.com'
};

const repository = {
  name: 'dashboard',
  fullName: 'PR Dashboard',
  private: true,
  webUrl: 'https://github.com/fake/fake',
  description: 'This is the fake dashboard repo',
  hookEnabled: true,
  color: 'red',
  language: 'English',
  populate: () => {
    return {
      ...repository
    };
  }
};

module.exports = { fakeUser, repository };
