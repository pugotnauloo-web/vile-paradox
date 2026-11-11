/** VILE PARADOX — edit the arrays below to update profiles and gallery content. */
const members = [
  {
    name:'Noelle',
    full:'Noelle Francis',
    role:'Lead vocalist / Electric violin',
    number:'01',
    initial:'N',
    hue:'#642d3d',
    photo:'assets/portraits/noelle.webp',
    photos:[
      'assets/portraits/noelle.webp',
      'assets/portraits/noelle.webp.png'
    ],
    description:'The magnetic frontwoman. Sharp humor, golden-hazel eyes, a fearless stage presence, and an electric violin that can cut straight through the noise.',
    note:'THE VOICE / THE SPARK'
  },
  {
    name:'Iori',
    full:'Iori Tetsurou',
    role:'Keys / Second vocals / Lyrics',
    number:'02',
    initial:'I',
    hue:'#433365',
    photo:'assets/portraits/iori.webp.png',
    photos:[
      'assets/portraits/iori.webp.png',
      'assets/portraits/iori-2.webp.png'
    ],
    description:'Whimsical, observant and endlessly inventive. Iori layers hauntingly soft vocals, atmospheric keys and intricately personal lyrics into the heart of the band.',
    note:'THE GHOST NOTE / THE WORDS'
  },
  {
    name:'Scarle',
    full:'Scarle Avila',
    role:'Guitar',
    number:'03',
    initial:'S',
    hue:'#59323c',
    photo:'assets/portraits/scarle.webp.png',
    photos:[
      'assets/portraits/scarle.webp.png',
      'assets/portraits/scarle-2.webp.png'
    ],
    description:'An exacting guitarist with a warm heart, a fierce work ethic and the unofficial job of keeping everyone else from burning the place down.',
    note:'THE RIFF / THE ANCHOR'
  },
  {
    name:'Maeve',
    full:'Maeve Healy',
    role:'Drums',
    number:'04',
    initial:'M',
    hue:'#293747',
    photo:'assets/portraits/maeve.webp.png',
    photos:[
      'assets/portraits/maeve.webp.png',
      'assets/portraits/maeve-2.webp.png'
    ],
    description:'Almost unnervingly composed. Her playing is precise and powerful; her humor is dry enough to get lost between the beats.',
    note:'THE PULSE / THE STORM'
  },
  {
    name:'Xolani',
    full:'Xolani Sinclair',
    role:'Bass guitar',
    number:'05',
    initial:'X',
    hue:'#5e3c33',
    photo:'assets/portraits/xolani.webp.png',
    photos:[
      'assets/portraits/xolani.webp.png',
      'assets/portraits/xolani-2.webp.png'
    ],
    description:'Bold, unpredictable and impossible to ignore. Xolani brings magnetic, playful energy and a restless bassline to the stage.',
    note:'THE LOW END / THE WILDCARD'
  }
];

const manager = {
  name:'Devon',
  full:'Devon Schorling',
  role:'Manager',
  number:'MGT',
  initial:'D',
  hue:'#3c3b42',
  photo:'assets/portraits/devon.webp',
  photos:[
    'assets/portraits/devonn.webp.png',
    'assets/portraits/devonn-2.webp.png'
  ],
  description:'The one steering the chaos without trying to be in the spotlight. Devon handles the band’s world — strategy, venues, deals and the occasional crisis. Not a performing member.',
  note:'THE STRATEGY / THE STEADY HAND'
};

// Replace an image path with your own image (JPG, PNG, or WebP) to customize the gallery.
const gallery = [
  { title:'BLUE HOUR', category:'live', image:'assets/portraits/blue.png', alt:'Blue hour live performance' },
  { title:'INNER FREQUENCIES', category:'artwork', image:'assets/portraits/staticinourminds.webp', alt:'Abstract red frequency artwork' },
  { title:'BEFORE THE NOISE', category:'backstage', image:'assets/portraits/837e9631-1f90-4058-b970-d72c418ce35c.png', alt:'assets/portraits/837e9631-1f90-4058-b970-d72c418ce35c.png' },
  { title:'AFTERIMAGE', category:'live', image:'assets/portraits/red.png', alt:'Red-lit live performance' },
  { title:'PURPLE STATIC', category:'artwork', image:'assets/portraits/COaQz7L - Imgur.png', alt:'Passets/portraits/COaQz7L - Imgur.png' },
  { title:'THE LAST ENCORE', category:'backstage', image:'assets/portraits/95aa97b5-9955-4431-be52-814d90df62d3.png', alt:'assets/portraits/95aa97b5-9955-4431-be52-814d90df62d3.png' }
];

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => [...document.querySelectorAll(sel)];
const membersGrid = $('#members-grid');
const memberDialog = $('#member-dialog');
const galleryDialog = $('#gallery-dialog');

