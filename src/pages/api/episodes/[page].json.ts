import type { APIRoute } from 'astro';
import { getAllEpisodes } from '../../../lib/rss';

const episodesPerPage = 15;

// Precompute all episodes during build time
let allEpisodesPromise = getAllEpisodes();

export async function getStaticPaths() {
  const allEpisodes = await allEpisodesPromise;
  const totalPages = Math.ceil(allEpisodes.length / episodesPerPage);
  
  return Array.from({ length: totalPages }, (_, i) => {
    const pageNum = i + 1;
    return {
      params: { page: String(pageNum) },
      props: { pageNum }
    };
  });
}

export const GET: APIRoute = async ({ params, props }) => {
  const allEpisodes = await allEpisodesPromise;
  const pageNum = props.pageNum;
  
  const startIdx = (pageNum - 1) * episodesPerPage;
  const endIdx = Math.min(startIdx + episodesPerPage, allEpisodes.length);
  
  const pageEpisodes = allEpisodes.slice(startIdx, endIdx);
  const canLoadMore = endIdx < allEpisodes.length;
  
  return new Response(JSON.stringify({
    canLoadMore,
    episodes: {
      data: pageEpisodes,
      currentPage: pageNum,
      start: startIdx,
      end: endIdx - 1,
      size: episodesPerPage,
      total: allEpisodes.length,
    }
  }));
};
