# Starpod German

Starpod is an Astro project for a podcast website. This is an adaption of the original Starpod project for German podcasts, like [KI Bauer](https://kibauer.de).

Main differences to the original Starpod project:

- German translations
- Different color scheme
- Local fonts
- Image resizing during build (instead of via Vercel)
- Removed Vercel analytics.
- Local hosts-and-guests to podcast mappings instead of Turso and Astro DB.
- Transcripts with front matter and markdown support.

### Configuration

You will need to configure your RSS feed and a few other pieces of info for your
podcast in starpod.config.mjs. We provide a util function `defineStarpodConfig`
that provides TypeScript types and enforces the correct formats for config
values.

An example config can be found [here](./starpod.config.ts).

#### Options

##### blurb

A very short tagline for your show. Generally, no more than one sentence. Less
is more here.

**Example:**

```ts
blurb: 'A whiskey fueled fireside chat with your favorite web developers.',
```

##### description

A somewhat longer description of what your show is about. This should still
ideally be fairly short, and should usually be 2-4 sentences.

**Example:**

```ts
description:
  'Veteran web developers RobbieTheWagner and Charles William Carpenter III host this informal, whiskey-fueled fireside chat with your favorite web devs. They discuss all things web development including JavaScript, TypeScript, EmberJS, React, Astro, SolidJS, CSS, HTML, Web3, and more. They take a unique approach and focus on getting to know the human side of developers and their hobbies outside of work, all while sampling a new whiskey that they rate on their unique tentacle scale.',
```

##### hosts

A list of your show's hosts and their info.

**Example:**

```ts
hosts: [
  {
    name: 'Mitja Martini',
    bio: 'KI Enthusiast und Podcaster',
    img: '/src/img/mitjamartini.jpg',
    github: 'https://github.com/mitja',
    twitter: 'https://twitter.com/MitjaMartini',
    website: 'https://mitjamartini.com'
  },
],
```

##### platforms

Links to the platforms your show is available on.

**Example:**

```ts
platforms: {
  apple:
    'https://podcasts.apple.com/us/podcast/whiskey-web-and-whatnot/id1552776603?uo=4?mt=2&ls=1',
  overcast: 'https://overcast.fm/itunes1552776603',
  spotify: 'https://open.spotify.com/show/19jiuHAqzeKnkleQUpZxDf',
  youtube: 'https://www.youtube.com/@WhiskeyWebAndWhatnot/'
},
```

##### rssFeed

The url to the RSS feed where your podcast is hosted.

**Example:**

```ts
rssFeed: 'https://anchor.fm/s/e329dea0/podcast/rss';
```

#### Setting up the contact form

The contact form hits an APIRoute at `/api/contact`. It is currently configured
to send the form data to a Slack channel webhook I had setup. It reads the url
from `import.meta.env.SLACK_WEBHOOK`, so if you define a `SLACK_WEBHOOK`
environment variable it should work for you. Of course, feel free to customize
the code [here](./src/pages/api/contact.ts) to send the data elsewhere as you
see fit.

#### Configuring guests

1. Add an image of the guest to `src/img/` with the filename being the guest's
   name in lowercase with no spaces.


2. Add the guest to the `guests` people array in `src/lib/mockData.js`:

```ts
  export const people = [
    { 
      id: 'mitjamartini', 
      name: 'Mitja Martini', 
      img: 'mitjamartini.jpg' 
    }
    // You can add more people from your original people.ts file if needed
  ];
  ```

3. Add episode to hosts/guests mappings in the `peoplePerEpisode` array in `src/lib/mockData.js`:

```ts
  export const peoplePerEpisode = {
    'introducing-ki-bauer': [
      { id: 'mitjamartini', host: true }
    ],
    'ai-fundamentals-episode': [
      { id: 'mitjamartini', host: true }
    ]
    // Add more episode mappings as needed
  };
  ```