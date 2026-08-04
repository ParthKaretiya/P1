const lighthouse = require('lighthouse/core/index.cjs');
const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

async function findChrome() {
  const candidates = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    process.env.LOCALAPPDATA + '\\Google\\Chrome\\Application\\chrome.exe',
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  // Try to find via where.exe
  try {
    const result = spawnSync('where.exe', ['chrome'], { encoding: 'utf8' });
    if (result.status === 0) {
      const found = result.stdout.split('\r\n')[0].trim();
      if (found) return found;
    }
  } catch (e) {}
  return null;
}

async function runAudit(formFactor, outputPath) {
  const chromePath = await findChrome();
  if (!chromePath) {
    throw new Error('Chrome not found on system');
  }

  const options = {
    logLevel: 'warn',
    output: 'json',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    chromeFlags: ['--headless=new', '--disable-gpu', '--no-sandbox'],
    chromePath: chromePath,
    formFactor: formFactor,
    screenEmulation: formFactor === 'mobile' ? {
      mobile: true,
      width: 390,
      height: 844,
      deviceScaleFactor: 3,
      disabled: false
    } : {
      mobile: false,
      width: 1350,
      height: 940,
      deviceScaleFactor: 1,
      disabled: false
    },
    throttling: formFactor === 'mobile' ? {
      rttMs: 150,
      throughputKbps: 1638.4,
      cpuSlowdownMultiplier: 4,
      requestLatencyMs: 150,
      downloadThroughputKbps: 1638.4,
      uploadThroughputKbps: 675,
    } : {
      rttMs: 40,
      throughputKbps: 10240,
      cpuSlowdownMultiplier: 1,
      requestLatencyMs: 40,
      downloadThroughputKbps: 10240,
      uploadThroughputKbps: 1024,
    },
  };

  console.log(`Running ${formFactor} audit...`);
  const runnerResult = await lighthouse('http://127.0.0.1:4174/', options);
  const reportJson = typeof runnerResult.report === 'string'
    ? runnerResult.report
    : JSON.stringify(runnerResult.report);

  fs.writeFileSync(path.join(__dirname, outputPath), reportJson);

  const lhr = runnerResult.lhr;
  console.log('\n' + '='.repeat(50));
  console.log(`${formFactor.toUpperCase()} AUDIT RESULTS`);
  console.log('='.repeat(50));
  console.log(`Performance:      ${Math.round(lhr.categories.performance.score * 100)}`);
  console.log(`Accessibility:    ${Math.round(lhr.categories.accessibility.score * 100)}`);
  console.log(`Best Practices:   ${Math.round(lhr.categories['best-practices'].score * 100)}`);
  console.log(`SEO:              ${Math.round(lhr.categories.seo.score * 100)}`);

  const metricIds = ['first-contentful-paint', 'largest-contentful-paint', 'total-blocking-time', 'cumulative-layout-shift', 'speed-index', 'interactive'];
  console.log('\n── Metrics ──');
  for (const id of metricIds) {
    const audit = lhr.audits[id];
    if (audit && audit.scoreDisplayMode !== 'notApplicable') {
      console.log(`  ${audit.title}: ${audit.displayValue} (score: ${Math.round((audit.score ?? 0) * 100)})`);
    }
  }

  console.log('\n── Opportunities ──');
  const oppAudits = Object.values(lhr.audits).filter(a =>
    a.details && a.details.type === 'opportunity' && a.details.overallSavingsMs > 50
  );
  for (const o of oppAudits) {
    console.log(`  • ${o.title}: ~${o.details.overallSavingsMs}ms savings (${Math.round((o.details.overallSavingsBytes||0)/1024)}KB)`);
  }

  console.log('\n── Failed A11y Audits ──');
  const a11yFailed = Object.values(lhr.audits).filter(a =>
    a.score !== null && a.score !== undefined && a.score < 1 && a.scoreDisplayMode === 'binary'
  );
  for (const a of a11yFailed.slice(0, 10)) {
    console.log(`  ✗ ${a.title}`);
  }

  return lhr;
}

(async () => {
  try {
    await runAudit('mobile', 'mobile-report-fresh.json');
    console.log('\n');
    await runAudit('desktop', 'desktop-report-fresh.json');
    console.log('\nDone! Reports saved to mobile-report-fresh.json and desktop-report-fresh.json');
  } catch(e) {
    console.error('Error:', e.message);
    console.error(e.stack);
    process.exit(1);
  }
})();
