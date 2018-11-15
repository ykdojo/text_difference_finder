function textDiff(s1, s2, splitByChar) {
  let memo = [...Array(s1.length)].map(e => Array(s2.length));
  let s1Split;
  let s2Split;
  if (splitByChar) {
    s1Split = s1;
    s2Split = s2;
  } else {
    s1SplitBySpace = s1.split(' ');
    s1Split = Array(s1SplitBySpace.length * 2 - 1).fill(" ");
    for (let i = 0; i < s1SplitBySpace.length; i++) {
      s1Split[i * 2] = s1SplitBySpace[i];
    }

    s2SplitBySpace = s2.split(' ');
    s2Split = Array(s2SplitBySpace.length * 2 - 1).fill(" ");
    for (let i = 0; i < s2SplitBySpace.length; i++) {
      s2Split[i * 2] = s2SplitBySpace[i];
    }
  }
  let tdResult = LCS(s1Split, s2Split, 0, 0, memo);

  let s1Result = [];
  let s2Result = [];
  let i1 = 0;
  let i2 = 0;
  for (i = 0; i < tdResult.length; i++) {
    let commonStr = tdResult[i];

    i1Next = s1.indexOf(commonStr, i1);
    pushResult(s1Result, s1, i1, i1Next, 'deleted', commonStr);
    i1 = i1Next + 1;

    i2Next = s2.indexOf(commonStr, i2);
    pushResult(s2Result, s2, i2, i2Next, 'added', commonStr);
    i2 = i2Next + 1;
  }

  i1Next = s1.length;
  pushResult(s1Result, s1, i1, i1Next, 'deleted', '');

  i2Next = s2.length;
  pushResult(s2Result, s2, i2, i2Next, 'added', '');

  return {lcs: tdResult,
          s1Result: s1Result.join(''),
          s2Result: s2Result.join('')};
}

function LCS(s1, s2, i1, i2, memo) {
  if (s1.length == i1 || s2.length == i2 ) {
    return '';
  }

  if (memo[i1][i2] !== undefined) {
    return memo[i1][i2];
  }

  if (s1[i1] == s2[i2]) {
    memo[i1][i2] = s1[i1] + LCS(s1, s2, i1 + 1, i2 + 1, memo);
    return memo[i1][i2];
  }

  let result;
  let resultA = LCS(s1, s2, i1 + 1, i2, memo);
  let resultB = LCS(s1, s2, i1, i2 + 1, memo);
  if(resultA.length >= resultB.length) {
    result = resultA;
  } else {
    result = resultB;
  }
  memo[i1][i2] = result;
  return memo[i1][i2];
}

function pushResult(resultArr, strToCompare, index,
                    indexNext, className, commonStr) {
  if (indexNext > index) {
    let changed = strToCompare.substring(index, indexNext);
    resultArr.push(`<span class='${className}'>${changed}</span>`);
  }
  resultArr.push(commonStr);
}
