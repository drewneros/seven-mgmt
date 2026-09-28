import {mkdirSync,writeFileSync} from 'node:fs';
import {site,hosts} from './data.mjs';
const D=site.domain;const VER=Date.now().toString(36);const BASE=process.env.BASE||'';
const wa=`https://wa.me/${site.whatsapp}`;
const fonts=`<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;1,6..96,400&family=Hanken+Grotesk:wght@400;500&display=swap" rel="stylesheet">`;
const org={"@context":"https://schema.org","@type":["Organization","LocalBusiness"],"name":site.name,"url":D+"/","description":site.desc,"email":site.email,"areaServed":{"@type":"Country","name":"Singapore"},"address":{"@type":"PostalAddress","addressCountry":"SG"},"parentOrganization":{"@type":"Organization","name":site.owner}};
const nav=(cur)=>`<a class="skip" href="#main">Skip to content</a>
<header class="nav"><div class="prog" aria-hidden="true"></div><a class="logo" href="/" aria-label="Seven Management home"><img src="/assets/logo.png" alt="" width="34" height="34"><span>Seven <b>Mgmt</b></span></a>
<button class="menu-btn" aria-expanded="false" aria-controls="menu">Menu</button>
<ul id="menu">${[['/#about','About','about'],['/hosts/','Hosts','hosts'],['/contact/','Enquire','contact']].map(([h,t,k])=>`<li><a class="l" href="${h}"${cur===k?' aria-current="page"':''}>${t}</a></li>`).join('')}</ul></header>`;
const foot=`<footer><div class="foot"><div><a class="logo" href="/"><img src="/assets/logo.png" alt="" width="34" height="34"><span>Seven <b>Mgmt</b></span></a><p style="margin-top:1rem;max-width:20rem">Luxury talent and event management. Singapore.</p></div>
<div><h4>Explore</h4><ul><li><a href="/#about">About</a></li><li><a href="/hosts/">Hosts</a></li><li><a href="/contact/">Enquire</a></li></ul></div>
<div><h4>Contact</h4><ul><li><a href="mailto:${site.email}">${site.email}</a></li><li><a href="${wa}" rel="noopener">WhatsApp</a></li></ul></div></div>
<div class="legal"><span>&copy; 2025 ${site.name}. Owned by ${site.owner}.</span><a href="/terms-and-conditions/">Privacy Policy + Terms of Use</a></div></footer>
<nav class="bar" aria-label="Quick contact"><a href="${wa}" rel="noopener">WhatsApp</a><a href="/contact/">Book an event</a></nav>
<script src="/site.js?v=${VER}" defer></script>`;
const page=({path,title,desc,cur,body,schema=[],og='/assets/og.jpg',noindex=false})=>{
 const url=D+path;
 const html=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${title}</title><meta name="description" content="${desc}"><link rel="canonical" href="${url}">${noindex?'<meta name="robots" content="noindex">':''}
<meta name="theme-color" content="#0f0f12"><meta property="og:type" content="website"><meta property="og:title" content="${title}"><meta property="og:description" content="${desc}"><meta property="og:url" content="${url}"><meta property="og:image" content="${D+og}"><meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/assets/favicon.png" type="image/png">${fonts}<script>document.documentElement.classList.add("js")</script><link rel="stylesheet" href="/style.css?v=${VER}">
${[org,...schema].map(s=>`<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n')}
</head><body>${nav(cur)}<main id="main">${body}</main>${foot}</body></html>`;
 const f=path.endsWith('/')?path+'index.html':path;
 mkdirSync(('.'+f).replace(/\/[^/]*$/,''),{recursive:true});writeFileSync('.'+f,BASE?html.replace(/(href|src)="\/(?!\/)/g,`$1="${BASE}/`):html);
};
const card=h=>`<a class="card" href="/hosts/${h.slug}/"><div class="ph r34" role="img" aria-label="Portrait of ${h.name}, Seven Management host from ${h.country}"><span>Photo 3:4</span></div><div class="cap"><h3>${h.name}</h3><small>${h.country}</small></div></a>`;
const cta=`<section class="cta"><div class="wrap"><div class="eyebrow">Take action now</div><h2>The night you <em>won't</em> forget.</h2><a class="btn solid" href="/contact/">Reach out <i></i></a></div></section>`;

// HOME
page({path:'/',cur:'',title:'Seven Management | Luxury Hosts and Event Talent Agency, Singapore',
desc:"Singapore's luxury talent and event agency. Book international hosts, models and performers for private events, launches and nightlife. Enquire in two minutes.",
schema:[{"@context":"https://schema.org","@type":"WebSite","name":site.name,"url":D+"/"}],
body:`<section class="hero" style="padding-block-start:8rem;padding-block-end:clamp(2.5rem,6vw,5rem)"><div class="blobs" aria-hidden="true"><i class="blob b1"></i><i class="blob b2"></i></div><div class="tick">Singapore &middot; 1&deg;17&prime;N</div>
<div class="eyebrow">Talent &amp; event management</div>
<h1 style="margin-top:1.6rem"><span class="ln"><span>Curated Nights.</span></span><span class="ln"><span><em>Elevated</em> Connections.</span></span></h1>
<div class="row"><p>Crafting unforgettable nights through art, atmosphere and connection. International hosts for Singapore's private events and nightlife.</p><a class="btn solid" href="/contact/">Book an event <i></i></a></div></section>
<div class="mq" aria-hidden="true"><div class="mq-t"><span>Curated Nights</span><span class="d">&#10022;</span><span><em>Elevated</em> Connections</span><span class="d">&#10022;</span><span>Singapore</span><span class="d">&#10022;</span><span>Curated Nights</span><span class="d">&#10022;</span><span><em>Elevated</em> Connections</span><span class="d">&#10022;</span><span>Singapore</span><span class="d">&#10022;</span></div></div><section id="hosts"><div class="wrap"><div class="sec-head"><div><div class="eyebrow">Our hosts</div><h2>Our <em>international</em> hosts</h2></div><a class="link" href="/hosts/">Explore more</a></div>
<div class="grid">${hosts.map(card).join('')}</div>
<p style="color:var(--mute);max-width:40rem;margin-top:3.5rem">Representing a diverse selection of international hosts, models and performers, Seven Management embodies the cosmopolitan spirit of Singapore. Each is selected for professionalism, presence and the ability to turn every moment into a memorable experience.</p></div></section>
<section class="apart"><div class="wrap"><div class="eyebrow">What sets us apart</div>
<p class="lead" style="margin-top:1.6rem">We believe nightlife is an art form, a blend of emotion, people and atmosphere. Our mission is to elevate Singapore's entertainment landscape through talent that inspires connection, elegance and unforgettable experiences.</p>
<div class="pts"><div><b>I</b><h3>Curated, not crowded</h3><p>A small circle of hosts, chosen one by one. You get the right people, not a long list.</p></div>
<div><b>II</b><h3>Presence and polish</h3><p>Elegance, professionalism and hospitality from the first hello to the last guest.</p></div>
<div><b>III</b><h3>One point of contact</h3><p>Tell us about the night once. We match, confirm in writing and stay reachable on the day.</p></div></div></div></section>
<section id="about"><div class="wrap about"><div><div class="eyebrow">About us</div><h2>Where rhythm <em>meets</em> soul</h2>
<p>Seven Management is a premier talent and event management agency redefining Singapore's luxury nightlife experience. We represent a curated circle of international hosts, performance artists and brand ambassadors, the faces behind the city's most exclusive events and private celebrations.</p>
<p>With a focus on elegance, professionalism and atmosphere, our team brings together beauty, charisma and hospitality to create unforgettable moments for discerning guests and distinguished partners.</p></div>
<div class="ph r45" role="img" aria-label="Atmosphere from a Seven Management event, Singapore"><span>Event photo 4:5</span></div></div></section>
<section><div class="wrap"><div class="eyebrow">How booking works</div><h2 style="font-size:clamp(2.2rem,5.5vw,4.6rem);margin:1.2rem 0 3rem">Three steps to a <em>booked</em> night</h2>
<ol class="steps" style="padding:0"><li><h3>Tell us the night</h3><p>Date, venue, guests, how many hosts. The enquiry form takes two minutes.</p></li><li><h3>We match the room</h3><p>We reply with the hosts who fit your event and your guests.</p></li><li><h3>Confirmed in writing</h3><p>Schedule, terms and cancellation are agreed in writing before the night.</p></li></ol></div></section>
${cta}`});

// HOSTS INDEX
page({path:'/hosts/',cur:'hosts',title:'International Hosts and Event Models Singapore | Seven Management',
desc:'Meet the international hosts, models and performers of Seven Management. Book curated talent for luxury events and nightlife in Singapore.',
schema:[{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":D+"/"},{"@type":"ListItem","position":2,"name":"Hosts","item":D+"/hosts/"}]}],
body:`<div class="phead"><div class="eyebrow">Meet our</div><h1><em>International</em> hosts</h1><p>Each host is selected for professionalism, presence and the ability to turn every moment into a memorable experience.</p></div>
<section style="padding-top:2rem"><div class="wrap"><div class="grid">${hosts.map(card).join('')}</div></div></section>${cta}`});

// PROFILES
for(const h of hosts) page({path:`/hosts/${h.slug}/`,cur:'hosts',title:`${h.name}, Event Host from ${h.country} | Seven Management Singapore`,
desc:`${h.name} is an international host with Seven Management, available for ${h.events.toLowerCase()} in Singapore. Speaks ${h.langs}. Enquire to book.`,
schema:[{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":D+"/"},{"@type":"ListItem","position":2,"name":"Hosts","item":D+"/hosts/"},{"@type":"ListItem","position":3,"name":h.name,"item":`${D}/hosts/${h.slug}/`}]}],
body:`<div class="phead" style="padding-bottom:2rem"><a class="crumb" href="/hosts/">&larr; All hosts</a></div>
<section style="padding-top:0"><div class="wrap prof"><div class="gal">${['Portrait 3:4','Portrait 3:4','Portrait 3:4','Portrait 3:4','Portrait 3:4'].map((t,i)=>`<div class="ph ${i?'r34':'r169'}" role="img" aria-label="${h.name}, photo ${i+1}, Seven Management host"><span>${t}</span></div>`).join('')}</div>
<div class="facts"><div class="eyebrow">Host</div><h1 style="font-size:clamp(3rem,7vw,6rem);margin-top:1rem">${h.name}</h1>
<dl><div><dt>Country</dt><dd>${h.country}</dd></div><div><dt>Languages</dt><dd>${h.langs}</dd></div><div><dt>Suited to</dt><dd>${h.events}</dd></div><div><dt>Based</dt><dd>Singapore</dd></div></dl>
<a class="btn solid" href="/contact/?host=${h.slug}">Book ${h.name.split(" ")[0]} <i></i></a></div></div></section>`});

// CONTACT
page({path:'/contact/',cur:'contact',title:'Book an Event Host in Singapore | Seven Management',
desc:'Enquire about hosts, models or performers for your event in Singapore. Tell us the date, venue and guest count and Seven Management will reply personally.',
body:`<div class="phead"><div class="eyebrow">Enquire</div><h1>Book your <em>night</em></h1><p>Have questions about our services or need help with a booking? Tell us about the event and we will get back to you as soon as possible.</p></div>
<section style="padding-top:2rem"><div class="wrap"><form class="form" id="enquiry" novalidate>
<label>Your name<input name="name" required autocomplete="name"></label>
<label>Email<input name="email" type="email" required autocomplete="email"></label>
<label>WhatsApp or phone<input name="phone" type="tel" autocomplete="tel"></label>
<label>Company or brand (optional)<input name="company" autocomplete="organization"></label>
<label>Event date<input name="date" type="date" required></label>
<label>Venue<input name="venue" required></label>
<label>Guests<input name="guests" type="number" min="1" inputmode="numeric"></label>
<label>Hosts needed<select name="hosts"><option>1</option><option>2</option><option>3</option><option>4</option><option>5 or more</option></select></label>
<label class="full">Preferred hosts (optional)<input name="picks" id="picks" placeholder="e.g. ${hosts[0].name.split(" ")[0]}, ${hosts[2].name.split(" ")[0]}"></label>
<label class="full">About the night<textarea name="notes"></textarea></label>
<input class="hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
<div class="full"><button class="btn solid" type="submit">Send enquiry <i></i></button></div></form>
<div class="ok" id="ok" role="status"><h2>Thank you.</h2><p>Your enquiry is with us. We reply personally, usually the same day.</p></div>
<p class="contact-alt">Prefer to talk? <a href="${wa}" rel="noopener">Chat on WhatsApp</a> or write to <a href="mailto:${site.email}">${site.email}</a>.</p></div></section>`});

// TERMS
page({path:'/terms-and-conditions/',cur:'',title:'Privacy Policy and Terms of Use | Seven Management',desc:'How Seven Management collects and protects your information, and the terms for using this website and booking talent in Singapore.',
body:`<div class="phead"><div class="eyebrow">Legal</div><h1>Privacy &amp; <em>Terms</em></h1><p>Last updated: October 21, 2025.</p></div><div class="prose">
<h2>1. Introduction</h2><p>Welcome to Seven Management. We are a Singapore-based talent and event management agency specialising in luxury nightlife, VIP events and curated entertainment. By visiting this website or using our services, you agree to this Privacy Policy and these Terms of Use.</p>
<h2>2. Information we collect</h2><p>We collect information you give us when you submit an enquiry or booking request, apply to join our roster, or partner with us. This may include:</p><ul><li>Full name, email address and phone number.</li><li>Company or brand name.</li><li>Event or booking details and preferences.</li><li>Social media handles or portfolios (talent applications).</li></ul><p>We collect only what is needed to provide and improve our services.</p>
<h2>3. How we use it</h2><ul><li>To respond to enquiries and manage bookings.</li><li>To match clients with suitable talent.</li><li>To send confirmations, updates and important notices.</li><li>To comply with applicable law.</li></ul><p>We never sell your data or share it for unsolicited marketing.</p>
<h2>4. Data security</h2><p>We use reasonable technical and organisational measures to protect your information. Access is limited to authorised team members and partners bound by confidentiality.</p>
<h2>5. Talent and client confidentiality</h2><p>Information shared between Seven Management, clients and represented talent is strictly confidential, including event details, brand partnerships, private communications and contracts. Nothing is disclosed publicly without written consent.</p>
<h2>6. Photography and content</h2><p>Photography and videography may take place at events we organise or represent. We may use such material for promotion unless you ask in writing, before the event, for exclusion. Represented talent abide by brand NDAs, confidentiality clauses and image rights in their contracts.</p>
<h2>7. Cookies and analytics</h2><p>This site may use cookies and analytics tools such as Google Analytics to collect anonymous usage data. You can disable cookies in your browser.</p>
<h2>8. Third-party links</h2><p>We are not responsible for the privacy practices or content of external sites.</p>
<h2>9. Your rights</h2><p>You may request access to, correction or deletion of your data, and withdraw consent, by writing to <a href="mailto:${site.email}" style="color:var(--gold)">${site.email}</a>.</p>
<h2>10. Terms of use</h2><p>Use this site for lawful purposes only. Do not copy content, images or intellectual property without written permission. All talent engagements are governed by individual contracts. Event details, schedules and financial terms are confirmed in writing, and cancellations or changes follow your booking confirmation or contract. We are not liable for indirect or consequential damages arising from use of this website or participation in an event.</p>
<h2>11. Governing law</h2><p>These terms are governed by the laws of Singapore, and disputes are subject to the exclusive jurisdiction of Singapore courts.</p>
<h2>12. Contact</h2><p>${site.email}<br>Singapore<br>${D.replace('https://','www.')}</p><p>&copy; 2025 ${site.name}. Owned by ${site.owner}. All rights reserved.</p></div>`});

// 404
page({path:'/404.html',cur:'',noindex:true,title:'Page not found | Seven Management',desc:'This page could not be found.',body:`<div class="phead" style="min-height:70svh"><div class="eyebrow">404</div><h1>Lost <em>the night</em></h1><p>That page does not exist. Head back home or meet our hosts.</p><p style="margin-top:2rem"><a class="btn" href="/">Home <i></i></a></p></div>`});

// sitemap / robots
const urls=['/','/hosts/',...hosts.map(h=>`/hosts/${h.slug}/`),'/contact/','/terms-and-conditions/'];
writeFileSync('sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(u=>`\n<url><loc>${D}${u}</loc></url>`).join('')}\n</urlset>\n`);
writeFileSync('robots.txt',`User-agent: *\nAllow: /\nSitemap: ${D}/sitemap.xml\n`);
console.log('built',urls.length,'pages');
