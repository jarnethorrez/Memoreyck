import gql from 'graphql-tag';
import ApolloClient from 'apollo-boost'

class Scan {

    constructor(addScore, scanComplete, alreadyPlayedGame, gameNumber) {
        this.addScore = addScore;
        this.scanComplete = scanComplete;
        this.alreadyPlayedGame = alreadyPlayedGame;
        this.gameNumber = gameNumber;
        this.client = new ApolloClient({
            uri: 'https://server-xkjgqzhxom.now.sh/',
        })
    }

    checkUser(id) {
        this.client.query({
        variables: {userId: id},
        query: gql `
            query($userId: String!) {
                getUser(userId: $userId) {
                    userId
                    score
                    gamesPlayed
                }
            }`
    })
    .then(result => {      
      if (result.data.getUser !== null) {   
          if (result.data.getUser.gamesPlayed[this.gameNumber-1] === true) {
            this.alreadyPlayedGame();
          } else {
              this.updateScore(result.data.getUser.userId, result.data.getUser.score, result.data.getUser.gamesPlayed);
          }
      } else {
        this.addUser(id)
      }
    })
    .catch(errors => console.log(errors));
    }

    addUser(id) {
        this.client.mutate({
            variables: {
                userId: id,
                score: 0,
                gamesPlayed: [false, false, false, false],
            },
            mutation: gql `
            mutation($userId: String!, $score: Int!, $gamesPlayed: [Boolean!]!) {
                addUser(userId: $userId, score: $score, gamesPlayed: $gamesPlayed) {
                    userId
                    score
                    gamesPlayed
            }
        }
        `
        })
        .then(result => this.updateScore(result.data.addUser.userId, result.data.addUser.score, result.data.addUser.gamesPlayed))
        .catch(error => console.log(error));
    }

    updateScore(id, prevScore, prevGamesPlayed) {
        this.newScore = prevScore + parseInt(this.addScore);
        prevGamesPlayed[this.gameNumber-1] = true;
        

        this.client.mutate({
            variables: {
                userId: id,
                score: this.newScore,
                gamesPlayed: prevGamesPlayed,
            },
            mutation: gql `
            mutation($userId: String!, $score: Int!, $gamesPlayed: [Boolean!]!) {
                updateScore(userId: $userId, score: $score, gamesPlayed: $gamesPlayed) {
                    userId
                    score
                    gamesPlayed
                }
            }`
        })
        .then(result => console.log(result))
        .then(this.scanComplete())
        .catch(error => console.log(error));
    }

}

export default Scan;
