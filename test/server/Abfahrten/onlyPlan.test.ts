/* eslint no-sync: 0 */
import { mockFchg, mockLageplan, mockSearch } from './mockHelper';
import { noncdAxios } from 'server/Abfahrten/helper';
import fakeTimers from '@sinonjs/fake-timers';
import fs from 'fs';
import path from 'path';
import Timetable from 'server/Abfahrten/Timetable';

jest.mock('node-cache');

describe('onlyPlan', () => {
  let clock: ReturnType<typeof fakeTimers.install>;

  beforeAll(() => {
    clock = fakeTimers.install({
      shouldAdvanceTime: true,
      now: 1552824000000,
    });
  });
  afterAll(() => {
    clock.uninstall();
  });
  const baseFixturePath = 'fixtures/plan';
  const fixtures = fs.readdirSync(path.resolve(__dirname, baseFixturePath));

  fixtures.forEach(file => {
    it(file, async () => {
      const inXml = fs.readFileSync(
        path.resolve(__dirname, baseFixturePath, file),
        'utf8'
      );

      mockLageplan();
      mockFchg();
      mockSearch(3, ['', inXml]);
      const timetable = new Timetable(
        'test',
        'test',
        {
          lookahead: 120,
          lookbehind: 60,
        },
        noncdAxios
      );

      await expect(timetable.start()).resolves.toMatchSnapshot();
    });
  });
});
