/**
 * MYPRESENT.ME - Modern HUD & Bento Interactive Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initLiveClock();
  initThemeToggle();
  initMobileNav();
  initIntroDeck();
  initCriteriaSimulator();
  initPurposeExporter();
  initRadarInteractions();
});

/* ==========================================================================
   1. Live Time Display
   ========================================================================== */
function initLiveClock() {
  const clockEl = document.getElementById('live-time-display');
  if (!clockEl) return;

  function updateClock() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', {
      timeZone: 'Asia/Bangkok',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    clockEl.textContent = `BANGKOK ${timeStr} (UTC+7)`;
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/* ==========================================================================
   2. Theme Toggle (Dark / Light Mode)
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  const htmlEl = document.documentElement;
  
  const savedTheme = localStorage.getItem('mypresentme-theme') || 'dark';
  htmlEl.setAttribute('data-theme', savedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = htmlEl.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      htmlEl.setAttribute('data-theme', next);
      localStorage.setItem('mypresentme-theme', next);
    });
  }
}

/* ==========================================================================
   3. Mobile Navigation Toggle
   ========================================================================== */
function initMobileNav() {
  const toggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navItems = document.querySelectorAll('.nav-item');

  if (toggle && navMenu) {
    toggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }
}

/* ==========================================================================
   4. Self-Intro Deck (Interactive Stage Switcher)
   ========================================================================== */
const INTRO_PRESETS = {
  casual: {
    tag: 'สำหรับ: แนะนำตัวกับคนทั่วไป / เพื่อนใหม่',
    meta: 'อ่าน ~20 วินาที • 45 คำ',
    text: 'ผมเป็นคนที่สนใจเทคโนโลยีและการแก้ปัญหา ชอบเรียนรู้สิ่งใหม่ ๆ โดยเฉพาะด้านซอฟต์แวร์ คอมพิวเตอร์ และอุปกรณ์อิเล็กทรอนิกส์ เวลาตัดสินใจจะให้ความสำคัญกับข้อมูล ความคุ้มค่า และการใช้งานจริง นอกจากนี้ยังให้ความสำคัญกับครอบครัวและการพัฒนาตัวเองอยู่เสมอ',
    usecase: 'นำไปใช้ในช่อง About Me บนโซเชียลมีเดีย, การร่วมกิจกรรมกลุ่ม, หรือการพบปะพูดคุยทั่วไป'
  },
  professional: {
    tag: 'สำหรับ: การทำงาน / สมัครงาน / LinkedIn',
    meta: 'อ่าน ~25 วินาที • 52 คำ',
    text: 'ผมทำงานด้านการพัฒนาซอฟต์แวร์และระบบธุรกิจ มีความสนใจด้านเทคโนโลยี การออกแบบระบบ และการแก้ไขปัญหาทางเทคนิค ผมให้ความสำคัญกับการวิเคราะห์ปัญหาอย่างเป็นระบบ การพัฒนาทักษะอย่างต่อเนื่อง และการนำเทคโนโลยีมาช่วยเพิ่มประสิทธิภาพในการทำงาน',
    usecase: 'นำไปใช้ในหน้าโปรไฟล์ LinkedIn, สรุปประวัติย่อในเรซูเม่, หรือการแนะนำตัวในที่ทำงาน'
  },
  personality: {
    tag: 'สำหรับ: ทำความรู้จักตนเองเชิงลึก / Self-Assessment',
    meta: 'อ่าน ~30 วินาที • 60 คำ',
    text: 'ผมเป็นคนชอบคิดวิเคราะห์ ชอบตั้งคำถาม และไม่ค่อยตัดสินใจโดยไม่มีข้อมูลประกอบ ผมสนใจเรียนรู้สิ่งใหม่ ๆ และชอบหาวิธีแก้ปัญหาด้วยตัวเอง ให้ความสำคัญกับความคุ้มค่า ความรับผิดชอบ และคนในครอบครัว จุดที่พยายามพัฒนาตัวเองคือการจัดลำดับความสำคัญและตัดสินใจให้รวดเร็วขึ้นเมื่อมีข้อมูลเพียงพอ',
    usecase: 'นำไปใช้ในการประเมินตนเอง, สัมภาษณ์เชิงพฤติกรรม (Behavioral Interview) หรือการสะท้อนตัวตน'
  }
};

function initIntroDeck() {
  const chips = document.querySelectorAll('.deck-chip');
  const tagEl = document.getElementById('deck-scenario-tag');
  const metaEl = document.getElementById('deck-readtime');
  const paraEl = document.getElementById('deck-paragraph-display');
  const usecaseEl = document.getElementById('deck-usecase-display');
  const copyBtn = document.getElementById('deck-copy-btn');

  let currentKey = 'casual';

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const key = chip.getAttribute('data-deck');
      if (!INTRO_PRESETS[key]) return;

      currentKey = key;
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const data = INTRO_PRESETS[key];
      if (tagEl) tagEl.textContent = data.tag;
      if (metaEl) metaEl.textContent = data.meta;
      if (paraEl) paraEl.textContent = data.text;
      if (usecaseEl) usecaseEl.innerHTML = `<strong>บริบทที่เหมาะสม:</strong> ${data.usecase}`;
    });
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const textToCopy = paraEl ? paraEl.innerText : INTRO_PRESETS[currentKey].text;
      try {
        await navigator.clipboard.writeText(textToCopy);
        copyBtn.classList.add('copied');
        const textSpan = copyBtn.querySelector('.copy-text');
        if (textSpan) textSpan.textContent = 'คัดลอกเรียบร้อย!';
        showToast('คัดลอกบทแนะนำตัวลงคลิปบอร์ดแล้ว!');

        setTimeout(() => {
          copyBtn.classList.remove('copied');
          if (textSpan) textSpan.textContent = 'คัดลอกข้อความ';
        }, 2200);
      } catch (err) {
        showToast('ไม่สามารถคัดลอกได้อัตโนมัติ');
      }
    });
  }
}

