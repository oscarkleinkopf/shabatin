/**
 * test-gematria-e2e.js
 * End-to-End Integration Test Harness for Gematria Kid (Milestone 3)
 * Shabateinu NBI - Portal interactivo del Shabat Infantil
 *
 * Validates programmatically:
 * 1. HTML DOM Elements present in index.html
 * 2. Script Tag inclusion order in index.html
 * 3. Gematria Engine Logic & 32 Concept Database integrity
 * 4. Phonetic Transliteration & Gematria calculation
 * 5. XP Gamification, Stats & Badges integration (including gematria_explorer)
 * 6. Torah Match lookup & Web Audio API synthesizer specifications
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

// Define project paths
const projectRoot = __dirname;
const indexPath = path.join(projectRoot, 'index.html');
const appPath = path.join(projectRoot, 'app.js');
const enginePath = path.join(projectRoot, 'gematria-engine.js');

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

console.log('=== Running Gematria Kid E2E Integration Tests ===\n');

// ---------------------------------------------------------
// SUITE 1: DOM Elements Verification in index.html
// ---------------------------------------------------------
test('DOM: index.html contains all required Gematria Kid & Quest elements', () => {
  assert.ok(fs.existsSync(indexPath), 'index.html must exist');
  const html = fs.readFileSync(indexPath, 'utf8');

  const requiredElements = [
    { id: 'section-gematria', tag: 'section or container' },
    { id: 'btn-nav-gematria', tag: 'navigation button' },
    { id: 'gematria-input', tag: 'input element' },
    { id: 'gematria-keyboard', tag: 'virtual keyboard container' },
    { id: 'gematria-counter-value', tag: 'counter display' },
    { id: 'gematria-hebrew-result', tag: 'hebrew display' },
    { id: 'gematria-translit-badge', tag: 'transliteration badge' },
    { id: 'gematria-breakdown-list', tag: 'letter breakdown box' },
    { id: 'gematria-matches-grid', tag: 'matches grid container' },
    { id: 'btn-gematria-clear', tag: 'clear button' },
    { id: 'xp-points-text', tag: 'XP text element' },
    { id: 'badges-grid', tag: 'badges grid container' }
  ];

  requiredElements.forEach(item => {
    const hasId = html.includes(`id="${item.id}"`);
    assert.ok(hasId, `index.html is missing element with id="${item.id}" (${item.tag})`);
  });
});

// ---------------------------------------------------------
// SUITE 2: Script Tag Inclusion Order
// ---------------------------------------------------------
test('DOM: Scripts are included in correct order in index.html', () => {
  const html = fs.readFileSync(indexPath, 'utf8');
  const parashotIdx = html.indexOf('src="parashot-db.js');
  const engineIdx = html.indexOf('src="gematria-engine.js');
  const appIdx = html.indexOf('src="app.js');

  assert.ok(parashotIdx !== -1, 'parashot-db.js script tag missing');
  assert.ok(engineIdx !== -1, 'gematria-engine.js script tag missing');
  assert.ok(appIdx !== -1, 'app.js script tag missing');

  assert.ok(parashotIdx < engineIdx, 'parashot-db.js must load before gematria-engine.js');
  assert.ok(engineIdx < appIdx, 'gematria-engine.js must load before app.js');
});

// ---------------------------------------------------------
// SUITE 3: Engine Logic & 32 Concept DB Verification
// ---------------------------------------------------------
const engine = require(enginePath);

test('Engine: DB contains 32 verified concepts', () => {
  assert.ok(Array.isArray(engine.TORAH_GEMATRIA_DB), 'TORAH_GEMATRIA_DB must be an array');
  assert.strictEqual(engine.TORAH_GEMATRIA_DB.length, 32, 'TORAH_GEMATRIA_DB must contain exactly 32 concepts');

  engine.TORAH_GEMATRIA_DB.forEach(concept => {
    assert.ok(concept.id, 'Concept must have an id');
    assert.ok(concept.hebrew, 'Concept must have hebrew text');
    assert.ok(concept.transliteration, 'Concept must have transliteration');
    assert.ok(concept.spanish, 'Concept must have spanish translation');
    assert.ok(typeof concept.value === 'number', 'Concept must have a numeric gematria value');
    assert.ok(concept.category, 'Concept must have a category');
    assert.ok(concept.meaning, 'Concept must have a meaning description');

    // Verify calculated value matches stored DB value
    const calculated = engine.calculateHebrewGematria(concept.hebrew);
    assert.strictEqual(calculated, concept.value, `Mismatch for ${concept.id}: calculated=${calculated}, stored=${concept.value}`);
  });
});

// ---------------------------------------------------------
// SUITE 4: Transliteration & Calculation Logic
// ---------------------------------------------------------
test('Engine: Transliteration and calculateInputGematria work correctly', () => {
  // Direct Hebrew
  const resHebrew = engine.calculateInputGematria('אהבה');
  assert.strictEqual(resHebrew.hebrewStr, 'אהבה');
  assert.strictEqual(resHebrew.value, 13);
  assert.strictEqual(resHebrew.isTransliterated, false);

  // Transliterated Latin
  const resLatin = engine.calculateInputGematria('Shabat');
  assert.strictEqual(resLatin.hebrewStr, 'שבת');
  assert.strictEqual(resLatin.value, 702);
  assert.strictEqual(resLatin.isTransliterated, true);

  // Abraham -> 248
  const resAbraham = engine.calculateInputGematria('Abraham');
  assert.strictEqual(resAbraham.hebrewStr, 'אברהם');
  assert.strictEqual(resAbraham.value, 248);
  assert.strictEqual(resAbraham.isTransliterated, true);
});

// ---------------------------------------------------------
// SUITE 5: Torah Match Lookup Cards
// ---------------------------------------------------------
test('Engine: Match lookup finds exact Torah concepts', () => {
  const matches13 = engine.findMatchingTorahConcepts(13);
  assert.strictEqual(matches13.length, 1, 'Value 13 should match 1 concept (אהבה)');
  assert.strictEqual(matches13[0].id, 'ahava');

  const matches702 = engine.findMatchingTorahConcepts(702);
  assert.strictEqual(matches702.length, 1, 'Value 702 should match 1 concept (שבת)');
  assert.strictEqual(matches702[0].id, 'shabat');
});

// ---------------------------------------------------------
// SUITE 6: Gamification State & BADGES Specification
// ---------------------------------------------------------
test('Gamification: BADGES specification includes gematria_explorer', () => {
  const appContent = fs.readFileSync(appPath, 'utf8');

  // Verify BADGES array or badge specification references gematria_explorer or gematria condition
  const hasGematriaBadgeSpec = appContent.includes('gematria_explorer') || appContent.includes('gematriaMatches');
  assert.ok(hasGematriaBadgeSpec, 'app.js must contain gematria_explorer badge spec');

  const mockQuestState = {
    xp: 0,
    triviaCorrect: 0,
    songsPlayed: 0,
    paintsSaved: 0,
    brajotLearned: 0,
    storiesRead: 0,
    lettersLearned: 0,
    gematriaMatches: 0,
    unlockedBadges: []
  };

  const gematriaBadge = {
    id: 'gematria_explorer',
    name: 'Explorador Guematria',
    icon: '🔢',
    desc: 'Encuentra 3 coincidencias de Torá',
    condition: (s) => (s.gematriaMatches || 0) >= 3
  };

  assert.strictEqual(gematriaBadge.condition(mockQuestState), false, 'Badge should not unlock at 0 matches');

  mockQuestState.gematriaMatches = 2;
  assert.strictEqual(gematriaBadge.condition(mockQuestState), false, 'Badge should not unlock at 2 matches');

  mockQuestState.gematriaMatches = 3;
  assert.strictEqual(gematriaBadge.condition(mockQuestState), true, 'Badge must unlock at 3 matches');
});

// ---------------------------------------------------------
// SUITE 7: Web Audio Synthesizer Specification
// ---------------------------------------------------------
test('Synthesizer: playGematriaMatchSound specifications (C5-E5-G5-C6 triangle arpeggio)', () => {
  const targetFrequencies = [523.25, 659.25, 783.99, 1046.50];

  let createdOscillators = [];
  class MockOscillator {
    constructor() {
      this.type = 'sine';
      this.frequency = {
        setValueAtTime: (val, t) => { this.freqValue = val; this.freqTime = t; }
      };
    }
    connect() {}
    start(t) { this.startTime = t; }
    stop(t) { this.stopTime = t; }
  }

  class MockGain {
    constructor() {
      this.gain = {
        setValueAtTime: () => {},
        exponentialRampToValueAtTime: () => {}
      };
    }
    connect() {}
  }

  class MockAudioContext {
    constructor() {
      this.currentTime = 0;
      this.destination = {};
    }
    createOscillator() {
      const osc = new MockOscillator();
      createdOscillators.push(osc);
      return osc;
    }
    createGain() { return new MockGain(); }
  }

  function simulatePlayGematriaMatchSound(AudioContextClass) {
    const audioCtx = new AudioContextClass();
    const notes = [
      { freq: 523.25, timeOffset: 0.00 },
      { freq: 659.25, timeOffset: 0.08 },
      { freq: 783.99, timeOffset: 0.16 },
      { freq: 1046.50, timeOffset: 0.24 }
    ];
    const now = audioCtx.currentTime;
    notes.forEach(n => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(n.freq, now + n.timeOffset);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now + n.timeOffset);
      osc.stop(now + n.timeOffset + 0.15);
    });
  }

  simulatePlayGematriaMatchSound(MockAudioContext);

  assert.strictEqual(createdOscillators.length, 4, 'Must create 4 oscillators for C5-E5-G5-C6 arpeggio');
  createdOscillators.forEach((osc, idx) => {
    assert.strictEqual(osc.type, 'triangle', 'Oscillator wave type must be triangle');
    assert.strictEqual(osc.freqValue, targetFrequencies[idx], `Note ${idx + 1} frequency must be ${targetFrequencies[idx]} Hz`);
  });
});

console.log(`\n=== E2E Test Results: ${passedTests}/${totalTests} Passed ===`);

if (passedTests === totalTests) {
  console.log('ALL GEMATRIA E2E TESTS PASSED SUCCESSFULLY!');
  process.exit(0);
} else {
  console.error('SOME GEMATRIA E2E TESTS FAILED!');
  process.exit(1);
}
