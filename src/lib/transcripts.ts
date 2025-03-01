import fs from 'fs';
import path from 'path';

// Function to get a transcript by episode number
export async function getTranscript(episodeNumber: string): Promise<string | null> {
  try {
    // Define the path to transcripts directory - adjust as needed
    const transcriptPath = path.join(process.cwd(), 'src', 'content', 'transcripts', `${episodeNumber}.md`);
    
    // Check if the file exists
    if (fs.existsSync(transcriptPath)) {
      // Read the file content
      const content = fs.readFileSync(transcriptPath, 'utf-8');
      return content;
    }
    
    return null;
  } catch (error) {
    console.error(`Error reading transcript for episode ${episodeNumber}:`, error);
    return null;
  }
}
