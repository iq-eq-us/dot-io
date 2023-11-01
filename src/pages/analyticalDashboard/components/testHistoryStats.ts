/* import store, { useStoreState, useStoreActions } from '../../../store/store';
import { toInteger } from 'lodash';
// Simply a test file to make sure other logic is working.

function testHistoryTest() {
  console.log('Inside test dataset.');

  const sessionHistoryTest = [
    {
      accuracy: 5,
      consistency: 25,
      testDate: new Date("2/1/22"),
    },
    {
      accuracy: 10,
      consistency: 30,
      testDate: new Date("2/3/22"),
    },
    {
      accuracy: 15,
      consistency: 35,
      testDate: new Date("2/5/22"),
    },
    {
      accuracy: 20,
      consistency: 40,
      testDate: new Date("2/8/22"),
    },
  ];

  const testHistory = [
    ['consistency'],
    ...sessionHistoryTest.map((session) => [session.consistency]),
  ]
    .map((session) => session.join(','))
    .join('\n');

  // debugging
  console.log(testHistory);
  console.log(
    'trying to store current number consistency:' +
      sessionHistoryTest[0].consistency,
  );
  console.log(
    store
      .getActions()
      .addConsistency(
        toInteger(sessionHistoryTest[0].consistency),
      ),
  );
  console.log('stored current cons');
  console.log(
    'Getting stored cons mastered is: ' +
      store.getState().currConsistency,
  );
}

export default testHistoryTest;
 */
