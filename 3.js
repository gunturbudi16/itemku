/*
A Candidate Key is an attribute or a set of attributes that can uniquely identify a tuple of a relation in the relational database and satisfies the following two properties.

- Uniqueness: The relation does not have two distinct tuples (i.e. rows or records in common database language) with the same values for these attributes.
- Minimality: There should no subset of these attributes satisfy uniqueness, which means if we exclude one of these attributes, then uniqueness will be broken.

[Student number, Name, Major, Grade]

[100,”ryan”,”music”,2]
[200,”apeach”,”math”,2]
[300,”tube”,”computer”,3]
[400,”con”,”computer”,4]
[500,”muzi”,”music”,3]
[600,”apeach”,”music”,2]

In the above example, each student has a unique "student number".
Thus, the ["student number"] can be the candidate key of the relation.

Then, because there are students who use the same name ("apeach") for "name", "name" can not be a candidate key.

However, if you use ["name", "major"] together, all the tuples of the relation can be uniquely identified, so they can become candidate keys.

Of course, it is possible to uniquely identify all tuples in a relation using ["name", "major", "grade"], but it can not be a candidate key because it does not satisfy the minimum.

Therefore, the candidate key of the input above is ["student number"], ["name", "major"].

Find how many candidate keys are there for given array relation.
Limitations
- relation is a two-dimensional string array.
- The length of the relation column is 1 ~ 8, and each column indicates the attribute of the relation.
- The length of the row of relation is 1 ~ 20, and each row represents a tuple of relations.
- The length of all strings in relation is 1 ~ 8, and consists of only lowercase letters and numbers.
- All tuples of relation are uniquely identifiable (ie, there are no duplicate tuples).
 */

function solution(relation) {
  let answer = 0;
  let attrNum = relation[0].length;
  let combList = [];
  let keyList = [];
  for (let i = 1; i <= attrNum; i++) {
    comb(combList, [], 0, attrNum, i, 0);
  }
  for (let i = 0; i < combList.length; i++) {
    addKey(keyList, combList[i], relation);
  }
  //   console.log(keyList);
  answer += keyList.length;
  return answer;
}
function addKey(keyList, key, relation) {
  let isMin = true;
  for (let i = 0; i < keyList.length; i++) {
    let prevKey = keyList[i];
    for (let j = 0; j < key.length; j++) {
      prevKey = prevKey.filter((ele) => ele !== key[j]);
    }
    if (prevKey.length === 0) {
      isMin = false;
    }
  }
  if (keyList.length !== 0 && !isMin) {
    return;
  }
  let arr = [];
  let isUnique = true;
  for (let i = 0; i < relation.length; i++) {
    let findEle = arr.find((ele) => {
      let flag = true;
      for (let j = 0; j < key.length; j++) {
        if (ele[key[j]] !== relation[i][key[j]]) flag = false;
      }
      return flag;
    });
    if (findEle !== undefined) {
      isUnique = false;
    } else {
      arr.push(relation[i]);
    }
  }
  if (isUnique) {
    keyList.push(key);
  }
}
function comb(list, arr, idx, n, r, target) {
  if (r === 0) {
    list.push(Object.assign([], arr));
  } else if (target === n) {
    return;
  } else {
    arr[idx] = target;
    comb(list, arr, idx + 1, n, r - 1, target + 1);
    comb(list, arr, idx, n, r, target + 1);
  }
}
console.log(
  'Candidate keys are: ',
  solution([
    [100, 'ryan', 'music', 2],
    [200, 'apeach', 'math', 2],
    [300, 'tube', 'computer', 3],
    [400, 'con', 'computer', 4],
    [500, 'muzi', 'music', 3],
    [600, 'apeach', 'music', 2],
  ])
);
