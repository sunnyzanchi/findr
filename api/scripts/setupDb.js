const ora = require('ora');
const r = require('rethinkdbdash')({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
});

const pause = time => new Promise(resolve => setTimeout(resolve, time));

const spinner = ora('Setting up db').start();
r
  .dbList()
  .run()
  .then(dbList => dbList.includes('scavenge'))
  .then(async includes => {
    if (includes) {
      spinner.text = 'Database `scavenge` already exists, dropping!';
      // Give the user a change to panic kill if they didn't realize this was destructive
      await pause(2500);
      return r.dbDrop('scavenge').run();
    }
  })
  .then(_ => {
    spinner.text = 'Creating database `scavenge`';
    return r.dbCreate('scavenge').run();
  })
  .then(_ => Promise.all([
    r.db('scavenge').tableCreate('games').run(),
    r.db('scavenge').tableCreate('lists').run(),
    r.db('scavenge').tableCreate('sessions').run(),
    r.db('scavenge').tableCreate('users').run(),
  ]))
  .then(_ => spinner.succeed('Database setup successful'))
  .then(_ => r.getPoolMaster().drain())
  .catch(err => {
    spinner.fail('Unable to set up db, see error below');
    r.getPoolMaster().drain();
    throw err;
  });