function portraitHtml(item) {
  return `<div class="member-art" data-initial="${item.initial}" style="--card-light:${item.hue}"><img src="${item.photo}" alt="Portrait of ${item.full}" loading="lazy" onerror="this.remove()"></div>`;
}

membersGrid.innerHTML = members.map(person => `
  <button class="member-card" type="button" data-member="${person.name.toLowerCase()}" aria-label="Learn more about ${person.full}">
    ${portraitHtml(person)}
    <span class="member-card-tag">V/P — MEMBER</span><span class="member-number">${person.number} / 05</span>
    <div class="member-copy"><span class="member-arrow" aria-hidden="true">↗</span><h3>${person.name.toUpperCase()}</h3><p>${person.role.toUpperCase()}</p></div>
  </button>`).join('');

let activeProfilePhotos = [];
let activeProfileIndex = 0;

function updateProfilePhoto() {
  const image = $('#profile-photo');
  const counter = $('#profile-photo-count');

  if (!image || !counter || !activeProfilePhotos.length) return;

  image.style.opacity = '0';
  image.src = activeProfilePhotos[activeProfileIndex];
  image.alt = 'Member portrait';

  counter.textContent =
    `${String(activeProfileIndex + 1).padStart(2, '0')} / ${String(activeProfilePhotos.length).padStart(2, '0')}`;

  const showArrows = activeProfilePhotos.length > 1;

  $('#profile-prev').hidden = !showArrows;
  $('#profile-next').hidden = !showArrows;
  counter.hidden = !showArrows;
}

function stepProfilePhoto(direction) {
  if (activeProfilePhotos.length < 2) return;

  activeProfileIndex =
    (activeProfileIndex + direction + activeProfilePhotos.length)
    % activeProfilePhotos.length;

  updateProfilePhoto();
}

function openProfile(person) {
  const picture = $('#dialog-picture');

  picture.style.background =
    `radial-gradient(circle at 50% 28%, ${person.hue}, #101014 80%)`;

  activeProfilePhotos = person.photos || [person.photo];
  activeProfileIndex = 0;

  picture.innerHTML = `
    <span class="profile-initial" aria-hidden="true">
      ${person.initial}
    </span>

    <img
      id="profile-photo"
      src=""
      alt="Portrait of ${person.full}"
      onload="this.style.opacity='1'"
      onerror="this.style.opacity='0'"
    >

    <button
      class="profile-nav profile-prev"
      id="profile-prev"
      type="button"
      data-profile-step="-1"
      aria-label="Previous photo"
    >‹</button>

    <span
      class="profile-count"
      id="profile-photo-count"
      aria-live="polite"
    ></span>

    <button
      class="profile-nav profile-next"
      id="profile-next"
      type="button"
      data-profile-step="1"
      aria-label="Next photo"
    >›</button>
  `;

  updateProfilePhoto();

  $('#dialog-overline').textContent =
    `${person.number} / VILE PARADOX PERSONNEL`;

  $('#dialog-name').textContent = person.name.toUpperCase();
  $('#dialog-role').textContent = person.role.toUpperCase();
  $('#dialog-description').textContent = person.description;

  $('#dialog-fact').textContent =
    `${person.full.toUpperCase()} // ${person.note}`;

  memberDialog.showModal();
  document.body.classList.add('modal-open');
}

$('#dialog-picture').addEventListener('click', (e) => {
  const arrow = e.target.closest('[data-profile-step]');
  if (!arrow) return;

  stepProfilePhoto(Number(arrow.dataset.profileStep));
});

membersGrid.addEventListener('click', (e) => {
  const card = e.target.closest('[data-member]');
  if (!card) return;
  const person = members.find(m => m.name.toLowerCase() === card.dataset.member);
  if (person) openProfile(person);
});
$('#manager-action').addEventListener('click', () => openProfile(manager));

