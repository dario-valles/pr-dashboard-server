const fakeUser = {
  _id: '1234',
  loginName: 'konstantin',
  displayName: 'Konstantin',
  email: 'k@gmail.com',
  picture: 'konstantin.jpg',
  webUrl: 'https://www.konstantin.com'
};

const fakePReq = {
  closed_at: null,
  user: 'me',
  closed_at: '29.04.2019',
  merged_at: '29.04.2019',
  created_at: '29.04.2019',
  updated_at: '29.04.2019',
  action: 'merge',
  number: 2,
  webUrl: 'www.myurl.com',
  state: 'closed',
  title: 'Test Pull Request',
  review: 'Done',
  comment: 'Good',
  comments: 'Better',
  repository: 'https://github.com/gibsoncream/myrepo',
  seen: 'yesss',
  populate: function() {
    let all = {...fakePReq,
      name: 'me',
      fullName: 'you',
      private: true,
      description: 'gnais'
    }
    return all
  },
  sort: function() {
    return {...fakePReq}
  }
}


module.exports = { fakeUser, fakePReq };