/* ==========================================================================
   5. 3-Criteria Decision Machine Simulator
   ========================================================================== */
function initCriteriaSimulator() {
  const c1 = document.getElementById('crit-1');
  const c2 = document.getElementById('crit-2');
  const c3 = document.getElementById('crit-3');
  const passedCount = document.getElementById('passed-count');
  const decisionText = document.getElementById('decision-text');
  const decisionTip = document.getElementById('decision-tip');
  const hudContainer = document.getElementById('decision-hud');

  function updateDecision() {
    const checks = [c1.checked, c2.checked, c3.checked];
    const passed = checks.filter(Boolean).length;

    if (passedCount) passedCount.textContent = `${passed} / 3`;

    if (passed === 3) {
      if (decisionText) {
        decisionText.className = 'hud-big-result text-emerald';
        decisionText.innerHTML = '⚡ ตัดสินใจได้ทันที (EXECUTE NOW) • ข้อมูลเพียงพอแล้ว';
      }
      if (decisionTip) {
        decisionTip.textContent = 'ผ่านเกณฑ์หลักครบทั้ง 3 ข้อ ไม่ต้องเปรียบเทียบข้อมูลยิบย่อยเพิ่ม เพื่อประหยัดเวลาและไม่พลาดโอกาส';
      }
      if (hudContainer) {
        hudContainer.style.borderColor = 'rgba(16, 185, 129, 0.4)';
        hudContainer.style.boxShadow = '0 0 25px rgba(16, 185, 129, 0.2)';
      }
    } else if (passed === 2) {
      if (decisionText) {
        decisionText.className = 'hud-big-result text-amber';
        decisionText.innerHTML = '🔍 เกือบพร้อม (NEAR READY) • เช็กเกณฑ์ที่ขาดอีก 1 ข้อ';
      }
      if (decisionTip) {
        decisionTip.textContent = 'โฟกัสเฉพาะข้อมูลในเกณฑ์ที่ยังไม่ผ่านข้อเดียวเท่านั้น หลีกเลี่ยงการเปิดประเด็นใหม่';
      }
      if (hudContainer) {
        hudContainer.style.borderColor = 'rgba(245, 158, 11, 0.4)';
        hudContainer.style.boxShadow = '0 0 25px rgba(245, 158, 11, 0.15)';
      }
    } else {
      if (decisionText) {
        decisionText.className = 'hud-big-result text-rose';
        decisionText.innerHTML = '🛑 ยังไม่พร้อมตัดสินใจ (GATHER KEY DATA)';
      }
      if (decisionTip) {
        decisionTip.textContent = 'ตัวเลือกยังไม่ผ่านเกณฑ์พื้นฐานหลัก ควรหาข้อมูลให้ตรงจุดก่อนพิจารณา';
      }
      if (hudContainer) {
        hudContainer.style.borderColor = 'rgba(244, 63, 94, 0.4)';
        hudContainer.style.boxShadow = '0 0 25px rgba(244, 63, 94, 0.15)';
      }
    }
  }

  [c1, c2, c3].forEach(el => {
    if (el) el.addEventListener('change', updateDecision);
  });

  updateDecision();
}