const galleryGrid = $('#gallery-grid');
let currentFilter = 'all';
let visibleGallery = gallery.map((_, i) => i);
let currentGalleryIndex = 0;
function renderGallery() {
  visibleGallery = gallery.map((item, index) => ({...item,index})).filter(item => currentFilter === 'all' || item.category === currentFilter).map(item => item.index);
  galleryGrid.innerHTML = visibleGallery.map((galleryIndex) => {
    const item = gallery[galleryIndex];
    return `<button class="gallery-item" type="button" data-gallery="${galleryIndex}" aria-label="View ${item.title}">
      <img loading="lazy" src="${item.image}" alt="${item.alt}">
      <span class="gallery-item-meta"><span><span class="gallery-item-cat">${item.category.toUpperCase()} / VISUAL ARCHIVE</span><span class="gallery-item-title">${item.title}</span></span><span class="gallery-item-arrow" aria-hidden="true">↗</span></span>
    </button>`;
  }).join('');
}
renderGallery();
$$('.filter').forEach(button => button.addEventListener('click', () => {
  currentFilter = button.dataset.filter;
  $$('.filter').forEach(b => { const active=b===button; b.classList.toggle('active',active); b.setAttribute('aria-pressed',String(active)); });
  renderGallery();
}));
function showGallery(index) {
  const item = gallery[index];
  currentGalleryIndex = index;
  $('#lightbox-image').src = item.image;
  $('#lightbox-image').alt = item.alt;
  $('#lightbox-title').textContent = item.title;
  $('#lightbox-count').textContent = `${String(visibleGallery.indexOf(index)+1).padStart(2,'0')} / ${String(visibleGallery.length).padStart(2,'0')}  —  ${item.category.toUpperCase()}`;
}
galleryGrid.addEventListener('click', e => {
  const item = e.target.closest('[data-gallery]'); if (!item) return;
  showGallery(Number(item.dataset.gallery));
  galleryDialog.showModal(); document.body.classList.add('modal-open');
});
function stepGallery(direction) {
  const current = visibleGallery.indexOf(currentGalleryIndex);
  showGallery(visibleGallery[(current + direction + visibleGallery.length) % visibleGallery.length]);
}
$('#gallery-prev').addEventListener('click', () => stepGallery(-1));
$('#gallery-next').addEventListener('click', () => stepGallery(1));

$$('[data-close-dialog]').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));
[galleryDialog,memberDialog].forEach(dialog => {
  dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
  dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
});
window.addEventListener('keydown', e => {
  if (galleryDialog.open && e.key === 'ArrowRight') stepGallery(1);
  if (galleryDialog.open && e.key === 'ArrowLeft') stepGallery(-1);

  if (memberDialog.open && e.key === 'ArrowRight') stepProfilePhoto(1);
  if (memberDialog.open && e.key === 'ArrowLeft') stepProfilePhoto(-1);
});

const toggle = $('.menu-toggle');
const mobileNav = $('#mobile-nav');
function setMenu(open){mobileNav.hidden = !open;toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');}
toggle.addEventListener('click',()=>setMenu(mobileNav.hidden));
$$('.mobile-nav a').forEach(link => link.addEventListener('click',()=>setMenu(false)));
window.addEventListener('resize',()=>{ if(window.innerWidth>860) setMenu(false); });
$('#year').textContent = new Date().getFullYear();

// Real playback is activated automatically after adding the MP3 file at this path.
// No fake audio is included: the player accurately reports an empty file slot.
const audio = $('#audio-element');
const play = $('#play-button');
const seek = $('#audio-seek');
const label = $('#player-state');
const timecode = $('#time-code');
const info = $('.audio-bottom');
let audioReady=false;
const fmt = seconds => Number.isFinite(seconds) ? `${Math.floor(seconds/60)}:${String(Math.floor(seconds%60)).padStart(2,'0')}`:'--:--';
function updateAudioUI() {
  timecode.textContent = `${fmt(audio.currentTime)} / ${fmt(audio.duration)}`;
  if (Number.isFinite(audio.duration) && audio.duration) seek.value = String(audio.currentTime / audio.duration * 100);
}
audio.addEventListener('loadedmetadata', () => {
  if (!Number.isFinite(audio.duration) || !audio.duration) return;
  audioReady = true; play.disabled=false; seek.disabled=false;
  label.textContent='READY TO PLAY'; info.textContent='VILE PARADOX // STATIC IN OUR MINDS';updateAudioUI();
});
audio.addEventListener('error', () => {
  audioReady=false;play.disabled=true;seek.disabled=true;label.textContent='AUDIO NOT UPLOADED';info.innerHTML='ADD <code>assets/audio/static-in-our-minds.mp3</code> TO ENABLE PLAYBACK';
});
play.addEventListener('click', async () => {
  if (!audioReady) return;
  if (!audio.paused) { audio.pause(); return; }
  try { await audio.play(); } catch { label.textContent='COULD NOT PLAY FILE'; }
});
audio.addEventListener('play',()=>{play.textContent='Ⅱ';play.setAttribute('aria-label','Pause Static in Our Minds');label.textContent='NOW PLAYING';});
audio.addEventListener('pause',()=>{play.textContent='▶';play.setAttribute('aria-label','Play Static in Our Minds');label.textContent=audioReady?'PAUSED':'AUDIO NOT UPLOADED';});
audio.addEventListener('timeupdate',updateAudioUI);
audio.addEventListener('ended',()=>{play.textContent='▶';label.textContent='PLAY AGAIN';});
seek.addEventListener('input',()=>{if(audioReady && Number.isFinite(audio.duration)) audio.currentTime=audio.duration*(Number(seek.value)/100);});
