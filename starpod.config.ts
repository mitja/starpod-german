import { defineStarpodConfig } from 'src/utils/config';

export default defineStarpodConfig({
  blurb: 'KI einfach machen.',
  description:
    'Seit ChatGPT bricht eine schier endlose Welle von KI News über uns herein. Mitja fischt sich jede Woche nützliche und spannende Themen heraus und stellt sie vor. Mit praktischen Tipps, einfachen Erklärungen und einem Augenzwinkern zeigt er: KI funktioniert bisweilen und macht oft auch richtig Spaß. Frei nach dem Motto: KI einfach machen.',
  hosts: [
    {
      name: 'Mitja Martini',
      bio: 'KI Enthusiast, Cloud Solution Designer und Podcaster.',
      img: 'mitjamartini.jpg',
      github: 'https://github.com/mitja',
      twitter: 'https://twitter.com/MitjaMartini',
      website: 'https://mitja.dev'
    }
  ],
  platforms: {
    apple:
      'https://podcasts.apple.com/us/podcast/whiskey-web-and-whatnot/id1552776603?uo=4?mt=2&ls=1',
    appleIdNumber: '1552776603',
    overcast: 'https://overcast.fm/itunes1552776603',
    pocketCasts: 'https://pca.st/bezzctzj',
    spotify: 'https://open.spotify.com/show/19jiuHAqzeKnkleQUpZxDf',
    youtube: 'https://www.youtube.com/@WhiskeyWebAndWhatnot/'
  },
  rssFeed: 'https://feeds.megaphone.fm/PDS3666998460'
  //rssFeed: 'https://feel-the-news.podigee.io/feed/mp3' // 'https://ki-surfcast.podigee.io/feed/mp3' //
});
