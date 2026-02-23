/**
 * 🗳️ Panchayat Election System - Capstone
 *
 * Village ki panchayat election ka system bana! Yeh CAPSTONE challenge hai
 * jisme saare function concepts ek saath use honge:
 * closures, callbacks, HOF, factory, recursion, pure functions.
 *
 * Functions:
 *
 *   1. createElection(candidates)
 *      - CLOSURE: private state (votes object, registered voters set)
 *      - candidates: array of { id, name, party }
 *      - Returns object with methods:
 *
 *      registerVoter(voter)
 *        - voter: { id, name, age }
 *        - Add to private registered set. Return true.
 *        - Agar already registered or voter invalid, return false.
 *        - Agar age < 18, return false.
 *
 *      castVote(voterId, candidateId, onSuccess, onError)
 *        - CALLBACKS: call onSuccess or onError based on result
 *        - Validate: voter registered? candidate exists? already voted?
 *        - If valid: record vote, call onSuccess({ voterId, candidateId })
 *        - If invalid: call onError("reason string")
 *        - Return the callback's return value
 *
 *      getResults(sortFn)
 *        - HOF: takes optional sort comparator function
 *        - Returns array of { id, name, party, votes: count }
 *        - If sortFn provided, sort results using it
 *        - Default (no sortFn): sort by votes descending
 *
 *      getWinner()
 *        - Returns candidate object with most votes
 *        - If tie, return first candidate among tied ones
 *        - If no votes cast, return null
 *
 *   2. createVoteValidator(rules)
 *      - FACTORY: returns a validation function
 *      - rules: { minAge: 18, requiredFields: ["id", "name", "age"] }
 *      - Returned function takes a voter object and returns { valid, reason }
 *
 *   3. countVotesInRegions(regionTree)
 *      - RECURSION: count total votes in nested region structure
 *      - regionTree: { name, votes: number, subRegions: [...] }
 *      - Sum votes from this region + all subRegions (recursively)
 *      - Agar regionTree null/invalid, return 0
 *
 *   4. tallyPure(currentTally, candidateId)
 *      - PURE FUNCTION: returns NEW tally object with incremented count
 *      - currentTally: { "cand1": 5, "cand2": 3, ... }
 *      - Return new object where candidateId count is incremented by 1
 *      - MUST NOT modify currentTally
 *      - If candidateId not in tally, add it with count 1
 *
 * @example
 *   const election = createElection([
 *     { id: "C1", name: "Sarpanch Ram", party: "Janata" },
 *     { id: "C2", name: "Pradhan Sita", party: "Lok" }
 *   ]);
 *   election.registerVoter({ id: "V1", name: "Mohan", age: 25 });
 *   election.castVote("V1", "C1", r => "voted!", e => "error: " + e);
 *   // => "voted!"
 */
export function createElection(candidates) {
  let votes = [];
  let registeredVoters = [];

  const registerVoter = (voter) => {
    if (
      !voter ||
      !Object.hasOwn(voter, "id") ||
      !Object.hasOwn(voter, "name") ||
      !Object.hasOwn(voter, "age") ||
      voter.age < 18
    ) {
      return false;
    }
    const isVoterAlreadyPresent = registeredVoters.some(
      (regVoter) => regVoter.id === voter.id,
    );

    if (isVoterAlreadyPresent) {
      return false;
    }
    registeredVoters.push(voter);
    return true;
  };

  const castVote = (voterId, candidateId, onSuccess, onError) => {
    const isVoterRegistered = registeredVoters.some(
      (voter) => voter.id === voterId,
    );
    const isCandidateExist = candidates.some((cand) => cand.id === candidateId);
    const isAlreadyVoted = votes.some((vote) => vote.voterId === voterId);

    if (!isVoterRegistered || !isCandidateExist || isAlreadyVoted) {
      return onError("You can't case vote.");
    } else {
      votes.push({ voterId, candidateId });
      return onSuccess({ voterId, candidateId });
    }
  };

  const getResults = (sortFn) => {
    let results = [];

    for (const candidate of candidates) {
      let voteCount = 0;
      for (const { voterId, candidateId } of votes) {
        if (candidateId === candidate.id) {
          voteCount++;
        }
      }
      results.push({
        id: candidate.id,
        name: candidate.name,
        party: candidate.party,
        votes: voteCount,
      });
    }

    if (sortFn) {
      results.sort(sortFn);
    } else {
      results.sort((resultA, resultB) => resultB.votes - resultA.votes);
    }

    return results;
  };

  const getWinner = () => {
    if (votes.length === 0) {
      return null;
    }
    const results = getResults();
    const winnerResult = results.reduce(
      (agg, result) => {
        if (result.votes > agg.maxVoteCount) {
          agg.win = result;
          agg.maxVoteCount = result.votes;
        }

        return agg;
      },
      { win: null, maxVoteCount: 0 },
    );

    const winner = candidates.find(
      (candidate) => candidate.id === winnerResult.win.id,
    );

    return winner;
  };

  return {
    registerVoter,
    castVote,
    getResults,
    getWinner,
  };
}

export function createVoteValidator(rules) {
  return (voter) => {
    let isValid = true;
    let reason = "";

    if (voter.age < rules.minAge) {
      isValid = false;
    }

    for (const field of rules.requiredFields) {
      if (!Object.hasOwn(voter, field)) {
        isValid = false;
        reason = `Field: ${field} not present.`;
      }
    }

    return {
      valid: isValid,
      reason: reason,
    };
  };
}

export function countVotesInRegions(regionTree) {
  if (!regionTree || typeof regionTree !== "object") {
    return 0;
  }

  let totalVotes = 0;

  if (!Object.hasOwn(regionTree, "subRegions")) {
    return regionTree.votes;
  }

  totalVotes += regionTree.votes;

  for (const subTree of regionTree.subRegions) {
    totalVotes += countVotesInRegions(subTree);
  }

  return totalVotes;
}

export function tallyPure(currentTally, candidateId) {
  let newObj = { ...currentTally };

  if (!Object.hasOwn(newObj, candidateId)) {
    newObj[candidateId] = 1;
  } else {
    newObj[candidateId] += 1;
  }

  return newObj;
}
