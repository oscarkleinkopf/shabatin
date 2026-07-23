/**
 * test-gematria-engine.js
 * Test suite for Shabateinu NBI Core Gematria Engine & Torah Concept Database
 */

const assert = require('assert');
const {
  HEBREW_GEMATRIA_MAP,
  calculateHebrewGematria,
  transliterateToHebrew,
  calculateInputGematria,
  TORAH_GEMATRIA_DB,
  findMatchingTorahConcepts
} = require('./gematria-engine.js');

let passedTests = 0;
let totalTests = 0;

function test(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`✓ PASS: ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`✗ FAIL: ${name}`);
    console.error(`  Error: ${err.message}`);
  }
}

console.log('=== Running Gematria Engine Tests ===\n');

// 1. Character map tests
test('HEBREW_GEMATRIA_MAP contains standard and final letter values', () => {
  assert.strictEqual(HEBREW_GEMATRIA_MAP['א'], 1);
  assert.strictEqual(HEBREW_GEMATRIA_MAP['ב'], 2);
  assert.strictEqual(HEBREW_GEMATRIA_MAP['י'], 10);
  assert.strictEqual(HEBREW_GEMATRIA_MAP['כ'], 20);
  assert.strictEqual(HEBREW_GEMATRIA_MAP['ך'], 20);
  assert.strictEqual(HEBREW_GEMATRIA_MAP['ל'], 30);
  assert.strictEqual(HEBREW_GEMATRIA_MAP['מ'], 40);
  assert.strictEqual(HEBREW_GEMATRIA_MAP['ם'], 40);
  assert.strictEqual(HEBREW_GEMATRIA_MAP['נ'], 50);
  assert.strictEqual(HEBREW_GEMATRIA_MAP['ן'], 50);
  assert.strictEqual(HEBREW_GEMATRIA_MAP['פ'], 80);
  assert.strictEqual(HEBREW_GEMATRIA_MAP['ף'], 80);
  assert.strictEqual(HEBREW_GEMATRIA_MAP['צ'], 90);
  assert.strictEqual(HEBREW_GEMATRIA_MAP['ץ'], 90);
  assert.strictEqual(HEBREW_GEMATRIA_MAP['ק'], 100);
  assert.strictEqual(HEBREW_GEMATRIA_MAP['ר'], 200);
  assert.strictEqual(HEBREW_GEMATRIA_MAP['ש'], 300);
  assert.strictEqual(HEBREW_GEMATRIA_MAP['ת'], 400);
});

// 2. Word gematria calculations
test('calculateHebrewGematria computes correct word sums', () => {
  assert.strictEqual(calculateHebrewGematria('חי'), 18);
  assert.strictEqual(calculateHebrewGematria('אהבה'), 13);
  assert.strictEqual(calculateHebrewGematria('שבת'), 702);
  assert.strictEqual(calculateHebrewGematria('אברהם'), 248);
  assert.strictEqual(calculateHebrewGematria('תורה'), 611);
  assert.strictEqual(calculateHebrewGematria('ישראל'), 541);
  assert.strictEqual(calculateHebrewGematria('שלום'), 376);
  assert.strictEqual(calculateHebrewGematria('אמת'), 441);
});

test('calculateHebrewGematria handles empty or invalid inputs gracefully', () => {
  assert.strictEqual(calculateHebrewGematria(''), 0);
  assert.strictEqual(calculateHebrewGematria(null), 0);
  assert.strictEqual(calculateHebrewGematria(undefined), 0);
  assert.strictEqual(calculateHebrewGematria(123), 0);
});

// 3. Phonetic Spanish-to-Hebrew transliteration
test('transliterateToHebrew maps biblical/historical names directly', () => {
  assert.strictEqual(transliterateToHebrew('Abraham'), 'אברהם');
  assert.strictEqual(transliterateToHebrew('David'), 'דוד');
  assert.strictEqual(transliterateToHebrew('Sara'), 'שרה');
  assert.strictEqual(transliterateToHebrew('Moises'), 'משה');
  assert.strictEqual(transliterateToHebrew('Shabat'), 'שבת');
  assert.strictEqual(transliterateToHebrew('Torah'), 'תורה');
});

test('transliterateToHebrew applies phonetic rules to standard Latin names', () => {
  assert.strictEqual(transliterateToHebrew('Lucas'), 'לוקס');
  assert.strictEqual(transliterateToHebrew(''), '');
  assert.strictEqual(transliterateToHebrew(null), '');
});

test('calculateInputGematria correctly handles Hebrew vs Latin inputs', () => {
  const hebrewResult = calculateInputGematria('שבת');
  assert.strictEqual(hebrewResult.hebrewStr, 'שבת');
  assert.strictEqual(hebrewResult.value, 702);
  assert.strictEqual(hebrewResult.isTransliterated, false);

  const latinResult = calculateInputGematria('Abraham');
  assert.strictEqual(latinResult.hebrewStr, 'אברהם');
  assert.strictEqual(latinResult.value, 248);
  assert.strictEqual(latinResult.isTransliterated, true);
});

// 4. Database internal Gematria consistency
test('TORAH_GEMATRIA_DB contains 32 items with valid structure and verified gematria', () => {
  assert.ok(Array.isArray(TORAH_GEMATRIA_DB));
  assert.strictEqual(TORAH_GEMATRIA_DB.length, 32);

  TORAH_GEMATRIA_DB.forEach((item, index) => {
    assert.ok(item.id, `Item at index ${index} missing id`);
    assert.ok(item.hebrew, `Item at index ${index} missing hebrew`);
    assert.ok(item.transliteration, `Item at index ${index} missing transliteration`);
    assert.ok(item.spanish, `Item at index ${index} missing spanish`);
    assert.ok(typeof item.value === 'number', `Item at index ${index} missing or invalid value`);
    assert.ok(item.category, `Item at index ${index} missing category`);
    assert.ok(item.meaning, `Item at index ${index} missing meaning`);

    const calculated = calculateHebrewGematria(item.hebrew);
    assert.strictEqual(
      item.value,
      calculated,
      `Gematria mismatch for concept '${item.id}' (${item.hebrew}): DB value=${item.value}, calculated=${calculated}`
    );
  });
});

// 5. Matching lookup function findMatchingTorahConcepts
test('findMatchingTorahConcepts returns matching items for target values', () => {
  const matches18 = findMatchingTorahConcepts(18);
  assert.strictEqual(matches18.length, 1);
  assert.strictEqual(matches18[0].id, 'chai');

  const matches702 = findMatchingTorahConcepts(702);
  assert.strictEqual(matches702.length, 1);
  assert.strictEqual(matches702[0].id, 'shabat');

  const noMatches = findMatchingTorahConcepts(9999);
  assert.deepStrictEqual(noMatches, []);

  assert.deepStrictEqual(findMatchingTorahConcepts(-5), []);
  assert.deepStrictEqual(findMatchingTorahConcepts('invalid'), []);
  assert.deepStrictEqual(findMatchingTorahConcepts(null), []);
});

console.log(`\n=== Test Results: ${passedTests}/${totalTests} Passed ===`);

if (passedTests === totalTests) {
  console.log('ALL TESTS PASSED SUCCESSFULLY!');
  process.exit(0);
} else {
  console.error('SOME TESTS FAILED!');
  process.exit(1);
}
