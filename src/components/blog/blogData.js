import calculateReadMinutes from '../../utils/calculateReadTime';
import { ARTICLE_ITEMS } from '../home/landingData';

const POPULAR_POST_COUNT = 6;

export const BLOG_FEATURE_IMAGE_SIZE = {
  width: 1536,
  height: 793,
};

/**
 * Detail-only fields for each article. Card copy (title, summary, thumbnail)
 * is not repeated here — it is read from ARTICLE_ITEMS so the landing card and
 * the details page can never drift apart. The card image is also the main
 * feature image on the details page.
 */
const BLOG_POST_DETAILS = {
  plumbing: {
    author: 'Jordan Mirchev',
    publishedAt: '2022-11-14',
    paragraphs: [
      'Plumbing problems often start small, but ignoring the early warning signs can turn a simple repair into a much bigger and more expensive issue. Paying attention to changes in your home’s plumbing system can help you identify problems early and keep everything working properly.',
      'One of the most common signs is a slow-draining sink or shower. If water is taking longer than usual to drain, there may be a buildup of hair, grease, soap, or other debris inside the pipes. While a minor blockage may sometimes be easy to clear, recurring drainage problems can indicate a deeper issue within the plumbing system.',
      'Another warning sign is unusual sounds coming from your pipes. If you hear banging, knocking, or gurgling noises when turning on a faucet or flushing the toilet, there could be an issue with water pressure, trapped air, or loose pipes. These sounds should not be ignored, especially if they happen frequently.',
      'Low water pressure can also be a sign that something is wrong. A sudden drop in pressure may be caused by a clogged pipe, a leaking line, or an issue with the plumbing system. If the problem affects multiple faucets throughout your home, it is worth having a professional inspect the system.',
      'Water stains, damp walls, or unexpected moisture are another important warning sign. Even a small leak hidden behind a wall or underneath a floor can gradually cause serious damage. If you notice discoloration, a musty smell, or unexplained moisture, getting the problem checked quickly can help prevent further damage.',
      'Finally, an unusually high water bill may indicate a hidden leak. If your water usage has not changed but your bill suddenly increases, there could be water escaping somewhere in your plumbing system. Finding and repairing the leak early can save water, protect your home, and prevent unnecessary expenses.',
      'Your plumbing system plays an important role in keeping your home comfortable and functional. If you notice any of these signs, it is better to address the problem early rather than wait until a small issue becomes a major repair. A professional handyman or plumbing service can inspect the problem and help keep your home’s plumbing system in good condition.',
    ],
  },
  electrician: {
    author: 'Ahmed Awad',
    publishedAt: '2022-11-08',
    paragraphs: [
      'Electrical faults rarely announce themselves loudly. More often they show up as a breaker that trips a little too often, a socket that feels warm, or a light that flickers whenever a large appliance switches on. Each of these is worth investigating rather than tolerating.',
      'Some jobs are genuinely safe for a homeowner, such as replacing a bulb or resetting a tripped breaker. Anything that involves opening a consumer unit, running new cable, or working near water should be handed to a qualified electrician who can isolate the circuit correctly.',
      'A burning smell, scorch marks around an outlet, or a shock of any strength are not warning signs to monitor over time. They call for switching off the affected circuit and booking a professional inspection the same day.',
      'Regular inspections are worth scheduling in older properties. Wiring installed decades ago was never designed for the number of devices a modern household runs, and an electrician can tell you whether your system still has the headroom it needs.',
    ],
  },
  repairs: {
    author: 'Ahmed Awad',
    publishedAt: '2022-10-27',
    paragraphs: [
      'Small repairs are easy to postpone because none of them feel urgent on their own. Collectively, though, they shape how comfortable a home feels day to day and how well it holds its value over time.',
      'Start with the repairs you interact with constantly: a door that sticks, a tap that drips, a loose handle, a cracked seal around a bath. These take a professional very little time and remove friction you have probably stopped noticing.',
      'Next, look at the repairs that protect the building itself. Resealing a window, refixing a loose gutter bracket, or patching damaged grout costs little now and prevents water finding its way into places that are expensive to dry out.',
      'Grouping several small jobs into a single visit is usually the most economical approach, since you pay for one call-out rather than several.',
    ],
  },
  shape: {
    author: 'Ahmed Awad',
    publishedAt: '2022-10-19',
    paragraphs: [
      'Keeping a home in good condition is less about occasional big projects and more about a short list of habits repeated consistently through the year.',
      'Check the things that move or carry water most often. Hinges, seals, filters, and drains all wear gradually, and a few minutes of attention each month keeps them working long past the point they would otherwise fail.',
      'Pay attention to what your home tells you. A new draught, a stain that was not there last month, or a sound that has changed are all early signals, and acting on them is almost always cheaper than waiting.',
    ],
  },
  winter: {
    author: 'Ahmed Awad',
    publishedAt: '2022-10-05',
    paragraphs: [
      'Cold weather tests parts of a home that go unnoticed for most of the year. Preparing before temperatures drop is far easier than reacting once something has already frozen or failed.',
      'Insulating exposed pipework in unheated spaces such as lofts, garages, and outbuildings is the single most valuable step, because a burst pipe causes damage well beyond the cost of the repair itself.',
      'Service the heating system before you rely on it daily. Bleeding radiators, checking pressure, and having a professional inspect the boiler will keep rooms warm and running costs predictable.',
      'Finally, clear gutters and downpipes. Blocked drainage that freezes forces water back under roof edges, which is one of the most common causes of winter damp.',
    ],
  },
  routine: {
    author: 'Ahmed Awad',
    publishedAt: '2022-09-22',
    paragraphs: [
      'A maintenance routine only works if it is realistic, so it helps to think in terms of monthly, seasonal, and yearly tasks rather than one long list.',
      'Monthly checks are quick: test smoke alarms, clear slow drains, and look under sinks for moisture. Seasonal tasks are larger, covering gutters, heating, and exterior seals as the weather changes.',
      'Once a year, bring in a professional for the systems you cannot inspect safely yourself, such as the boiler, the electrical installation, and the roof. Keeping a simple record of what was done and when makes the next round far easier to plan.',
    ],
  },
  'leak-prevention': {
    author: 'Ahmed Awad',
    publishedAt: '2022-09-14',
    paragraphs: [
      'Most serious water damage begins as a leak small enough to go unseen for weeks. Finding those leaks early is largely a matter of knowing where to look.',
      'Inspect the connections you can reach: under sinks, behind the washing machine and dishwasher, and around the base of toilets. Flexible hoses in particular have a limited lifespan and are worth replacing before they fail.',
      'Your water meter is a useful diagnostic tool. Turn off every outlet in the house and watch the meter for fifteen minutes. If it continues to move, water is escaping somewhere and a professional should trace it.',
    ],
  },
  'electrical-safety': {
    author: 'Ahmed Awad',
    publishedAt: '2022-09-02',
    paragraphs: [
      'Electrical safety at home comes down to respecting the limits of the installation and recognising when those limits are being pushed.',
      'Overloaded sockets are the most common problem. Daisy-chained extension leads and high-draw appliances sharing a single outlet generate heat, and heat is what turns a wiring fault into a fire.',
      'Damaged cable insulation, cracked socket faces, and plugs that feel loose all warrant replacement rather than continued use. None of these are expensive to fix.',
      'If your property still relies on an older consumer unit without modern residual current protection, ask an electrician whether an upgrade is appropriate. It is one of the more meaningful safety improvements available.',
    ],
  },
  'door-care': {
    author: 'Ahmed Awad',
    publishedAt: '2022-08-25',
    paragraphs: [
      'Doors are among the hardest-working components in a home, and a small amount of maintenance keeps them operating smoothly for decades.',
      'Lubricate hinges and locks at least twice a year. A door that drags, sticks in humid weather, or needs to be pulled hard to latch is usually telling you the hinges have dropped or the frame has shifted slightly.',
      'Check the seals around external doors as the seasons change. Worn weatherstripping is a quiet source of heat loss and draughts, and replacing it is one of the cheapest efficiency improvements you can make.',
    ],
  },
  'seasonal-checklist': {
    author: 'Ahmed Awad',
    publishedAt: '2022-08-16',
    paragraphs: [
      'Working through a home season by season keeps maintenance manageable and ensures nothing is missed for an entire year.',
      'In spring, focus on what winter may have damaged: roof edges, gutters, exterior paint, and drainage. Summer is the right time for outdoor repairs and for servicing cooling and ventilation.',
      'Autumn is for preparation, covering heating checks, insulation, and clearing drainage before the leaves fall. Winter is mostly about monitoring, watching for damp, draughts, and any sign of frozen pipework.',
    ],
  },
  'heating-efficiency': {
    author: 'Ahmed Awad',
    publishedAt: '2022-08-04',
    paragraphs: [
      'Improving heating efficiency usually costs far less than people expect, because the biggest gains come from adjustment rather than replacement.',
      'Bleed radiators that are cold at the top, and make sure none are blocked by furniture. A radiator that cannot circulate air into the room is doing a fraction of the work you are paying for.',
      'Controls matter as much as the boiler itself. A correctly programmed thermostat and accurate radiator valves let you heat the rooms you actually use, at the times you actually use them.',
      'Have the system serviced annually. A well-maintained boiler runs closer to its rated efficiency and is significantly less likely to fail during the coldest part of the year.',
    ],
  },
  'cleaning-plan': {
    author: 'Ahmed Awad',
    publishedAt: '2022-07-21',
    paragraphs: [
      'A cleaning routine succeeds or fails on whether it fits the time you genuinely have, not the time you wish you had.',
      'Split tasks by frequency rather than by room. A handful of daily resets, a short weekly circuit, and a longer monthly session covers a home more reliably than trying to clean everything at once.',
      'Keep supplies where they are used rather than in one central cupboard. Removing the friction of fetching what you need is often the difference between a routine that lasts and one that quietly stops.',
    ],
  },
};

const findArticle = (slug) => ARTICLE_ITEMS.find(({ id }) => id === slug);

export const getBlogPost = (slug) => {
  const article = findArticle(slug);
  const details = BLOG_POST_DETAILS[slug];

  if (!article || !details) {
    return null;
  }

  return {
    slug: article.id,
    title: article.title,
    summary: article.body,
    featureImage: article.image,
    featureImageAlt: article.imageAlt,
    author: details.author,
    publishedAt: details.publishedAt,
    paragraphs: details.paragraphs,
    readMinutes: calculateReadMinutes(details.paragraphs),
  };
};

export const getPopularBlogPosts = (currentSlug) =>
  ARTICLE_ITEMS.filter(({ id }) => id !== currentSlug).slice(0, POPULAR_POST_COUNT);
