# Test Utils
`data.json` contains the data that gets loaded into the test db every time
before tests are ran.

`users` needs the password hash on some users to test logins. The hashes are from
bcrypt at 12 rounds, so the auth tests will fail if PW_SALT_ROUNDS is anything
other than 12 when running the tests.
