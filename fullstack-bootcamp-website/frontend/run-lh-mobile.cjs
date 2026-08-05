/* Quick mobile-only Lighthouse runner: N runs, prints each + median.
   Usage: node run-lh-mobile.cjs [runs] [outputPath-for-median-run] */
const lighthouse = require('lighthouse/core/index.cjs');
const fs = require('fs');
const path = require('path');

const RUNS = parseInt(process.argv[2] || '3', 10);
const OUT = process.argv[3] || 'mobile-report-fresh.json';

const options = {
  logLevel: 'error',
  output: 'json',
  onlyCategories: ['performance'],
  formFactor: 'mobile',
  screenEmulation: { mobile: true, width: 390, height: 844, deviceScaleFactor: 3, disabled: false },
  throttling: {
    rttMs: 150, throughputKbps: 1638.4, cpuSlowdownMultiplier: 4,
    requestLatencyMs: 150, downloadThroughputKbps: 1638.4, uploadThroughputKbps: 675,
  },
};

(async () => {
  const results = [];
  for (let i = 0; i < RUNS; i++) {
    const r = await lighthouse('http://127.0.0.1:4174/', { ...options });
    const lhr = r.lhr;
    const perf = Math.round(lhr.categories.performance.score * 100);
    const fcp = lhr.audits['first-contentful-paint'].numericValue;
    const lcp = lhr.audits['largest-contentful-paint'].numericValue;
    const tbt = lhr.audits['total-blocking-time'].numericValue;
    console.log(`run ${i + 1}: perf=${perf} FCP=${Math.round(fcp)}ms LCP=${Math.round(lcp)}ms TBT=${Math.round(tbt)}ms`);
    results.push({ perf, fcp, lcp, report: r.report });
  }
  results.sort((a, b) => a.lcp - b.lcp);
  const med = results[Math.floor(results.length / 2)];
  fs.writeFileSync(path.join(__dirname, OUT), med.report);
  console.log(`\nmedian (by LCP): perf=${med.perf} FCP=${Math.round(med.fcp)}ms LCP=${Math.round(med.lcp)}ms → saved to ${OUT}`);
})().catch(e => { console.error(e); process.exit(1); });
