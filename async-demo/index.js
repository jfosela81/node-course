/**
 * Created by jorgefosela on 30/4/20.
 */

console.log('Before');
/*
getUser( 1 )
  .then( user => getRepositories( user.gitHubUsername ) )
  .then( repositories => getCommits( repositories[0] ) )
  .then( commits => console.log(commits) )
  .catch( err => console.log('Error', err.message) );
*/
displayCommits();
console.log('After');

async function displayCommits() {

  const user = await getUser(1);
  const repositories = await getRepositories(user.gitHubUsername);
  const commits = await getCommits(repositories[0]);
  console.log(commits);

}

function getUser( id ) {

  return new Promise( (resolve, reject) => {

    setTimeout( () => {
      console.log('Accessing DB...');
      resolve( { id: id, gitHubUsername: 'jfosela81' } );
    }, 2000 );

  });

}

function getRepositories( username ) {

  return new Promise( (resolve, reject) => {
    setTimeout( () => {
      console.log('Getting repositories...');
      resolve( ['repo1', 'repo2', 'repo3'] );
    }, 2000 );
  });

}

function getCommits( repo ) {

  return new Promise( (resolve, reject) => {
    setTimeout( () => {
      resolve( ['commit1', 'commit2', 'commit3'] );
    }, 2000);
  });

}