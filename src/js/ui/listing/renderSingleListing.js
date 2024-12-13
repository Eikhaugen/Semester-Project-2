/**
 * Renders a single listing and its bids into the provided containers.
 *
 * @param {Object} listing - The listing object containing details of the item.
 * @param {HTMLElement} listingContainer - The DOM element where the listing details will be rendered.
 * @param {HTMLElement} bidsContainer - The DOM element where the bids will be rendered.
 *
 * @property {string} listing.title - The title of the listing.
 * @property {Array<Object>} listing.media - An array of media objects (images) associated with the listing.
 * @property {string} listing.media[].url - The URL of the media image.
 * @property {string} listing.media[].alt - The alt text for the media image.
 * @property {Object} listing._count - The count object containing the number of bids.
 * @property {number} listing._count.bids - The number of bids for the listing.
 * @property {Array<Object>} listing.bids - An array of bid objects.
 * @property {string} listing.endsAt - The end date and time of the auction in ISO format.
 * @property {string} listing.description - The description of the listing.
 * @property {Object} listing.seller - The seller's details.
 * @property {string} listing.seller.name - The name of the seller.
 */
export function renderSingleListing(listing, listingContainer, bidsContainer) {
  listingContainer.innerHTML = "";
  bidsContainer.innerHTML = "";

  const { title, media, _count, bids, endsAt, description, seller } = listing;

  const highestBid = bids.length > 0 ? Math.max(...bids.map(bid => bid.amount)) : 0;

  const listingHTML = `
    <div class="w-full mx-auto bg-white rounded-lg shadow-md overflow-hidden mb-6 flex">
      <img 
        src="${media[0]?.url || ''}" 
        alt="${media[0]?.alt || 'Listing image'}" 
        class="w-full max-w-96 h-64 object-cover"
      />
      <div class="p-6">
        <h2 class="text-2xl font-bold mb-4">${title}</h2>
        <p class="text-gray-700 mb-2"><strong>Seller:</strong> ${seller.name}</p>
        <p class="text-gray-600 mb-4">${description}</p>
        <div class="flex justify-between items-center text-gray-600 mb-4">
          <div class="flex items-center gap-2">
            <span class="font-medium">${_count.bids}</span>
            <span>bids</span>
          </div>
          <div class="text-sm font-medium">
            <span>${getTimeRemaining(endsAt)}</span>
          </div>
        </div>
        <p class="text-lg font-semibold text-green-600">Highest Bid: ${highestBid} Credits</p>
      </div>
    </div>
  `;

  listingContainer.innerHTML = listingHTML;

  if (bids.length > 0) {
    // Sort bids by date (latest first)
    const sortedBids = bids.sort((a, b) => new Date(b.created) - new Date(a.created));

    sortedBids.forEach((bid) => {
      const bidHTML = `
        <div class="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm mb-4">
          <img 
            src="${bid.bidder.avatar.url}" 
            alt="${bid.bidder.avatar.alt || 'Bidder avatar'}" 
            class="w-12 h-12 rounded-full object-cover mr-4"
          />
          <div class="flex-1">
            <div class="font-semibold text-gray-800 mb-1">
              <h3>${bid.bidder.name}</h3>
            </div>
            <div class="flex justify-between items-center text-gray-600">
              <span class="font-medium">${bid.amount} credits</span>
              <span class="text-sm">${formatDate(bid.created)}</span>
            </div>
          </div>
        </div>
      `;
      bidsContainer.innerHTML += bidHTML;
    });
  } else {
    bidsContainer.innerHTML = `
      <p class="text-center text-gray-500 mt-4">No bids yet.</p>
    `;
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getTimeRemaining(endsAt) {
  const now = new Date();
  const endDate = new Date(endsAt);
  const diff = endDate - now;

  if (diff <= 0) {
    return "Auction ended";
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  return `${days}d ${hours}hrs remaining`;
}
