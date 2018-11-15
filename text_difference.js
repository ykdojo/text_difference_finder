function textDiff(s1, s2) {
  let memo = [...Array(s1.length)].map(e => Array(s2.length));
  let tdResult = TD(s1, s2, 0, 0, memo);

  let s1Result = [];
  let s2Result = [];
  let i1 = 0;
  let i2 = 0;
  for (i = 0; i < tdResult.length; i++) {
    let commonChar = tdResult[i];

    i1Next = s1.indexOf(commonChar, i1);
    pushResult(s1Result, s1, i1, i1Next, 'deleted', commonChar);
    i1 = i1Next + 1;

    i2Next = s2.indexOf(commonChar, i2);
    pushResult(s2Result, s2, i2, i2Next, 'added', commonChar);
    i2 = i2Next + 1;
  }

  i1Next = s1.length;
  pushResult(s1Result, s1, i1, i1Next, 'deleted', '');

  i2Next = s2.length;
  pushResult(s2Result, s2, i2, i2Next, 'added', '');

  return {lca: tdResult,
          s1Result: s1Result.join(''),
          s2Result: s2Result.join('')};
}

function TD(s1, s2, i1, i2, memo) {
  if (s1.length == i1 || s2.length == i2 ) {
    return '';
  }

  if (memo[i1][i2] !== undefined) {
    return memo[i1][i2];
  }

  if (s1[i1] == s2[i2]) {
    memo[i1][i2] = s1[i1] + TD(s1, s2, i1 + 1, i2 + 1, memo);
    return memo[i1][i2];
  }

  let result;
  let resultA = TD(s1, s2, i1 + 1, i2, memo);
  let resultB = TD(s1, s2, i1, i2 + 1, memo);
  if(resultA.length >= resultB.length) {
    result = resultA;
  } else {
    result = resultB;
  }
  memo[i1][i2] = result;
  return memo[i1][i2];
}

function pushResult(resultArr, strToCompare, index,
                    indexNext, className, commonChar) {
  if (indexNext > index) {
    let changed = strToCompare.substring(index, indexNext);
    resultArr.push(`<span class='${className}'>${changed}</span>`);
  }
  resultArr.push(commonChar);
}
