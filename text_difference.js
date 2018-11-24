function textDiff(s1, s2, splitByWords) {
  let lcs;
  if (splitByWords) {
    let reg = /([ .,])/g;
    split1 = s1.split(reg);
    split2 = s2.split(reg);
    lcs = LCS(split1, split2);
  } else {
    lcs = LCS(s1, s2);
  }

  let i;
  let i1 = 0; let i1Next = 0;
  let i2 = 0; let i2Next = 0;
  let result1 = [];
  let result2 = [];

  for (i = 0; i < lcs.length; i++) {
    i1Next = s1.indexOf(lcs[i], i1);
    i2Next = s2.indexOf(lcs[i], i2);
    pushResult(result1, s1.substring(i1, i1Next), 'deleted');
    pushResult(result2, s2.substring(i2, i2Next), 'added');
    pushResult(result1, lcs[i]);
    pushResult(result2, lcs[i]);
    i1 = i1Next + 1;
    i2 = i2Next + 1;
  }
  pushResult(result1, s1.substring(i1), 'deleted');
  pushResult(result2, s2.substring(i2), 'added');

  return {lcs: lcs,
          deleted: result1.join(''),
          added: result2.join('')};
}

function pushResult(resultArray, stringToPush, className) {
  if (!stringToPush) {
    return;
  }
  if (className) {
    resultArray.push(`<span class="${className}">${stringToPush}</span>`);
  } else {
    resultArray.push(stringToPush);
  }
}

function LCS(s1, s2) {
  let memo = [...Array(s1.length)].map(e => Array(s2.length));
  return helper(s1, s2, 0, 0, memo);
}

function helper(s1, s2, i1, i2, memo) {
  if (i1 == s1.length || i2 == s2.length) {
    return '';
  }

  if (memo[i1][i2] !== undefined) {
    return memo[i1][i2];
  }

  if (s1[i1] == s2[i2]) {
    memo[i1][i2] = s1[i1] + helper(s1, s2, i1 + 1, i2 + 1, memo);
    return memo[i1][i2];
  }

  let result;
  let resultA = helper(s1, s2, i1 + 1, i2, memo);
  let resultB = helper(s1, s2, i1, i2 + 1, memo);
  if (resultA.length > resultB.length) {
    result = resultA;
  } else {
    result = resultB;
  }
  memo[i1][i2] = result;
  return memo[i1][i2];
}
