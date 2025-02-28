import { defineStarpodConfig } from 'src/utils/config';

export default defineStarpodConfig({
  blurb: 'KI einfach machen.',
  description:
    'KI Bauer ist der wöchentliche Podcast mit dem Motto: "KI einfach machen." Es geht "AI Engineering", also das Bauen von KI Lösungen für den praktischen Einsatz, möglichst einfach erklärt und mit oft erstaunlichen Ergebnissen.',
  hosts: [
    {
      name: 'Mitja Martini',
      bio: 'KI Enthusiast und Podcaster.',
      img: 'mitjamartini.jpg',
      github: 'https://github.com/mitja',
      twitter: 'https://twitter.com/MitjaMartini',
      website: 'https://mitjamartini.com'
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
  // rssFeed: 'https://kibauer.podigee.io/feed/mp3'
  rssFeed: 'https://feel-the-news.podigee.io/feed/mp3' // 'https://ki-surfcast.podigee.io/feed/mp3' //
});
