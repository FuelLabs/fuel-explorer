// Caps gunzipSync's output so a crafted (or corrupt) gzip object -- small on
// the wire, huge once inflated -- cannot exhaust the 768 MB heap. BlockStore
// applies the same limit to its disk cache reads.
export const MAX_BLOCK_BYTES = 64 * 1024 * 1024;
