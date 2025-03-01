#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const yaml = require('js-yaml');
const slugify = require('slugify');

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Helper function to prompt for input
function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

// Helper function to prompt for yes/no input
async function promptYesNo(question) {
  const answer = await prompt(`${question} (y/n): `);
  return answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes';
}

function ensureDirectoriesExist() {
  const contentDir = path.join(__dirname, '..', 'src', 'content');
  const peopleDir = path.join(contentDir, 'people');
  const transcriptsDir = path.join(contentDir, 'transcripts');
  const imgDir = path.join(__dirname, '..', 'src', 'img');
    
  // Create directories if they don't exist
  [contentDir, peopleDir, transcriptsDir, imgDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
      console.log(`Creating directory: ${dir}`);
      fs.mkdirSync(dir, { recursive: true });
    }
  });
}

// Helper function to create a person YAML file
async function createPersonYaml(id, name, imgFilename, isHost = false) {
  const peopleDir = path.join(__dirname, '..', 'src', 'content', 'people');
  
  // Ensure the directory exists
  if (!fs.existsSync(peopleDir)) {
    fs.mkdirSync(peopleDir, { recursive: true });
  }
  
  const personData = {
    id,
    name,
    img: imgFilename,
    isHost,
  };
  
  // Add optional bio if provided
  const bio = await prompt(`Enter a short bio for ${name} (optional): `);
  if (bio) {
    personData.bio = bio;
  }
  
  // Add optional links
  const twitter = await prompt(`Enter Twitter URL for ${name} (optional): `);
  const github = await prompt(`Enter GitHub URL for ${name} (optional): `);
  const website = await prompt(`Enter website URL for ${name} (optional): `);
  
  if (twitter || github || website) {
    personData.links = {};
    if (twitter) personData.links.twitter = twitter;
    if (github) personData.links.github = github;
    if (website) personData.links.website = website;
  }
  
  // Write the YAML file
  const yamlContent = yaml.dump(personData);
  const filePath = path.join(peopleDir, `${id}.yaml`);
  fs.writeFileSync(filePath, yamlContent, 'utf8');
  
  console.log(`Created person file: ${filePath}`);
  return id;
}

// Helper function to list existing people
function listExistingPeople() {
  const peopleDir = path.join(__dirname, '..', 'src', 'content', 'people');
  
  if (!fs.existsSync(peopleDir)) {
    return [];
  }
  
  // Read all YAML files in the people directory
  const peopleFiles = fs.readdirSync(peopleDir)
    .filter(file => file.endsWith('.yaml') || file.endsWith('.yml'));
  
  const people = [];
  
  for (const file of peopleFiles) {
    try {
      const content = fs.readFileSync(path.join(peopleDir, file), 'utf8');
      const person = yaml.load(content);
      people.push(person);
    } catch (err) {
      console.warn(`Warning: Could not read person file ${file}`, err);
    }
  }
  
  return people;
}

// Helper function to select people
async function selectPeople(isHost = false) {
  const people = listExistingPeople();
  const typeLabel = isHost ? 'hosts' : 'guests';
  
  if (people.length === 0) {
    console.log(`No existing people found. You'll need to create new ${typeLabel}.`);
    return [];
  }
  
  console.log(`\nExisting ${typeLabel}:`);
  people.forEach((person, index) => {
    // Only show hosts for host selection and non-hosts for guest selection
    if ((isHost && person.isHost) || (!isHost && !person.isHost)) {
      console.log(`${index + 1}. ${person.name} (ID: ${person.id})`);
    }
  });
  
  const selectedPeople = [];
  const answer = await prompt(`\nSelect ${typeLabel} by entering numbers separated by commas, or press Enter for none: `);
  
  if (answer) {
    const selectedIndices = answer.split(',').map(n => parseInt(n.trim()) - 1);
    
    for (const index of selectedIndices) {
      if (index >= 0 && index < people.length) {
        // Only add hosts for host selection and non-hosts for guest selection
        if ((isHost && people[index].isHost) || (!isHost && !people[index].isHost)) {
          selectedPeople.push(people[index].id);
        }
      }
    }
  }
  
  return selectedPeople;
}