/* ==========================================================================
   6. AI & Purpose Exporter Console
   ========================================================================== */
const EXPORT_DATA = {
  'ai-context': {
    title: 'AI_SYSTEM_INSTRUCTIONS.MD',
    content: `# [User Persona & Cognitive Context Profile]

## Core Identity & Philosophy
- Role: Software & Business System Developer | Tech Analyst | Maker
- Core Mantra: "เป็นคนสายวิเคราะห์ที่ชอบเทคโนโลยี เน้นการแก้ปัญหาจริง ให้ความสำคัญกับความคุ้มค่า และพยายามดูแลทั้งงานและครอบครัวให้ดีที่สุด"

## Technical Capabilities
- Web & Frontend: Vue.js, Nuxt
- Backend & Architecture: C# .NET, RESTful APIs
- Databases: SQL Server, MySQL (Query Optimization & Schema Design)
- Enterprise Systems: SAP ERP Integration & Business Processes
- Maker & Hardware DIY: BMS Battery Pack Assembly, 3D Printing, EV Telematics

## Cognitive DNA & Thinking Style
1. Data-Driven & Root-Cause Mindset (95%): ต้องการทราบเหตุผล ข้อดี-ข้อเสีย และการประยุกต์ใช้จริงก่อนตัดสินใจ
2. Value & TCO Focus (90%): คำนวณความคุ้มค่าตลอดอายุการใช้งาน (Total Cost of Ownership)
3. Practical Maker (92%): เน้นการแก้ปัญหาที่ลงมือทำได้จริงทั้งเขียนโค้ดและอุปกรณ์ฮาร์ดแวร์
4. Structured Step-by-Step (88%): สื่อสารตรงประเด็น เป็นขั้นตอนชัดเจน
5. Family & Safety-First (96%): ให้ความสำคัญสูงสุดกับความปลอดภัยของคนในครอบครัวและการป้องกันปัญหาล่วงหน้า

## Decision Framework (Counter Analysis Paralysis)
- "3-Key Criteria Rule": กำหนดเกณฑ์หลัก 3 ข้อ เมื่อข้อมูลผ่านเกณฑ์ครบ จะตัดสินใจทันทีโดยไม่เสียเวลาค้นข้อมูลซ้ำซ้อน

## Communication Rules for AI:
- ตอบตรงประเด็น เป็นขั้นตอน (Step-by-step) มีเหตุผลและข้อมูลรองรับ
- เปรียบเทียบตัวเลือกโดยชี้แจงข้อดี-ข้อเสีย และความคุ้มค่าจริง
- มุ่งเน้นวิธีแก้ปัญหาที่ปฏิบัติได้จริง (Actionable Solutions)`
  },

  'career': {
    title: 'CAREER_PROFILE_LINKEDIN.MD',
    content: `# Professional Summary | Software & Business System Engineer

นักพัฒนาซอฟต์แวร์และระบบธุรกิจผู้มุ่งเน้นการสร้างผลลัพธ์ที่ใช้งานได้จริง เชี่ยวชาญการออกแบบสถาปัตยกรรมระบบที่เสถียร รองรับงานระดับองค์กร และเชื่อมโยงเทคโนโลยีสมัยใหม่เข้ากับกระบวนการธุรกิจ

## Core Competencies
- Frontend & Web Applications: Vue.js, Nuxt (Reactive UI & Dashboards)
- Backend & Microservices: C# .NET, RESTful APIs, High-throughput Services
- Data Management: SQL Server, MySQL (Schema Design, Query Tuning)
- Enterprise Integration: SAP ERP System Workflows & Data Pipelines
- Problem-Solving: Root-Cause Investigation & Technical Optimization

## Professional Value Proposition
ผสมผสานทักษะการคิดวิเคราะห์เชิงระบบเข้ากับการลงมือทำจริง พัฒนาระบบที่ช่วยเพิ่มประสิทธิภาพการทำงานและคุ้มค่าต่อการลงทุนระยะยาว`
  },

  'growth': {
    title: 'SELF_DEVELOPMENT_PLAN.MD',
    content: `# Self-Assessment & Continuous Growth Strategy

## จุดแข็งหลัก (Core Strengths)
- ช่างสงสัยและวิเคราะห์เป็นระบบ (Systematic Analytical Thinking)
- มุ่งเน้นผลลัพธ์และการลงมือปฏิบัติจริง (Practical Execution)
- วินัยการเงินและการประเมินความคุ้มค่า (TCO Maximizer)
- ความรับผิดชอบและดูแลคนรอบข้างอย่างมั่นคง (Reliable Protector)

## ประเด็นที่ต้องระวัง (Watch-out)
- Analysis Paralysis: การค้นหาและเปรียบเทียบข้อมูลมากเกินไปอาจทำให้ชะลอการตัดสินใจ

## แนวทางปฏิบัติเพื่อพัฒนาศักยภาพ (Action Items)
1. บังคับใช้ "กฎเกณฑ์ตัดสินใจ 3 ข้อ (3-Key Criteria Rule)" กับทุกเรื่องสำคัญ
2. กำหนด Timebox ชัดเจนสำหรับการรวบรวมข้อมูล
3. สรุปผลลัพธ์และยอมรับความไม่สมบูรณ์แบบเพื่อเน้นความคล่องตัว (Speed over Perfection)`
  },

  'personal': {
    title: 'PERSONAL_ABOUT_ME.MD',
    content: `# แนะนำตัวเกี่ยวกับฉัน (Personal Profile)

สวัสดีครับ! ผมเป็นคนที่ชอบเทคโนโลยีและการแก้ปัญหา หลงใหลในคอมพิวเตอร์ อุปกรณ์อิเล็กทรอนิกส์ รถยนต์ไฟฟ้า และงานประดิษฐ์ DIY เช่น การประกอบแบตเตอรี่และการพิมพ์ 3 มิติ

เวลาตัดสินใจเรื่องใดก็ตาม ผมจะให้ความสำคัญกับข้อมูล ความคุ้มค่า และการใช้งานจริงเป็นหลัก

ในชีวิตประจำวัน ผมให้ความสำคัญสูงสุดกับครอบครัว การดูแลลูก การบริหารจัดการบ้าน และการเลือกสิ่งที่ดีที่สุดภายใต้ความคุ้มค่าและความปลอดภัยสูงสุดครับ`
  }
};

