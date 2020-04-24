module.exports = {
  games: [
    {
      created: new Date(),
      createdBy: '111',
      id: 'g111',
      name: 'TestGame1',
      plays: [],
      status: 'PREGAME',
      teams: [
        {
          color: '#F99',
          id: 't111',
          name: 'TestTeam1',
          players: [],
        },
      ],
    },
  ],
  users: [
    {
      id: '111',
      email: 'a@a.com',
      password: '$2a$12$qbsqTknkqPjNaND87GKjjOok21kRmIFemtYlCwC54vm3.tE5ldTjO',
    },
    {
      id: '222',
      email: 'b@example.com',
      password: '$2a$12$odAW7l28nSFCnDEj0Dr1geelNVbyJX4Hj0mlnrCZOSZCaFaOje3LK',
    },
    {
      email: 'c@example.com',
      id: '333',
    },
    {
      email: 'd@example.com',
      id: '444',
    },
    {
      email: 'e@example.com',
      id: '555',
    },
  ],
}
