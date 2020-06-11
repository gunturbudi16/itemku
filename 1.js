function solution(record) {
  let answer = [];
  let userList = new Map();
  let length = record.length;

  for (let i = 0; i < length; i++) {
    let arr = record[i].split(' ');

    if (!/Leave/i.test(arr[0])) userList.set(arr[1], arr[2]);
  }

  for (let i = 0; i < length; i++) {
    let arr = record[i].split(' ');

    if (/Enter/i.test(record[i])) answer[i] = `${userList.get(arr[1])} came in`;
    else if (/Leave/i.test(record[i]))
      answer[i] = `${userList.get(arr[1])} has left`;
  }

  return answer;
}
var chat = [
  'Enter uid1234 Muzi',
  'Enter uid4567 Prodo',
  'Enter uid5678 Guntur',
  'Leave uid1234',
  'Enter uid1234 Prodo',
  'Change uid4567 Ryan',
];
console.log(solution(chat));