function initPurposeExporter() {
  const tiles = document.querySelectorAll('.purpose-hud-tile');
  const titleEl = document.getElementById('export-header-title');
  const codeEl = document.getElementById('export-code-display');
  const copyBtn = document.getElementById('export-copy-btn');

  let activeKey = 'ai-context';

  function renderExport(key) {
    const item = EXPORT_DATA[key];
    if (!item) return;
    activeKey = key;

    if (titleEl) titleEl.textContent = item.title;
    if (codeEl) codeEl.textContent = item.content;
  }

  tiles.forEach(tile => {
    tile.addEventListener('click', () => {
      const key = tile.getAttribute('data-export');
      tiles.forEach(t => t.classList.remove('active'));
      tile.classList.add('active');
      renderExport(key);
    });
  });

  renderExport(activeKey);

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const textToCopy = EXPORT_DATA[activeKey].content;
      try {
        await navigator.clipboard.writeText(textToCopy);
        copyBtn.classList.add('copied');
        const textSpan = copyBtn.querySelector('span');
        if (textSpan) textSpan.textContent = 'คัดลอกเรียบร้อย!';
        showToast('คัดลอก Markdown ทั้งหมดแล้ว!');

        setTimeout(() => {
          copyBtn.classList.remove('copied');
          if (textSpan) textSpan.textContent = 'คัดลอก Markdown ทั้งหมด';
        }, 2200);
      } catch (err) {
        showToast('ไม่สามารถคัดลอกได้อัตโนมัติ');
      }
    });
  }
}

/* ==========================================================================
   7. Radar Point Interaction Tooltip
   ========================================================================== */
function initRadarInteractions() {
  const points = document.querySelectorAll('.radar-point');
  points.forEach(point => {
    point.addEventListener('mouseenter', () => {
      const trait = point.getAttribute('data-trait');
      if (trait) showToast(trait);
    });
  });
}

/* ==========================================================================
   Universal Toast Function
   ========================================================================== */
function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toast-text');
  if (!toast) return;

  if (toastText) toastText.textContent = msg;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}
