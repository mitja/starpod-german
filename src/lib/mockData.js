// This file provides mock data to replace Astro DB queries

// Mock data for hosts and guests (basic version with just required data)
export const mockHostsAndGuests = [
    {
      id: "mitjamartini",
      img: "mitjamartini.jpg",
      isHost: true,
      name: "Mitja Martini"
    }
    // Add more hosts/guests as needed
  ];
  
  // Extended people data (from db/data/people.ts)
  export const people = [
    { 
      id: 'mitjamartini', 
      name: 'Mitja Martini', 
      img: 'mitjamartini.jpg' 
    }
    // You can add more people from your original people.ts file if needed
  ];
  
  // Episode to people mapping (from db/data/people-per-episode.ts)
  export const peoplePerEpisode = {
    'introducing-ki-bauer': [
      { id: 'mitjamartini', host: true }
    ],
    'ai-fundamentals-episode': [
      { id: 'mitjamartini', host: true }
    ]
    // Add more episode mappings as needed
  };
  
  // Function to get hosts and guests for a specific episode
  // This replaces the DB query in [episode].astro
  export function getHostsAndGuestsForEpisode(episodeSlug) {
    const peopleIds = peoplePerEpisode[episodeSlug] || [];
    
    return peopleIds.map(person => {
      const personData = people.find(p => p.id === person.id);
      if (!personData) return null;
      
      return {
        id: personData.id,
        img: personData.img || null,
        isHost: person.host || personData.id === 'mitjamartini', // Assuming Mitja is always a host
        name: personData.name
      };
    }).filter(Boolean); // Remove any null entries
  }