// Helper function to create a new person
async function createNewPerson(isHost = false) {
  console.log(`\nCreating a new ${isHost ? 'host' : 'guest'}...`);
  
  const name = await prompt('Enter full name: ');
  
  // Create ID from name
  let id = slugify(name, { lower: true, strict: true, remove: /[*+~.()'"!:@]/g });
  id = await prompt(`Enter ID (default: ${id}): `) || id;
  
  // Prompt for image filename
  let defaultImgFilename = `${id}.jpg`;
  const imgFilename = await prompt(`Enter image filename (default: ${defaultImgFilename}): `) || defaultImgFilename;
  
  // Create the person YAML file
  await createPersonYaml(id, name, imgFilename, isHost);
  
  return id;
}

// Main function to create a new episode
async function createNewEpisode() {
  console.log('=== Create New Podcast Episode Transcript ===\n');

  ensureDirectoriesExist();
  
  // Get episode details
  const episodeNumber = await prompt('Enter episode number: ');
  const title = await prompt('Enter episode title: ');
  
  // Hosts
  console.log('\n=== Selecting Hosts ===');
  let hosts = await selectPeople(true);
  
  // Check if hosts were selected, if not, ask to create new hosts
  if (hosts.length === 0) {
    const createNewHost = await promptYesNo('No hosts selected. Would you like to create a new host?');
    
    if (createNewHost) {
      const hostId = await createNewPerson(true);
      hosts.push(hostId);
    }
  }
  
  // Guests
  console.log('\n=== Selecting Guests ===');
  let guests = await selectPeople(false);
  
  // Ask if user wants to add new guests
  const addNewGuest = await promptYesNo('Would you like to add a new guest?');
  
  if (addNewGuest) {
    const guestId = await createNewPerson(false);
    guests.push(guestId);
    console.log('\n👉 Save new guest image in `src/img/` - square. eg 400x400)\n');
  }
  
  // Create frontmatter
  const frontmatter = {
    title: `${title}`,
    episodeNumber,
    hosts,
    guests
  };
  
  // Create basic transcript template
  const transcriptContent = `---
${yaml.dump(frontmatter)}---

## Episode ${episodeNumber}: ${title}

${hosts.map(() => '**Host**').join(', ')}: Willkommen zur Episode ${episodeNumber} von KI Bauer! 

${guests.length > 0 ? `${guests.map(() => '**Guest**').join(', ')}: Danke für die Einladung!` : ''}

## Einführung ins Thema

**Host**: In dieser Episode sprechen wir über...

${guests.length > 0 ? '**Guest**: ' : ''}

## Hauptteil

**Host**: 

${guests.length > 0 ? '**Guest**: ' : ''}

## Fazit

**Host**: Vielen Dank fürs Zuhören! In der nächsten Episode...

${guests.length > 0 ? '**Guest**: ' : ''}
`;

  // Create the transcript file
  const transcriptsDir = path.join(__dirname, '..', 'src', 'content', 'transcripts');
  
  // Ensure the directory exists
  if (!fs.existsSync(transcriptsDir)) {
    fs.mkdirSync(transcriptsDir, { recursive: true });
  }
  
  const filePath = path.join(transcriptsDir, `${episodeNumber}.md`);
  
  // Check if file already exists
  if (fs.existsSync(filePath)) {
    const overwrite = await promptYesNo(`File ${filePath} already exists. Overwrite?`);
    
    if (!overwrite) {
      console.log('Operation cancelled.');
      rl.close();
      return;
    }
  }
  
  // Write the file
  fs.writeFileSync(filePath, transcriptContent, 'utf8');
  
  console.log(`\nSuccessfully created transcript file: ${filePath}`);
  // Close the readline interface
  rl.close();
}

// Execute the main function
createNewEpisode().catch(err => {
  console.error('Error:', err);
  rl.close();
});